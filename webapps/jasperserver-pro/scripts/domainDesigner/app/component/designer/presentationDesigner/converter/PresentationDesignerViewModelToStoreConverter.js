define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerViewModelToStoreConverter = function PresentationDesignerViewModelToStoreConverter(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerViewModelToStoreConverter.prototype, {
  initialize: function initialize(options) {
    this.converters = options.converters;
  },
  convert: function convert(options) {
    var dataStore = options.dataStore;
    return _.reduce(this.converters, function (memo, converter) {
      memo = converter.convert(memo, dataStore);
      return memo;
    }, options);
  }
});

module.exports = PresentationDesignerViewModelToStoreConverter;

});