define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CircularReferenceException = function CircularReferenceException(message, notParsedCalcFields) {
  this.message = message;
  this.notParsedCalcFields = notParsedCalcFields;
};

CircularReferenceException.prototype.toString = function () {
  return 'CircularReferenceException: ' + this.message;
};

CircularReferenceException.prototype.getNotParsedCalcFields = function () {
  return this.notParsedCalcFields;
};

module.exports = CircularReferenceException;

});