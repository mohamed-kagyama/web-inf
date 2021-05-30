define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = getVariableOperand;

function getVariableOperand(variableName) {
  var operand = {};
  operand[clientExpressionsEnum.operators.variable.name] = {};
  operand[clientExpressionsEnum.operators.variable.name][clientExpressionsEnum.operators.name.name] = variableName;
  return operand;
}

});