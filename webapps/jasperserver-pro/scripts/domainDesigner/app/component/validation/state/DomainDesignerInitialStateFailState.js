define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var errorHandlingUtil = require("../../../rest/errorHandling/errorHandlingUtil");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainDesignerInitialStateFailState = function DomainDesignerInitialStateFailState(options) {
  this.initialize(options);
};

_.extend(DomainDesignerInitialStateFailState.prototype, {
  initialize: function initialize(options) {
    this.dataSourceInvalidValidationErrorSpecification = options.dataSourceInvalidValidationErrorSpecification;
    this.allErrorsRecoverableValidationErrorSpecification = options.allErrorsRecoverableValidationErrorSpecification;
    this.invalidSecurityFileErrorsOnlySpecification = options.invalidSecurityFileErrorsOnlySpecification;
  },
  enter: function enter(context, stateFactory) {
    var response = context.xhr;
    var errors;

    if (response === requestCanceledEnum.CANCELED) {
      stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_STATE, context);
    } else {
      errors = errorHandlingUtil.getErrors(response);
      var isDataSourceInvalidErrorsExists = this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(errors),
          areAllErrorsRecoverable = this.allErrorsRecoverableValidationErrorSpecification.isSatisfiedBy(errors),
          securityFileOnlyErrors = this.invalidSecurityFileErrorsOnlySpecification.isSatisfiedBy(errors);
      context.errors = errors;

      if (isDataSourceInvalidErrorsExists) {
        stateFactory.enter(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, context);
      } else if (securityFileOnlyErrors) {
        stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_SECURITY_FILE_ERROR_STATE, context);
      } else if (!areAllErrorsRecoverable) {
        stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_INITIALIZE_DESIGNER_STATE_AFTER_RECOVERABLE_ERROR_STATE, context);
      }
    }
  }
});

module.exports = DomainDesignerInitialStateFailState;

});