define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var addFilterExpressionMixin = require("./mixin/addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetFilterExpressionLiteralRightOperandState = function SetFilterExpressionLiteralRightOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionLiteralRightOperandState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  value: function value(_value) {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.LITERAL,
      value: _value
    };

    this._addFilterExpression();

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  }
}, addFilterExpressionMixin);

module.exports = SetFilterExpressionLiteralRightOperandState;

});