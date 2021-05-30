define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinVariableParser = require("../util/joinVariableParser");

var joinParserStateNamesEnum = require("../enum/joinParserStateNamesEnum");

var addJoinExpressionMixin = require("../mixin/addJoinExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParseJoinExpressionState = function ParseJoinExpressionState(options) {
  this.initialize(options);
};

_.extend(ParseJoinExpressionState.prototype, {
  initialize: function initialize(options) {
    this.factory = options.factory;
    this.context = options.context;
  },
  operands: function operands() {
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_STATE, this.context);
  },
  variable: function variable() {
    return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_STATE, this.context);
  },
  name: function name(variable) {
    var aliasAndField = joinVariableParser.parse(variable);
    var isLeftOperandSet = this.context.currentJoinExpression.leftAlias && this.context.currentJoinExpression.leftField;

    if (isLeftOperandSet) {
      this.context.currentJoinExpression.rightAlias = aliasAndField.alias;
      this.context.currentJoinExpression.rightField = aliasAndField.field;

      this._addJoinExpression();

      return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE, this.context);
    } else {
      this.context.currentJoinExpression.leftAlias = aliasAndField.alias;
      this.context.currentJoinExpression.leftField = aliasAndField.field;
      return this.factory.create(joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_STATE, this.context);
    }
  }
}, addJoinExpressionMixin);

module.exports = ParseJoinExpressionState;

});