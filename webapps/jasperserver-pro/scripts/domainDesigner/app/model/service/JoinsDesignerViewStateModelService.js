define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftStateTypesEnum = require("../enum/draftStateTypesEnum");

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerViewStateModelService = function JoinsDesignerViewStateModelService(options) {
  this.initialize(options);
};

var JOINS_DESIGNER = canvasViewDesignersEnum.JOINS_DESIGNER;

_.extend(JoinsDesignerViewStateModelService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSidebarItemSelected');

    this.viewStateModel = options.viewStateModel;
  },
  isSidebarItemSelected: function isSidebarItemSelected(item) {
    var currentResource = this.viewStateModel.getCurrentResource(JOINS_DESIGNER);

    if (currentResource) {
      return currentResource.id === item.id;
    }
  },
  isAtLeastOneResourceAlreadyDropped: function isAtLeastOneResourceAlreadyDropped() {
    var joinTrees = this.viewStateModel.getDesignerSpecificProperty(JOINS_DESIGNER, 'joinTrees');
    return _.some(joinTrees, function (joinTree) {
      var joinsConstructor = joinTree.joinsConstructor;
      return joinsConstructor && joinsConstructor.leftDroppableArea.fieldId;
    });
  },
  getCurrentSidebarResource: function getCurrentSidebarResource() {
    return this.viewStateModel.getCurrentResource(JOINS_DESIGNER);
  },
  getSidebarSelectionPath: function getSidebarSelectionPath() {
    var currentResource = this.viewStateModel.getCurrentResource(JOINS_DESIGNER);
    return currentResource && currentResource.id;
  },
  getSidebarSearchKeyword: function getSidebarSearchKeyword() {
    return this.viewStateModel.getSidebarSearchKeyword(JOINS_DESIGNER);
  },
  getJoinConstructor: function getJoinConstructor() {
    var draftState = this.viewStateModel.getDraftState();
    var joinConstructor = draftState[draftStateTypesEnum.JOIN_CONSTRUCTOR];

    if (_.isEmpty(joinConstructor)) {
      return;
    }

    return joinConstructor;
  },
  getDraftJoinTree: function getDraftJoinTree() {
    var draftState = this.viewStateModel.getDraftState();
    var draftJoinTree = draftState[draftStateTypesEnum.DRAFT_JOIN_TREE];

    if (_.isEmpty(draftJoinTree)) {
      return;
    }

    return draftJoinTree;
  }
});

module.exports = JoinsDesignerViewStateModelService;

});