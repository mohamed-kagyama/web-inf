define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!AdHocFiltersBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationError = function ValidationError(value, attr, msgCode, validator) {
  this.value = value;
  this.messageCode = msgCode;
  this.validator = validator;
  var attrSegments = attr.split(ValidationError.ATTRIBUTE_INDEX_SEPARATOR);

  if (attrSegments.length == 2) {
    this.attribute = attrSegments[0];
    this.index = attrSegments[1] * 1;
  } else {
    this.attribute = attr;
    this.index = 0;
  }
};

ValidationError.ATTRIBUTE_INDEX_SEPARATOR = '__';

ValidationError.prototype.getMessage = function () {
  return i18n[this.messageCode];
};

ValidationError.prototype.getAttr = function () {
  return this.index === 0 ? this.attribute : this.attribute + ValidationError.ATTRIBUTE_INDEX_SEPARATOR + this.index;
};

module.exports = ValidationError;

});