define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var request = options.request,
        errorHandlerStrategy = options.errorHandlerStrategy;
    return function () {
      return request.apply(null, arguments).then(null, function (xhr) {
        var result = errorHandlerStrategy.handleError(xhr);
        return result || xhr;
      });
    };
  }
};

});