define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

var expressionWalker = require("../../../expressionWalker");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

function isOperandVariable(operand) {
  return Boolean(operand[operators.variable.name]);
}

function isOperandContainsVariables(operand) {
  var hasVariables = false;
  expressionWalker.walk(operand, {
    variable: function variable() {
      hasVariables = true;
      return hasVariables;
    }
  });
  return hasVariables;
}

module.exports = {
  isSatisfiedBy: function isSatisfiedBy(options) {
    var firstOperand = options.firstOperand,
        secondOperand = options.secondOperand;
    return isOperandVariable(firstOperand) && !isOperandContainsVariables(secondOperand);
  }
};

});