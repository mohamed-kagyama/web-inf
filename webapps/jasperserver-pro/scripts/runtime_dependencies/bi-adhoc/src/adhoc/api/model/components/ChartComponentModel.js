define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

var VisualizationTypesController = require('../../visualChooser/VisualizationTypesController');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: {
    'xAxisRotation': -45,
    'yAxisRotation': 0,
    'xAxisStep': 1,
    'yAxisStep': 1,
    'legend': 'bottom',
    'showDataPoints': true,
    'advancedProperties': [],
    'alignment': 'bottom',
    'showMeasureOnValueAxis': true,
    'legendBorder': true,
    'showSingleMeasuresLabels': true,
    'autoScaleFonts': true,
    'showScatterLine': false,
    'type': 'Column'
  },
  initialize: function initialize(attributes, options) {
    this.visualizationTypesManager = new VisualizationTypesController();
    var existing = this.get('advancedProperties');

    if (!_.isArray(existing)) {
      this.set({
        advancedProperties: _.map(_.keys(existing), function (key) {
          return {
            name: key,
            value: existing[key]
          };
        })
      });
    }
  },
  getLegacyAdhocChartType: function getLegacyAdhocChartType() {
    var self = this;
    return this.visualizationTypesManager.findType({
      name: self.get('type')
    })['legacyAdhoc'];
  },
  isTimeSeries: function isTimeSeries() {
    return this.visualizationTypesManager.isTimeSeriesType(this.get('type'));
  }
});

});