define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerViewStateModelService = function MetadataDesignerViewStateModelService(options) {
  this.initialize(options);
};

var METADATA_DESIGNER = canvasViewDesignersEnum.METADATA_DESIGNER;

_.extend(MetadataDesignerViewStateModelService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSidebarItemSelected');

    this.viewStateModel = options.viewStateModel;
  },
  getSidebarSelectionPath: function getSidebarSelectionPath() {
    var currentResource = this.viewStateModel.getCurrentResource(METADATA_DESIGNER);
    return currentResource && currentResource.id;
  },
  getCurrentSidebarResource: function getCurrentSidebarResource() {
    return this.viewStateModel.getCurrentResource(METADATA_DESIGNER);
  },
  getDataSourceByName: function getDataSourceByName(name) {
    return this.viewStateModel.getDataSource(name);
  },
  getAddResourcesError: function getAddResourcesError() {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(METADATA_DESIGNER, 'addResourcesError');
  },
  isSidebarItemSelected: function isSidebarItemSelected(item) {
    var currentResource = this.viewStateModel.getCurrentResource(METADATA_DESIGNER);
    return currentResource.id === item.id;
  },
  getSidebarSearchKeyword: function getSidebarSearchKeyword() {
    return this.viewStateModel.getSidebarSearchKeyword(METADATA_DESIGNER);
  },
  getResultTreeSelection: function getResultTreeSelection() {
    var currentSidebarResource = this.viewStateModel.getCurrentResource(METADATA_DESIGNER),
        currentSelection = this.viewStateModel.getCurrentSelection(METADATA_DESIGNER);
    return currentSelection.resultTree[currentSidebarResource.resourceId] || [];
  }
});

module.exports = MetadataDesignerViewStateModelService;

});