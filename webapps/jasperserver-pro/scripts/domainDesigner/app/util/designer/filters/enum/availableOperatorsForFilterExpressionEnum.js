define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var clientExpressionsEnum = require("../../../../model/enum/clientExpressionsEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var availableOperatorsForFilterExpressionEnum = {};
var stringFieldToValue = [{
  label: i18nMessage('domain.designer.filters.expression.operator.isOneOf'),
  operator: clientExpressionsEnum.operators["in"].name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.isNotOneOf'),
  operator: clientExpressionsEnum.operators.notIn.name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.contains'),
  operator: clientExpressionsEnum.functions.contains.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notContain'),
  operator: clientExpressionsEnum.functions.notContains.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.startsWith'),
  operator: clientExpressionsEnum.functions.startsWith.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notStartWith'),
  operator: clientExpressionsEnum.functions.notStartsWith.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.endsWith'),
  operator: clientExpressionsEnum.functions.endsWith.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEndWith'),
  operator: clientExpressionsEnum.functions.notEndsWith.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}];
var stringFieldToField = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.contains'),
  operator: clientExpressionsEnum.functions.contains.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notContain'),
  operator: clientExpressionsEnum.functions.notContains.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.startsWith'),
  operator: clientExpressionsEnum.functions.startsWith.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notStartWith'),
  operator: clientExpressionsEnum.functions.notStartsWith.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.endsWith'),
  operator: clientExpressionsEnum.functions.endsWith.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEndWith'),
  operator: clientExpressionsEnum.functions.notEndsWith.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}];
availableOperatorsForFilterExpressionEnum[genericTypesEnum.STRING] = {};
availableOperatorsForFilterExpressionEnum[genericTypesEnum.STRING][filterOperandTypesEnum.LIST] = stringFieldToValue;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.STRING][filterOperandTypesEnum.RANGE] = stringFieldToValue;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.STRING][filterOperandTypesEnum.LITERAL] = stringFieldToValue;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.STRING][filterOperandTypesEnum.VARIABLE] = stringFieldToField; // NUMBER

var numberFieldToValue = [{
  label: i18nMessage('domain.designer.filters.expression.operator.isOneOf'),
  operator: clientExpressionsEnum.operators["in"].name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.isNotOneOf'),
  operator: clientExpressionsEnum.operators.notIn.name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.greater'),
  operator: clientExpressionsEnum.operators.greater.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.less'),
  operator: clientExpressionsEnum.operators.less.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.greaterOrEqual'),
  operator: clientExpressionsEnum.operators.greaterOrEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.lessOrEqual'),
  operator: clientExpressionsEnum.operators.lessOrEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.between'),
  operator: clientExpressionsEnum.operators["in"].name,
  rightOperand: filterOperandTypesEnum.RANGE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notBetween'),
  operator: clientExpressionsEnum.operators.notIn.name,
  rightOperand: filterOperandTypesEnum.RANGE
}];
var numberFieldToField = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.greater'),
  operator: clientExpressionsEnum.operators.greater.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.less'),
  operator: clientExpressionsEnum.operators.less.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.greaterOrEqual'),
  operator: clientExpressionsEnum.operators.greaterOrEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.lessOrEqual'),
  operator: clientExpressionsEnum.operators.lessOrEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}];
var number = {};
number[filterOperandTypesEnum.LIST] = numberFieldToValue;
number[filterOperandTypesEnum.RANGE] = numberFieldToValue;
number[filterOperandTypesEnum.LITERAL] = numberFieldToValue;
number[filterOperandTypesEnum.VARIABLE] = numberFieldToField;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.INTEGER] = number;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.DECIMAL] = number; // DATE

var dataFieldToValue = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.between'),
  operator: clientExpressionsEnum.operators["in"].name,
  rightOperand: filterOperandTypesEnum.RANGE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notBetween'),
  operator: clientExpressionsEnum.operators.notIn.name,
  rightOperand: filterOperandTypesEnum.RANGE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.after'),
  operator: clientExpressionsEnum.operators.greater.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.before'),
  operator: clientExpressionsEnum.operators.less.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.onOrAfter'),
  operator: clientExpressionsEnum.operators.greaterOrEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.onOrBefore'),
  operator: clientExpressionsEnum.operators.lessOrEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}];
var dateFieldToField = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.after'),
  operator: clientExpressionsEnum.operators.greater.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.before'),
  operator: clientExpressionsEnum.operators.less.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.onOrAfter'),
  operator: clientExpressionsEnum.operators.greaterOrEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.onOrBefore'),
  operator: clientExpressionsEnum.operators.lessOrEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}];
var date = {};
date[filterOperandTypesEnum.LIST] = dataFieldToValue;
date[filterOperandTypesEnum.RANGE] = dataFieldToValue;
date[filterOperandTypesEnum.LITERAL] = dataFieldToValue;
date[filterOperandTypesEnum.VARIABLE] = dateFieldToField;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.DATE] = date;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.TIMESTAMP] = date;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.TIME] = date; //BOOLEAN

var booleanFieldToValue = [{
  label: i18nMessage('domain.designer.filters.expression.operator.isOneOf'),
  operator: clientExpressionsEnum.operators["in"].name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.isNotOneOf'),
  operator: clientExpressionsEnum.operators.notIn.name,
  rightOperand: filterOperandTypesEnum.LIST
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}];
var booleanFieldToField = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}, {
  label: i18nMessage('domain.designer.filters.expression.operator.notEqual'),
  operator: clientExpressionsEnum.operators.notEqual.name,
  rightOperand: filterOperandTypesEnum.VARIABLE
}];
var _boolean = {};
_boolean[filterOperandTypesEnum.LIST] = booleanFieldToValue;
_boolean[filterOperandTypesEnum.RANGE] = booleanFieldToValue;
_boolean[filterOperandTypesEnum.LITERAL] = booleanFieldToValue;
_boolean[filterOperandTypesEnum.VARIABLE] = booleanFieldToField;
availableOperatorsForFilterExpressionEnum[genericTypesEnum.BOOLEAN] = _boolean;
availableOperatorsForFilterExpressionEnum.EQUALS_OPERATOR_ONLY = [{
  label: i18nMessage('domain.designer.filters.expression.operator.equals'),
  operator: clientExpressionsEnum.operators.equals.name,
  rightOperand: filterOperandTypesEnum.LITERAL
}];
module.exports = availableOperatorsForFilterExpressionEnum;

});