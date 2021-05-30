define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (chartState, key) {
  var advancedProperties = chartState.advancedProperties || {};

  if (_.isArray(advancedProperties)) {
    var property = _.find(advancedProperties, function (setting) {
      return setting.name === key;
    });

    if (property) {
      return property.value;
    }
  }

  return null;
};

});