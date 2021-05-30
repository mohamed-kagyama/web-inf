define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ErrorToCategoryAndDetailsConverter = function ErrorToCategoryAndDetailsConverter(options) {
  this.initialize(options);
};

_.extend(ErrorToCategoryAndDetailsConverter.prototype, {
  initialize: function initialize(options) {
    this.errors = options.errors;
    this.category = options.category;
    this.errorsConverter = options.errorsConverter;
    this.categoryConverter = options.categoryConverter;
  },
  convert: function convert(errors, options) {
    return {
      category: this._getCategory(errors, options),
      errorParameters: this._getErrors(errors, options)
    };
  },
  _getCategory: function _getCategory(errors, options) {
    if (this.category) {
      return this.category;
    } else if (this.categoryConverter) {
      return this.categoryConverter.convert(errors, options) || null;
    } else {
      return null;
    }
  },
  _getErrors: function _getErrors(errors, options) {
    if (this.errors) {
      return this.errors;
    } else if (this.errorsConverter) {
      errors = this.errorsConverter.convert(errors, options);
      return errors ? [].concat(errors) : [];
    } else {
      return [];
    }
  }
});

module.exports = ErrorToCategoryAndDetailsConverter;

});