define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getHCConfigPropertyKey = require("./getHCConfigPropertyKey");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getMinValue = function getMinValue(chartState) {
  var minValue = 0;

  if (!_.isUndefined(chartState.gaugesMinValue)) {
    minValue = chartState.gaugesMinValue;
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'yAxis.min');

  if (valueFromProperties) {
    minValue = valueFromProperties;
  }

  if (typeof minValue === 'string') {
    minValue = parseFloat(minValue);

    if (_.isNaN(minValue)) {
      minValue = 0;
    }
  }

  return minValue;
};

module.exports = getMinValue;

});