define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationErrorMapSchemasState = function ValidationErrorMapSchemasState(options) {
  this.initialize(options);
};

_.extend(ValidationErrorMapSchemasState.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter = options.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter;
  },
  enter: function enter(context, stateFactory) {
    context.availableSchemasToMap = this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter.convert(context.errors);
    stateFactory.enter(validationStateNameEnum.TRY_TO_MAP_SCHEMAS_AFTER_VALIDATION_ERROR_STATE, context);
  }
});

module.exports = ValidationErrorMapSchemasState;

});