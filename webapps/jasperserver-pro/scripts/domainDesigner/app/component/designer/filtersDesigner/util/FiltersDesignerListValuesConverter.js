define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerListValuesConverter = function FiltersDesignerListValuesConverter(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerListValuesConverter.prototype, {
  initialize: function initialize(options) {
    this.oneOfConvertersConverterFactory = options.oneOfConvertersConverterFactory;
    this.filterListValuesConverterConfig = options.filterListValuesConverterConfig;
  },
  convert: function convert(value, dataType) {
    return this._convertValue(value, dataType);
  },
  _convertValue: function _convertValue(value, dataType) {
    var converters = this.filterListValuesConverterConfig[dataType];

    if (converters) {
      return this.oneOfConvertersConverterFactory.create(converters).convert(value, dataType);
    }
  }
});

module.exports = FiltersDesignerListValuesConverter;

});