define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var getHCConfigPropertyKey = require("./getHCConfigPropertyKey");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getColorStops = function getColorStops(chartState) {
  var defaultStopColorValue = '#33a4ff';
  var defaultStopValues = [0.2, 0.5, 0.7, 1];
  var colorStops = [[defaultStopValues[0], defaultStopColorValue], [defaultStopValues[1], defaultStopColorValue], [defaultStopValues[2], defaultStopColorValue], [defaultStopValues[3], defaultStopColorValue]];

  if (_.isArray(chartState.gaugeStopColors) && chartState.gaugeStopColors.length > 0) {
    var gaugeStopColors = chartState.gaugeStopColors;
    var stopValue = chartState['color1Stop'] || 0;
    var colorValue = gaugeStopColors[0];
    colorStops = [[stopValue, colorValue]];

    for (var i = 1; i < gaugeStopColors.length; i++) {
      var defaultStopValueInErrorCase = 1 / (gaugeStopColors.length - 1) * i;
      defaultStopValueInErrorCase = Math.round(defaultStopValueInErrorCase * Math.pow(10, 2)) / Math.pow(10, 2);
      stopValue = chartState["color".concat(i + 1, "Stop")] || defaultStopValues[i] || defaultStopValueInErrorCase;
      colorValue = gaugeStopColors[i] || defaultStopColorValue;
      colorStops.push([stopValue, colorValue]);
    }
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'yAxis.stops');

  if (valueFromProperties) {
    colorStops = valueFromProperties;
  }

  return colorStops;
};

module.exports = getColorStops;

});