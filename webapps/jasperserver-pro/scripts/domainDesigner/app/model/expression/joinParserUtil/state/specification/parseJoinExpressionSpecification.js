define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

function isOperandVariable(operand) {
  return Boolean(operand[operators.variable.name]);
}

function isOperatorAcceptable(operator) {
  return operator != operators["in"].name && operator != operators.notIn.name;
}

module.exports = {
  isSatisfiedBy: function isSatisfiedBy(options) {
    var operator = options.operator,
        firstOperand = options.firstOperand,
        secondOperand = options.secondOperand;
    return isOperatorAcceptable(operator) && isOperandVariable(firstOperand) && isOperandVariable(secondOperand);
  }
};

});