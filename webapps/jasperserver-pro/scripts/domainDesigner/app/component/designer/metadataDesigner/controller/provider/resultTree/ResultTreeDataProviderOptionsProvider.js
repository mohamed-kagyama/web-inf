define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResultTreeDataProviderOptionsProvider = function ResultTreeDataProviderOptionsProvider(options) {
  this.initialize(options);
};

_.extend(ResultTreeDataProviderOptionsProvider.prototype, {
  initialize: function initialize(options) {
    this.model = options.model;
    this.treeSelectionProvider = options.treeSelectionProvider;
  },
  get: function get(state) {
    return {
      dataStore: state.dataStore,
      metadataResourceId: this.model.get('currentMetadataResourceId'),
      metadataResourceType: this.model.get('currentMetadataResourceType'),
      dataSourceType: this.model.get('currentDataSourceType'),
      selection: this.treeSelectionProvider.get(state)
    };
  }
});

module.exports = ResultTreeDataProviderOptionsProvider;

});