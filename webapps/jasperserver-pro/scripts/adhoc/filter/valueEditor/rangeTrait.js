define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var ValidationError = require('../validation/ValidationError');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  onChange: function onChange() {
    var inputs = this.$(this.inputSelector);
    var values = inputs.map(function () {
      return $(this).val();
    }).get();
    var convertedValues = this.convert(values);
    this.setValue(convertedValues);
  },
  convert: function convert(values) {
    var self = this;
    return _.map(values, function (v) {
      return self.valueConverter ? self.valueConverter(v) : v;
    });
  },
  getValue: function getValue(i) {
    var values = this.model.get('value');

    if (!_.isNumber(i)) {
      return values;
    }

    return values[i];
  },
  validCallback: function validCallback(view, attr, selector) {
    view.markAllFieldsAsValid(attr, selector);
  },
  invalidCallback: function invalidCallback(view, attr, error, selector) {
    view.markAllFieldsAsValid(attr, selector);

    if (!_.isArray(error)) {
      error = [error];
    }

    _.each(error, function (validationError) {
      view.markSingleFieldAsInvalid(validationError instanceof ValidationError ? validationError.getAttr() : attr, validationError, selector);
    });
  },
  markAllFieldsAsValid: function markAllFieldsAsValid(attr, selector) {
    this.$('[' + selector + ']').text('').parent().removeClass('error');
  }
};

});