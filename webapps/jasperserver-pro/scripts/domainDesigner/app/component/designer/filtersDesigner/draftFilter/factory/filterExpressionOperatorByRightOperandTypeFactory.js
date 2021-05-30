define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var availableOperatorForFilterExpressionEnum = require("../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum");

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isOperatorAvailable(operator, availableOperators) {
  return _.some(availableOperators, function (currentOperator) {
    return currentOperator.operator === operator;
  });
}

module.exports = {
  create: function create(options) {
    var operator = options.operator,
        operandType = options.operandType,
        dataType = options.dataType,
        defaultOperator = clientExpressionsEnum.operators.equals.name,
        availableOperators = dataType ? availableOperatorForFilterExpressionEnum[dataType][operandType] : availableOperatorForFilterExpressionEnum.EQUALS_OPERATOR_ONLY;

    if (isOperatorAvailable(operator, availableOperators)) {
      return operator;
    }

    return defaultOperator;
  }
};

});