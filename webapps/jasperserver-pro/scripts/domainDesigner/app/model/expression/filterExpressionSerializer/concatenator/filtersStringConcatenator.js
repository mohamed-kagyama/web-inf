define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

function and(resultFilterExpressionString, filterExpressionString) {
  return [resultFilterExpressionString, operators.and.name, filterExpressionString].join(' ');
}

module.exports = {
  concatenateFilters: function concatenateFilters(filters) {
    if (filters.length > 1) {
      return _.reduce(filters, function (memo, filter) {
        return this._addFilterToFilterExpressionString(memo, filter);
      }, {
        filterExpressionString: ''
      }, this).filterExpressionString;
    }

    return filters[0];
  },
  _addFilterToFilterExpressionString: function _addFilterToFilterExpressionString(memo, filter) {
    if (_.isEmpty(memo.filterExpressionString)) {
      memo.filterExpressionString = filter;
    } else {
      memo.filterExpressionString = and(memo.filterExpressionString, filter);
    }

    return memo;
  }
};

});