define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var constantVariableEnum = require("../enum/constantVariableEnum");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var EXTRACT_RANGE_RIGHT_OPERAND_REGEXP = new RegExp(constantVariableEnum.CONSTANT + ' ' + operators["in"].name + ' (\\(.+?\\))');
var expressionStringBuilderByOperatorMap = {};

function getRangeRightOperandByExpressionString(expressionString) {
  var match = expressionString.match(EXTRACT_RANGE_RIGHT_OPERAND_REGEXP);

  if (match) {
    return match[1];
  }
}

expressionStringBuilderByOperatorMap[operators["in"].name] = getRangeRightOperandByExpressionString;
expressionStringBuilderByOperatorMap[operators.notIn.name] = getRangeRightOperandByExpressionString;
module.exports = {
  create: function create(operator, expressionObject) {
    var expressionBuilder = expressionStringBuilderByOperatorMap[operator];

    if (expressionBuilder) {
      return expressionBuilder(expressionObject.string);
    }

    return expressionObject.string;
  }
};

});