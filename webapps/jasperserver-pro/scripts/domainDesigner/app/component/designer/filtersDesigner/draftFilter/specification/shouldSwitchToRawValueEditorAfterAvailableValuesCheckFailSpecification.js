define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(newFilterOptions) {
    var comparisons = [clientExpressionsEnum.operators.equals.name, clientExpressionsEnum.operators.notEqual.name];
    var isLiteral = filterOperandTypeUtil.isLiteral(newFilterOptions.rightOperandType);
    var isEqualsOrNotEqual = _.indexOf(comparisons, newFilterOptions.operator) >= 0;
    return isLiteral && isEqualsOrNotEqual;
  }
};

});