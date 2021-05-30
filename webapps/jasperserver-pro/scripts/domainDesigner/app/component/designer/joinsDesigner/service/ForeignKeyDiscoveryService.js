define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ForeignKeyDiscoveryService = function ForeignKeyDiscoveryService(options) {
  this.metadataService = options.metadataService;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  this.foreignKeyMetadataConverter = options.foreignKeyMetadataConverter;
  this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
};

_.extend(ForeignKeyDiscoveryService.prototype, {
  getForeignKeys: function getForeignKeys(dataSourceId) {
    var tablesWithParents = this.clientDomainSchemaService.getAllGenericTablesWithParents(dataSourceId),
        dataSource = this.clientDomainSchemaService.getDataSourceById(dataSourceId),
        dataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(dataSource.name),
        result = [];
    tablesWithParents = this._groupTablesByParentId(tablesWithParents);

    var requests = this._getForeignKeysForAllParentIds({
      dataSourceId: dataSourceId,
      dataSourceUri: dataSourceUri,
      tablesWithParents: tablesWithParents,
      result: result
    });

    return $.when.apply(null, requests).then(function () {
      return result;
    });
  },
  _groupTablesByParentId: function _groupTablesByParentId(tablesWithParents) {
    return _.groupBy(tablesWithParents, function (tableWithParents) {
      return tableWithParents.table.parentId;
    });
  },
  _getForeignKeysForAllParentIds: function _getForeignKeysForAllParentIds(options) {
    var tablesWithParents = options.tablesWithParents,
        dataSourceId = options.dataSourceId,
        dataSourceUri = options.dataSourceUri,
        result = options.result,
        self = this; // We can not combine requests for different parentId's into one.
    // We can not combine requests for different parentId's into one.

    return _.map(tablesWithParents, function (tablesWithParents, parentId) {
      return self._getForeignKeysForSpecificParentId({
        dataSourceId: dataSourceId,
        dataSourceUri: dataSourceUri,
        parentId: Number(parentId),
        tablesWithParents: tablesWithParents,
        result: result
      });
    });
  },
  _getForeignKeysForSpecificParentId: function _getForeignKeysForSpecificParentId(options) {
    var dataSourceId = options.dataSourceId,
        dataSourceUri = options.dataSourceUri,
        parentId = options.parentId,
        tablesWithParents = options.tablesWithParents,
        result = options.result,
        self = this;

    var resources = this._convertTablesToUriParameters(tablesWithParents);

    return this.metadataService.getMetadata(dataSourceUri, resources, {
      loadReferences: true
    }).then(function (data) {
      if (data) {
        var resources = _.isArray(data) ? data : [data];
        result.push.apply(result, self.foreignKeyMetadataConverter.convert({
          dataSourceId: dataSourceId,
          parentId: parentId,
          resources: resources
        }));
      }
    });
  },
  _convertTablesToUriParameters: function _convertTablesToUriParameters(tablesWithParents) {
    return _.map(tablesWithParents, function (tablesWithParents) {
      var parents = this._getTableWithParentsButWithoutDataSource(tablesWithParents.table, tablesWithParents.parents);

      return this._getResourceNames(parents);
    }, this);
  },
  _getTableWithParentsButWithoutDataSource: function _getTableWithParentsButWithoutDataSource(table, parents) {
    parents = _.clone(parents); // need to reverse since parents started from the innermost parent
    // need to reverse since parents started from the innermost parent

    parents.reverse(); // remove data source as now it's a first parent
    // remove data source as now it's a first parent

    parents.splice(0, 1); // add table
    // add table

    parents.push(table);
    return parents;
  },
  _getResourceNames: function _getResourceNames(resources) {
    var isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    return _.reduce(resources, function (memo, resource) {
      var isDataSourceGroup = entityUtil.isDataSourceGroup(resource.type);

      if (isDataSourceGroup && isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
        return memo;
      }

      var resourceName = resource.sourceName || resource.name;
      memo.push(resourceName);
      return memo;
    }, [], this);
  }
});

module.exports = ForeignKeyDiscoveryService;

});