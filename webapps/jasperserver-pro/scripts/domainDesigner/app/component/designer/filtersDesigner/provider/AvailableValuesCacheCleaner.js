define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AvailableValuesCacheCleaner = function AvailableValuesCacheCleaner(options) {
  this.inMemoryDomainForAvailableValuesCache = options.inMemoryDomainForAvailableValuesCache;
  this.booleanAvailableValuesDataProvider = options.booleanAvailableValuesDataProvider;
  this.dataProviderWithSearchAndCacheForAvailableValues = options.dataProviderWithSearchAndCacheForAvailableValues;
  this.availableValuesErrorsCache = options.availableValuesErrorsCache;
  this.availableValuesFirstRequestSuccessCache = options.availableValuesFirstRequestSuccessCache;
};

_.extend(AvailableValuesCacheCleaner.prototype, {
  clean: function clean() {
    this.inMemoryDomainForAvailableValuesCache.reset();
    this.availableValuesErrorsCache.reset();
    this.booleanAvailableValuesDataProvider.clear();
    this.dataProviderWithSearchAndCacheForAvailableValues.clear();
    this.availableValuesFirstRequestSuccessCache.reset();
  },
  cleanAvailableValuesErrorsCache: function cleanAvailableValuesErrorsCache() {
    this.availableValuesErrorsCache.reset();
  },
  cleanAvailableValuesFirstRequestSuccessCache: function cleanAvailableValuesFirstRequestSuccessCache() {
    this.availableValuesFirstRequestSuccessCache.reset();
  }
});

module.exports = AvailableValuesCacheCleaner;

});