define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var errorHandlingUtil = require("../../../rest/errorHandling/errorHandlingUtil");

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DownloadSchemaValidationErrorState = function DownloadSchemaValidationErrorState(options) {
  this.initialize(options);
};

_.extend(DownloadSchemaValidationErrorState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    var error = context.error;
    delete context.error;

    if (error !== requestCanceledEnum.CANCELED) {
      context.errors = errorHandlingUtil.getErrors(error);
      stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
    }
  }
});

module.exports = DownloadSchemaValidationErrorState;

});