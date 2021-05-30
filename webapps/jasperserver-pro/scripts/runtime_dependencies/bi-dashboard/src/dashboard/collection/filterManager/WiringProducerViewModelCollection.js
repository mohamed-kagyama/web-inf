define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var WiringProducerViewModel = require('../../model/filterManager/WiringProducerViewModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var WiringProducerCollection = Backbone.Collection.extend({
  model: WiringProducerViewModel,
  comparator: function comparator(model1, model2) {
    if (model1.get('group').toLowerCase() < model2.get('group').toLowerCase()) {
      return -1;
    } else if (model1.get('group').toLowerCase() > model2.get('group').toLowerCase()) {
      return 1;
    } else {
      if (_.isUndefined(model1.get('label')) && !_.isUndefined(model2.get('label'))) {
        return -1;
      } else if (!_.isUndefined(model1.get('label')) && _.isUndefined(model2.get('label'))) {
        return 1;
      } else if (_.isUndefined(model1.get('label')) && _.isUndefined(model2.get('label'))) {
        return 0;
      } else if (model1.get('label').toLowerCase() < model2.get('label').toLowerCase()) {
        return -1;
      } else if (model1.get('label').toLowerCase() > model2.get('label').toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  isValid: function isValid(validate) {
    return _.every(this.invoke('isValid', validate), _.identity);
  },
  initialize: function initialize() {
    this.on('sort remove add reset', _.partial(this.invoke, 'setGroupRelatedProperties'));
  }
}, {
  createFromDashboardWiringCollection: function createFromDashboardWiringCollection(dashboardWiringCollection, dashboardComponentCollection) {
    var inputControlProducers = dashboardWiringCollection.filter(function (wiringModel) {
      return wiringModel.component.isValueProducer();
    }),
        producerModels = _.map(inputControlProducers, function (wiringModel) {
      return WiringProducerViewModel.createFromDashboardWiringModel(wiringModel, dashboardComponentCollection);
    });

    return new WiringProducerCollection(producerModels);
  }
});
module.exports = WiringProducerCollection;

});