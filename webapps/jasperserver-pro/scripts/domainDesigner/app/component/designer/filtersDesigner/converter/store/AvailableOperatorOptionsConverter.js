define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var availableOperatorsForFilterExpressionEnum = require("../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AvailableOperatorOptionsConverter = function AvailableOperatorOptionsConverter(options) {
  this.valueConverter = options.valueConverter;
};

_.extend(AvailableOperatorOptionsConverter.prototype, {
  convert: function convert(filter) {
    var dataType = filter.dataType,
        rightOperand = filter.rightOperand;
    var operators = dataType ? availableOperatorsForFilterExpressionEnum[dataType][rightOperand.type] : availableOperatorsForFilterExpressionEnum.EQUALS_OPERATOR_ONLY;
    return this._formatValue(operators);
  },
  _formatValue: function _formatValue(availableOperators) {
    return availableOperators.map(function (availableOperator) {
      return {
        label: availableOperator.label,
        value: this.valueConverter.convert(availableOperator)
      };
    }, this);
  }
});

module.exports = AvailableOperatorOptionsConverter;

});