define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var expressionBuilderByOperator = {};

function getVariables(options) {
  var leftOperand = options.leftOperand,
      leftOperandType = options.leftOperandType;
  return [{
    name: leftOperand,
    type: leftOperandType
  }];
}

function inRangeExpressionBuilder(options) {
  var leftOperand = options.leftOperand,
      rightOperand = options.rightOperand,
      operator = operators["in"].name;
  var expressionString = rightOperand ? leftOperand + ' ' + operator + ' ' + rightOperand : '',
      variables = getVariables(options);
  return getExpressionObject(expressionString, variables);
}

function notInRangeExpressionBuilder(options) {
  var expression = inRangeExpressionBuilder(options);
  return _.extend({}, expression, {
    expression: {
      string: operators.not.name + '(' + expression.expression.string + ')'
    }
  });
}

expressionBuilderByOperator[operators["in"].name] = inRangeExpressionBuilder;
expressionBuilderByOperator[operators.notIn.name] = notInRangeExpressionBuilder;

function getExpressionObject(string, variables) {
  var expressionObject = {
    expression: {
      string: string
    }
  };

  if (variables) {
    expressionObject = _.extend({}, expressionObject, {
      variables: variables
    });
  }

  return expressionObject;
}

var ConstantJoinExpressionFactory = function ConstantJoinExpressionFactory(options) {
  this.initialize(options);
};

_.extend(ConstantJoinExpressionFactory.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  create: function create(modelDTO) {
    var field = this.clientDomainSchemaService.getFieldById(modelDTO.fieldId),
        operator = modelDTO.operator,
        fieldType = field.type,
        fieldName = field.name,
        rightOperand = modelDTO.value;
    var expressionBuilder = expressionBuilderByOperator[operator];

    if (expressionBuilder) {
      return expressionBuilder({
        leftOperand: fieldName,
        rightOperand: rightOperand,
        leftOperandType: fieldType
      });
    }

    return getExpressionObject(rightOperand);
  }
});

module.exports = ConstantJoinExpressionFactory;

});