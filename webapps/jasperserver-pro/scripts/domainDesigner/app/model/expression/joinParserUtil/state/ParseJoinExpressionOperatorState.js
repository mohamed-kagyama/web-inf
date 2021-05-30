define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var CannotParseJoinExpressionError = require("../error/CannotParseJoinExpressionError");

var parseJoinExpressionSpecification = require("./specification/parseJoinExpressionSpecification");

var parseConstantJoinExpressionSpecification = require("./specification/parseConstantJoinExpressionSpecification");

var expressionWalker = require("../../expressionWalker");

var joinParserStateNamesEnum = require("../enum/joinParserStateNamesEnum");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

var ParseJoinExpressionOperatorState = function ParseJoinExpressionOperatorState(options) {
  this.initialize(options);
};

_.extend(ParseJoinExpressionOperatorState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  and: function and() {
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  },
  not: function not() {
    this.context.isNot = true;
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  },
  operands: function operands() {
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  },
  paren: function paren() {
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  },
  equals: function equals(value) {
    var operator = this.context.isNot ? operators.notEqual.name : operators.equals.name;
    return this._setOperator(operator, value);
  },
  notEqual: function notEqual(value) {
    return this._setOperator(operators.notEqual.name, value);
  },
  greater: function greater(value) {
    return this._setOperator(operators.greater.name, value);
  },
  less: function less(value) {
    return this._setOperator(operators.less.name, value);
  },
  greaterOrEqual: function greaterOrEqual(value) {
    return this._setOperator(operators.greaterOrEqual.name, value);
  },
  lessOrEqual: function lessOrEqual(value) {
    return this._setOperator(operators.lessOrEqual.name, value);
  },
  'in': function _in(value) {
    var operator = this.context.isNot ? operators.notIn.name : operators["in"].name;
    return this._setOperator(operator, value);
  },
  _setOperator: function _setOperator(operator, value) {
    var operands = value.operands,
        firstOperand = _.first(operands),
        secondOperand = _.last(operands);

    var options = {
      operator: operator,
      firstOperand: firstOperand,
      secondOperand: secondOperand
    };
    this.context.currentJoinExpression.operator = operator;

    if (parseJoinExpressionSpecification.isSatisfiedBy(options)) {
      return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_STATE, this.context);
    } else if (parseConstantJoinExpressionSpecification.isSatisfiedBy(options)) {
      return this.factory.create(joinParserStateNamesEnum.PARSE_CONSTANT_JOIN_EXPRESSION_STATE, this.context);
    } else {
      throw new CannotParseJoinExpressionError();
    }
  }
});

module.exports = ParseJoinExpressionOperatorState;

});