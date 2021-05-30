define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var LoaderForMultipleRequestsControllerFactory = function LoaderForMultipleRequestsControllerFactory(options) {
  this.LoaderForMultipleRequestsController = options.LoaderForMultipleRequestsController;
  this.loadingDelay = options.loadingDelay;
  this.loadingMinDuration = options.loadingMinDuration;
};

_.extend(LoaderForMultipleRequestsControllerFactory.prototype, {
  create: function create(options) {
    var loaderEventBus = options.loaderEventBus;
    return new this.LoaderForMultipleRequestsController({
      loadingDelay: this.loadingDelay,
      loadingMinDuration: this.loadingMinDuration,
      loaderEventBus: loaderEventBus
    });
  }
});

module.exports = LoaderForMultipleRequestsControllerFactory;

});