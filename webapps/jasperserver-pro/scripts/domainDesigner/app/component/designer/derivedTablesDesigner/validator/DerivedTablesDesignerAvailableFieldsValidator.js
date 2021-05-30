define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerAvailableFieldsValidator = function DerivedTablesDesignerAvailableFieldsValidator(options) {
  this.initialize(options);
};

_.extend(DerivedTablesDesignerAvailableFieldsValidator.prototype, {
  initialize: function initialize(options) {
    this.validator = options.validator;
  },
  validate: function validate(fields) {
    var error,
        dfd = new $.Deferred();

    _.find(fields, function (field) {
      error = this.validator.validate(field);
      return error;
    }, this);

    if (error) {
      dfd.reject(error);
    } else {
      dfd.resolve(fields);
    }

    return dfd;
  }
});

module.exports = DerivedTablesDesignerAvailableFieldsValidator;

});