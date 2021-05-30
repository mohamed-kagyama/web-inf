define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinVariableParser = require("../util/joinVariableParser");

var joinParserStateNamesEnum = require("../enum/joinParserStateNamesEnum");

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

var addJoinExpressionMixin = require("../mixin/addJoinExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;

var ParseConstantJoinExpressionState = function ParseConstantJoinExpressionState(options) {
  this.initialize(options);
};

_.extend(ParseConstantJoinExpressionState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  parseConstantJoinExpression: function parseConstantJoinExpression(value) {
    var operands = value.operands;

    var firstOperand = _.first(operands),
        secondOperand = _.last(operands);

    var variableName = firstOperand[operators.variable.name][operators.name.name],
        aliasAndField = joinVariableParser.parse(variableName);
    this.context.currentJoinExpression.leftAlias = aliasAndField.alias;
    this.context.currentJoinExpression.leftField = aliasAndField.field;
    this.context.currentJoinExpression.rightValue = secondOperand;

    this._addJoinExpression();

    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
  }
}, addJoinExpressionMixin);

module.exports = ParseConstantJoinExpressionState;

});