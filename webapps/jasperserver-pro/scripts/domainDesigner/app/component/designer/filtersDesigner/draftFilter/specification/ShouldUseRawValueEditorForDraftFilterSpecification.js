define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

var dataSourceMetadataTypesEnum = require("../../../../../../model/schema/enum/dataSourceMetadataTypesEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

var ShouldUseRawValueEditorForDraftFilterSpecification = function ShouldUseRawValueEditorForDraftFilterSpecification(options) {
  this.clientDomainSchemaService = options.clientDomainSchemaService;
};

_.extend(ShouldUseRawValueEditorForDraftFilterSpecification.prototype, {
  isSatisfiedBy: function isSatisfiedBy(currentFilter, newFilterOptions) {
    if (!_.isUndefined(newFilterOptions.isRawValueEditor)) {
      return newFilterOptions.isRawValueEditor;
    }

    var left = currentFilter.expression.left,
        fieldType = left.fieldId && this.clientDomainSchemaService.getFieldById(left.fieldId).type,
        operator = newFilterOptions.operator,
        isRightOperandTypeVariable = filterOperandTypeUtil.isVariable(newFilterOptions.rightOperandType),
        isFieldTypeForbidden = fieldType === dataSourceMetadataTypesEnum.String || fieldType === dataSourceMetadataTypesEnum.Boolean,
        isOperatorForbidden = operator === operators.equals.name || operator === operators.notEqual.name;
    return !isRightOperandTypeVariable && !(isFieldTypeForbidden && isOperatorForbidden);
  }
});

module.exports = ShouldUseRawValueEditorForDraftFilterSpecification;

});