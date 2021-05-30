define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Epoxy = require('backbone.epoxy');

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var WiringConsumerViewModel = require('./WiringConsumerViewModel');

var BackboneValidation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var WiringConsumerViewModelCollection = require('../../collection/filterManager/WiringConsumerViewModelCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
var WiringProducerModel = Epoxy.Model.extend(_.extend({}, BackboneValidation.mixin, {
  defaults: {
    id: undefined,
    name: undefined,
    parameter: undefined,
    parameterPublicName: undefined,
    label: undefined
  },
  validation: {
    name: [{
      required: true,
      msg: new i18nMessage('dashboard.filterManager.error.parameter.name.required')
    }, {
      fn: function fn(value, attr, computedState) {
        if (!_.isUndefined(computedState.id)) {
          return;
        }

        return this.collection.find(function (c) {
          return c.get('name') == value && c.get('id') !== computedState.id;
        });
      },
      msg: new i18nMessage('dashboard.filterManager.error.parameter.name.duplication')
    }]
  },
  initialize: function initialize(attrs, options) {
    options || (options = {});
    this.consumers = options.consumers || new WiringConsumerViewModelCollection([]);
    this.component = options.component;
  },
  isValid: function isValid(validate) {
    return BackboneValidation.mixin.isValid.call(this, validate) && this.consumers.isValid(validate);
  },
  //isHidden: function() {
  //    return !this.component.isVisible();
  //},
  setGroupRelatedProperties: function setGroupRelatedProperties() {
    this.set({
      'isFirstItemInGroup': this.collection.findWhere({
        group: this.get('group')
      }) === this,
      'itemsInGroup': this.collection.where({
        group: this.get('group')
      }).length
    });
  }
}), {
  createFromDashboardWiringModel: function createFromDashboardWiringModel(dashboardWiringModel, components) {
    var consumers = new WiringConsumerViewModelCollection(),
        label = dashboardWiringModel.get('producer'),
        parameterPublicName = dashboardWiringModel.get('producer'),
        group,
        outputParameters = dashboardWiringModel.component.get('outputParameters');

    if (outputParameters && _.isArray(outputParameters)) {
      var outputParameter = _.findWhere(outputParameters, {
        id: dashboardWiringModel.get('name')
      });

      if (!_.isUndefined(outputParameter)) {
        label = outputParameter.label;
      }
    } else if (dashboardWiringModel.component.get('type') === dashboardComponentTypes.VALUE) {
      label = dashboardWiringModel.component.id;
      parameterPublicName = dashboardWiringModel.component.id;
    } else if (dashboardWiringModel.component.get('type') === dashboardComponentTypes.INPUT_CONTROL) {
      label = dashboardWiringModel.component.get('name');
      parameterPublicName = dashboardWiringModel.component.id;
    }

    consumers.add(dashboardWiringModel.consumers.map(function (consumerModel) {
      var consumerParts = consumerModel.get('consumer').split(':'),
          consumerComponentModel = components.get(consumerParts[0]);
      return new WiringConsumerViewModel({
        id: consumerParts[0],
        parameter: consumerParts[1],
        name: consumerComponentModel.get('name')
      }, {
        component: consumerComponentModel,
        collection: consumers
      });
    }));

    if (dashboardWiringModel.component.get('type') === dashboardComponentTypes.INPUT_CONTROL) {
      group = dashboardWiringModel.component.getParent() ? dashboardWiringModel.component.getParent().get('name') : i18n['dashboard.component.filter.group.component.name'] || 'Filter Group';
    } else if (dashboardWiringModel.component.get('type') === dashboardComponentTypes.VALUE) {
      group = i18n['dashboard.filter.manager.manually.created.filters'] || 'Manually Created Filters';
    } else {
      group = dashboardWiringModel.component.get('name');
    }

    return new WiringProducerModel({
      id: dashboardWiringModel.get('producer'),
      name: dashboardWiringModel.get('producer'),
      parameter: dashboardWiringModel.get('name'),
      parameterPublicName: parameterPublicName,
      label: label,
      group: group
    }, {
      component: dashboardWiringModel.component,
      consumers: consumers
    });
  }
});
module.exports = WiringProducerModel;

});