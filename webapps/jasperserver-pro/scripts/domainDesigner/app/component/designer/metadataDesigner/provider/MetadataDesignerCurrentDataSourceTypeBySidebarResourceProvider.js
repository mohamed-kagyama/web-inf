define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider = function MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
  },
  getDataSourceType: function getDataSourceType(sidebarResource) {
    var currentDataSourceEntity = this.clientDomainSchemaService.getDataSourceByEntityIdAndType(sidebarResource.resourceId, sidebarResource.type),
        currentDataSource = this.metadataDesignerViewStateModelService.getDataSourceByName(currentDataSourceEntity.name);
    return currentDataSource.type;
  }
});

module.exports = MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider;

});