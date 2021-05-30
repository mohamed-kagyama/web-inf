define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var designerName = canvasViewDesignersEnum.JOINS_DESIGNER;

function getSearchKeyword(state) {
  var searchKeywordProperty = state.viewState.getSearchKeyword(designerName);
  return searchKeywordProperty.canvas;
}

function getCurrentSidebarResource(state) {
  return state.viewState.getCurrentResource(designerName);
}

function getJoinTrees(state) {
  return state.viewState.getDesignerSpecificProperty(designerName, 'joinTrees');
}

function isJoinExpanded(joinId, state) {
  var joins = state.viewState.getDesignerSpecificProperty(designerName, 'joins');
  return joins[joinId].isExpanded;
}

function getJoinOriginalWeight(joinId, state) {
  var joins = state.viewState.getDesignerSpecificProperty(designerName, 'joins');
  return joins[joinId].originalWeight;
}

function isAtLeastOneResourceAlreadyDropped(state) {
  var dataIslands = state.viewState.getDesignerSpecificProperty(designerName, 'dataIslands');
  return _.find(dataIslands, function (dataIslands) {
    var joinsConstructor = dataIslands.joinsConstructor;
    return joinsConstructor && joinsConstructor.leftDroppableArea.fieldId;
  });
}

module.exports = {
  isJoinExpanded: isJoinExpanded,
  getJoinOriginalWeight: getJoinOriginalWeight,
  getSearchKeyword: getSearchKeyword,
  getCurrentSidebarResource: getCurrentSidebarResource,
  isAtLeastOneResourceAlreadyDropped: isAtLeastOneResourceAlreadyDropped,
  getJoinTrees: getJoinTrees
};

});