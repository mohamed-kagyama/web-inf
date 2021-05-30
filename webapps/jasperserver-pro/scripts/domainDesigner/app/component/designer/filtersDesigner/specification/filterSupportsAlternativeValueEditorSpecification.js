define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../model/enum/clientExpressionsEnum");

var genericTypesEnum = require("../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(filter) {
    var isOperatorAllowed = filter.operator === operators.equals.name || filter.operator === operators.notEqual.name;
    var isTypeAllowed = filter.dataType === genericTypesEnum.BOOLEAN || filter.dataType === genericTypesEnum.STRING;
    return isOperatorAllowed && isTypeAllowed;
  }
};

});