define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var errorHandlingUtil = require("../../../rest/errorHandling/errorHandlingUtil");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainValidationErrorState = function SaveDomainValidationErrorState(options) {
  this.initialize(options);
};

_.extend(SaveDomainValidationErrorState.prototype, {
  initialize: function initialize(options) {
    this.dataSourceInvalidValidationErrorSpecification = options.dataSourceInvalidValidationErrorSpecification;
    this.dataSourceSchemaNameMismatchValidationErrorSpecification = options.dataSourceSchemaNameMismatchValidationErrorSpecification;
    this.orphanResourcesValidationErrorSpecification = options.orphanResourcesValidationErrorSpecification;
    this.invalidSecurityFileErrorsOnlySpecification = options.invalidSecurityFileErrorsOnlySpecification;
  },
  enter: function enter(context, stateFactory) {
    var errors = errorHandlingUtil.getErrors(context.xhr);
    context.errors = errors;
    var isDataSourceInvalidErrorsExists = this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(errors),
        isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExists = this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(errors),
        isDomainSchemaContainsOrphanResourcesErrorsExists = this.orphanResourcesValidationErrorSpecification.isSatisfiedBy(errors),
        securityFileOnlyErrors = this.invalidSecurityFileErrorsOnlySpecification.isSatisfiedBy(errors);

    if (securityFileOnlyErrors) {
      stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE, context);
    } else if (isDataSourceInvalidErrorsExists) {
      stateFactory.enter(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, context);
    } else if (isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExists) {
      stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_MAP_SCHEMAS_STATE, context);
    } else if (isDomainSchemaContainsOrphanResourcesErrorsExists) {
      stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE, context);
    } else {
      stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
    }
  }
});

module.exports = SaveDomainValidationErrorState;

});