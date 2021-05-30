define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var adhocFilterSettings = require("settings!adhocFilterSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var NULL_VALUE = adhocFilterSettings ? adhocFilterSettings.nullValue : null;
var NULL_LABEL = adhocFilterSettings ? adhocFilterSettings.nullLabel : null;

module.exports = function (value) {
  return value === NULL_VALUE ? NULL_LABEL : value;
};

});