define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var isProfileAttributeOperandSpecification = require("./specification/isProfileAttributeOperandSpecification");

var profileAttributeOperandMixin = require("./mixin/profileAttributeOperandMixin");

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionRightOperandState = function SetFilterExpressionRightOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionRightOperandState.prototype, {
  initialize: function initialize(options) {
    this.factory = options.factory;
    this.context = options.context;
  },
  number: function number() {
    return this._changeStateToSetLiteralRightOperand();
  },
  "boolean": function boolean() {
    return this._changeStateToSetLiteralRightOperand();
  },
  'function': function _function(value) {
    if (isProfileAttributeOperandSpecification.isSatisfiedBy(value)) {
      this.context.currentFilterExpression.right = {
        type: filterOperandTypesEnum.LITERAL,
        value: ''
      };

      this._addProfileAttributeObjectToContext(value);

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE, this.context);
    }
  },
  date: function date() {
    return this._changeStateToSetLiteralRightOperand();
  },
  time: function time() {
    return this._changeStateToSetLiteralRightOperand();
  },
  timestamp: function timestamp() {
    return this._changeStateToSetLiteralRightOperand();
  },
  string: function string() {
    return this._changeStateToSetLiteralRightOperand();
  },
  NULL: function NULL() {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.LITERAL,
      value: null
    };

    this._addFilterExpression();

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  },
  variable: function variable() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_VARIABLE_RIGHT_OPERAND_STATE, this.context);
  },
  range: function range() {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.RANGE
    };
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  list: function list() {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.LIST
    };
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE, this.context);
  },
  _changeStateToSetLiteralRightOperand: function _changeStateToSetLiteralRightOperand() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_RIGHT_OPERAND_STATE, this.context);
  }
}, addFilterExpressionMixin, profileAttributeOperandMixin);

module.exports = SetFilterExpressionRightOperandState;

});