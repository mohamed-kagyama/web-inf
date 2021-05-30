define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../../../../model/util/profileAttributeUtil");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var genericTypeToExpressionLiteralTypeEnum = require("../../../enum/genericTypeToExpressionLiteralTypeEnum");

var genericTypeToCastFunctionEnum = require("../../../enum/genericTypeToCastFunctionEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;

function getProfileAttributeObject(value, fieldType) {
  var profileAttribute = {},
      castFunctionWrapper = {},
      castFunction = getCastFunction(fieldType);
  profileAttribute[functions["function"].name] = {};
  profileAttribute[functions["function"].name][functions.functionName.name] = functions.attribute.name;
  var operands = profileAttributeUtil.extractProfileAttributeArgs(value);
  profileAttribute[functions["function"].name][operators.operands.name] = _.map(operands, function (operand) {
    var operandObj = {};
    operandObj[operators.string.name] = {};
    operandObj[operators.string.name][operators.value.name] = operand;
    return operandObj;
  });

  if (castFunction) {
    castFunctionWrapper[functions["function"].name] = {};
    castFunctionWrapper[functions["function"].name][functions.functionName.name] = castFunction;
    castFunctionWrapper[functions["function"].name][operators.operands.name] = [profileAttribute];
    return castFunctionWrapper;
  } else {
    return profileAttribute;
  }
}

function getFieldType(fieldType) {
  var genericType = fieldTypesToGenericTypesEnum[fieldType];
  return genericTypeToExpressionLiteralTypeEnum[genericType];
}

function getCastFunction(fieldType) {
  var genericType = fieldTypesToGenericTypesEnum[fieldType];
  return genericTypeToCastFunctionEnum[genericType];
}

function variableOperandBuilder(operand) {
  var variableOperand = {};
  variableOperand[operators.variable.name] = {};
  variableOperand[operators.variable.name][operators.name.name] = operand.name;
  return variableOperand;
}

function literalOperandBuilder(operand) {
  var literalOperand = {},
      literalType = getFieldType(operand.fieldType);

  if (_.isString(operand.value) && profileAttributeUtil.containsProfileAttribute(operand.value)) {
    literalOperand = getProfileAttributeObject(operand.value, operand.fieldType);
  } else if (_.isNull(operand.value)) {
    literalOperand[operators.NULL.name] = {};
  } else {
    literalOperand[literalType] = {};
    literalOperand[literalType][operators.value.name] = operand.value;
  }

  return literalOperand;
}

function listOperandBuilder(operand) {
  if (operand.isAll) {
    return;
  }

  var fieldType = getFieldType(operand.fieldType),
      listOperand = {};
  listOperand[operators.list.name] = {};
  listOperand[operators.list.name][operators.items.name] = _.map(operand.items, function (value) {
    var itemObj = {};

    if (_.isNull(value)) {
      itemObj[operators.NULL.name] = {};
    } else {
      itemObj[fieldType] = {};
      itemObj[fieldType][operators.value.name] = value;
    }

    return itemObj;
  });
  return listOperand;
}

function rangeOperandBuilder(operand) {
  var fieldType = getFieldType(operand.fieldType),
      rangeOperand = {},
      startValue = operand.start.value,
      endValue = operand.end.value;
  var rangeKey = operators.range.name,
      boundaryKey = operators.boundary.name,
      startKey = operators.start.name,
      endKey = operators.end.name,
      valueKey = operators.value.name;
  rangeOperand[rangeKey] = {};
  rangeOperand[rangeKey][startKey] = {};
  rangeOperand[rangeKey][endKey] = {};
  rangeOperand[rangeKey][startKey][boundaryKey] = {};
  rangeOperand[rangeKey][endKey][boundaryKey] = {};

  if (_.isString(startValue) && profileAttributeUtil.containsProfileAttribute(startValue)) {
    rangeOperand[rangeKey][startKey][boundaryKey] = getProfileAttributeObject(startValue, operand.fieldType);
  } else {
    rangeOperand[rangeKey][startKey][boundaryKey][fieldType] = {};
    rangeOperand[rangeKey][startKey][boundaryKey][fieldType][valueKey] = startValue;
  }

  if (_.isString(endValue) && profileAttributeUtil.containsProfileAttribute(endValue)) {
    rangeOperand[rangeKey][endKey][boundaryKey] = getProfileAttributeObject(endValue, operand.fieldType);
  } else {
    rangeOperand[rangeKey][endKey][boundaryKey][fieldType] = {};
    rangeOperand[rangeKey][endKey][boundaryKey][fieldType][valueKey] = endValue;
  }

  return rangeOperand;
}

var filterOperandBuilderByOperandTypeMap = {};
filterOperandBuilderByOperandTypeMap[filterOperandTypesEnum.LITERAL] = literalOperandBuilder;
filterOperandBuilderByOperandTypeMap[filterOperandTypesEnum.VARIABLE] = variableOperandBuilder;
filterOperandBuilderByOperandTypeMap[filterOperandTypesEnum.LIST] = listOperandBuilder;
filterOperandBuilderByOperandTypeMap[filterOperandTypesEnum.RANGE] = rangeOperandBuilder;
module.exports = {
  create: function create(operand) {
    var filterOperandBuilder = filterOperandBuilderByOperandTypeMap[operand.type];

    if (filterOperandBuilder) {
      return filterOperandBuilder(operand);
    }
  }
};

});