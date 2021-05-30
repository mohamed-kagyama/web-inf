define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DoNotHandle400ErrorsStrategy = function DoNotHandle400ErrorsStrategy(options) {
  this.delegatingErrorHandlerStrategy = options.delegatingErrorHandlerStrategy;
};

_.extend(DoNotHandle400ErrorsStrategy.prototype, {
  handleError: function handleError(xhr) {
    var statusCode = xhr.status;

    if (statusCode < 400 || statusCode >= 500) {
      this.delegatingErrorHandlerStrategy.handleError(xhr);
    }
  }
});

module.exports = DoNotHandle400ErrorsStrategy;

});