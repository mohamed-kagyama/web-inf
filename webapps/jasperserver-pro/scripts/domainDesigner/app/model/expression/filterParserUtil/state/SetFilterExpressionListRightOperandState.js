define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionListRightOperandState = function SetFilterExpressionListRightOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionListRightOperandState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  items: function items(value) {
    this.context.listSize = value.length;
    this.context.currentFilterExpression.right.items = [];
    return this._checkIfListConstructedAndReturnNextState();
  },
  string: function string() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE, this.context);
  },
  number: function number() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE, this.context);
  },
  NULL: function NULL() {
    return this.value(null);
  },
  "boolean": function boolean() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE, this.context);
  },
  value: function value(_value) {
    this.context.currentFilterExpression.right.items.push(_value);
    return this._checkIfListConstructedAndReturnNextState();
  },
  _isListConstructed: function _isListConstructed() {
    return this.context.currentFilterExpression.right.items.length === this.context.listSize;
  },
  _checkIfListConstructedAndReturnNextState: function _checkIfListConstructedAndReturnNextState() {
    if (this._isListConstructed()) {
      this._addFilterExpression();

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
    }

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE, this.context);
  }
}, addFilterExpressionMixin);

module.exports = SetFilterExpressionListRightOperandState;

});