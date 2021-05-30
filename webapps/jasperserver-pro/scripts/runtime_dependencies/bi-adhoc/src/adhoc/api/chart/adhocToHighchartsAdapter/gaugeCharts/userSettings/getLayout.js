define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var getHCConfigPropertyKey = require("./getHCConfigPropertyKey");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getLayout = function getLayout(chartState) {
  var layout = 'bestFit';

  if (!_.isUndefined(chartState.gaugesLayout)) {
    layout = chartState.gaugesLayout;
  }

  var valueFromProperties = getHCConfigPropertyKey(chartState, 'plotOptions.item.layout');

  if (valueFromProperties) {
    layout = valueFromProperties;
  }

  return layout;
};

module.exports = getLayout;

});