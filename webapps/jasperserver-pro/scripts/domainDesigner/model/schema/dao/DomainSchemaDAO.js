define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var allCollectionsMixin = require("../mixin/allCollectionsMixin");

var entityUtil = require("../util/entityUtil");

var schemaModelUtil = require("../util/schemaModelUtil");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

var entitiesWithChildResourcesList = require("../enum/entitiesWithChildResourcesList");

var entityTypeToSchemaCollectionMap = require("../enum/entityTypeToSchemaCollectionMap");

var schemaCollectionsEnum = require("../enum/schemaCollectionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BY_ID_VS_FILTER_TRESHOLD = 5;
var ENTITY_TO_REMOVE_ITEM_FACTORY_MAP = {};
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.CONSTANT_GROUP] = '_createRemoveResourceFromConstantGroupMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.DATA_SOURCE] = '_createRemoveResourceFromDataSourceMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.DATA_SOURCE_GROUP] = '_createRemoveResourceFromDataSourceGroupMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.TABLE] = '_createRemoveResourceFromTableMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.DERIVED_TABLE] = '_createRemoveResourceFromTableMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.TABLE_GROUP] = '_createRemoveResourceFromTableGroupMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.TABLE_REFERENCE] = '_createRemoveResourceFromTableReferenceMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.JOIN_TREE] = '_createRemoveResourceFromJoinTreeMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.JOIN] = '_createRemoveResourceFromJoinMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.DATA_ISLAND] = '_createRemoveResourceFromDataIslandMap';
ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[schemaEntitiesEnum.PRESENTATION_SET] = '_createRemoveResourceFromPresentationSetMap';

var DomainSchemaDAO = function DomainSchemaDAO(options) {
  this.dataStore = options.dataStore;
  this.schemaModelConverter = options.schemaModelConverter;
  this.mixInAllCollections(this.dataStore);
};

