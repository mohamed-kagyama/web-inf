define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FilterExpressionSerializer = function FilterExpressionSerializer(options) {
  this.clientDomainSchemaFiltersService = options.clientDomainSchemaFiltersService;
  this.filterOperandConverter = options.filterOperandConverter;
  this.filterOperatorConverter = options.filterOperatorConverter;
};

_.extend(FilterExpressionSerializer.prototype, {
  serialize: function serialize(filterExpression) {
    var expression = filterExpression.expression,
        operator = expression.operator,
        dataType = this.clientDomainSchemaFiltersService.getFilterDataType(filterExpression.id);

    var fieldReferences = this._getFilterFieldReferences(filterExpression);

    var leftString = this.filterOperandConverter.convert(expression.left, {
      dataType: dataType,
      fieldReferences: fieldReferences
    }),
        rightString = this.filterOperandConverter.convert(expression.right, {
      dataType: dataType,
      fieldReferences: fieldReferences
    }),
        operatorString = this.filterOperatorConverter.convert(operator, {
      dataType: dataType,
      rightOperandType: expression.right.type
    });
    return {
      leftString: leftString,
      operatorString: operatorString,
      rightString: rightString
    };
  },
  _getFilterFieldReferences: function _getFilterFieldReferences(filter) {
    return filter.fieldReferences.map(function (fieldReference) {
      return _.extend({}, {
        id: fieldReference.id,
        sourceId: fieldReference.sourceId,
        sourceType: fieldReference.sourceType,
        fieldId: fieldReference.fieldId,
        fieldType: fieldReference.fieldType
      });
    });
  }
});

module.exports = FilterExpressionSerializer;

});