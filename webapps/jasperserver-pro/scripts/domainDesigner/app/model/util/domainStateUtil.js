define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getCurrentResourceEntity(designerName, state) {
  var currentResource = state.viewState.getCurrentResource(designerName),
      id = currentResource && currentResource.resourceId,
      type = currentResource && currentResource.type,
      dataStore = state.dataStore;
  return schemaModelUtil.getResourceByIdAndType(id, type, dataStore);
}

function getCurrentDataSource(designerName, state) {
  var currentResourceEntity = getCurrentResourceEntity(designerName, state),
      dataStore = state.dataStore;
  return schemaModelUtil.getDataSourceByChildResource(currentResourceEntity, dataStore);
}

function getCurrentDataSourceType(designerName, state) {
  var currentDataSource = getCurrentDataSource(designerName, state);
  var dataSource = state.viewState.getDataSource(currentDataSource.getName());
  return dataSource && dataSource.type;
}

module.exports = {
  getCurrentResourceEntity: getCurrentResourceEntity,
  getCurrentDataSource: getCurrentDataSource,
  getCurrentDataSourceType: getCurrentDataSourceType
};

});