define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerViewModelToStoreConverter = function JoinsDesignerViewModelToStoreConverter(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerViewModelToStoreConverter.prototype, {
  initialize: function initialize(options) {
    this.converters = options.converters || [];
  },
  convert: function convert(options) {
    return _.reduce(this.converters, function (memo, converter) {
      memo = converter.convert(memo);
      return memo;
    }, options, this);
  }
});

module.exports = JoinsDesignerViewModelToStoreConverter;

});