_.extend(DomainSchemaDAO.prototype, {
  // CRUD
  setCollection: function setCollection(collectionName, newCollection) {
    this._setCollection(this[collectionName], newCollection);
  },
  createFieldReference: function createFieldReference(fieldReference) {
    return this.schemaModelConverter.parseFieldReference({
      fieldReferenceJson: fieldReference
    });
  },
  addDataSource: function addDataSource(dataSource) {
    return this.schemaModelConverter.parseDataSource({
      dataSourceJson: dataSource,
      collections: this.dataStore.getCollections()
    });
  },
  updateDataSource: function updateDataSource(dataSourceJson) {
    var dataSource = this.dataSources.byId(dataSourceJson.id);
    dataSource.update(dataSourceJson);
    return dataSource;
  },
  removeDataSources: function removeDataSources(dataSourceIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeDataSources(dataSourceIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeDataSources: function _removeDataSources(dataSourceIds, removeResourcesOptions) {
    dataSourceIds = _.isArray(dataSourceIds) ? dataSourceIds : [dataSourceIds];

    var dataSources = this._getEntitiesByIds(dataSourceIds, this.dataSources);

    dataSources.forEach(function (dataSource) {
      this._removeDataSource(dataSource, removeResourcesOptions);
    }, this);
  },
  addDataSourceGroups: function addDataSourceGroups(newDataSourceGroups, parentId) {
    newDataSourceGroups = _.isArray(newDataSourceGroups) ? newDataSourceGroups : [newDataSourceGroups];

    var parent = this._getDataSourceGroupOrDataSource(parentId),
        dataSource = this._getDataSourceByDataSourceGroup(parent),
        collections = this.dataStore.getCollections();

    newDataSourceGroups = _.map(newDataSourceGroups, function (newDataSourceGroup) {
      return this.schemaModelConverter.parseDataSourceGroup({
        resource: newDataSourceGroup,
        parent: parent,
        dataSource: dataSource,
        collections: collections
      });
    }, this);
    parent.addChildren(newDataSourceGroups);
    return newDataSourceGroups;
  },
  removeDataSourceGroups: function removeDataSourceGroups(groupIds, parentId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeDataSourceGroups(groupIds, parentId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeDataSourceGroups: function _removeDataSourceGroups(groupIds, parentId, removeResourcesOptions) {
    groupIds = _.isArray(groupIds) ? groupIds : [groupIds];

    var parentGroup = this._getDataSourceGroupOrDataSource(parentId);

    var dataSourceGroups = this._getEntitiesByIds(groupIds, this.dataSourceGroups);

    dataSourceGroups.forEach(function (dataSourceGroup) {
      this._removeDataSourceGroupFromParent(dataSourceGroup, parentGroup, removeResourcesOptions);
    }, this);
  },
  removeDataSourceGroupsAndMoveChildren: function removeDataSourceGroupsAndMoveChildren(dataSourceGroupId, parentId) {
    var dataSource = this._getDataSourceGroupOrDataSource(parentId);

    var dataSourceGroup = dataSource.getChild(dataSourceGroupId);
    dataSource.addChildren(dataSourceGroup.getChildren().toArray());
    dataSource.getChildren().each(function (child) {
      child.update({
        parentId: parentId
      });
    });
    dataSource.removeChild(dataSourceGroupId);
    this.dataSourceGroups.remove(0, this.dataSourceGroups.size());
  },
  addDataSourceGroupAndMoveChildren: function addDataSourceGroupAndMoveChildren(options) {
    this.addDataSourceGroups(options, options.parentId);
    var dataSourceGroup = this.dataSourceGroups.first();

    var dataSourceChildren = [],
        dataSource = this._getDataSourceGroupOrDataSource(options.parentId);

    dataSource.getChildren().each(function (entity) {
      if (entityUtil.isGenericTable(entity)) {
        dataSourceGroup.addChildren(entity);
      } else {
        dataSourceChildren.push(entity);
      }
    });
    dataSource.setChildren(dataSourceChildren);
    dataSourceGroup.getChildren().each(function (child) {
      child.update({
        parentId: dataSourceGroup.id
      });
    });
  },
  updateDataSourceGroup: function updateDataSourceGroup(dataSourceGroupJson) {
    var dataSourceGroup = this.dataSourceGroups.byId(dataSourceGroupJson.id);
    dataSourceGroup.update(dataSourceGroupJson);
    return dataSourceGroup;
  },
  addDerivedTables: function addDerivedTables(derivedTables, parentId) {
    derivedTables = _.isArray(derivedTables) ? derivedTables : [derivedTables];

    var parent = this._getDataSourceGroupOrDataSource(parentId),
        dataSource = this._getDataSourceByDataSourceGroup(parent),
        collections = this.dataStore.getCollections();

    derivedTables = _.map(derivedTables, function (table) {
      return this.schemaModelConverter.parseDerivedTable({
        resource: table,
        parent: parent,
        dataSource: dataSource,
        collections: collections
      });
    }, this);
    parent.addChildren(derivedTables);
    return derivedTables;
  },
  addTables: function addTables(tables, parentId) {
    tables = _.isArray(tables) ? tables : [tables];

    var parent = this._getDataSourceGroupOrDataSource(parentId),
        dataSource = this._getDataSourceByDataSourceGroup(parent),
        collections = this.dataStore.getCollections();

    tables = _.map(tables, function (table) {
      return this.schemaModelConverter.parseGenericTable({
        resource: table,
        parent: parent,
        dataSource: dataSource,
        collections: collections
      });
    }, this);
    parent.addChildren(tables);
    return tables;
  },
  removeTables: function removeTables(tableIds, parentId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeTables(tableIds, parentId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeTables: function _removeTables(tableIds, parentId, removeResourcesOptions) {
    tableIds = _.isArray(tableIds) ? tableIds : [tableIds];

    var parent = this._getDataSourceGroupOrDataSource(parentId);

    var tables = this._getEntitiesByIds(tableIds, this.tables);

    tables.forEach(function (table) {
      this._removeTableFromParent(table, parent, removeResourcesOptions);
    }, this);
  },
  updateTable: function updateTable(tableJson) {
    var table = this.tables.byId(tableJson.id);
    table.update(tableJson);
    return table;
  },
  addFields: function addFields(fields, parentId) {
    fields = _.isArray(fields) ? fields : [fields];

    var parent = this._getTableOrTableGroup(parentId),
        table = this._getTableByTableGroup(parent),
        dataSource = this.dataSources.byId(table.dataSourceId),
        collections = this.dataStore.getCollections();

    fields = _.map(fields, function (field) {
      return this.schemaModelConverter.parseField({
        resource: field,
        parent: parent,
        dataSource: dataSource,
        table: table,
        collections: collections
      });
    }, this);
    parent.addChildren(fields);
    return fields;
  },
  removeFields: function removeFields(fieldIds, parentId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeFields(fieldIds, parentId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeFields: function _removeFields(fieldIds, parentId, removeResourcesOptions) {
    fieldIds = _.isArray(fieldIds) ? fieldIds : [fieldIds];

    var parent = this._getTableOrTableGroup(parentId);

    var fields = this._getEntitiesByIds(fieldIds, this.fields);

    fields.forEach(function (field) {
      this._removeFieldFromParent(field, parent, removeResourcesOptions);
    }, this);
  },
  updateField: function updateField(fieldJson) {
    var field = this.fields.byId(fieldJson.id);
    field.update(fieldJson);
    return field;
  },
  addConstantGroup: function addConstantGroup(constantGroup) {
    return this.schemaModelConverter.parseConstantGroup({
      constantGroupJson: constantGroup,
      collections: this.dataStore.getCollections()
    });
  },
  removeConstantGroups: function removeConstantGroups(constantGroupIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeConstantGroups(constantGroupIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeConstantGroups: function _removeConstantGroups(constantGroupIds, removeResourcesOptions) {
    constantGroupIds = _.isArray(constantGroupIds) ? constantGroupIds : [constantGroupIds];

    var constantGroups = this._getEntitiesByIds(constantGroupIds, this.constantGroups);

    constantGroups.forEach(function (constantGroup) {
      this._removeConstantGroup(constantGroup, removeResourcesOptions);
    }, this);
  },
  updateConstantGroup: function updateConstantGroup(constantGroupJson) {
    var constantGroup = this.constantGroups.byId(constantGroupJson.id);
    constantGroup.update(constantGroupJson);
    return constantGroup;
  },
  addCalcField: function addCalcField(calcFieldJson, sourceId, sourceType) {
    var collections = this.dataStore.getCollections();
    var parent = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);
    var calcField = this.schemaModelConverter.parseCalcField({
      calcFieldJson: calcFieldJson,
      parent: parent,
      collections: collections
    });
    parent.addCalcField(calcField);
    return calcField;
  },
  removeCalcFields: function removeCalcFields(calcFieldIds, sourceId, sourceType) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeCalcFields(calcFieldIds, sourceId, sourceType, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeCalcFields: function _removeCalcFields(calcFieldIds, sourceId, sourceType, removeResourcesOptions) {
    calcFieldIds = _.isArray(calcFieldIds) ? calcFieldIds : [calcFieldIds];
    var collections = this.dataStore.getCollections(),
        parent = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);

    var calcFields = this._getEntitiesByIds(calcFieldIds, this.fields);

    calcFields.forEach(function (calcField) {
      this._removeCalcFieldFromParent(calcField, parent, removeResourcesOptions);
    }, this);
  },
  updateCalcField: function updateCalcField(calcFieldJson, sourceId, sourceType) {
    var collections = this.dataStore.getCollections();
    var source = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);
    var calcField = source.getCalcFields().byId(calcFieldJson.id);
    calcField.update(calcFieldJson);

    if (_.has(calcFieldJson, 'fieldReferences')) {
      var fieldReferences = calcFieldJson.fieldReferences;
      calcField.setFieldReferences(_.map(fieldReferences, function (fieldReference) {
        return this.schemaModelConverter.parseFieldReference({
          fieldReferenceJson: fieldReference
        });
      }, this));
    }

    return calcField;
  },
  addFilterExpression: function addFilterExpression(filterExpressionJson, sourceId, sourceType) {
    var collections = this.dataStore.getCollections();
    var parent = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);
    var filterExpression = this.schemaModelConverter.parseFilterExpression({
      filterJson: filterExpressionJson,
      parent: parent,
      collections: collections
    });
    parent.addFilter(filterExpression);
    return filterExpression;
  },
  updateFilterExpression: function updateFilterExpression(filterExpressionJson, sourceId, sourceType) {
    var collections = this.dataStore.getCollections();
    var source = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);
    var filterExpression = source.getFilters().byId(filterExpressionJson.id);
    filterExpression.update(filterExpressionJson);

    if (_.has(filterExpressionJson, 'fieldReferences')) {
      var fieldReferences = filterExpressionJson.fieldReferences;
      filterExpression.setFieldReferences(_.map(fieldReferences, function (fieldReference) {
        return this.schemaModelConverter.parseFieldReference({
          fieldReferenceJson: fieldReference
        });
      }, this));
    }

    return filterExpression;
  },
  removeFilters: function removeFilters(filterIds, sourceId, sourceType) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeFilters(filterIds, sourceId, sourceType, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeFilters: function _removeFilters(filterIds, sourceId, sourceType, removeResourcesOptions) {
    filterIds = _.isArray(filterIds) ? filterIds : [filterIds];
    var collections = this.dataStore.getCollections(),
        parent = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);

    var filters = this._getEntitiesByIds(filterIds, this.filters);

    filters.forEach(function (filter) {
      this._removeFilterFromParent(filter, parent, removeResourcesOptions);
    }, this);
  },
  addTableReference: function addTableReference(tableReference) {
    return this.schemaModelConverter.parseTableReference({
      tableReferenceJson: tableReference,
      collections: this.dataStore.getCollections()
    });
  },
  removeTableReferences: function removeTableReferences(tableReferencesIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeTableReferences(tableReferencesIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeTableReferences: function _removeTableReferences(tableReferencesIds, removeResourcesOptions) {
    tableReferencesIds = _.isArray(tableReferencesIds) ? tableReferencesIds : [tableReferencesIds];

    var tableReferences = this._getEntitiesByIds(tableReferencesIds, this.tableReferences);

    tableReferences.forEach(function (tableReference) {
      this._removeTableReference(tableReference, removeResourcesOptions);
    }, this);
  },
  updateTableReference: function updateTableReference(tableReferenceJson) {
    var tableReference = this.tableReferences.byId(tableReferenceJson.id);
    tableReference.update(tableReferenceJson);
    return tableReference;
  },
  addJoinTree: function addJoinTree(joinTree) {
    return this.schemaModelConverter.parseJoinTree({
      joinTreeJson: joinTree,
      collections: this.dataStore.getCollections()
    });
  },
  removeJoinTrees: function removeJoinTrees(joinTreeIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeJoinTrees(joinTreeIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeJoinTrees: function _removeJoinTrees(joinTreeIds, removeResourcesOptions) {
    joinTreeIds = _.isArray(joinTreeIds) ? joinTreeIds : [joinTreeIds];

    var joinTrees = this._getEntitiesByIds(joinTreeIds, this.joinTrees);

    joinTrees.forEach(function (joinTree) {
      this._removeJoinTree(joinTree, removeResourcesOptions);
    }, this);
  },
  updateJoinTree: function updateJoinTree(joinTreeJson) {
    var joinTreeId = joinTreeJson && joinTreeJson.id,
        joinTree = this.joinTrees.byId(joinTreeId);

    if (!joinTree) {
      throw new Error('There is no join tree with id ' + joinTreeId);
    }

    joinTree.update(joinTreeJson);
    return joinTree;
  },
  addJoin: function addJoin(join, joinTreeId) {
    var joinTree = this.joinTrees.byId(joinTreeId);

    if (!joinTree) {
      throw new Error('There is no join tree with id ' + joinTreeId);
    }

    var newJoin = this.schemaModelConverter.parseJoin({
      joinTree: joinTree,
      joinJson: join,
      collections: this.dataStore.getCollections()
    });
    joinTree.addJoin(newJoin);
    return newJoin;
  },
  removeJoins: function removeJoins(joinIds, joinTreeId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeJoins(joinIds, joinTreeId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeJoins: function _removeJoins(joinIds, joinTreeId, removeResourcesOptions) {
    joinIds = _.isArray(joinIds) ? joinIds : [joinIds];
    var joinTree = this.joinTrees.byId(joinTreeId);

    if (!joinTree) {
      throw new Error('There is no join tree with id ' + joinTreeId);
    }

    var joins = this._getEntitiesByIds(joinIds, this.joins);

    joins.forEach(function (join) {
      this._removeJoinFromParent(join, joinTree, removeResourcesOptions);
    }, this);
  },
  updateJoin: function updateJoin(joinJson) {
    var joinId = joinJson && joinJson.id,
        join = this.joins.byId(joinId);

    if (!join) {
      throw new Error('There is no join with id ' + joinId);
    }

    join.update(joinJson);
    return join;
  },
  addJoinAlias: function addJoinAlias(joinAlias, joinTreeId) {
    var joinTree = this.joinTrees.byId(joinTreeId);

    if (!joinTree) {
      throw new Error('There is no join tree with id ' + joinTreeId);
    }

    var newJoinAlias = this.schemaModelConverter.parseJoinAlias({
      joinAliasJson: joinAlias,
      joinTree: joinTree,
      collections: this.dataStore.getCollections()
    });
    joinTree.addJoinAlias(newJoinAlias);
    return newJoinAlias;
  },
  updateJoinAlias: function updateJoinAlias(joinAliasJson) {
    var joinAliasId = joinAliasJson && joinAliasJson.id,
        joinAlias = this.joinAliases.byId(joinAliasId);

    if (!joinAlias) {
      throw new Error('There is no join alias with id ' + joinAliasId);
    }

    joinAlias.update(joinAliasJson);
    return joinAlias;
  },
  removeJoinAliases: function removeJoinAliases(joinAliasIds, joinTree) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeJoinAliases(joinAliasIds, joinTree, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeJoinAliases: function _removeJoinAliases(joinAliasIds, joinTree, removeResourcesOptions) {
    joinAliasIds = _.isArray(joinAliasIds) ? joinAliasIds : [joinAliasIds];

    var joinAliases = this._getEntitiesByIds(joinAliasIds, this.joinAliases);

    joinAliases.forEach(function (joinAlias) {
      this._removeJoinAliasFromParent(joinAlias, joinTree, removeResourcesOptions);
    }, this);
  },
  addJoinExpression: function addJoinExpression(joinExpression, joinId) {
    var join = this.joins.byId(joinId);

    if (!join) {
      throw new Error('There is no join with id ' + joinId);
    }

    var newJoinExpression = this.schemaModelConverter.parseJoinExpression({
      joinExpressionJson: joinExpression,
      join: join,
      collections: this.dataStore.getCollections()
    });
    join.addJoinExpression(newJoinExpression);
    return newJoinExpression;
  },
  removeJoinExpressions: function removeJoinExpressions(joinExpressionIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeJoinExpressions(joinExpressionIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeJoinExpressions: function _removeJoinExpressions(joinExpressionIds, removeResourcesOptions) {
    joinExpressionIds = _.isArray(joinExpressionIds) ? joinExpressionIds : [joinExpressionIds];

    var joinExpressions = this._getEntitiesByIds(joinExpressionIds, this.joinExpressions);

    joinExpressions.forEach(function (joinExpression) {
      this._removeJoinExpressionFromParent(joinExpression, null, removeResourcesOptions);
    }, this);
  },
  updateJoinExpression: function updateJoinExpression(joinExpressionJson) {
    var joinExpressionId = joinExpressionJson && joinExpressionJson.id,
        joinExpression = this.joinExpressions.byId(joinExpressionId);

    if (!joinExpression) {
      throw new Error('There is no join expression with id ' + joinExpressionId);
    }

    joinExpression.update(joinExpressionJson);
    return joinExpression;
  },
  addConstantJoinExpression: function addConstantJoinExpression(constantJoinExpression, joinId) {
    var join = this.joins.byId(joinId);

    if (!join) {
      throw new Error('There is no join with id ' + joinId);
    }

    constantJoinExpression = this.schemaModelConverter.parseConstantJoinExpression({
      joinExpressionJson: constantJoinExpression,
      join: join,
      collections: this.dataStore.getCollections()
    });
    join.addJoinExpression(constantJoinExpression);
    return constantJoinExpression;
  },
  removeConstantJoinExpressions: function removeConstantJoinExpressions(constantJoinExpressionIds) {
    this.removeJoinExpressions(constantJoinExpressionIds);
  },
  updateConstantJoinExpression: function updateConstantJoinExpression(constantJoinExpressionJson) {
    this.updateJoinExpression(constantJoinExpressionJson);
  },
  addDataIsland: function addDataIsland(dataIsland) {
    if (!dataIsland.sourceId) {
      dataIsland.sourceId = null;
    }

    return this.schemaModelConverter.parseDataIsland({
      dataIslandJson: dataIsland,
      collections: this.dataStore.getCollections()
    });
  },
  removeDataIslands: function removeDataIslands(dataIslandIds) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removeDataIslands(dataIslandIds, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removeDataIslands: function _removeDataIslands(dataIslandIds, removeResourcesOptions) {
    dataIslandIds = _.isArray(dataIslandIds) ? dataIslandIds : [dataIslandIds];

    var dataIslands = this._getEntitiesByIds(dataIslandIds, this.dataIslands);

    dataIslands.forEach(function (dataIsland) {
      this._removeDataIsland(dataIsland, removeResourcesOptions);
    }, this);
  },
  updateDataIsland: function updateDataIsland(dataIslandJson) {
    var dataIslandId = dataIslandJson && dataIslandJson.id,
        dataIsland = this.dataIslands.byId(dataIslandId);

    if (!dataIsland) {
      throw new Error('There is no data island with id ' + dataIslandId);
    }

    dataIsland.update(dataIslandJson);
    return dataIsland;
  },
  addPresentationSets: function addPresentationSets(presentationSets, options) {
    options = options || {};
    var collections = this.dataStore.getCollections(),
        dataIsland,
        parent = schemaModelUtil.getDataIslandOrPresentationSetById(options.parentId, collections),
        positionInParent = options.positionInParent;
    dataIsland = schemaModelUtil.getDataIslandByPresentationItem(parent, collections);
    presentationSets = _.isArray(presentationSets) ? presentationSets : [presentationSets];
    presentationSets = _.map(presentationSets, function (presentationSet) {
      return this.schemaModelConverter.parsePresentationSet({
        presentationItem: presentationSet,
        parent: parent,
        dataIsland: dataIsland,
        collections: collections
      });
    }, this);
    parent.addChildren(presentationSets, positionInParent);
    return presentationSets;
  },
  updatePresentationSet: function updatePresentationSet(presentationSetJson) {
    var presentationSet = this.presentationSets.byId(presentationSetJson.id);
    presentationSet.update(presentationSetJson);
    return presentationSet;
  },
  removePresentationSets: function removePresentationSets(presentationSetIds, parentId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removePresentationSets(presentationSetIds, parentId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removePresentationSets: function _removePresentationSets(presentationSetIds, parentId, removeResourcesOptions) {
    var collections = this.dataStore.getCollections(),
        parent = schemaModelUtil.getDataIslandOrPresentationSetById(parentId, collections);
    presentationSetIds = _.isArray(presentationSetIds) ? presentationSetIds : [presentationSetIds];

    var presentationSets = this._getEntitiesByIds(presentationSetIds, this.presentationSets);

    presentationSets.forEach(function (presentationSet) {
      this._removePresentationSetFromParent(presentationSet, parent, removeResourcesOptions);
    }, this);
  },
  addPresentationFields: function addPresentationFields(presentationFields, options) {
    options = options || {};
    var collections = this.dataStore.getCollections(),
        dataIsland,
        parent = schemaModelUtil.getDataIslandOrPresentationSetById(options.parentId, collections),
        positionInParent = options.positionInParent;

    if (entityUtil.isDataIsland(parent)) {
      dataIsland = parent;
    } else if (entityUtil.isPresentationSet(parent)) {
      dataIsland = schemaModelUtil.getDataIslandById(parent.dataIslandId, collections);
    }

    presentationFields = _.isArray(presentationFields) ? presentationFields : [presentationFields];
    presentationFields = _.map(presentationFields, function (presentationField) {
      var parsedPresentationField = this.schemaModelConverter.parsePresentationField({
        presentationItem: presentationField,
        parent: parent,
        dataIsland: dataIsland,
        collections: collections
      });
      return parsedPresentationField;
    }, this);
    parent.addChildren(presentationFields, positionInParent);
    return presentationFields;
  },
  updatePresentationField: function updatePresentationField(presentationFieldJson) {
    var presentationField = this.presentationFields.byId(presentationFieldJson.id);
    presentationField.update(presentationFieldJson);
    return presentationField;
  },
  removePresentationFields: function removePresentationFields(presentationFieldIds, parentId) {
    var removeResourcesOptions = this._getRemoveResourcesOptions();

    this._removePresentationFields(presentationFieldIds, parentId, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  _removePresentationFields: function _removePresentationFields(presentationFieldIds, parentId, removeResourcesOptions) {
    var collections = this.dataStore.getCollections(),
        parent = schemaModelUtil.getDataIslandOrPresentationSetById(parentId, collections);
    presentationFieldIds = _.isArray(presentationFieldIds) ? presentationFieldIds : [presentationFieldIds];

    var presentationFields = this._getEntitiesByIds(presentationFieldIds, this.presentationFields);

    presentationFields.forEach(function (presentationField) {
      this._removePresentationFieldFromParent(presentationField, parent, removeResourcesOptions);
    }, this);
  },
  removePresentationFieldsFromDataIsland: function removePresentationFieldsFromDataIsland(dataIslandId) {
    var dataIsland = this.dataIslands.byId(dataIslandId);

    var removeResourcesOptions = this._getRemoveResourcesOptions();

    if (!dataIsland) {
      throw new Error('There is no data island with id ' + dataIslandId);
    }

    this._removePresentationFieldsByParent(dataIsland, removeResourcesOptions);

    this._removeResourcesByRemoveResourcesOptions(removeResourcesOptions);
  },
  reorderDataIslands: function reorderDataIslands(options) {
    var dataIslandsCollection = this.dataIslands,
        dataIslandIdsForReorder = options.dataIslandIds,
        position = options.position;

    var dataIslandEntitiesForReorder = this._getFromCollectionByIdsAndPreserveOrder(dataIslandIdsForReorder, dataIslandsCollection);

    this._removeFromCollectionByIds(dataIslandIdsForReorder, this.dataIslands);

    this.dataIslands.add(dataIslandEntitiesForReorder, position);
  },
  reorderPresentationItems: function reorderPresentationItems(options) {
    var collections = this.dataStore.getCollections(),
        presentationItemIdsForReorder = options.presentationItemIds,
        position = options.position,
        targetParentId = options.targetParentId,
        targetParent = schemaModelUtil.getDataIslandOrPresentationSetById(targetParentId, collections);

    var presentationItemEntities = _.map(presentationItemIdsForReorder, function (presentationItemId) {
      return schemaModelUtil.getPresentationSetOrFieldById(presentationItemId, collections);
    });

    _.each(presentationItemEntities, function (presentationItem) {
      this._removeFromPresentationParent(presentationItem, collections);
    }, this);

    this._addChildrenToPresentationParent({
      children: presentationItemEntities,
      parent: targetParent,
      position: position
    });
  },
  _addChildrenToPresentationParent: function _addChildrenToPresentationParent(options) {
    var children = _.isArray(options.children) ? options.children : [options.children],
        parent = options.parent,
        position = options.position,
        isPositionGiven = !_.isUndefined(position);

    _.each(children, function (child, index) {
      var childPosition = isPositionGiven ? position + index : position;

      this._updatePresentationItemParentId(child, parent.id);

      parent.addChildren(child, childPosition);
    }, this);
  },
  _getFromCollectionByIdsAndPreserveOrder: function _getFromCollectionByIdsAndPreserveOrder(ids, collection) {
    var idsMap = this._idsListToMap(ids);

    return collection.reduce(function (memo, item) {
      var index = idsMap[item.id];

      if (index) {
        memo[index - 1] = item;
      }

      return memo;
    }, []);
  },
  _removeFromPresentationParent: function _removeFromPresentationParent(presentationItem, collections) {
    var parentId = presentationItem.parentId,
        parent = schemaModelUtil.getDataIslandOrPresentationSetById(parentId, collections);
    parent.removeChild(presentationItem.id);
  },
  _updatePresentationItemParentId: function _updatePresentationItemParentId(presentationItem, parentId) {
    var updateOptions = {
      id: presentationItem.id,
      parentId: parentId
    };

    if (entityUtil.isPresentationSet(presentationItem)) {
      this.updatePresentationSet(updateOptions);
    } else if (entityUtil.isPresentationField(presentationItem)) {
      this.updatePresentationField(updateOptions);
    }
  },
  _idsListToMap: function _idsListToMap(ids) {
    return ids.reduce(function (memo, id, index) {
      memo[id] = index + 1;
      return memo;
    }, {});
  },
  _removeFromCollectionByIds: function _removeFromCollectionByIds(ids, collection) {
    var idsMap = this._idsListToMap(ids);

    this._removeManyResourcesFromCollection(idsMap, collection);
  },
  _getDataSourceGroupOrDataSource: function _getDataSourceGroupOrDataSource(dataSourceGroupId) {
    return schemaModelUtil.getDataSourceGroupOrDataSource(dataSourceGroupId, {
      dataSources: this.dataSources,
      dataSourceGroups: this.dataSourceGroups
    });
  },
  _getDataSourceByDataSourceGroup: function _getDataSourceByDataSourceGroup(dataSourceGroupOrDataSource) {
    if (entityUtil.isDataSource(dataSourceGroupOrDataSource)) {
      return dataSourceGroupOrDataSource;
    } else {
      return this.dataSources.byId(dataSourceGroupOrDataSource.dataSourceId);
    }
  },
  _getTableOrTableGroup: function _getTableOrTableGroup(tableGroupId) {
    var table = this.tables.byId(tableGroupId),
        tableGroup = table;

    if (!tableGroup) {
      tableGroup = this.tableGroups.byId(tableGroupId);
    }

    return tableGroup;
  },
  _getTableByTableGroup: function _getTableByTableGroup(tableGroup) {
    if (entityUtil.isTable(tableGroup)) {
      return tableGroup;
    } else {
      return this.tables.byId(tableGroup.tableId);
    }
  },
  _removeDataSource: function _removeDataSource(dataSource, removeResourcesOptions) {
    var dataSourceId = dataSource.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.DATA_SOURCES][dataSourceId] = true;
    dataSource.getChildren().each(function (child) {
      if (entityUtil.isDataSourceGroup(child)) {
        this._removeDataSourceGroup(child, dataSource, removeResourcesOptions);
      } else if (entityUtil.isTable(child)) {
        this._removeTable(child, dataSource, removeResourcesOptions);
      }
    }, this);
  },
  _removeDataSourceGroupFromParent: function _removeDataSourceGroupFromParent(dataSourceGroup, parentGroup, removeResourcesOptions) {
    this._removeDataSourceGroup(dataSourceGroup, parentGroup, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(parentGroup, removeResourcesOptions);

    removeResourcesMap.children[dataSourceGroup.id] = true;
  },
  _removeDataSourceGroup: function _removeDataSourceGroup(dataSourceGroup, parentGroup, removeResourcesOptions) {
    var dataSourceGroupId = dataSourceGroup.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.DATA_SOURCE_GROUPS][dataSourceGroupId] = true;
    dataSourceGroup.getChildren().each(function (child) {
      if (entityUtil.isDataSourceGroup(child)) {
        this._removeDataSourceGroup(child, dataSourceGroup, removeResourcesOptions);
      } else if (entityUtil.isTable(child)) {
        this._removeTable(child, dataSourceGroup, removeResourcesOptions);
      }
    }, this);
  },
  _removeDataIsland: function _removeDataIsland(dataIsland, removeResourcesOptions) {
    var dataIslandId = dataIsland.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.DATA_ISLANDS][dataIslandId] = true;

    this._removePresentationChildren(dataIsland, removeResourcesOptions);
  },
  _removePresentationChildren: function _removePresentationChildren(parent, removeResourcesOptions) {
    parent.getChildren().each(function (child) {
      if (entityUtil.isPresentationSet(child)) {
        this._removePresentationSet(child, removeResourcesOptions);
      } else if (entityUtil.isPresentationField(child)) {
        this._removePresentationField(child, removeResourcesOptions);
      }
    }, this);
  },
  _removePresentationSetFromParent: function _removePresentationSetFromParent(presentationSet, parent, removeResourcesOptions) {
    this._removePresentationSet(presentationSet, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(parent, removeResourcesOptions);

    removeResourcesMap.children[presentationSet.id] = true;
  },
  _removePresentationSet: function _removePresentationSet(presentationSet, removeResourcesOptions) {
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.PRESENTATION_SETS][presentationSet.id] = true;

    this._removePresentationChildren(presentationSet, removeResourcesOptions);
  },
  _removePresentationFieldFromParent: function _removePresentationFieldFromParent(presentationField, parent, removeResourcesOptions) {
    this._removePresentationField(presentationField, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(parent, removeResourcesOptions);

    removeResourcesMap.children[presentationField.id] = true;
  },
  _removePresentationField: function _removePresentationField(presentationField, removeResourcesOptions) {
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.PRESENTATION_FIELDS][presentationField.id] = true;
  },
  _removeJoinTree: function _removeJoinTree(joinTree, removeResourcesOptions) {
    var joinTreeId = joinTree.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.JOIN_TREES][joinTreeId] = true;
    joinTree.getCalcFields().each(function (calcField) {
      this._removeCalcField(calcField, joinTree, removeResourcesOptions);
    }, this);
    joinTree.getJoinAliases().each(function (joinAlias) {
      this._removeJoinAlias(joinAlias, joinTree, removeResourcesOptions);
    }, this);
    joinTree.getJoins().each(function (join) {
      this._removeJoin(join, joinTree, removeResourcesOptions);
    }, this);
    joinTree.getFilters().each(function (filter) {
      this._removeFilter(filter, removeResourcesOptions);
    }, this);

    this._removeSourceFromDataIslandBySourceId(joinTreeId);
  },
  _removeJoinFromParent: function _removeJoinFromParent(join, joinTree, removeResourcesOptions) {
    this._removeJoin(join, joinTree, removeResourcesOptions);

    joinTree = joinTree || this.joinTrees.byId(join.joinTreeId);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(joinTree, removeResourcesOptions);

    removeResourcesMap.joins[join.id] = true;
  },
  _removeJoin: function _removeJoin(join, joinTree, removeResourcesOptions) {
    var joinId = join.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.JOINS][joinId] = true;

    this._removeAllJoinExpressionsByJoin(join, removeResourcesOptions);
  },
  _removePresentationFieldsBySourceId: function _removePresentationFieldsBySourceId(sourceId, removeResourcesOptions) {
    if (!removeResourcesOptions.dependentPresentationFieldsBySourceId) {
      var collections = this.dataStore.getCollections();
      removeResourcesOptions.dependentPresentationFieldsBySourceId = this.presentationFields.reduce(function (memo, field) {
        var presentationFieldWithParent = {
          field: field,
          parent: schemaModelUtil.getDataIslandOrPresentationSetById(field.parentId, collections)
        };

        if (!memo[field.sourceId]) {
          memo[field.sourceId] = [];
        }

        memo[field.sourceId].push(presentationFieldWithParent);
        return memo;
      }, {});
    }

    var dependentPresentationFieldsBySourceId = removeResourcesOptions.dependentPresentationFieldsBySourceId[sourceId];

    _.each(dependentPresentationFieldsBySourceId, function (fieldWithParent) {
      var field = fieldWithParent.field,
          parent = fieldWithParent.parent;

      this._removePresentationFieldFromParent(field, parent, removeResourcesOptions);
    }, this);
  },
  _removePresentationFieldsByParent: function _removePresentationFieldsByParent(parent, removeResourcesOptions) {
    var children = parent.getChildren().toArray();

    _.each(children, function (child) {
      if (entityUtil.isPresentationSet(child)) {
        this._removePresentationFieldsByParent(child, removeResourcesOptions);
      } else if (entityUtil.isPresentationField(child)) {
        this._removePresentationFieldFromParent(child, parent, removeResourcesOptions);
      }
    }, this);
  },
  _removeAllJoinExpressionsByJoin: function _removeAllJoinExpressionsByJoin(join, removeResourcesOptions) {
    if (entityUtil.isJoin(join)) {
      join.getJoinExpressions().each(function (joinExpression) {
        this._removeJoinExpression(joinExpression, removeResourcesOptions);
      }, this);
    }
  },
  _removeJoinAliasFromParent: function _removeJoinAliasFromParent(joinAlias, joinTree, removeResourcesOptions) {
    this._removeJoinAlias(joinAlias, joinTree, removeResourcesOptions);

    joinTree = joinTree || this.joinTrees.byId(joinAlias.joinTreeId);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(joinTree, removeResourcesOptions);

    removeResourcesMap.joinAliases[joinAlias.id] = true;
  },
  _removeJoinAlias: function _removeJoinAlias(joinAlias, joinTree, removeResourcesOptions) {
    var joinAliasId = joinAlias.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.JOIN_ALIASES][joinAliasId] = true;

    this._removeJoinsByJoinAlias(joinAliasId, removeResourcesOptions);

    this._removeFiltersByJoinAlias(joinAliasId, removeResourcesOptions);

    this._removeCalcFieldsByJoinAlias(joinAliasId, removeResourcesOptions);

    this._removePresentationFieldsBySourceId(joinAliasId, removeResourcesOptions);
  },
  _removeJoinExpressionFromParent: function _removeJoinExpressionFromParent(joinExpression, join, removeResourcesOptions) {
    this._removeJoinExpression(joinExpression, removeResourcesOptions);

    join = join || this.joins.byId(joinExpression.joinId);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(join, removeResourcesOptions);

    removeResourcesMap.joinExpressions[joinExpression.id] = true;
  },
  _removeJoinExpression: function _removeJoinExpression(joinExpression, removeResourcesOptions) {
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.JOIN_EXPRESSIONS][joinExpression.id] = true;
  },
  _removeTableFromParent: function _removeTableFromParent(table, parentGroup, removeResourcesOptions) {
    this._removeTable(table, parentGroup, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(parentGroup, removeResourcesOptions);

    removeResourcesMap.children[table.id] = true;
  },
  _removeTable: function _removeTable(table, parentGroup, removeResourcesOptions) {
    var self = this,
        tableId = table.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.TABLES][tableId] = true;
    table.children.each(function (child) {
      if (entityUtil.isTableGroup(child)) {
        self._removeTableGroup(child, table, removeResourcesOptions);
      } else if (entityUtil.isField(child)) {
        self._removeField(child, table, removeResourcesOptions);
      }
    });
    this.tableReferences.each(function (tableReference) {
      if (tableReference.tableId === tableId) {
        this._removeTableReference(tableReference, removeResourcesOptions);
      }
    }, this);
  },
  _removeTableGroupFromParent: function _removeTableGroupFromParent(tableGroup, parentGroup, removeResourcesOptions) {
    throw new Error('not implemented');
  },
  _removeTableGroup: function _removeTableGroup(tableGroup, parentGroup, removeResourcesOptions) {
    var self = this,
        tableGroupId = tableGroup.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.TABLE_GROUPS][tableGroupId] = true;

    if (!tableGroup) {
      throw new Error('There is no table group with id ' + tableGroupId);
    }

    tableGroup.children.each(function (child) {
      if (entityUtil.isTableGroup(child)) {
        self._removeTableGroup(child, tableGroup, removeResourcesOptions);
      } else if (entityUtil.isField(child)) {
        self._removeField(child, tableGroup, removeResourcesOptions);
      }
    });
  },
  _removeSourceFromDataIsland: function _removeSourceFromDataIsland(dataIsland) {
    dataIsland.setSourceId(null);
    dataIsland.setSourceType(null);
  },
  _removeSourceFromDataIslandBySourceId: function _removeSourceFromDataIslandBySourceId(sourceId) {
    var dataIslands = this.dataIslands.where({
      'sourceId': sourceId
    });

    _.each(dataIslands, function (dataIsland) {
      this._removeSourceFromDataIsland(dataIsland);
    }, this);
  },
  _removeTableReference: function _removeTableReference(tableReference, removeResourcesOptions) {
    var self = this,
        tableReferenceId = tableReference.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.TABLE_REFERENCES][tableReferenceId] = true;
    var joinAliases = this.joinAliases.where({
      'tableReferenceId': tableReferenceId
    });

    _.each(joinAliases, function (joinAlias) {
      var joinTree = this.joinTrees.byId(joinAlias.joinTreeId);

      this._removeJoinTreeCalcFieldsByTableReferenceId(joinTree, tableReferenceId, removeResourcesOptions);
    }, this);

    _.each(joinAliases, function (joinAlias) {
      this._removeJoinAliasFromParent(joinAlias, null, removeResourcesOptions);
    }, this);

    tableReference.getCalcFields().toArray().forEach(function (calcField) {
      self._removeCalcField(calcField, tableReference, removeResourcesOptions);
    });
    tableReference.getFilters().each(function (filter) {
      self._removeFilter(filter, removeResourcesOptions);
    });

    this._removePresentationFieldsBySourceId(tableReferenceId, removeResourcesOptions);

    this._removeSourceFromDataIslandBySourceId(tableReferenceId);
  },
  _removeJoinTreeCalcFieldsByTableReferenceId: function _removeJoinTreeCalcFieldsByTableReferenceId(joinTree, tableReferenceId, removeResourcesOptions) {
    var self = this;
    schemaModelUtil.getJoinTreeCalcFieldsByTableReferenceId(joinTree, tableReferenceId).each(function (calcField) {
      self._removeCalcFieldFromParent(calcField, joinTree, removeResourcesOptions);
    });
  },
  _removeJoinsByJoinAlias: function _removeJoinsByJoinAlias(joinAliasId, removeResourcesOptions) {
    var self = this;
    var joins = this.joins.filter(function (join) {
      return self._joinByJoinAliasFilter(joinAliasId, join);
    });
    joins.forEach(function (join) {
      this._removeJoinFromParent(join, null, removeResourcesOptions);
    }, this);
  },
  _removeFiltersByJoinAlias: function _removeFiltersByJoinAlias(joinAliasId, removeResourcesOptions) {
    var joinAlias = this.joinAliases.byId(joinAliasId),
        joinTree = this.joinTrees.byId(joinAlias.joinTreeId);
    var filters = joinTree.filters.filter(function (filter) {
      return filter.fieldReferences.some(function (fieldReference) {
        return fieldReference.sourceId === joinAliasId;
      });
    });
    filters.forEach(function (filter) {
      this._removeFilterFromParent(filter, joinTree, removeResourcesOptions);
    }, this);
  },
  _removeCalcFieldsByJoinAlias: function _removeCalcFieldsByJoinAlias(joinAliasId, removeResourcesOptions) {
    var joinAlias = this.joinAliases.byId(joinAliasId),
        joinTree = this.joinTrees.byId(joinAlias.joinTreeId);
    var calcFields = joinTree.calcFields.filter(function (calcField) {
      return calcField.fieldReferences.some(function (fieldReference) {
        return fieldReference.sourceId === joinAliasId;
      });
    });
    calcFields.forEach(function (calcField) {
      this._removeCalcFieldFromParent(calcField, joinTree, removeResourcesOptions);
    }, this);
  },
  _joinByJoinAliasFilter: function _joinByJoinAliasFilter(joinAliasId, join) {
    var joinAliasIds;

    if (entityUtil.isComplexJoin(join)) {
      joinAliasIds = join.getFieldReferences().map(function (fieldReference) {
        return fieldReference.sourceId;
      });
    } else if (entityUtil.isJoin(join)) {
      joinAliasIds = [join.leftJoinAliasId, join.rightJoinAliasId];
    }

    return _.some(joinAliasIds, function (joinAliasIdFromJoin) {
      return joinAliasIdFromJoin === joinAliasId;
    });
  },
  _joinExpressionByFieldFilter: function _joinExpressionByFieldFilter(fieldId, source, joinExpression) {
    var collections = this.dataStore.getCollections(),
        sourceId = source.id;

    if (entityUtil.isJoinExpression(joinExpression)) {
      var leftJoinAlias = this.joinAliases.byId(joinExpression.leftJoinAliasId),
          rightJoinAlias = this.joinAliases.byId(joinExpression.rightJoinAliasId);
      var leftTableReferenceId = schemaModelUtil.getTableReferenceByJoinAlias(leftJoinAlias, collections).id,
          rightTableReferenceId = schemaModelUtil.getTableReferenceByJoinAlias(rightJoinAlias, collections).id;
      var leftFieldId = joinExpression.leftFieldId,
          rightFieldId = joinExpression.rightFieldId;
      return sourceId === leftTableReferenceId && leftFieldId === fieldId || sourceId === rightTableReferenceId && rightFieldId === fieldId;
    } else if (entityUtil.isConstantJoinExpression(joinExpression)) {
      var joinAlias = this.joinAliases.byId(joinExpression.joinAliasId),
          tableReferenceId = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections).id;
      return sourceId === tableReferenceId && fieldId === joinExpression.fieldId;
    } else {
      return false;
    }
  },
  _complexJoinByFieldIdFilter: function _complexJoinByFieldIdFilter(fieldId, source, join) {
    if (entityUtil.isComplexJoin(join)) {
      var self = this,
          collections = this.dataStore.getCollections();
      return join.getFieldReferences().some(function (fieldReference) {
        var joinAlias = self.joinAliases.byId(fieldReference.sourceId),
            tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
        return tableReference.id === source.id && fieldReference.fieldId === fieldId;
      });
    } else {
      return false;
    }
  },
  _filterByFieldFilter: function _filterByFieldFilter(fieldId, source, filter) {
    var self = this,
        collections = this.dataStore.getCollections();
    return filter.getFieldReferences().some(function (fieldReference) {
      var isFieldIdMatch = fieldReference.fieldId === fieldId;

      if (isFieldIdMatch) {
        var fieldReferenceSourceId = fieldReference.sourceId;
        var isSourceTableReference = entityUtil.isTableReference(source);
        var isFieldReferenceSourceJoinAlias = entityUtil.isJoinAlias(fieldReference.sourceType);

        if (isSourceTableReference && isFieldReferenceSourceJoinAlias) {
          var joinAlias = self.joinAliases.byId(fieldReference.sourceId);
          var fieldReferenceSource = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
          fieldReferenceSourceId = fieldReferenceSource.id;
        }

        return fieldReferenceSourceId === source.id;
      }
    });
  },
  _calcFieldsByFieldIdAndSourceFilter: function _calcFieldsByFieldIdAndSourceFilter(fieldId, source, field) {
    var self = this,
        collections = this.dataStore.getCollections();
    return field.getFieldReferences().some(function (fieldReference) {
      var sourceId = fieldReference.sourceId;

      if (entityUtil.isJoinAlias(fieldReference.sourceType) && entityUtil.isTableReference(source)) {
        var joinAlias = self.joinAliases.byId(fieldReference.sourceId),
            tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
        sourceId = tableReference.id;
      }

      return sourceId === source.id && fieldReference.fieldId === fieldId;
    });
  },
  _collectJoinExpressionsForFieldRemoval: function _collectJoinExpressionsForFieldRemoval(fieldId, source) {
    return this.joinExpressions.filter(function (joinExpression) {
      return this._joinExpressionByFieldFilter(fieldId, source, joinExpression);
    }, this);
  },
  _collectComplexJoinsForFieldRemoval: function _collectComplexJoinsForFieldRemoval(fieldId, source) {
    var self = this;
    return this.joins.filter(function (join) {
      return self._complexJoinByFieldIdFilter(fieldId, source, join);
    });
  },
  _collectPresentationFieldsWithParentForFieldRemoval: function _collectPresentationFieldsWithParentForFieldRemoval(fieldId, removeResourcesOptions) {
    var collections = this.dataStore.getCollections();

    if (!removeResourcesOptions.dependentPresentationFieldsByFieldId) {
      removeResourcesOptions.dependentPresentationFieldsByFieldId = this.presentationFields.reduce(function (memo, presentationField) {
        var parent = schemaModelUtil.getDataIslandOrPresentationSetById(presentationField.parentId, collections);
        var presentationFieldWithParent = {
          presentationField: presentationField,
          parent: parent
        };

        if (!memo[presentationField.fieldId]) {
          memo[presentationField.fieldId] = [];
        }

        memo[presentationField.fieldId].push(presentationFieldWithParent);
        return memo;
      }, {});
    }

    return removeResourcesOptions.dependentPresentationFieldsByFieldId[fieldId] || [];
  },
  _collectMasterCalcFieldsForFieldRemoval: function _collectMasterCalcFieldsForFieldRemoval(fieldId, source) {
    var collections = this.dataStore.getCollections(),
        self = this;

    var dependentFields = this._getPossibleDependentCalcFieldsByFieldSource(source, collections);

    return dependentFields.reduce(function (memo, field) {
      if (self._calcFieldsByFieldIdAndSourceFilter(fieldId, source, field)) {
        var sourceId = field.sourceId,
            sourceType = field.sourceType,
            fieldSource = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);
        memo.push({
          calcField: field,
          source: fieldSource
        });
      }

      return memo;
    }, []);
  },
  _getPossibleDependentCalcFieldsByFieldSource: function _getPossibleDependentCalcFieldsByFieldSource(fieldSource, collections) {
    var fields = [],
        joinAlias,
        joinTree,
        joinTreesCalcFields,
        tableReferencesCalcFields;

    if (entityUtil.isTableReference(fieldSource)) {
      fields = fieldSource.getCalcFields().toArray();
      joinAlias = schemaModelUtil.getJoinAliasByTableReferenceId(fieldSource.id, collections);

      if (joinAlias) {
        joinTree = collections.joinTrees.byId(joinAlias.joinTreeId);
        fields = fields.concat(joinTree.getCalcFields().toArray());
      }
    } else if (entityUtil.isJoinTree(fieldSource)) {
      fields = fieldSource.getCalcFields().toArray();
    } else if (entityUtil.isConstantGroup(fieldSource)) {
      fields = collections.constantGroups.reduce(function (memo, constantGroup) {
        memo = memo.concat(constantGroup.getCalcFields().toArray());
        return memo;
      }, []);
      joinTreesCalcFields = collections.joinTrees.reduce(function (memo, joinTree) {
        memo = memo.concat(joinTree.getCalcFields().toArray());
        return memo;
      }, []);
      fields = fields.concat(joinTreesCalcFields);
      tableReferencesCalcFields = collections.tableReferences.reduce(function (memo, tableReference) {
        memo = memo.concat(tableReference.getCalcFields().toArray());
        return memo;
      }, []);
      fields = fields.concat(tableReferencesCalcFields);
    }

    return fields;
  },
  _collectFiltersForFieldRemoval: function _collectFiltersForFieldRemoval(fieldId, source) {
    var collections = this.dataStore.getCollections(),
        self = this;
    return this.filters.reduce(function (memo, filter) {
      if (self._filterByFieldFilter(fieldId, source, filter)) {
        var fieldSource = schemaModelUtil.getResourceByIdAndType(filter.sourceId, filter.sourceType, collections);
        memo.push({
          filter: filter,
          source: fieldSource
        });
      }

      return memo;
    }, []);
  },
  _removeAllFieldDependencies: function _removeAllFieldDependencies(fieldId, source, removeResourcesOptions) {
    var joinExpressions = this._collectJoinExpressionsForFieldRemoval(fieldId, source);

    var complexJoins = this._collectComplexJoinsForFieldRemoval(fieldId, source);

    var presentationFieldsWithParent = this._collectPresentationFieldsWithParentForFieldRemoval(fieldId, removeResourcesOptions);

    var masterCalcFieldsWithIdAndParent = this._collectMasterCalcFieldsForFieldRemoval(fieldId, source);

    var filters = this._collectFiltersForFieldRemoval(fieldId, source);

    _.each(filters, function (filter) {
      this._removeFilterFromParent(filter.filter, filter.source, removeResourcesOptions);
    }, this);

    _.each(masterCalcFieldsWithIdAndParent, function (calcField) {
      this._removeCalcFieldFromParent(calcField.calcField, calcField.source, removeResourcesOptions);
    }, this);

    _.each(joinExpressions, function (joinExpression) {
      this._removeJoinExpressionFromParent(joinExpression, null, removeResourcesOptions);
    }, this);

    _.each(complexJoins, function (complexJoin) {
      this._removeJoinFromParent(complexJoin, null, removeResourcesOptions);
    }, this);

    _.each(presentationFieldsWithParent, function (presentationField) {
      this._removePresentationFieldFromParent(presentationField.presentationField, presentationField.parent, removeResourcesOptions);
    }, this);
  },
  _getAllSourcesForGenericField: function _getAllSourcesForGenericField(field) {
    var collections = this.dataStore.getCollections();
    return schemaModelUtil.getAllTableReferencesByTableId(field.tableId, collections);
  },
  _removeFieldFromParent: function _removeFieldFromParent(field, parent, removeResourcesOptions) {
    this._removeField(field, parent, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(parent, removeResourcesOptions);

    removeResourcesMap.children[field.id] = true;
  },
  _removeField: function _removeField(field, parent, removeResourcesOptions) {
    var fieldId = field.id;

    var sources = this._getAllSourcesForGenericField(field);

    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.FIELDS][fieldId] = true;

    _.each(sources, function (source) {
      this._removeAllFieldDependencies(fieldId, source, removeResourcesOptions);
    }, this);
  },
  _removeCalcFieldFromParent: function _removeCalcFieldFromParent(calcField, source, removeResourcesOptions) {
    this._removeCalcField(calcField, source, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(source, removeResourcesOptions);

    removeResourcesMap.calcFields[calcField.id] = true;
  },
  _removeCalcField: function _removeCalcField(calcField, source, removeResourcesOptions) {
    var calcFieldId = calcField.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.FIELDS][calcFieldId] = true;

    this._removeAllFieldDependencies(calcFieldId, source, removeResourcesOptions);
  },
  _removeConstantGroup: function _removeConstantGroup(constantGroup, removeResourcesOptions) {
    var constantGroupId = constantGroup.id;
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.CONSTANT_GROUPS][constantGroupId] = true;
    constantGroup.getCalcFields().toArray().forEach(function (calcField) {
      this._removeCalcField(calcField, constantGroup, removeResourcesOptions);
    }, this);

    this._removeSourceFromDataIslandBySourceId(constantGroupId);
  },
  _removeFilterFromParent: function _removeFilterFromParent(filter, source, removeResourcesOptions) {
    this._removeFilter(filter, removeResourcesOptions);

    var removeResourcesMap = this._getRemoveResourceFromParentMap(source, removeResourcesOptions);

    removeResourcesMap.filters[filter.id] = true;
  },
  _removeFilter: function _removeFilter(filter, removeResourcesOptions) {
    removeResourcesOptions.removeResourcesMap[schemaCollectionsEnum.FILTERS][filter.id] = true;
  },
  _removeResourcesByRemoveResourcesOptions: function _removeResourcesByRemoveResourcesOptions(removeResourcesOptions) {
    this._removeResourcesByMap(removeResourcesOptions.removeResourcesMap);

    this._removeResourcesFromParentByMap(removeResourcesOptions);
  },
  _removeResourcesByMap: function _removeResourcesByMap(removeResourcesMap) {
    _.each(removeResourcesMap, function (resourcesMap, collectionName) {
      var collection = this[collectionName];

      this._removeManyResourcesFromCollection(resourcesMap, collection, {
        eagerIndexing: true
      });
    }, this);
  },
  _removeResourcesFromParentByMap: function _removeResourcesFromParentByMap(removeResourcesOptions) {
    var globalRemoveResourcesMap = removeResourcesOptions.removeResourcesMap,
        removeResourcesFromParentMap = removeResourcesOptions.removeResourcesFromParentMap;

    _.each(removeResourcesFromParentMap, function (resourcesToRemoveByEntityTypeMap, entityType) {
      var collectionName = entityTypeToSchemaCollectionMap[entityType];
      var globallyRemovedResourcesMap = globalRemoveResourcesMap[collectionName];

      _.each(resourcesToRemoveByEntityTypeMap, function (entityWithResourcesToRemoveMap, id) {
        if (!globallyRemovedResourcesMap[id]) {
          var entity = entityWithResourcesToRemoveMap.entity,
              localResourcesToRemoveMap = entityWithResourcesToRemoveMap.removeResourcesMap;

          _.each(localResourcesToRemoveMap, function (resourcesMap, collectionName) {
            var collection = entity[collectionName];

            this._removeManyResourcesFromCollection(resourcesMap, collection);
          }, this);
        }
      }, this);
    }, this);
  },
  _removeManyResourcesFromCollection: function _removeManyResourcesFromCollection(resourcesMap, collection, options) {
    options = options || {};
    var newCollection = collection.filter(function (entity) {
      return !resourcesMap[entity.id];
    });

    this._setCollection(collection, newCollection, {
      eagerIndexing: options.eagerIndexing
    });
  },
  _setCollection: function _setCollection(collection, newCollection, options) {
    options = options || {};
    collection.fromArray(newCollection, {
      eagerIndexing: options.eagerIndexing
    });
  },
  _getRemoveResourcesOptions: function _getRemoveResourcesOptions() {
    var removeResourcesOptions = {
      removeResourcesMap: {},
      removeResourcesFromParentMap: {}
    };

    _.each(schemaCollectionsEnum, function (collectionName) {
      removeResourcesOptions.removeResourcesMap[collectionName] = {};
    });

    _.each(entitiesWithChildResourcesList, function (entityType) {
      removeResourcesOptions.removeResourcesFromParentMap[entityType] = {};
    });

    return removeResourcesOptions;
  },
  _getEntitiesByIds: function _getEntitiesByIds(ids, collection) {
    if (ids.length < BY_ID_VS_FILTER_TRESHOLD) {
      return ids.reduce(function (memo, id) {
        var entity = collection.byId(id);

        if (entity) {
          memo.push(entity);
        }

        return memo;
      }, []);
    } else {
      var idsMap = this._idsListToMap(ids);

      return collection.filter(function (entity) {
        return idsMap[entity.id];
      });
    }
  },
  _getRemoveResourceFromParentMap: function _getRemoveResourceFromParentMap(parent, removeResourcesOptions) {
    var entityType = entityUtil.getEntityName(parent);
    var item = removeResourcesOptions.removeResourcesFromParentMap[entityType][parent.id];

    if (!item) {
      item = this._createRemoveResourceFromParentMap(parent, entityType);
      removeResourcesOptions.removeResourcesFromParentMap[entityType][parent.id] = item;
    }

    return item.removeResourcesMap;
  },
  _createRemoveResourceFromParentMap: function _createRemoveResourceFromParentMap(entity, entityType) {
    var factoryMethodName = ENTITY_TO_REMOVE_ITEM_FACTORY_MAP[entityType];
    return this[factoryMethodName](entity);
  },
  _createRemoveResourceFromEntityWithChildrenOnlyCollectionMap: function _createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity) {
    return {
      entity: entity,
      removeResourcesMap: {
        children: {}
      }
    };
  },
  _createRemoveResourceFromConstantGroupMap: function _createRemoveResourceFromConstantGroupMap(entity) {
    return {
      entity: entity,
      removeResourcesMap: {
        calcFields: {}
      }
    };
  },
  _createRemoveResourceFromDataSourceMap: function _createRemoveResourceFromDataSourceMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  },
  _createRemoveResourceFromDataSourceGroupMap: function _createRemoveResourceFromDataSourceGroupMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  },
  _createRemoveResourceFromTableMap: function _createRemoveResourceFromTableMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  },
  _createRemoveResourceFromTableGroupMap: function _createRemoveResourceFromTableGroupMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  },
  _createRemoveResourceFromTableReferenceMap: function _createRemoveResourceFromTableReferenceMap(entity) {
    return {
      entity: entity,
      removeResourcesMap: {
        calcFields: {},
        filters: {}
      }
    };
  },
  _createRemoveResourceFromJoinTreeMap: function _createRemoveResourceFromJoinTreeMap(entity) {
    return {
      entity: entity,
      removeResourcesMap: {
        joins: {},
        joinAliases: {},
        calcFields: {},
        filters: {}
      }
    };
  },
  _createRemoveResourceFromJoinMap: function _createRemoveResourceFromJoinMap(entity) {
    return {
      entity: entity,
      removeResourcesMap: {
        joinExpressions: {}
      }
    };
  },
  _createRemoveResourceFromDataIslandMap: function _createRemoveResourceFromDataIslandMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  },
  _createRemoveResourceFromPresentationSetMap: function _createRemoveResourceFromPresentationSetMap(entity) {
    return this._createRemoveResourceFromEntityWithChildrenOnlyCollectionMap(entity);
  }
});

_.extend(DomainSchemaDAO.prototype, allCollectionsMixin);

module.exports = DomainSchemaDAO;

});