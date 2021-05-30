define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  rightOperandType: filterOperandTypesEnum.LITERAL,
  operator: clientExpressionsEnum.operators.equals.name
};

});