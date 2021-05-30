define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var requestCanceledEnum = require("../../enum/requestCanceledEnum");

var errorMessageUtil = require("../../errorHandling/errorMessageUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ShowNotificationErrorHandlerStrategy = function ShowNotificationErrorHandlerStrategy(options) {
  this.notification = options.notification;
};

_.extend(ShowNotificationErrorHandlerStrategy.prototype, {
  handleError: function handleError(error) {
    if (error !== requestCanceledEnum.CANCELED) {
      this.notification.show({
        message: errorMessageUtil.getFirstErrorMessage(error)
      });
    }
  }
});

module.exports = ShowNotificationErrorHandlerStrategy;

});