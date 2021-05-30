define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getResourceSourceNameOrNameUtil = require("../../util/getResourceSourceNameOrNameUtil");

var dataSourceTypeEnum = require("../enum/dataSourceTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = function SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec(options) {
  this.initialize(options);
};

_.extend(SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.viewStateModel = options.viewStateModel;
    this.resourceProperties = options.resourceProperties;
    this.profileAttributesServiceCache = options.profileAttributesServiceCache;
  },
  isSatisfied: function isSatisfied() {
    return this._isSchemaLessDataSource() && this._isOneDataSourceGroup() && this._isDataSourceGroupSchemaAttributeResolvedIntoEmptyValue();
  },
  _isSchemaLessDataSource: function _isSchemaLessDataSource() {
    var dataSourceName = this._getDataSourceName(),
        dataSource = this.viewStateModel.getDataSource(dataSourceName);

    return dataSource.type === dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS;
  },
  _isOneDataSourceGroup: function _isOneDataSourceGroup() {
    return this.dataStore.getCollection('dataSourceGroups').size() === 1;
  },
  _isDataSourceGroupSchemaAttributeResolvedIntoEmptyValue: function _isDataSourceGroupSchemaAttributeResolvedIntoEmptyValue() {
    var dataSourceGroup = this.dataStore.getCollection('dataSourceGroups').first(),
        dataSourceGroupName = getResourceSourceNameOrNameUtil(dataSourceGroup.toJSON()),
        profileAttribute = this.profileAttributesServiceCache.get(dataSourceGroupName);
    return profileAttribute && _.isEmpty(profileAttribute.value);
  },
  _getDataSourceName: function _getDataSourceName() {
    var dataSources = this.resourceProperties.get('dataSources');
    return _.keys(dataSources)[0];
  }
});

module.exports = SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;

});