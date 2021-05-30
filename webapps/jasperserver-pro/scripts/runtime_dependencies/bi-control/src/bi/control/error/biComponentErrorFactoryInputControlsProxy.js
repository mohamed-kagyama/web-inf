define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var InputControlsValidationError = require('./InputControlsValidationError');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
biComponentErrorFactory.inputControlsValidationError = function (errorObj) {
  return new InputControlsValidationError(errorObj);
};

module.exports = biComponentErrorFactory;

});