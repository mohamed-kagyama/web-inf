define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandTypeUtil = require('./filterOperandTypeUtil');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var isVariable = filterOperandTypeUtil.isVariable;

function isFieldToFieldFilter(leftType, rightType) {
  return isVariable(leftType) && isVariable(rightType);
}

module.exports = {
  isFieldToFieldFilter: isFieldToFieldFilter
};

});