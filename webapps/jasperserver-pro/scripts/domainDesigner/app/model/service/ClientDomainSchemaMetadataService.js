define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var getResourceSourceNameOrNameUtil = require("../../util/getResourceSourceNameOrNameUtil");

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDomainSchemaMetadataService = function ClientDomainSchemaMetadataService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaMetadataService.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
    this.mixInAllCollections(this.dataStore);
  },
  isAnyTablesPresentInDomain: function isAnyTablesPresentInDomain() {
    return Boolean(this.tables.size());
  },
  isAnyDataSourceGroupsPresentInDomain: function isAnyDataSourceGroupsPresentInDomain() {
    return Boolean(this.dataSourceGroups.size());
  },
  getDataSourceByChildResource: function getDataSourceByChildResource(id, type) {
    var collections = this.dataStore.getCollections();
    var resourceEntity = schemaModelUtil.getResourceByIdAndType(id, type, collections);

    if (_.isUndefined(resourceEntity)) {
      return;
    }

    var dataSource = schemaModelUtil.getDataSourceByChildResource(resourceEntity, collections);
    return dataSource && dataSource.toJSON();
  },
  getResourcePath: function getResourcePath(id, type) {
    var resourceEntity = schemaModelUtil.getResourceByIdAndType(id, type, this.dataStore.getCollections()),
        path;

    if (_.isUndefined(resourceEntity)) {
      throw new Error('Resource was not found.');
    }

    if (entityUtil.isDataSourceGroup(resourceEntity)) {
      path = [resourceEntity.sourceName || resourceEntity.name];
    } else if (entityUtil.isDataSource(resourceEntity)) {
      path = [];
    } else {
      throw new Error('Only resources of type DataSource and DataSourceGroup are supported');
    }

    return path;
  },
  getFieldByDataSourceIdAndParentNames: function getFieldByDataSourceIdAndParentNames(dataSourceId, parentNames, isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
    var self = this;
    var parent = this.dataSources.byId(dataSourceId);

    if (isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
      parent = parent.getChildren().first();
    }

    var memo = {
      entity: parent
    };

    var entity = _.reduce(parentNames, function (memo, name) {
      var parent = memo.entity,
          entity;

      if (!parent) {
        return memo;
      }

      delete memo.entity;
      entity = parent.getChildren().find(function (resource) {
        var resourceJSON = resource.toJSON(),
            resourceName;

        if (entityUtil.isDataSourceGroup(resource)) {
          resourceName = self.clientDataSourceGroupService.getName(resourceJSON);
        } else {
          resourceName = getResourceSourceNameOrNameUtil(resourceJSON);
        }

        return resourceName === name;
      });

      if (entity) {
        memo.entity = entity;
      }

      return memo;
    }, memo).entity;

    return entity ? _.extend(entity.toJSON(), {
      parentId: entity.getParentId(),
      tableId: entity.getTableId()
    }) : null;
  }
}, allCollectionsMixin);

module.exports = ClientDomainSchemaMetadataService;

});