define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataStoreProviderAdapter = function DataStoreProviderAdapter(options) {
  this.dataStore = options.dataStore;
};

_.extend(DataStoreProviderAdapter.prototype, {
  getDataStore: function getDataStore() {
    return this.dataStore.getCollections();
  }
});

module.exports = DataStoreProviderAdapter;

});