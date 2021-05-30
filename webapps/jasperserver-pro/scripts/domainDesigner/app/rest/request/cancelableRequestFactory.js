define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var request = options.request,
        loaderController = options.loaderController,
        cancelFunc = options.cancelFunc;
    return function (options) {
      var actualCancelFunc = cancelFunc ? _.bind(cancelFunc, cancelFunc, options) : null;
      return loaderController.wrapWithLoader(request(options), actualCancelFunc);
    };
  }
};

});