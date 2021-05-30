define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var availableOperatorsForFilterExpressionEnum = require("../enum/availableOperatorsForFilterExpressionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FilterOperatorConverter = function FilterOperatorConverter(options) {
  this.initialize(options);
};

_.extend(FilterOperatorConverter.prototype, {
  initialize: function initialize(options) {
    this.availableOperatorsEnum = options.availableOperatorsEnum || availableOperatorsForFilterExpressionEnum;
  },
  convert: function convert(operator, options) {
    var dataType = options.dataType,
        rightOperandType = options.rightOperandType;
    var availableOperators = this.availableOperatorsEnum[dataType][rightOperandType];
    var operatorEntry = _.find(availableOperators, function (availableOperator) {
      return availableOperator.operator === operator && availableOperator.rightOperand === rightOperandType;
    }) || {};
    return operatorEntry.label;
  }
});

module.exports = FilterOperatorConverter;

});