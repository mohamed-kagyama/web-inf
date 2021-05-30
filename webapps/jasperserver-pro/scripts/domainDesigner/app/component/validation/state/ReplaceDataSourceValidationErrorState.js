define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var errorHandlingUtil = require("../../../rest/errorHandling/errorHandlingUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReplaceDataSourceValidationErrorState = function ReplaceDataSourceValidationErrorState(options) {
  this.initialize(options);
};

_.extend(ReplaceDataSourceValidationErrorState.prototype, {
  initialize: function initialize(options) {
    this.dataSourceInvalidValidationErrorSpecification = options.dataSourceInvalidValidationErrorSpecification;
    this.dataSourceSchemaNameMismatchValidationErrorSpecification = options.dataSourceSchemaNameMismatchValidationErrorSpecification;
    this.encryptedProfileAttributeErrorSpecification = options.encryptedProfileAttributeErrorSpecification;
  },
  enter: function enter(context, stateFactory) {
    var errors;
    var response = context.xhr;

    if (response === requestCanceledEnum.CANCELED) {
      stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_STATE, context);
    } else {
      errors = errorHandlingUtil.getErrors(response);
      context.errors = errors;
      var isDataSourceInvalidErrorsExists = this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(errors),
          isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExists = this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(errors),
          isAnyEncryptedProfileAttributes = this.encryptedProfileAttributeErrorSpecification.isSatisfiedBy(errors);

      if (isDataSourceInvalidErrorsExists) {
        stateFactory.enter(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, context);
      } else if (isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExists) {
        stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_MAP_SCHEMAS_STATE, context);
      } else if (isAnyEncryptedProfileAttributes) {
        context.isAnyEncryptedProfileAttributes = isAnyEncryptedProfileAttributes;
        stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE, context);
      }
    }
  }
});

module.exports = ReplaceDataSourceValidationErrorState;

});