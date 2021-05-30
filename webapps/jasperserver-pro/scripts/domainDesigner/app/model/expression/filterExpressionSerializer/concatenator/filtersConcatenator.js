define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

function and(firstOperand, secondOperand) {
  var expressionObject = {},
      operands = [];
  expressionObject[operators.and.name] = {};
  operands.push(firstOperand);
  operands.push(secondOperand);
  expressionObject[operators.and.name][operators.operands.name] = operands;
  return expressionObject;
}

module.exports = {
  concatenateFilters: function concatenateFilters(filters) {
    if (filters.length > 1) {
      return _.reduce(filters, function (memo, filter) {
        return this._addFilterToFilterExpressionObject(memo, filter);
      }, {
        filterExpressionObject: {}
      }, this).filterExpressionObject;
    }

    return filters[0];
  },
  _addFilterToFilterExpressionObject: function _addFilterToFilterExpressionObject(memo, filter) {
    if (_.isEmpty(memo.filterExpressionObject)) {
      memo.filterExpressionObject = filter;
    } else {
      memo.filterExpressionObject = and(memo.filterExpressionObject, filter);
    }

    return memo;
  }
};

});