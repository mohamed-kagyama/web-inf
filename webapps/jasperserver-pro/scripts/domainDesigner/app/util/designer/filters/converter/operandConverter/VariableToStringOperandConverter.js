define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var VariableToStringOperandConverter = function VariableToStringOperandConverter(options) {
  this.initialize(options);
};

_.extend(VariableToStringOperandConverter.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  convert: function convert(operand, options) {
    var fieldReferences = options.fieldReferences,
        fieldReferenceId = operand.fieldReferenceId;

    var fieldReference = _.find(fieldReferences, function (fieldReference) {
      return fieldReference.id === fieldReferenceId;
    });

    var fieldId = fieldReference.fieldId,
        field = this.clientDomainSchemaService.getFieldById(fieldId);
    return field.name;
  }
});

module.exports = VariableToStringOperandConverter;

});