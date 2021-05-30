define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isVariable(type) {
  return type === filterOperandTypesEnum.VARIABLE;
}

function isLiteral(type) {
  return type === filterOperandTypesEnum.LITERAL;
}

function isRange(type) {
  return type === filterOperandTypesEnum.RANGE;
}

function isList(type) {
  return type === filterOperandTypesEnum.LIST;
}

module.exports = {
  isVariable: isVariable,
  isLiteral: isLiteral,
  isRange: isRange,
  isList: isList
};

});