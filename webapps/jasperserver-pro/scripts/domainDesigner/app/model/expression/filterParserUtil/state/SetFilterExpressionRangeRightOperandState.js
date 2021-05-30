define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeOperandMixin = require("./mixin/profileAttributeOperandMixin");

var addRangeFilterExpressionMixin = require("./mixin/addRangeFilterExpressionMixin");

var isProfileAttributeOperandSpecification = require("./specification/isProfileAttributeOperandSpecification");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionRangeRightOperand = function SetFilterExpressionRangeRightOperand(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionRangeRightOperand.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  start: function start() {
    this.context.currentFilterExpression.right.start = {};
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  end: function end() {
    this.context.currentFilterExpression.right.end = {};
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  number: function number() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  date: function date() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  time: function time() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  timestamp: function timestamp() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  'function': function _function(value) {
    if (isProfileAttributeOperandSpecification.isSatisfiedBy(value)) {
      this._addProfileAttributeObjectToContext(value);

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE, this.context);
    }
  },
  value: function value(_value) {
    return this._addRangeFilterExpression(_value);
  }
}, addRangeFilterExpressionMixin, profileAttributeOperandMixin);

module.exports = SetFilterExpressionRangeRightOperand;

});