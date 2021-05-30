define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;
var operatorsWhichSupportInversion = [operators.equals.name, operators["in"].name, functions["function"].name];

function getExpressionOperands(expression) {
  return _.reduce(expression.operands, function (memo, value) {
    memo = _.extend({}, memo, value);
    return memo;
  }, {});
}

module.exports = {
  isSatisfiedBy: function isSatisfiedBy(expression) {
    var expressionOperands = getExpressionOperands(expression);
    return _.some(operatorsWhichSupportInversion, function (operator) {
      return expressionOperands[operator];
    });
  }
};

});