define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var errorMessageUtil = require("../../../../rest/errorHandling/errorMessageUtil");

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

var restErrorCodesEnum = require("../../../../../rest/enum/restErrorCodesEnum");

var profileAttributeErrorEnum = require("../../../../model/enum/profileAttributeErrorEnum");

var encryptedProfileAttributeErrorEnum = require("../../../../rest/enum/encryptedProfileAttributeErrorEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var errorCodeToHandlerMap = {};

errorCodeToHandlerMap[restErrorCodesEnum.SQL_EXCEPTION] = function () {
  return i18nMessage('domain.designer.metadataDesigner.dataSource.connection.fail');
};

errorCodeToHandlerMap[restErrorCodesEnum.ACCESS_DENIED] = function () {
  return i18nMessage('domain.designer.metadataDesigner.dataSource.access.denied');
};

errorCodeToHandlerMap[restErrorCodesEnum.CONNECTION_FAILED] = function (response, xhr) {
  var firstErrorDetailsEntry = response.details && response.details[0];

  if (firstErrorDetailsEntry) {
    return firstErrorDetailsEntry.errorCode === restErrorCodesEnum.SQL_EXCEPTION ? firstErrorDetailsEntry.message : errorMessageUtil.getFirstErrorMessage(xhr);
  }

  return errorMessageUtil.getFirstErrorMessage(xhr);
};

errorCodeToHandlerMap[profileAttributeErrorEnum.PROFILE_ATTRIBUTE_NOT_FOUND] = function (responseJSON, xhr) {
  return errorMessageUtil.getFirstErrorMessage(xhr);
};

errorCodeToHandlerMap[profileAttributeErrorEnum.PROFILE_ATTRIBUTE_UNSUPPORTED_LEVEL] = function (responseJSON, xhr) {
  return errorMessageUtil.getFirstErrorMessage(xhr);
};

errorCodeToHandlerMap[profileAttributeErrorEnum.PROFILE_ATTRIBUTE_EMPTY_FOR_SCHEMA_FULL_DATASOURCE] = function () {
  return i18nMessage('domain.designer.metadataDesigner.resolved.profile.attribute.schema.not.found');
};

errorCodeToHandlerMap[encryptedProfileAttributeErrorEnum.ENCRYPTED_PROFILE_ATTRIBUTE_ERROR] = function () {
  return i18nMessage('domain.designer.metadataDesigner.encrypted.profile.attribute.not.supported');
};

module.exports = {
  create: function create(xhr) {
    if (xhr === requestCanceledEnum.CANCELED) {
      return xhr;
    }

    var responseJSON = xhr.responseJSON || {};
    responseJSON = _.isArray(responseJSON) ? _.first(responseJSON) : responseJSON;
    var errorCode = responseJSON.errorCode,
        errorHandler = errorCodeToHandlerMap[errorCode];

    if (errorHandler) {
      return errorHandler(responseJSON, xhr);
    }

    return errorMessageUtil.getFirstErrorMessage(xhr);
  }
};

});