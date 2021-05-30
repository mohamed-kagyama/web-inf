define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

var pathUtil = require("../../util/pathUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var graphUtil = require("../../../util/graphUtil");

var fieldTypesToGenericTypesEnum = require("../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDomainSchemaService = function ClientDomainSchemaService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_resourceWithExpressionMapper');

    this.dataStore = options.dataStore;
    this.serverSchemaModelSerializer = options.serverSchemaModelSerializer;
    this.domainSchemaService = options.domainSchemaService;
    this.constantDataIslandNameGenerator = options.constantDataIslandNameGenerator;
    this.domainSchemaSpecification = options.domainSchemaSpecification;
    this.mixInAllCollections(this.dataStore);
  },
  getFieldsAsMap: function getFieldsAsMap() {
    return this.fields.reduce(function (memo, field) {
      memo[field.getId()] = field.toJSON();
      return memo;
    }, {});
  },
  getDataStore: function getDataStore() {
    return this.dataStore.clone();
  },
  serialize: function serialize() {
    return this.dataStore.serialize();
  },
  serializeWithDataAdapter: function serializeWithDataAdapter() {
    return this.serverSchemaModelSerializer.toJSON(this.dataStore.getCollections());
  },
  getTablesCount: function getTablesCount(dataSourceId) {
    var tablesByDataSourceId = this.tables.filter(_.partial(this._filterTableByDataSourceId, dataSourceId));
    return tablesByDataSourceId.length;
  },
  getFieldsSize: function getFieldsSize() {
    return this.fields.size();
  },
  getAllGenericTablesWithParents: function getAllGenericTablesWithParents(dataSourceId) {
    var self = this;
    return this.tables.chain().filter(entityUtil.isGenericTable).filter(_.partial(this._filterTableByDataSourceId, dataSourceId)).map(function (table) {
      var parents = schemaModelUtil.getResourceParents(table, {
        dataSourceGroups: self.dataSourceGroups,
        dataSources: self.dataSources
      }).map(function (parent) {
        var json = _.extend(parent.toJSON(), {
          type: entityUtil.getEntityName(parent)
        });

        if (!entityUtil.isDataSource(parent)) {
          json = _.extend({}, json, {
            parentId: _.result(parent, 'getParentId'),
            dataSourceId: dataSourceId
          });
        }

        return json;
      });
      table = _.extend({
        parentId: table.getParentId(),
        dataSourceId: dataSourceId
      }, table.toJSON());
      return {
        table: table,
        parents: parents
      };
    }).toArray();
  },
  getAllTablesByDataSourceGroups: function getAllTablesByDataSourceGroups(dataSourceGroupIds) {
    dataSourceGroupIds = _.isArray(dataSourceGroupIds) ? dataSourceGroupIds : [dataSourceGroupIds];

    var dataSourceGroupIdsMap = _.reduce(dataSourceGroupIds, function (memo, dataSourceGroupId) {
      memo[dataSourceGroupId] = true;
      return memo;
    }, {});

    return this.tables.reduce(function (memo, table) {
      if (dataSourceGroupIdsMap[table.parentId]) {
        memo.push(table.toJSON());
      }

      return memo;
    }, []);
  },
  getSourceLessDataIslands: function getSourceLessDataIslands() {
    return schemaModelUtil.getSourceLessDataIslands(this.dataStore.getCollections()).map(function (dataIsland) {
      return dataIsland.toJSON();
    });
  },
  getChildrenLessDataIslands: function getChildrenLessDataIslands() {
    return schemaModelUtil.getChildrenLessDataIslands(this.dataStore.getCollections()).map(function (dataIsland) {
      return dataIsland.toJSON();
    });
  },
  getDataSourceById: function getDataSourceById(id) {
    return this.dataSources.byId(id).toJSON();
  },
  getDataSourcesCount: function getDataSourcesCount() {
    return this.dataSources.size();
  },
  getDerivedTableJsonByIdWithFields: function getDerivedTableJsonByIdWithFields(id) {
    var table = this.tables.byId(id);
    var tableJSON = table.toJSON();

    _.extend(tableJSON, {
      children: table.getChildren().map(function (item) {
        return item.toJSON();
      }),
      dataSourceId: table.dataSourceId,
      parentId: table.parentId
    });

    return tableJSON;
  },
  isDerivedTable: function isDerivedTable(tableId) {
    var table = this.tables.byId(tableId);
    return entityUtil.isDerivedTable(table);
  },
  getFirstDataSource: function getFirstDataSource() {
    return this.dataSources.first().toJSON();
  },
  getTableById: function getTableById(id) {
    return this.tables.byId(id).toJSON();
  },
  getTableByNameAndParent: function getTableByNameAndParent(name, parentId) {
    var parent = schemaModelUtil.getDataSourceGroupOrDataSource(parentId, this.dataStore.getCollections()),
        table = parent.getChildren().chain().filter(function (child) {
      return entityUtil.isTable(child);
    }).findWhere({
      name: name
    });
    return table && table.toJSON();
  },
  getTableByTableReferenceId: function getTableByTableReferenceId(tableReferenceId) {
    var tableReference = this.tableReferences.byId(tableReferenceId);
    return this.tables.byId(tableReference.tableId).toJSON();
  },
  getTableGroupByNameAndParent: function getTableGroupByNameAndParent(name, parentId) {
    var parent = schemaModelUtil.getTableGroupOrTable(parentId, this.dataStore.getCollections()),
        tableGroup = parent.getChildren().chain().filter(function (child) {
      return entityUtil.isTableGroup(child);
    }).findWhere({
      name: name
    });
    return tableGroup && tableGroup.toJSON();
  },
  getFieldByNameAndParent: function getFieldByNameAndParent(name, parentId) {
    var parent = schemaModelUtil.getTableGroupOrTable(parentId, this.dataStore.getCollections()),
        field = parent.getChildren().chain().filter(function (child) {
      return entityUtil.isField(child);
    }).findWhere({
      name: name
    });
    return field && field.toJSON();
  },
  getFirstDataSourceGroupByDataSourceId: function getFirstDataSourceGroupByDataSourceId(dataSourceId) {
    var dataSource = this.dataSources.byId(dataSourceId),
        firstDataSourceGroup = dataSource.getChildren().first();
    return firstDataSourceGroup.toJSON();
  },
  getDataSourceGroups: function getDataSourceGroups() {
    return this.dataSourceGroups.map(function (dataSourceGroup) {
      return dataSourceGroup.toJSON();
    });
  },
  getDataSourceGroupByName: function getDataSourceGroupByName(name) {
    var dataSourceGroup = this.dataSourceGroups.findWhere({
      name: name
    });
    return dataSourceGroup && dataSourceGroup.toJSON();
  },
  getDataSourceGroupBySourceName: function getDataSourceGroupBySourceName(sourceName) {
    var dataSourceGroup = this.dataSourceGroups.findWhere({
      sourceName: sourceName
    });
    return dataSourceGroup && dataSourceGroup.toJSON();
  },
  getTableReferenceByName: function getTableReferenceByName(name) {
    var tableReference = this.tableReferences.findWhere({
      name: name
    });
    return tableReference && tableReference.toJSON();
  },
  getTableReferenceById: function getTableReferenceById(tableReferenceId) {
    var tableReference = this.tableReferences.byId(tableReferenceId);
    return tableReference && tableReference.toJSON();
  },
  getFieldByName: function getFieldByName(name) {
    var field = this.fields.findWhere({
      name: name
    });
    return field && field.toJSON();
  },
  getFieldById: function getFieldById(id) {
    return this.fields.byId(id).toJSON();
  },
  getGenericFiledTypeById: function getGenericFiledTypeById(id) {
    var field = this.fields.byId(id);
    return fieldTypesToGenericTypesEnum[field.getType()];
  },
  isFieldChildOfDerivedTable: function isFieldChildOfDerivedTable(id) {
    var tableId = this.fields.byId(id).getTableId();
    return this.isDerivedTable(tableId);
  },
  getDataIslands: function getDataIslands() {
    return this.dataIslands.map(function (dataIsland) {
      return dataIsland.toJSON();
    });
  },
  getDataIslandsSize: function getDataIslandsSize() {
    return this.dataIslands.size();
  },
  getJoinTreesSize: function getJoinTreesSize() {
    return this.joinTrees.size();
  },
  getDataIslandIndex: function getDataIslandIndex(dataIslandId) {
    var collection = this.dataStore.getCollection('dataIslands');
    return schemaModelUtil.getResourceIndexInCollectionById(dataIslandId, collection);
  },
  getPresentationItemChildrenSize: function getPresentationItemChildrenSize(parentId) {
    var collections = this.dataStore.getCollections();
    return schemaModelUtil.getDataIslandOrPresentationSetById(parentId, collections).getChildren().size();
  },
  getPresentationItemsInRangeOnLevel: function getPresentationItemsInRangeOnLevel(options) {
    var levelId = options.levelId,
        start = options.start,
        end = options.end;

    if (start > end) {
      throw new Error('The start index of the range cannot be greater then the end.');
    }

    var collection, parent;

    if (levelId) {
      parent = schemaModelUtil.getDataIslandOrPresentationSetById(levelId, this.dataStore.getCollections());
      collection = parent.getChildren();
    } else {
      collection = this.dataIslands;
    }

    return collection.reduce(function (memo, child, index) {
      if (index >= start && index <= end) {
        var childJSON = child.toJSON();

        if (!entityUtil.isDataIsland(child)) {
          childJSON = _.extend({
            parentId: child.parentId,
            dataIslandId: child.dataIslandId
          }, childJSON);
        }

        childJSON = _.extend({
          type: entityUtil.getEntityName(child)
        }, childJSON);
        memo.push(childJSON);
      }

      return memo;
    }, []);
  },
  getPresentationSetsAndFieldsGroupedByProperty: function getPresentationSetsAndFieldsGroupedByProperty(property) {
    return schemaModelUtil.reduceCollectionByProperty({
      collection: this.presentationSets.concat(this.presentationFields),
      reducer: function reducer(memo, entity) {
        memo[entity[property]] = entity.toJSON();
        return memo;
      }
    });
  },
  isDataIslandHasSource: function isDataIslandHasSource(id) {
    var dataIsland = this.dataIslands.by({
      id: id
    });
    return dataIsland && _.isNumber(dataIsland.getSourceId());
  },
  getDataIslandById: function getDataIslandById(dataIslandId) {
    var dataIsland = this.dataIslands.by({
      id: dataIslandId
    });
    return dataIsland && dataIsland.toJSON();
  },
  isJoinTreeConsistsOfASingleComponent: function isJoinTreeConsistsOfASingleComponent(joinTree) {
    var joinAliases = joinTree.getJoinAliases(),
        joins = joinTree.getJoins();

    var joinsAsGraph = this._convertJoinsToGraph(joins);

    var firstVertexId = joins.first() && joins.first().leftJoinAliasId;
    var firstJoinGraphComponent = graphUtil.findComponentForVertex(firstVertexId, joinsAsGraph);
    return firstJoinGraphComponent.length === joinAliases.size();
  },
  _convertJoinsToGraph: function _convertJoinsToGraph(joins) {
    var addVertex = function addVertex(vertexId, vertexes) {
      if (!vertexes) {
        vertexes = [];
      }

      vertexes.push(vertexId);
      return vertexes;
    };

    return joins.reduce(function (memo, join) {
      var leftJoinAliasId = join.leftJoinAliasId,
          rightJoinAliasId = join.rightJoinAliasId;
      memo[leftJoinAliasId] = addVertex(rightJoinAliasId, memo[leftJoinAliasId]);
      memo[rightJoinAliasId] = addVertex(leftJoinAliasId, memo[rightJoinAliasId]);
      return memo;
    }, {});
  },
  isJoinTreesConsistOfASingleComponent: function isJoinTreesConsistOfASingleComponent() {
    return this.joinTrees.every(function (joinTree) {
      return this.isJoinTreeConsistsOfASingleComponent(joinTree);
    }, this);
  },
  isAtLeastOnePresentationFieldInTheModel: function isAtLeastOnePresentationFieldInTheModel() {
    return Boolean(this.presentationFields.size());
  },
  generateConstantDataIslandName: function generateConstantDataIslandName() {
    var isDataIslandAlreadyExists = _.bind(this.dataIslands.byField, this.dataIslands, 'name');

    return this.constantDataIslandNameGenerator.generate(null, isDataIslandAlreadyExists);
  },
  isConstantDataIslandAlreadyExists: function isConstantDataIslandAlreadyExists() {
    return this.dataIslands.some(function (dataIsland) {
      return entityUtil.isConstantGroup(dataIsland.getSourceType());
    });
  },
  isConstantDataIsland: function isConstantDataIsland(dataIslandId) {
    var dataIsland = this.getDataIslandById(dataIslandId);
    return entityUtil.isConstantGroup(dataIsland.sourceType);
  },
  isPresentationItemHasTransitiveParent: function isPresentationItemHasTransitiveParent(itemId, parentId) {
    var collections = this.dataStore.getCollections(),
        presentationItem = schemaModelUtil.getPresentationSetOrFieldById(itemId, collections);

    if (presentationItem) {
      var parents = schemaModelUtil.getPresentationParents(presentationItem, collections);
      return _.some(parents, function (parent) {
        return parent.getId() === parentId;
      });
    }
  },
  getNameForTableReferenceCopy: function getNameForTableReferenceCopy(name) {
    return this.domainSchemaService.getNameForTableReferenceCopy(name);
  },
  getEntityByIdAndType: function getEntityByIdAndType(id, type) {
    var entity = schemaModelUtil.getResourceByIdAndType(id, type, this.dataStore.getCollections());
    return entity.toJSON();
  },
  getDataSourceByEntityIdAndType: function getDataSourceByEntityIdAndType(id, type) {
    var collections = this.dataStore.getCollections(),
        entity = schemaModelUtil.getResourceByIdAndType(id, type, collections),
        dataSourceByChildResource = schemaModelUtil.getDataSourceByChildResource(entity, collections);
    return dataSourceByChildResource && dataSourceByChildResource.toJSON();
  },
  getAllDependenciesWithExpressionsForTableReference: function getAllDependenciesWithExpressionsForTableReference(tableReferenceId) {
    var filterCalcFieldsWithExpressionByTableReferenceId = _.bind(this._filterCalcFieldsWithExpressionByTableReferenceId, this, tableReferenceId),
        resources = this.fields.filter(filterCalcFieldsWithExpressionByTableReferenceId);

    var tableReference = this.tableReferences.byId(tableReferenceId);

    var filterComplexJoinsWithExpressionByTableReferenceId = _.bind(this._filterComplexJoinsWithExpressionByTableReferenceId, this, tableReference),
        filteredJoins = this.joins.filter(filterComplexJoinsWithExpressionByTableReferenceId);

    resources = resources.concat(filteredJoins);
    return resources.map(this._resourceWithExpressionMapper);
  },
  isAllDataIslandsHaveSources: function isAllDataIslandsHaveSources() {
    return this.dataIslands.some(function (dataIsland) {
      return _.isNull(dataIsland.getSourceId());
    });
  },
  getAllDependenciesWithExpressionsForField: function getAllDependenciesWithExpressionsForField(fieldId, sourceId) {
    var filterCalcFieldsWithExpressionByFieldAndSourceId = _.bind(this._filterCalcFieldsWithExpressionByFieldAndSourceId, this, fieldId, sourceId),
        resources = this.fields.filter(filterCalcFieldsWithExpressionByFieldAndSourceId);

    var filterComplexJoinsWithExpressionByFieldAndSourceId = _.bind(this._filterComplexJoinsWithExpressionByFieldAndSourceId, this, fieldId, sourceId),
        filteredJoins = this.joins.filter(filterComplexJoinsWithExpressionByFieldAndSourceId);

    resources = resources.concat(filteredJoins);
    return resources.map(this._resourceWithExpressionMapper);
  },
  getJoinTreeIdByJoinAliasId: function getJoinTreeIdByJoinAliasId(joinAliasId) {
    return this.joinAliases.byId(joinAliasId).getJoinTreeId();
  },
  getTableReferenceIdByJoinAliasId: function getTableReferenceIdByJoinAliasId(joinAliasId) {
    return this.joinAliases.byId(joinAliasId).getTableReferenceId();
  },
  getTableByJoinAliasId: function getTableByJoinAliasId(id) {
    var joinAlias = this.joinAliases.byId(id),
        tableReference = this.tableReferences.byId(joinAlias.getTableReferenceId()),
        table = this.tables.byId(tableReference.getTableId());
    return table.toJSON();
  },
  getJoinAliasIdByTableReferenceId: function getJoinAliasIdByTableReferenceId(tableReferenceId) {
    var joinAlias = this.joinAliases.byField('tableReferenceId', tableReferenceId);
    return joinAlias && joinAlias.getId();
  },
  getResourceByIdAndType: function getResourceByIdAndType(id, type) {
    var resource = schemaModelUtil.getResourceByIdAndType(id, type, this.dataStore.getCollections());
    return resource && resource.toJSON();
  },
  _filterCalcFieldsWithExpressionByFieldAndSourceId: function _filterCalcFieldsWithExpressionByFieldAndSourceId(fieldId, sourceId, field) {
    var isCalcFieldUsedByAnotherCalcField = _.bind(this._isCalcFieldUsedByAnotherCalcField, this, {
      fieldId: fieldId,
      sourceId: sourceId
    });

    if (entityUtil.isCalcField(field)) {
      return field.getFieldReferences().some(isCalcFieldUsedByAnotherCalcField);
    }
  },
  _isCalcFieldUsedByAnotherCalcField: function _isCalcFieldUsedByAnotherCalcField(calcField, fieldReference) {
    var tableReferenceId = fieldReference.getSourceId();

    if (entityUtil.isJoinAlias(fieldReference.getSourceType())) {
      var joinAliasId = fieldReference.getSourceId(),
          joinAlias = this.joinAliases.byId(joinAliasId);
      tableReferenceId = joinAlias.getTableReferenceId();
    }

    return tableReferenceId === calcField.sourceId && fieldReference.getFieldId() === calcField.fieldId;
  },
  _filterComplexJoinsWithExpressionByFieldAndSourceId: function _filterComplexJoinsWithExpressionByFieldAndSourceId(fieldId, sourceId, join) {
    var self = this;

    if (entityUtil.isComplexJoin(join)) {
      return join.getFieldReferences().some(function (fieldReference) {
        if (fieldReference.getFieldId() === fieldId) {
          var joinAliasId = fieldReference.getSourceId(),
              joinAlias = self.joinAliases.byId(joinAliasId);
          return joinAlias.getTableReferenceId() === sourceId;
        }
      });
    }
  },
  _filterComplexJoinsWithExpressionByTableReferenceId: function _filterComplexJoinsWithExpressionByTableReferenceId(tableReference, join) {
    var self = this;

    if (entityUtil.isComplexJoin(join)) {
      return join.getFieldReferences().some(function (fieldReference) {
        var joinAliasId = fieldReference.getSourceId(),
            joinAlias = self.joinAliases.byId(joinAliasId);

        if (joinAlias.getTableReferenceId() === tableReference.getId()) {
          return self.domainSchemaSpecification.shouldRenameJoinAliasOnTableReferenceRename(tableReference.getName(), joinAlias.getName());
        }
      });
    }
  },
  _filterCalcFieldsWithExpressionByTableReferenceId: function _filterCalcFieldsWithExpressionByTableReferenceId(tableReferenceId, field) {
    var isCalcFieldUsedByTableReference = _.bind(this._isCalcFieldUsedByTableReference, this, tableReferenceId);

    if (entityUtil.isCalcField(field) && field.getSourceId() !== tableReferenceId) {
      return field.getFieldReferences().some(isCalcFieldUsedByTableReference);
    }
  },
  _isCalcFieldUsedByTableReference: function _isCalcFieldUsedByTableReference(tableReferenceId, fieldReference) {
    var tableReferenceIdUsedByCalcField = fieldReference.getSourceId();

    if (entityUtil.isJoinAlias(fieldReference.getSourceType())) {
      var joinAliasId = fieldReference.getSourceId(),
          joinAlias = this.joinAliases.byId(joinAliasId);
      tableReferenceIdUsedByCalcField = joinAlias.getTableReferenceId();
    }

    return tableReferenceIdUsedByCalcField === tableReferenceId;
  },
  _calcFieldForDependencyExpressionMapper: function _calcFieldForDependencyExpressionMapper(calcField) {
    return _.extend(this._baseResourceWithExpressionMapper(calcField), {
      sourceId: calcField.getSourceId(),
      sourceType: calcField.getSourceType()
    });
  },
  _convertFieldReferencesToVariables: function _convertFieldReferencesToVariables(resource, memo, fieldReference) {
    var collections = this.dataStore.getCollections();
    var source = schemaModelUtil.getSourceByFieldReference(fieldReference, collections),
        field = schemaModelUtil.getFieldByFieldReference(fieldReference, collections),
        tableReference;

    if (entityUtil.isJoinAlias(source)) {
      tableReference = schemaModelUtil.getTableReferenceByJoinAlias(source, collections);
    }

    var variableName = pathUtil.join([source.getName(), field.getName()], '\\', '.'),
        fieldJson = {
      name: field.getName(),
      type: field.getType(),
      fieldName: field.getName(),
      sourceName: source.getName(),
      id: field.getId()
    };

    if (this._shouldAddShortVariableName(resource, source)) {
      // calc fields which use other calc fields from same level will omit source prefix
      memo[field.getName()] = _.extend({}, fieldJson, {
        fieldOnlyVariable: true
      });

      if (tableReference) {
        memo[field.getName()].tableReferenceName = tableReference.getName();
      }
    }

    if (this._shouldAddFullVariableName(resource, source)) {
      memo[variableName] = _.extend({}, fieldJson, {
        name: variableName
      });

      if (tableReference) {
        memo[variableName].tableReferenceName = tableReference.getName();
      }
    }

    return memo;
  },
  _shouldAddShortVariableName: function _shouldAddShortVariableName(resource, source) {
    return entityUtil.isCalcField(resource) && resource.getSourceId() === source.getId();
  },
  _shouldAddFullVariableName: function _shouldAddFullVariableName(resource, source) {
    return !(entityUtil.isCalcField(resource) && resource.getSourceId() === source.getId() && !entityUtil.isConstantGroup(resource.getSourceType()));
  },
  _baseResourceWithExpressionMapper: function _baseResourceWithExpressionMapper(resource) {
    return _.extend(resource.toJSON(), {
      variables: resource.getFieldReferences().reduce(_.bind(this._convertFieldReferencesToVariables, this, resource), {}),
      entityType: entityUtil.getEntityName(resource)
    });
  },
  _resourceWithExpressionMapper: function _resourceWithExpressionMapper(resource) {
    if (entityUtil.isCalcField(resource)) {
      return this._calcFieldForDependencyExpressionMapper(resource);
    } else if (entityUtil.isComplexJoin(resource)) {
      return this._baseResourceWithExpressionMapper(resource);
    }
  },
  _filterTableByDataSourceId: function _filterTableByDataSourceId(dataSourceId, table) {
    return table.getDataSourceId() === dataSourceId;
  }
});

_.extend(ClientDomainSchemaService.prototype, allCollectionsMixin);

module.exports = ClientDomainSchemaService;

});