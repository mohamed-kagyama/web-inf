define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FilterOperandConverter = function FilterOperandConverter(options) {
  this.initialize(options);
};

_.extend(FilterOperandConverter.prototype, {
  initialize: function initialize(options) {
    this.oneOfConvertersConverterFactory = options.oneOfConvertersConverterFactory;
    this.filterOperandConverterConfig = options.filterOperandConverterConfig;
  },
  convert: function convert(operand, options) {
    return this._convertOperand(operand, options);
  },
  _convertOperand: function _convertOperand(operand, options) {
    var operandTypeConverters = this.filterOperandConverterConfig[operand.type] || {},
        converters = operandTypeConverters[options.dataType] || operandTypeConverters.ANY;

    if (converters) {
      return this.oneOfConvertersConverterFactory.create(converters).convert(operand, options);
    }
  }
});

module.exports = FilterOperandConverter;

});