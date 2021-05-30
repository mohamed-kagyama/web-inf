define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeOperandMixin = require("./mixin/profileAttributeOperandMixin");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var profileAttributeStateMixin = require("./mixin/profileAttributeStateMixin");

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionProfileAttributeRightOperandState = function SetFilterExpressionProfileAttributeRightOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionProfileAttributeRightOperandState.prototype, {
  initialize: function initialize(options) {
    this.factory = options.factory;
    this.context = options.context;
  },
  value: function value(_value) {
    this._addProfileAttributeFnOperand(_value);

    var profileAttributeString = this._getProfileAttributeString();

    if (profileAttributeString) {
      this.context.currentFilterExpression.right.value = profileAttributeString;

      this._addFilterExpression();

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
    }

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE, this.context);
  },
  _parseProfileAttribute: function _parseProfileAttribute() {
    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE, this.context);
  }
}, addFilterExpressionMixin, profileAttributeOperandMixin, profileAttributeStateMixin);

module.exports = SetFilterExpressionProfileAttributeRightOperandState;

});