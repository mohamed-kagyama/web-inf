define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var functions = clientExpressionsEnum.functions;
var castFunctions = clientExpressionsEnum.castFunctions;
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(operand) {
    var isCastFunction = castFunctions[operand.functionName],
        isOneOperand = operand.operands.length === 1,
        firstOperand = operand.operands[0];

    if (isCastFunction && isOneOperand) {
      return firstOperand["function"] && firstOperand["function"].functionName === functions.attribute.name;
    }
  }
};

});