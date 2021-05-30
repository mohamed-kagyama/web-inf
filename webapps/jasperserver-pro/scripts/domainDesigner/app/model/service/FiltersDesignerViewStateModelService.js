define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftStateTypesEnum = require("../enum/draftStateTypesEnum");

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FILTERS_DESIGNER = canvasViewDesignersEnum.FILTERS_DESIGNER;

var FiltersDesignerViewStateModelService = function FiltersDesignerViewStateModelService(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerViewStateModelService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSidebarItemSelected');

    this.viewStateModel = options.viewStateModel;
  },
  isSidebarItemSelected: function isSidebarItemSelected(item) {
    var currentResource = this.viewStateModel.getCurrentResource(FILTERS_DESIGNER);
    return currentResource.id === item.id;
  },
  getSidebarSelectionPath: function getSidebarSelectionPath() {
    var currentResource = this.viewStateModel.getCurrentResource(FILTERS_DESIGNER);
    return currentResource.id;
  },
  getSidebarCurrentResource: function getSidebarCurrentResource() {
    return this.viewStateModel.getCurrentResource(FILTERS_DESIGNER);
  },
  getSidebarSearchKeyword: function getSidebarSearchKeyword() {
    return this.viewStateModel.getSidebarSearchKeyword(FILTERS_DESIGNER);
  },
  getDraftFilterState: function getDraftFilterState() {
    var draftState = this.viewStateModel.getDraftState();
    return draftState[draftStateTypesEnum.DRAFT_FILTER];
  },
  getFiltersPositions: function getFiltersPositions() {
    return this.viewStateModel.getDesignerSpecificProperty(FILTERS_DESIGNER, 'filtersPositions');
  }
});

module.exports = FiltersDesignerViewStateModelService;

});