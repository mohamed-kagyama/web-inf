define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var viewStateModelDefaultsEnum = require("../enum/viewStateModelDefaultsEnum");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function matchDefault(value, defaultValue) {
  if (defaultValue === viewStateModelDefaultsEnum.EMPTY_OBJECT) {
    return _.keys(value).length === 0;
  } else {
    return value === defaultValue;
  }
}

function getPropertyValueOrDefault(obj, property, defaultValue) {
  if (_.isUndefined(obj[property])) {
    return defaultValue === viewStateModelDefaultsEnum.EMPTY_OBJECT ? {} : defaultValue;
  } else {
    return obj[property];
  }
}

function setPropertyValueOrDefault(obj, property, value, defaultValue) {
  var matchDefaultValue = matchDefault(value, defaultValue);

  if (matchDefaultValue && !_.isUndefined(obj[property])) {
    delete obj[property];
  } else if (!matchDefaultValue) {
    obj[property] = value;
  }
}

module.exports = {
  matchDefault: matchDefault,
  getPropertyValueOrDefault: getPropertyValueOrDefault,
  setPropertyValueOrDefault: setPropertyValueOrDefault
};

});