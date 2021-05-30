define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var constantVariableEnum = require("../enum/constantVariableEnum");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var expressionObjectBuilderByOperatorMap = {};

function getExpressionObject(expression, variables) {
  return {
    expression: {
      object: expression
    },
    variables: variables
  };
}

function getVariables(field) {
  return [{
    name: constantVariableEnum.CONSTANT,
    type: field.type
  }];
}

function _inExpressionObjectBuilder(constantJoin) {
  var expression = {},
      leftOperand = {};
  leftOperand[operators.variable.name] = {};
  leftOperand[operators.variable.name][operators.name.name] = constantVariableEnum.CONSTANT;
  expression[operators["in"].name] = {};
  expression[operators["in"].name][operators.operands.name] = [leftOperand, constantJoin.value];
  return expression;
}

function inExpressionObjectBuilder(constantJoin, field) {
  var expression = _inExpressionObjectBuilder(constantJoin),
      variables = getVariables(field);

  return getExpressionObject(expression, variables);
}

function notInExpressionObjectBuilder(constantJoin, field) {
  var inExpression = _inExpressionObjectBuilder(constantJoin),
      variables = getVariables(field);

  var expression = {};
  expression[operators.not.name] = {};
  expression[operators.not.name][operators.operands.name] = [inExpression];
  return getExpressionObject(expression, variables);
}

expressionObjectBuilderByOperatorMap[operators["in"].name] = inExpressionObjectBuilder;
expressionObjectBuilderByOperatorMap[operators.notIn.name] = notInExpressionObjectBuilder;
module.exports = {
  create: function create(constantJoin, field) {
    var operator = constantJoin.operator,
        value = constantJoin.value,
        expressionObject = {
      expression: {
        object: value
      }
    };
    var expressionObjectBuilder = expressionObjectBuilderByOperatorMap[operator];

    if (expressionObjectBuilder) {
      expressionObject = expressionObjectBuilder(constantJoin, field);
    }

    return expressionObject;
  }
};

});