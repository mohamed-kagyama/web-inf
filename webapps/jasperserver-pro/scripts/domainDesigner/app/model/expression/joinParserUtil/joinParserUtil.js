define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ParseJoinExpressionOperatorState = require("./state/ParseJoinExpressionOperatorState");

var ParseConstantJoinExpressionState = require("./state/ParseConstantJoinExpressionState");

var CannotParseJoinExpressionError = require("./error/CannotParseJoinExpressionError");

var joinParserStateFactory = require("./factory/joinParserStateFactory");

var joinParserStateNamesEnum = require("./enum/joinParserStateNamesEnum");

var expressionWalker = require("../expressionWalker");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinParser = function JoinParser() {
  this.initialize();
};

_.extend(JoinParser.prototype, {
  initialize: function initialize() {
    _.bindAll(this, '_changeState', '_beforeChangeState');

    this.context = {
      currentJoinExpression: {},
      joinExpressions: []
    };
    this.state = joinParserStateFactory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  },
  parseJoin: function parseJoin(expression) {
    expressionWalker.walk(expression, this._getHandlers());
    return this.context.joinExpressions;
  },
  _getHandlers: function _getHandlers() {
    return {
      any: this._beforeChangeState,
      and: this._changeState,
      not: this._changeState,
      operands: this._changeState,
      equals: this._changeState,
      notEqual: this._changeState,
      greater: this._changeState,
      less: this._changeState,
      greaterOrEqual: this._changeState,
      lessOrEqual: this._changeState,
      'in': this._changeState,
      variable: this._changeState,
      name: this._changeState
    };
  },
  _beforeChangeState: function _beforeChangeState(key) {
    if (this.state instanceof ParseJoinExpressionOperatorState) {
      if (_.isString(key) && !this.state[key]) {
        throw new CannotParseJoinExpressionError();
      }
    }
  },
  _changeState: function _changeState(value, key) {
    this.state = this.state[key](value, key);

    if (this.state instanceof ParseConstantJoinExpressionState) {
      this.state = this.state.parseConstantJoinExpression(value);
      return true;
    }
  }
});

function parseJoin(expression) {
  return new JoinParser().parseJoin(expression);
}

module.exports = {
  parseJoin: parseJoin
};

});