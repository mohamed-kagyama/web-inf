define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../model/enum/canvasViewDesignersEnum");

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var domainStateUtil = require("../../../../model/util/domainStateUtil");

var uriUtil = require("../../../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var designerName = canvasViewDesignersEnum.METADATA_DESIGNER;
var selectionProperty = 'selection';

function getTreeSearchKeyword(tree, viewState) {
  var currentResource = viewState.getCurrentResource(designerName),
      currentResourceId = currentResource && currentResource.id,
      searchKeywordProperty = viewState.getSearchKeyword(designerName);
  return searchKeywordProperty[tree][currentResourceId];
}

function getCurrentResourceUri(state) {
  var currentResourceEntity = domainStateUtil.getCurrentResourceEntity(designerName, state);
  return getResourceRelativeUri(currentResourceEntity);
}

function getResourceRelativeUri(currentResourceEntity) {
  var uri = null;

  if (_.isUndefined(currentResourceEntity)) {
    return uri;
  }

  if (entityUtil.isDataSourceGroup(currentResourceEntity)) {
    uri = currentResourceEntity.getSourceName() || currentResourceEntity.getName();
  } else if (entityUtil.isDataSource(currentResourceEntity)) {
    uri = uriUtil.getRootUri();
  } else {
    throw new Error('Only resources of type DataSource and DataSourceGroup are supported');
  }

  return uri;
}

function getResultTreeSelection(state) {
  var currentResource = state.viewState.getCurrentResource(designerName),
      selection = state.viewState.getCurrentSelection(designerName);
  return selection.resultTree[currentResource.resourceId] || [];
} // should be removed
// should be removed


function getCurrentSelection(state) {
  return state.viewState.getCurrentSelection(designerName);
}

function getCurrentResource(state) {
  return state.viewState.getCurrentResource(designerName);
}

function getCurrentResourceEntity(state) {
  return domainStateUtil.getCurrentResourceEntity(designerName, state);
}

function getCurrentDataSource(state) {
  return domainStateUtil.getCurrentDataSource(designerName, state);
}

function getCurrentDataSourceType(state) {
  return domainStateUtil.getCurrentDataSourceType(designerName, state);
}

module.exports = {
  getTreeSearchKeyword: getTreeSearchKeyword,
  getCurrentResourceUri: getCurrentResourceUri,
  getResultTreeSelection: getResultTreeSelection,
  // should be removed
  getCurrentSelection: getCurrentSelection,
  getCurrentResource: getCurrentResource,
  getCurrentResourceEntity: getCurrentResourceEntity,
  getCurrentDataSource: getCurrentDataSource,
  getCurrentDataSourceType: getCurrentDataSourceType
};

});