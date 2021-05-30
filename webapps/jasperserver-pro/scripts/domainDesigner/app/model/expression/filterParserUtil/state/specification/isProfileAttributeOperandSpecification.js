define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

var isProfileAttributeOperandCastedSpecification = require("./isProfileAttributeOperandCastedSpecification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var functions = clientExpressionsEnum.functions;
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(operand) {
    var functionName = operand.functionName,
        isAttribute = functionName === functions.attribute.name;
    return isAttribute || isProfileAttributeOperandCastedSpecification.isSatisfiedBy(operand);
  }
};

});