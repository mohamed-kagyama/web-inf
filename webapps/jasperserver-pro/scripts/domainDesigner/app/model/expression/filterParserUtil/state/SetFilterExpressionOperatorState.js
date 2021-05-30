define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ParseFilterExpressionError = require("./error/ParseFilterExpressionError");

var operatorByFunctionNameFactory = require("./factory/operatorByFunctionNameFactory");

var expressionWalker = require("../../expressionWalker");

var isNotOperatorCanInvertExpressionSpecification = require("./specification/isNotOperatorCanInvertExpressionSpecification");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;

var SetFilterExpressionOperatorState = function SetFilterExpressionOperatorState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionOperatorState.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_changeState');

    this.factory = options.factory;
    this.context = options.context;
  },
  not: function not(value) {
    if (isNotOperatorCanInvertExpressionSpecification.isSatisfiedBy(value)) {
      this.context.isNot = true;
      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
    } else {
      throw new ParseFilterExpressionError();
    }
  },
  and: function and() {
    this.context.currentFilterExpression = {};
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  },
  equals: function equals(value) {
    var operator = this.context.isNot ? operators.notEqual.name : operators.equals.name;
    return this._setSimpleOperator(operator, value);
  },
  notEqual: function notEqual(value) {
    return this._setSimpleOperator(operators.notEqual.name, value);
  },
  greater: function greater(value) {
    return this._setSimpleOperator(operators.greater.name, value);
  },
  less: function less(value) {
    return this._setSimpleOperator(operators.less.name, value);
  },
  greaterOrEqual: function greaterOrEqual(value) {
    return this._setSimpleOperator(operators.greaterOrEqual.name, value);
  },
  lessOrEqual: function lessOrEqual(value) {
    return this._setSimpleOperator(operators.lessOrEqual.name, value);
  },
  'in': function _in(value) {
    var operator = this.context.isNot ? operators.notIn.name : operators["in"].name;
    return this._setSimpleOperator(operator, value);
  },
  'function': function _function(value) {
    var functionName = value.functionName;
    var operator = operatorByFunctionNameFactory.create(functionName, {
      isNot: this.context.isNot
    });

    if (functionName === functions.isAnyValue.name) {
      this.context.isAnyValue = true;
    }

    if (operator) {
      return this._setSimpleOperator(operator, value);
    } else {
      throw new ParseFilterExpressionError();
    }
  },
  _setSimpleOperator: function _setSimpleOperator(operator, value) {
    this.context.currentFilterExpression = {
      left: {},
      operator: operator,
      right: {}
    };
    this.state = this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LEFT_OPERAND_STATE, this.context);

    try {
      expressionWalker.walk(value[operators.operands.name], this._getHandlers());
    } catch (e) {
      throw new ParseFilterExpressionError();
    }

    this.context.resetExpressionWalker = true;
    return this.state;
  },
  _getHandlers: function _getHandlers() {
    return {
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
      'in': this._changeState,
      range: this._changeState,
      list: this._changeState,
      items: this._changeState,
      start: this._changeState,
      end: this._changeState,
      // value
      value: this._changeState,
      // variable
      variable: this._changeState,
      name: this._changeState,
      // value data types
      string: this._changeState,
      number: this._changeState,
      "boolean": this._changeState,
      date: this._changeState,
      time: this._changeState,
      timestamp: this._changeState,
      NULL: this._changeState
    };
  },
  _changeState: function _changeState(value, key) {
    this.state = this.state[key](value, key);
  }
});

module.exports = SetFilterExpressionOperatorState;

});