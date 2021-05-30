define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionLeftOperandState = function SetFilterExpressionLeftOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionLeftOperandState.prototype, {
  initialize: function initialize(options) {
    this.factory = options.factory;
    this.context = options.context;
  },
  variable: function variable() {
    this.context.currentFilterExpression.left = {
      type: filterOperandTypesEnum.VARIABLE
    };
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LEFT_OPERAND_STATE, this.context);
  },
  name: function name(_name) {
    this.context.currentFilterExpression.left.name = _name;

    if (this.context.isAnyValue) {
      this._addIsAnyValueFilterExpression();

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
    }

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RIGHT_OPERAND_STATE, this.context);
  },
  _addIsAnyValueFilterExpression: function _addIsAnyValueFilterExpression() {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.LIST,
      items: [],
      isAll: true
    };

    this._addFilterExpression();
  }
}, addFilterExpressionMixin);

module.exports = SetFilterExpressionLeftOperandState;

});