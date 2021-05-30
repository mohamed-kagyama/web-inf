define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = getFunctionExpression;

function getFunctionExpression(options) {
  var functionName = options.functionName,
      leftOperand = options.leftOperand,
      rightOperand = options.rightOperand;
  var functionExpression = {};
  var functionObject = {};
  functionObject[clientExpressionsEnum.functions.functionName.name] = functionName;
  var operands = [];
  operands[0] = leftOperand;
  operands[1] = rightOperand;
  functionObject[clientExpressionsEnum.operators.operands.name] = operands;
  functionExpression[clientExpressionsEnum.functions["function"].name] = functionObject;
  return functionExpression;
}

});