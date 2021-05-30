define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainValidationCacheRefresher = function DomainValidationCacheRefresher(options) {
  this.initialize(options);
};

_.extend(DomainValidationCacheRefresher.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.restServicesCompositeCacheCleaner = options.restServicesCompositeCacheCleaner;
    this.parametrizedSchemaResolvingService = options.parametrizedSchemaResolvingService;
  },
  refresh: function refresh() {
    this.restServicesCompositeCacheCleaner.clean(); //This will refresh profile attributes cache

    return this.parametrizedSchemaResolvingService.resolve(this.dataStore.getCollections(), {
      refresh: true
    });
  }
});

module.exports = DomainValidationCacheRefresher;

});