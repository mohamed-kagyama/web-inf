define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var metadataDesignerUtil = require("../../../util/metadataDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SourceTreeViewModelOptionsProvider = function SourceTreeViewModelOptionsProvider(options) {
  this.initialize(options);
};

_.extend(SourceTreeViewModelOptionsProvider.prototype, {
  initialize: function initialize(options) {
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
    this.clientDomainSchemaMetadataService = options.clientDomainSchemaMetadataService;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  get: function get(state) {
    var metadataResource = metadataDesignerUtil.getCurrentResource(state),
        currentMetadataResourceId = metadataResource && metadataResource.resourceId;
    var currentResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource();
    var id = currentResource.resourceId,
        type = currentResource.type,
        currentDataSource = this.clientDomainSchemaMetadataService.getDataSourceByChildResource(id, type),
        currentMetadataResourcePath = this.clientDomainSchemaMetadataService.getResourcePath(id, type);
    var currentDataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(currentDataSource.name);
    return {
      currentMetadataResourceId: currentMetadataResourceId,
      currentDataSourceUri: currentDataSourceUri,
      currentMetadataResourcePath: currentMetadataResourcePath
    };
  }
});

module.exports = SourceTreeViewModelOptionsProvider;

});