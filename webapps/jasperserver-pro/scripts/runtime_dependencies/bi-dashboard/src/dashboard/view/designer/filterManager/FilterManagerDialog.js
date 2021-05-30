define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var CollectionView = require('./CollectionView');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var WiringProducerViewModelCollection = require('../../../collection/filterManager/WiringProducerViewModelCollection');

var WiringProducerViewModel = require('../../../model/filterManager/WiringProducerViewModel');

var ParameterMenu = require('../ParameterMenu');

var WiringProducerView = require('./WiringProducerView');

var ValueDashboardComponentModel = require('../../../model/component/ValueDashboardComponentModel');

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var _ = require('underscore');

var filterManagerTemplate = require("text!../../../template/filterManager/filterManagerTemplate.htm");

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConsumers(components) {
  var parameterConsumerComponents = components.filter(function (c) {
    return c.isParametrized();
  });
  return _.map(parameterConsumerComponents, function (component) {
    return {
      name: component.get('name'),
      id: component.get('id'),
      parameters: component.get('parameters')
    };
  });
}

module.exports = Dialog.extend({
  events: _.extend({
    'click a.addNewFilter': 'addNewFilter'
  }, Dialog.prototype.events),
  constructor: function constructor(options) {
    options || (options = {});
    this.foundation = options.model;
    this.dashboardId = options.dashboardId;
    Dialog.prototype.constructor.call(this, {
      buttons: [{
        label: i18n2['button.ok'],
        action: 'ok',
        primary: true
      }, {
        label: i18n2['button.cancel'],
        action: 'cancel',
        primary: false
      }],
      title: i18n['dashboard.filter.manager.title'],
      additionalCssClasses: 'filterManagerDialog',
      additionalBodyCssClasses: 'jr-uMaxheight-500px',
      modal: true,
      resizable: false,
      content: new CollectionView({
        template: filterManagerTemplate,
        templateOptions: {
          i18n: i18n
        },
        modelView: WiringProducerView,
        modelViewOptions: {
          consumers: getConsumers(this.foundation.components)
        },
        contentContainer: 'tbody',
        collection: new WiringProducerViewModelCollection()
      })
    });
    this.on('button:ok', this.applyWiringChanges);
    this.on('button:cancel', this.close);
    this.on('open', _.bind(ParameterMenu.close, ParameterMenu));
    this.listenTo(this.content.collection, 'change:id', function () {
      this.content.collection.sort();
      this.content.render();
    });
  },
  applyWiringChanges: function applyWiringChanges() {
    if (this.content.collection.isValid(true)) {
      var self = this;

      var filterComponents = _.reduce(self.content.collection.models, function (memo, model) {
        if (!_.findWhere(memo, {
          id: model.component.id
        })) {
          memo.push(model.component);
        }

        return memo;
      }, []),
          otherComponents = this.foundation.components.filter(function (component) {
        return !component.isValueProducer();
      });

      this.foundation.components.set(filterComponents.concat(otherComponents));
      this.foundation.wiring.each(function (wiringModel) {
        if (wiringModel.component.isValueProducer()) {
          wiringModel.consumers.set(self.content.collection.get(wiringModel.id).consumers.map(function (wiringConsumerModel) {
            return {
              consumer: wiringConsumerModel.get('id') + ':' + wiringConsumerModel.get('parameter')
            };
          }));
        }
      });
      var refreshSignalWiring = this.foundation.wiring.findWhere({
        name: dashboardWiringStandardIds.REFRESH_SIGNAL
      }),
          componentsToApplyParamsTo = [];

      if (refreshSignalWiring) {
        self.content.collection.each(function (wiringProducerModel) {
          if (wiringProducerModel.component.getParent()) {
            wiringProducerModel.consumers.each(function (wiringConsumerModel) {
              var component = self.foundation.components.get(wiringConsumerModel.get('id'));

              if (component.isParametrized()) {
                componentsToApplyParamsTo.push(wiringConsumerModel.get('id'));
              }
            });
          }
        });
        refreshSignalWiring.consumers.set(_.map(_.uniq(componentsToApplyParamsTo), function (componentId) {
          return {
            consumer: componentId + ':' + dashboardWiringStandardIds.APPLY_SLOT
          };
        }));
      }

      _.invoke(this.foundation.components.where({
        type: dashboardComponentTypes.FILTER_GROUP
      }), 'notify', true);

      this.close();
    }
  },
  render: function render() {
    Dialog.prototype.render.apply(this, arguments);
    return this;
  },
  open: function open() {
    this.content.collection.reset(WiringProducerViewModelCollection.createFromDashboardWiringCollection(this.foundation.wiring, this.foundation.components).models);
    this.content._modelViewOptions = {
      consumers: getConsumers(this.foundation.components)
    };
    this.content.collection.sort();
    Dialog.prototype.open.call(this, {
      renderContent: true
    });
  },
  close: function close() {
    this.content.collection.reset();
    Dialog.prototype.close.apply(this, arguments);
  },
  addNewFilter: function addNewFilter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var wiringProducerViewModel = new WiringProducerViewModel({
      group: i18n['dashboard.filter.manager.manually.created.filters'] || 'Manually Created Filters'
    }),
        componentModel = new ValueDashboardComponentModel({}, {
      dashboardId: this.dashboardId
    });
    componentModel.collection = this.foundation.components;
    componentModel.unset('id');
    componentModel.unset('name');
    componentModel.unset('label');
    wiringProducerViewModel.component = componentModel;
    this.content.collection.add(wiringProducerViewModel, {
      silent: true,
      sort: false
    }); // for some reason models inside collection reference old collection instance, so fixing that
    // for some reason models inside collection reference old collection instance, so fixing that

    this.content.collection.forEach(_.bind(function (model) {
      model.collection = this.content.collection;
    }, this));
    this.content.collection.sort();
    this.content.render();
  }
});

});