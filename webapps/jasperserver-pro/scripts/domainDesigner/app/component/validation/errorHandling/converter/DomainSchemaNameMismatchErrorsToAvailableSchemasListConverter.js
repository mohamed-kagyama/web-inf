define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var errorParametersKeysEnum = require("../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../util/extractPropertyByKeyUtil");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter = function DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter(options) {
  this.initialize(options);
};

_.extend(DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter.prototype, {
  initialize: function initialize(options) {
    this.dataSourceSchemaNameMismatchValidationErrorSpecification = options.dataSourceSchemaNameMismatchValidationErrorSpecification;
  },
  convert: function convert(errors) {
    var extractedProps = [],
        schemaError = _.find(errors, function (error) {
      return this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(error);
    }, this);

    if (schemaError) {
      extractedProps = extractPropertyByKeyUtil.extract(schemaError.parameters, errorParametersKeysEnum.AVAILABLE_SCHEMA);
    }

    return _.pluck(extractedProps, 'value');
  }
});

module.exports = DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter;

});