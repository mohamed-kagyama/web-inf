define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerResourcesParentIdProvider = function MetadataDesignerResourcesParentIdProvider(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerResourcesParentIdProvider.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
  },
  getParentId: function getParentId() {
    var currentSidebarResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource(),
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied(),
        firstDataSourceGroup;

    if (entityUtil.isDataSource(currentSidebarResource.type) && isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
      firstDataSourceGroup = this.clientDomainSchemaService.getFirstDataSourceGroupByDataSourceId(currentSidebarResource.resourceId);
      return firstDataSourceGroup.id;
    }

    return currentSidebarResource.resourceId;
  }
});

module.exports = MetadataDesignerResourcesParentIdProvider;

});