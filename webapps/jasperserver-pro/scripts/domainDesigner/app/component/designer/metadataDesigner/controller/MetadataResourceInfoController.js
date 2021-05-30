define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataResourceInfoController = function MetadataResourceInfoController(options) {
  this.initialize(options);
};

_.extend(MetadataResourceInfoController.prototype, {
  initialize: function initialize(options) {
    this.resourceInfoStore = options.metadataDesignerVueStore.get('resourceInfo');
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.currentResourceInfoFactory = options.currentResourceInfoFactory;
    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientDomainSchemaMetadataService = options.clientDomainSchemaMetadataService;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
    this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider = options.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._setViewModelState);
  },
  _setViewModelState: function _setViewModelState() {
    var currentSidebarResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource();

    if (!currentSidebarResource.resourceId) {
      return;
    }

    var currentMetadataResourceName = this._getCurrentMetadataResourceName(currentSidebarResource);

    var dataSourceType = this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider.getDataSourceType(currentSidebarResource);
    var info = this.currentResourceInfoFactory.create({
      dataSourceType: dataSourceType,
      resourceName: currentMetadataResourceName,
      resourceType: currentSidebarResource.type,
      isAnyTablesPresentInDomain: this.clientDomainSchemaMetadataService.isAnyTablesPresentInDomain(),
      isAnyDataSourceGroupsPresentInDomain: this.clientDomainSchemaMetadataService.isAnyDataSourceGroupsPresentInDomain()
    });
    this.resourceInfoStore.availableResourcesTitle = info.availableResourcesTitle;
    this.resourceInfoStore.selectedResourcesTitle = info.selectedResourcesTitle;
    this.resourceInfoStore.manageResource = info.manageResource;
    this.resourceInfoStore.dataObjectName = info.dataObjectName;
    this.resourceInfoStore.instructionTitle = info.instructionTitle;
    this.resourceInfoStore.instructionText = info.instructionText;
  },
  _getCurrentMetadataResourceName: function _getCurrentMetadataResourceName(currentSidebarResource) {
    var currentResource = this.clientDomainSchemaService.getEntityByIdAndType(currentSidebarResource.resourceId, currentSidebarResource.type);
    return entityUtil.isDataSourceGroup(currentSidebarResource.type) ? this.clientDataSourceGroupService.getName(currentResource) : currentResource.name;
  }
}, Backbone.Events);

module.exports = MetadataResourceInfoController;

});