define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getHCConfigPropertyKey = require('./getHCConfigPropertyKey');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getDecimalPlaces = function getDecimalPlaces(chartState) {
  var decimalPlaces = '1';

  if (!_.isUndefined(chartState.gaugesDecimalPlaces)) {
    decimalPlaces = chartState.gaugesDecimalPlaces;
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'plotOptions.solidgauge.tooltip.valueDecimals');

  if (valueFromProperties) {
    decimalPlaces = valueFromProperties;
  }

  if (typeof decimalPlaces === 'string' && decimalPlaces !== '') {
    decimalPlaces = parseInt(decimalPlaces);

    if (_.isNaN(decimalPlaces)) {
      decimalPlaces = 1;
    }
  }

  return decimalPlaces;
};

module.exports = getDecimalPlaces;

});