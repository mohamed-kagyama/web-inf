define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var constantJoinExpressionErrorCodesEnum = require("../enum/constantJoinExpressionErrorCodesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function getErrorMessage(options) {
  var errorMessage,
      responseJSON = options.responseJSON,
      validationOptions = options.validationOptions,
      errorCode = responseJSON.errorCode;

  switch (errorCode) {
    case constantJoinExpressionErrorCodesEnum.character:
      errorMessage = _buildCharacterErrorMessage(responseJSON, validationOptions);
      break;

    default:
      errorMessage = responseJSON.message;
  }

  return errorMessage;
}

function _buildCharacterErrorMessage(responseJSON, validationOptions) {
  var properties = responseJSON.properties,
      valueForValidation = validationOptions.value,
      invalidValue = properties[0] && properties[0].value;
  var positionInValueZeroBased = valueForValidation.indexOf(invalidValue),
      positionInValueOneBased = positionInValueZeroBased + 1;
  var errorMessage = i18nMessage(responseJSON.errorCode, {
    key: 'invalidCharacter',
    value: invalidValue
  }, {
    key: 'charPositionInLine',
    value: positionInValueOneBased
  });
  return errorMessage;
}

module.exports = {
  getErrorMessage: getErrorMessage
};

});