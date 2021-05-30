define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Epoxy = require('backbone.epoxy');

var TableCommonFormatView = require('./TableCommonFormatView');

var tableConditionTemplate = require("text!../template/tableConditionTemplate.htm");

var TableConditionModel = require('../model/TableConditionModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function toEpoxyOptions(jiveOptions) {
  var epoxyOptions = [];

  _.each(jiveOptions, function (o) {
    epoxyOptions.push({
      label: o.val,
      value: o.key
    });
  });

  return epoxyOptions;
}

var ViewModel = Epoxy.Model.extend({
  defaults: {
    conditionIndex: 1,
    conditionOptions: [],
    dataType: 'text',
    calendarPatterns: {}
  },
  computeds: {
    isNotBooleanType: function isNotBooleanType() {
      return this.get('dataType') !== 'boolean';
    }
  },
  remove: function remove() {}
});
module.exports = TableCommonFormatView.extend({
  events: {
    'click div.jive_inputbutton[name=\'conditionRemove\']': '_removeCondition',
    'click div.jive_inputbutton[name=\'conditionMoveUp\']': '_moveConditionUp',
    'click div.jive_inputbutton[name=\'conditionMoveDown\']': '_moveConditionDown'
  },
  el: function el() {
    return _.template(tableConditionTemplate, {
      i18n: this.i18n
    });
  },
  initialize: function initialize() {
    this.model = new TableConditionModel();
    this.viewModel = new ViewModel();
    Epoxy.View.prototype.initialize.apply(this, arguments);
  },
  computeds: {
    convertedOptions: {
      deps: ['conditionOptions'],
      get: function get(conditionOptions) {
        return toEpoxyOptions(conditionOptions);
      }
    },
    conditionValueStart: {
      deps: ['value'],
      get: function get(value) {
        if (_.isArray(value)) {
          return value[0];
        } else {
          return value;
        }
      },
      set: function set(val) {
        var modelValue = this.getBinding('value');

        if (_.isArray(modelValue)) {
          modelValue[0] = val;
          this.model.set({
            value: modelValue
          }, {
            validate: true
          });
        } else {
          this.model.set({
            value: val
          }, {
            validate: true
          });
        }
      }
    },
    conditionValueEnd: {
      deps: ['value'],
      get: function get(value) {
        if (_.isArray(value)) {
          return value[1];
        }
      },
      set: function set(val) {
        var modelValue = this.getBinding('value');

        if (_.isArray(modelValue)) {
          modelValue[1] = val;
          this.model.set({
            value: modelValue
          }, {
            validate: true
          });
        }
      }
    },
    getColspan: function getColspan() {
      return this.getBinding('isMultiValueOperator') ? 1 : 3;
    }
  },
  _removeCondition: function _removeCondition(evt) {
    this.model.trigger('destroy', this.model, this.model.collection);
  },
  _moveConditionUp: function _moveConditionUp(evt) {
    var collection = this.model.collection,
        index = collection.indexOf(this.model);

    if (index > 0) {
      collection.remove(this.model, {
        silent: true
      });
      collection.add(this.model, {
        at: index - 1
      }, {
        silent: true
      });
      this.parent.render();
    }
  },
  _moveConditionDown: function _moveConditionDown(evt) {
    var collection = this.model.collection,
        index = collection.indexOf(this.model);

    if (index < collection.length - 1) {
      collection.remove(this.model, {
        silent: true
      });
      collection.add(this.model, {
        at: index + 1
      }, {
        silent: true
      });
      this.parent.render();
    }
  },
  remove: function remove() {
    Epoxy.View.prototype.remove.apply(this, arguments);
    this.model && this.model.remove();
    this.viewModel && this.viewModel.remove();
  }
});

});