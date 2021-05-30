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
var SetFilterExpressionVariableRightOperandState = function SetFilterExpressionVariableRightOperandState(options) {
  this.initialize(options);
};

_.extend(SetFilterExpressionVariableRightOperandState.prototype, {
  initialize: function initialize(options) {
    this.context = options.context;
    this.factory = options.factory;
  },
  name: function name(_name) {
    this.context.currentFilterExpression.right = {
      type: filterOperandTypesEnum.VARIABLE,
      name: _name
    };

    this._addFilterExpression();

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
  }
}, addFilterExpressionMixin);

module.exports = SetFilterExpressionVariableRightOperandState;

});