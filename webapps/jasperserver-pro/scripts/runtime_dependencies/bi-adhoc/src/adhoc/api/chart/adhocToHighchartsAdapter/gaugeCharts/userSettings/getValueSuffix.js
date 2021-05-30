define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getHCConfigPropertyKey = require('./getHCConfigPropertyKey');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getValueSuffix = function getValueSuffix(chartState) {
  var valueSuffix = '';

  if (!_.isUndefined(chartState.gaugesSuffixLabel)) {
    valueSuffix = chartState.gaugesSuffixLabel;
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'plotOptions.solidgauge.tooltip.valueSuffix');

  if (valueFromProperties) {
    valueSuffix = valueFromProperties;
  }

  return valueSuffix;
};

module.exports = getValueSuffix;

});