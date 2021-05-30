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
var UploadSchemaValidationErrorState = function UploadSchemaValidationErrorState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaValidationErrorState.prototype, {
  initialize: function initialize(options) {
    this.dataSourceInvalidValidationErrorSpecification = options.dataSourceInvalidValidationErrorSpecification;
  },
  enter: function enter(context, stateFactory) {
    var error = context.error;
    delete context.error;

    if (error !== requestCanceledEnum.CANCELED) {
      var errors = errorHandlingUtil.getErrors(error);
      context.errors = errors;
      var isDataSourceInvalidErrorsExists = this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(errors);

      if (isDataSourceInvalidErrorsExists) {
        stateFactory.enter(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
      }
    }
  }
});

module.exports = UploadSchemaValidationErrorState;

});