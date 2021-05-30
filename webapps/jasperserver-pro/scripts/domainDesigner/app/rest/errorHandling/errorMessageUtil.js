define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var errorHandlingUtil = require('./errorHandlingUtil');

var responseStatusToBundleKeyEnum = require("../enum/responseStatusToBundleKeyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function getErrorMessage(status, error) {
  var message;

  if (error.errorCode && i18n[error.errorCode]) {
    var params = [error.errorCode].concat(error.parameters);
    message = i18nMessage.apply(i18nMessage, params);
  }

  if (!message) {
    message = responseStatusToBundleKeyEnum[status];
  }

  if (!message) {
    message = i18nMessage('domain.designer.error.handling.unknown.error', error.parameters);
  }

  return message;
}

function getErrorMessages(xhr) {
  var errors = errorHandlingUtil.getErrors(xhr);
  return _.map(errors, _.partial(getErrorMessage, xhr.status));
}

function getFirstErrorMessage(xhr) {
  return _.first(getErrorMessages(xhr));
}

module.exports = {
  getErrorMessages: getErrorMessages,
  getFirstErrorMessage: getFirstErrorMessage
};

});