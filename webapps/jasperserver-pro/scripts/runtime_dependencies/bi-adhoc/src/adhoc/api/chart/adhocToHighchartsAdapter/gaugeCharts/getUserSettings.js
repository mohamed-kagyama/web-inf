define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var getMinValue = require('./userSettings/getMinValue');

var getMaxValue = require('./userSettings/getMaxValue');

var getDecimalPlaces = require('./userSettings/getDecimalPlaces');

var getValueSuffix = require('./userSettings/getValueSuffix');

var getLayout = require('./userSettings/getLayout');

var getColorStops = require('./userSettings/getColorStops');

var getPlotOffsets = require("./userSettings/getPlotOffsets");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getUserSettings = function getUserSettings(extraOptions) {
  var chartState = extraOptions && extraOptions.chartState || {};
  var minValue = getMinValue(chartState);
  var maxValue = getMaxValue(chartState);

  if (maxValue < minValue) {
    // the maxValue should not be less than minValue, the UI should prevent this.
    // But, things may go wrong, and in this case I think it makes sense to reverse them
    var _ref = [minValue, maxValue];
    maxValue = _ref[0];
    minValue = _ref[1];
  }

  var layout = getLayout(chartState);
  var decimalPlaces = getDecimalPlaces(chartState);
  var valueSuffix = getValueSuffix(chartState);
  var colorStops = getColorStops(chartState);
  var plotOffsets = getPlotOffsets(chartState);
  return {
    layout: layout,
    plotOffsets: plotOffsets,
    minValue: minValue,
    maxValue: maxValue,
    decimalPlaces: decimalPlaces,
    colorStops: colorStops,
    valueSuffix: valueSuffix
  };
};

module.exports = getUserSettings;

});