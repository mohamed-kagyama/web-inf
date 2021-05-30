define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = getStringValueOperand;

function getStringValueOperand(value) {
  var operand = {};
  operand[clientExpressionsEnum.operators.string.name] = {};
  operand[clientExpressionsEnum.operators.string.name][clientExpressionsEnum.operators.value.name] = value;
  return operand;
}

});