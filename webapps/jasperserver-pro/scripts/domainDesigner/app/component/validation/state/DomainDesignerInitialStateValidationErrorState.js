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
var DomainDesignerInitialStateValidationErrorState = function DomainDesignerInitialStateValidationErrorState(options) {
  this.initialize(options);
};

_.extend(DomainDesignerInitialStateValidationErrorState.prototype, {
  initialize: function initialize(options) {
    this.orphanResourcesValidationErrorSpecification = options.orphanResourcesValidationErrorSpecification;
    this.dataSourceInvalidValidationErrorSpecification = options.dataSourceInvalidValidationErrorSpecification;
    this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter = options.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter;
    this.dataSourceSchemaNameMismatchValidationErrorSpecification = options.dataSourceSchemaNameMismatchValidationErrorSpecification;
    this.emptyResourcesElementValidationErrorSpecification = options.emptyResourcesElementValidationErrorSpecification;
  },
  enter: function enter(context, stateFactory) {
    var errors;
    var response = context.xhr;

    if (response === requestCanceledEnum.CANCELED) {
      stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_STATE, context);
    } else {
      errors = errorHandlingUtil.getErrors(response);
      var isResourcesElementEmpty = this.emptyResourcesElementValidationErrorSpecification.isSatisfiedBy(errors),
          isDataSourceInvalidErrorsExist = this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(errors),
          isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExist = this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(errors),
          isDomainSchemaContainsOrphanResourcesErrorsExist = this.orphanResourcesValidationErrorSpecification.isSatisfiedBy(errors);
      context.errors = errors;

      if (isDataSourceInvalidErrorsExist) {
        stateFactory.enter(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, context);
      } else if (isSchemaNameMismatchErrorsExcludeProfileAttributesBasedSchemaExist) {
        context.availableSchemasToMap = this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter.convert(errors);
        stateFactory.enter(validationStateNameEnum.TRY_TO_MAP_SCHEMAS_AFTER_VALIDATION_ERROR_STATE, context);
      } else if (isDomainSchemaContainsOrphanResourcesErrorsExist || isResourcesElementEmpty) {
        stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, context);
      }
    }
  }
});

module.exports = DomainDesignerInitialStateValidationErrorState;

});