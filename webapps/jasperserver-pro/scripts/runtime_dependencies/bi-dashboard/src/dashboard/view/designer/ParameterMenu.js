define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var parser = require('../../model/parameters/ParameterParser');

var parameterMenuOptionTemplate = require("text!../../template/parameterMenuOptionTemplate.htm");

var i18n = require("bundle!DashboardBundle");

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

var AttachableMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/AttachableMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function prepareOptions(options, components, consumer) {
  return _.map(options, function (option) {
    if (option.component) {
      var component = components.get(option.component),
          name;
      option.consumer = consumer.id + ':' + option.substitution;
      option.consumerApply = consumer.id + ':' + dashboardWiringStandardIds.APPLY_SLOT;

      if (component.getParent()) {
        option.label = truncate(component.get('name'));
        component = component.getParent();
      }

      option.componentLabel = truncate(i18n['dashboard.context.menu.option.from'].replace('{0}', component.get('name')));
    } else {
      option.componentLabel = '';
    }

    return option;
  });
}

function truncate(str) {
  if (str.length > 60) {
    str = str.substring(str, 57) + '...';
  }

  return str;
}

function addWiring(options) {
  var collection = ParameterMenu.dashboardModel.currentFoundation.wiring,
      connection = collection.get(options.producer);

  if (connection && !connection.consumers.get(options.consumer)) {
    connection.consumers.add({
      consumer: options.consumer
    });

    if (connection.component.get('parentId')) {
      collection.get(connection.component.get('parentId') + ':' + dashboardWiringStandardIds.REFRESH_SIGNAL).consumers.add({
        consumer: options.consumerApply
      });
    } else {
      connection.consumers.add({
        consumer: options.consumerApply
      });
    }
  }
}

var ParameterMenu = AttachableMenu.extend({
  initialize: function initialize(options, params) {
    var self = this;
    options || (options = {});
    options.optionTemplate = parameterMenuOptionTemplate;
    AttachableMenu.prototype.initialize.call(this, options, params);

    _.bindAll(this, 'onKey');

    this.$attachTo.on('keydown', this.onKey);
    this.$el.on('scroll', function () {
      self.$attachTo.focus();
    });
    this.on('all', function (eventName, view, model) {
      if (eventName.indexOf('option') === 0) {
        var value = self.$attachTo.val(),
            pos = model.get('newCursorPos');
        self.$attachTo.val(value.substring(0, model.get('begin')) + model.get('substitution') + value.substring(model.get('end')));

        if (self.$attachTo[0].setSelectionRange) {
          self.$attachTo[0].setSelectionRange(pos, pos);
        } else if (self.$attachTo[0].createTextRange) {
          var range = self.$attachTo[0].createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }

        if (model.has('consumer') && model.has('producer')) {
          addWiring(model.attributes);
        }

        self.$attachTo.trigger('input', model.attributes);
      }
    });
    this.on('mouseover', function (option) {
      var over = this.collection.findWhere({
        over: true
      });

      if (option.model !== over) {
        over && over.set({
          over: false
        });
        option.model.set({
          over: true
        });
      }
    });
    this.on('mouseout', function (option) {
      option.model.set({
        over: false
      });
    });
  },
  hide: function hide() {
    AttachableMenu.prototype.hide.apply(this, arguments);
    this.remove();
  },
  remove: function remove() {
    this.$attachTo.off('keydown', this.onKey);
    this.off('all');
    AttachableMenu.prototype.remove.apply(this, arguments);
  },
  moveDown: function moveDown() {
    var done = false;

    for (var i = 0; i < this.collection.models.length && !done; i++) {
      if (this.collection.models[i].get('over')) {
        done = true;

        if (i + 1 < this.collection.models.length) {
          this.collection.models[i].set({
            over: false
          });
          this.collection.models[i + 1].set({
            over: true
          });

          if (this.maxSize) {
            var itemHeight = this.options[0].$el.height();

            if ((i + 1) * itemHeight >= this.el.scrollTop + this.maxSize * itemHeight) {
              this.el.scrollTop += itemHeight;
            }
          }
        }
      }
    }

    if (!done && this.collection.models.length) {
      this.collection.models[0].set({
        over: true
      });
      this.el.scrollTop = 0;
    }
  },
  moveUp: function moveUp() {
    var done = false;

    for (var i = 0; i < this.collection.models.length && !done; i++) {
      if (this.collection.models[i].get('over')) {
        done = true;

        if (i - 1 >= 0) {
          this.collection.models[i].set({
            over: false
          });
          this.collection.models[i - 1].set({
            over: true
          });

          if (this.maxSize) {
            var itemHeight = this.options[0].$el.height();

            if ((i - 1) * itemHeight <= this.el.scrollTop) {
              this.el.scrollTop = (i - 1) * itemHeight;
            }
          }
        }
      }
    }

    if (!done && this.collection.models.length) {
      this.collection.models[this.collection.models.length - 1].set({
        over: true
      });
      this.el.scrollTop = 0;
    }
  },
  onKey: function onKey(ev) {
    if (ev.keyCode == 27) {
      this.hide();
      ev.stopPropagation();
    } else if (ev.keyCode == 40) {
      this.moveDown();
      ev.preventDefault();
    } else if (ev.keyCode == 38) {
      this.moveUp();
      ev.preventDefault();
    } else if (ev.keyCode == 13) {
      this._enter();

      ev.stopPropagation();
    }
  },
  _enter: function _enter(ev) {
    var over = _.find(this.options, function (option) {
      return option.model.get('over');
    });

    over && over.select(ev);
  }
}, {
  open: function open(opts, el) {
    ParameterMenu.close();
    ParameterMenu.instance = new ParameterMenu(opts, el, undefined, {
      menuOptionTemplate: parameterMenuOptionTemplate,
      maxSize: 7
    });
    ParameterMenu.instance.show();
  },
  close: function close() {
    ParameterMenu.instance && ParameterMenu.instance.hide();
  },
  useModel: function useModel(model) {
    ParameterMenu.dashboardModel = model;
  },
  onInput: function onInput(ev, previousSubstitution) {
    if (!previousSubstitution || previousSubstitution.hasOptions) {
      var val = $(ev.currentTarget).val(),
          sStart = +ev.currentTarget.selectionStart,
          sEnd = +ev.currentTarget.selectionEnd,
          position = val.length - 1,
          options;

      if (sStart >= 0 && sStart === sEnd) {
        position = sEnd;
      }

      options = parser.completionOptions(val, position, {
        wiring: ParameterMenu.dashboardModel.currentFoundation.wiring
      });

      if (options.length) {
        ParameterMenu.open(prepareOptions(options, ParameterMenu.dashboardModel.currentFoundation.components, this.model), ev.currentTarget);
      } else {
        ParameterMenu.close();
      }
    } else {
      ParameterMenu.close();
    }
  }
});
module.exports = ParameterMenu;

});