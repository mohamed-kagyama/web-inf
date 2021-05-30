define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AccessDeniedExceptionToErrorMessageConverter = function AccessDeniedExceptionToErrorMessageConverter(options) {
  this.initialize(options);
};

_.extend(AccessDeniedExceptionToErrorMessageConverter.prototype, {
  initialize: function initialize(options) {
    this.parametersFullErrorToErrorMessageConverter = options.parametersFullErrorToErrorMessageConverter;
    this.parametersLessErrorToErrorMessageConverter = options.parametersLessErrorToErrorMessageConverter;
  },
  convert: function convert(errors, options) {
    var errorsWithParameters = errors.filter(function (error) {
      return Boolean(error.parameters) && !_.isEmpty(error.parameters);
    });

    if (errorsWithParameters.length > 0) {
      return this.parametersFullErrorToErrorMessageConverter.convert(errorsWithParameters, options);
    } else {
      return this.parametersLessErrorToErrorMessageConverter.convert([errors[0]], options);
    }
  }
});

module.exports = AccessDeniedExceptionToErrorMessageConverter;

});