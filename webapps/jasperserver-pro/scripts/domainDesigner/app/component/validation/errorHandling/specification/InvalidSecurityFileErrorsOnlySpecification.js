define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var invalidSecurityFileErrorsEnum = require("../enum/invalidSecurityFileErrorsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InvalidSecurityFileErrorsOnlySpecification = function InvalidSecurityFileErrorsOnlySpecification(options) {
  this.initialize(options);
};

_.extend(InvalidSecurityFileErrorsOnlySpecification.prototype, {
  initialize: function initialize(options) {},
  isSatisfiedBy: function isSatisfiedBy(errors) {
    errors = _.isArray(errors) ? errors : [errors];
    return !_.some(errors, function (error) {
      return !invalidSecurityFileErrorsEnum[error.errorCode];
    });
  }
});

module.exports = InvalidSecurityFileErrorsOnlySpecification;

});