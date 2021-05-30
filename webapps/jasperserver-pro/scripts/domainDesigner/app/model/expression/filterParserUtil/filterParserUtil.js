define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../enum/clientExpressionsEnum");

var filterParserStateNamesEnum = require("./enum/filterParserStateNamesEnum");

var filterParserStateFactory = require("./factory/filterParserStateFactory");

var expressionWalker = require("../expressionWalker");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;
var castFunctions = clientExpressionsEnum.castFunctions;

var FilterParser = function FilterParser() {
  this.initialize();
};

_.extend(FilterParser.prototype, {
  initialize: function initialize() {
    _.bindAll(this, '_changeState', '_parseUnsupportedFilterExpression');

    this.context = {
      currentFilterExpression: {},
      filterExpressions: []
    };
    this.state = filterParserStateFactory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  },
  parseFilter: function parseFilter(expression) {
    this._parseFilterExpressionIfWholeExpressionObjectIsComplex(expression);

    var isFilterExpressionObjectComplex = Boolean(this.context.filterExpressions.length);

    if (!isFilterExpressionObjectComplex) {
      expressionWalker.walk(expression.object, this._getHandlers());
    }

    return this.context.filterExpressions;
  },
  _getHandlers: function _getHandlers() {
    return {
      any: this._parseUnsupportedFilterExpression,
      and: this._changeState,
      not: this._changeState,
      // operators
      equals: this._changeState,
      notEqual: this._changeState,
      greater: this._changeState,
      less: this._changeState,
      greaterOrEqual: this._changeState,
      lessOrEqual: this._changeState,
      // function
      'function': this._changeState,
      // range
      'in': this._changeState
    };
  },
  _isFilterExpressionKeySupported: function _isFilterExpressionKeySupported(key) {
    return operators[key] || functions[key] || castFunctions[key];
  },
  _parseFilterExpressionIfWholeExpressionObjectIsComplex: function _parseFilterExpressionIfWholeExpressionObjectIsComplex(expression) {
    var self = this;
    expressionWalker.walk(expression.object, {
      any: function any(key, value) {
        self._parseUnsupportedFilterExpression(key, value, expression.string);

        return true;
      }
    });
  },
  _parseUnsupportedFilterExpression: function _parseUnsupportedFilterExpression(key, value, string) {
    if (_.isString(key) && !this._isFilterExpressionKeySupported(key)) {
      return this._parseComplexFilterExpression(value, key, string);
    }
  },
  _changeState: function _changeState(value, key) {
    try {
      this.state = this.state[key](value, key);
    } catch (e) {
      return this._parseComplexFilterExpression(value, key);
    }

    if (this.context.resetExpressionWalker) {
      this.context.resetExpressionWalker = false;
      return true;
    }
  },
  _parseComplexFilterExpression: function _parseComplexFilterExpression(value, key, string) {
    this.state = filterParserStateFactory.create(filterParserStateNamesEnum.PARSE_COMPLEX_FILTER_EXPRESSION_STATE, this.context);
    this.state = this.state.parseComplexFilter(value, key, string);
    return true;
  }
});

function parseFilter(expression) {
  return new FilterParser().parseFilter(expression);
}

module.exports = {
  parseFilter: parseFilter
};

});