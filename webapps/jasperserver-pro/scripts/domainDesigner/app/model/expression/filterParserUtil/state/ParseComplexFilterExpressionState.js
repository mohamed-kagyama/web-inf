define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

var ParserComplexFilterExpressionState = function ParserComplexFilterExpressionState(options) {
  this.initialize(options);
};

_.extend(ParserComplexFilterExpressionState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  parseComplexFilter: function parseComplexFilter(value, key, string) {
    var filterExpression = {},
        filterExpressionObject = {};
    filterExpression[key] = value;

    if (this.context.isNot) {
      filterExpressionObject[operators.not.name] = {};
      filterExpressionObject[operators.not.name][operators.operands.name] = [filterExpression];
    } else {
      filterExpressionObject = filterExpression;
    }

    this.context.currentFilterExpression = {
      type: schemaEntitiesEnum.COMPLEX_FILTER,
      expression: {
        object: filterExpressionObject,
        string: string || ''
      }
    };

    this._addFilterExpression();

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  }
}, addFilterExpressionMixin);

module.exports = ParserComplexFilterExpressionState;

});