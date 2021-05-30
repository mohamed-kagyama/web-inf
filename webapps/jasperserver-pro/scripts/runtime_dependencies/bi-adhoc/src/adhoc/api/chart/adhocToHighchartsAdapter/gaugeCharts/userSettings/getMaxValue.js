define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getHCConfigPropertyKey = require("./getHCConfigPropertyKey");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getMaxValue = function getMaxValue(chartState) {
  var maxValue = 100;

  if (!_.isUndefined(chartState.gaugesMaxValue)) {
    maxValue = chartState.gaugesMaxValue;
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'yAxis.max');

  if (valueFromProperties) {
    maxValue = valueFromProperties;
  }

  if (typeof maxValue === 'string') {
    maxValue = parseFloat(maxValue);

    if (_.isNaN(maxValue)) {
      maxValue = 100;
    }
  }

  return maxValue;
};

module.exports = getMaxValue;

});