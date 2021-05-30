define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SourceTreeDataProviderOptionsProvider = function SourceTreeDataProviderOptionsProvider(options) {
  this.initialize(options);
};

_.extend(SourceTreeDataProviderOptionsProvider.prototype, {
  initialize: function initialize(options) {
    this.model = options.model;
    this.treeSelectionProvider = options.treeSelectionProvider;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
  },
  get: function get(state) {
    return {
      dataStore: state.dataStore,
      dataSourceUri: this.model.get('currentDataSourceUri'),
      metadataResourcePath: this.model.get('currentMetadataResourcePath'),
      selection: this.treeSelectionProvider.get(state),
      highlightInvalidResources: this.metadataDesignerViewStateModelService.getAddResourcesError().highlightInvalidResources,
      currentMetadataResourceId: this.model.get('currentMetadataResourceId')
    };
  }
});

module.exports = SourceTreeDataProviderOptionsProvider;

});