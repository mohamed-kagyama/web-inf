define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../util/profileAttributeUtil");

var domainModelErrorsEnum = require('../enum/domainModelErrorsEnum');

var allCollectionsMixin = require("../mixin/allCollectionsMixin");

var entityUtil = require('../util/entityUtil');

var schemaModelUtil = require("../util/schemaModelUtil");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

var entityIdMapper = require("../../util/entityIdMapper");

var invert = require("../../../util/predicate/invert");

var schemaCollectionsEnum = require("../enum/schemaCollectionsEnum");

var specialSchemaNamesEnum = require('../enum/specialSchemaNamesEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SCHEMALESS_NAME_SUBSTITUTION = specialSchemaNamesEnum.SCHEMALESS_NAME_SUBSTITUTION;
var protectedJoinProperties = ['leftJoinAliasId', 'rightJoinAliasId'];
var protectedJoinExpressionProperties = ['leftFieldId', 'rightFieldId', 'leftJoinAliasId', 'rightJoinAliasId'];
var TABLE_REFERENCE_COPY_SUFFIX = '_';

var DomainSchemaService = function DomainSchemaService(options) {
  this.initialize(options);
};

_.extend(DomainSchemaService.prototype, {
  initialize: function initialize(options) {
    this.calcFieldNameGenerator = options.calcFieldNameGenerator;
    this.domainSchemaDAO = options.domainSchemaDAO;
    this.dataStore = options.dataStore;
    this.dataAdapter = options.dataAdapter;
    this.spec = options.domainSchemaSpecification;
    this.granularSpecs = options.domainSchemaGranularSpecs;
    this.mixInAllCollections(this.dataStore);
  },
  deserialize: function deserialize() {},
  replaceDataSource: function replaceDataSource(options) {
    this._replaceDataSourceName(options.name);

    if (options.schemaPairs) {
      this._mapSchemas(options.schemaPairs);
    }

    this._removeOrphanResources(options.orphanResources);

    this._cleanUpAfterResourceRemove();
  },
  _cleanUpAfterResourceRemove: function _cleanUpAfterResourceRemove() {
    this._removeEmptyGenericTables();

    this._removeLoneConstantJoinExpressions();

    this._removeEmptyJoins();

    this._removeEmptyJoinTrees();

    this._removeSourceLessDataIslands();

    this._removeEmptyConstantGroups();
  },
  _removeEmptyGenericTables: function _removeEmptyGenericTables() {
    var self = this;
    var emptyGenericTables = this.tables.filter(function (table) {
      return entityUtil.isGenericTable(table) && table.children.size() === 0;
    });

    var emptyTablesGroupsByParentId = _.reduce(emptyGenericTables, function (memo, table) {
      var parentId = table.parentId,
          tablesByParentGroup = memo[parentId];

      if (!tablesByParentGroup) {
        tablesByParentGroup = [];
        memo[parentId] = tablesByParentGroup;
      }

      tablesByParentGroup.push(table.id);
      return memo;
    }, {});

    _.each(emptyTablesGroupsByParentId, function (tableIds, parentId) {
      self.domainSchemaDAO.removeTables(tableIds, Number(parentId));
    });
  },
  replaceDataSourceName: function replaceDataSourceName(dataSourceName) {
    this._replaceDataSourceName(dataSourceName);
  },
  _replaceDataSourceName: function _replaceDataSourceName(dataSourceName) {
    this.domainSchemaDAO.updateDataSource({
      name: dataSourceName,
      id: this.dataSources.first().id
    });
  },
  mapSchemas: function mapSchemas(schemaPairs) {
    this._mapSchemas(schemaPairs);

    this._cleanUpAfterResourceRemove();
  },
  _mapSchemas: function _mapSchemas(schemaPairs) {
    schemaPairs = _.isArray(schemaPairs) ? schemaPairs : [schemaPairs];
    var dataSourceId = this.dataSources.first().id;

    this._removeUnmappedSchemasAndTables(schemaPairs, dataSourceId);

    this._removeLoneJoinAliases();

    var dataSourceGroupsBeforeMapping = this.dataSourceGroups.reduce(function (memo, dataSourceGroup) {
      var isProfileAttributeGroup = dataSourceGroup.sourceName && profileAttributeUtil.containsProfileAttributeWithPlaceholders(dataSourceGroup.sourceName);

      if (!isProfileAttributeGroup) {
        memo.push(dataSourceGroup.toJSON());
      }

      return memo;
    }, []);
    schemaPairs.forEach(function (pair) {
      var sourceSchema = pair[0],
          targetSchema = pair[1];
      var noSchemaPosition = pair.indexOf(SCHEMALESS_NAME_SUBSTITUTION),
          noSchemaToSchemaMapping = noSchemaPosition === 0,
          schemaToNoSchemaMapping = noSchemaPosition === 1,
          sourceSchemas;

      if (noSchemaToSchemaMapping) {
        this.domainSchemaDAO.addDataSourceGroupAndMoveChildren({
          name: schemaPairs[0][1],
          parentId: dataSourceId,
          dataSourceId: dataSourceId
        });
      } else {
        sourceSchemas = dataSourceGroupsBeforeMapping.reduce(function (memo, dataSourceGroup) {
          var dataSourceGroupName = dataSourceGroup.sourceName || dataSourceGroup.name;

          if (dataSourceGroupName === sourceSchema) {
            memo.push(dataSourceGroup);
          }

          return memo;
        }, []);
        sourceSchemas.forEach(function (sourceSchema) {
          if (schemaToNoSchemaMapping) {
            // schemafull to schemaless mapping
            this.domainSchemaDAO.removeDataSourceGroupsAndMoveChildren(sourceSchema.id, dataSourceId);
          } else {
            this.domainSchemaDAO.updateDataSourceGroup({
              sourceName: targetSchema,
              id: sourceSchema.id
            });
          }
        }, this);
      }
    }, this);
  },
  _removeLoneJoinAliases: function _removeLoneJoinAliases() {
    var loneJoinAliasIds = this.joinTrees.reduce(function (memo, joinTree) {
      if (joinTree.joinAliases.size() === 1) {
        memo.push(joinTree.joinAliases.first().id);
      }

      return memo;
    }, []);

    this._removeJoinAliases(loneJoinAliasIds);
  },
  _removeUnmappedSchemasAndTables: function _removeUnmappedSchemasAndTables(schemaPairs, dataSourceId) {
    var sourceSchemas = schemaPairs.reduce(function (memo, pair) {
      memo[pair[0]] = true;
      return memo;
    }, {});
    var notBeingMappedDataSourceGroupIds = this.dataSourceGroups.reduce(function (memo, dataSourceGroup) {
      var dataSourceGroupName = dataSourceGroup.sourceName || dataSourceGroup.name,
          isSchemaBeingMapped = sourceSchemas[dataSourceGroupName],
          isProfileAttributeGroup = dataSourceGroup.sourceName && profileAttributeUtil.containsProfileAttributeWithPlaceholders(dataSourceGroup.sourceName);

      if (!isSchemaBeingMapped && !isProfileAttributeGroup) {
        memo.push(dataSourceGroup.id);
      }

      return memo;
    }, [], this);

    this._removeDataSourceGroups(notBeingMappedDataSourceGroupIds, dataSourceId);

    var areDataSourceGroupsContainProfileAttribute = this.dataSourceGroups.some(function (dataSourceGroup) {
      return dataSourceGroup.sourceName && profileAttributeUtil.containsProfileAttributeWithPlaceholders(dataSourceGroup.sourceName);
    });

    if (_.isEmpty(sourceSchemas) && !areDataSourceGroupsContainProfileAttribute) {
      var tableIds = this.tables.reduce(function (memo, table) {
        if (entityUtil.isGenericTable(table)) {
          memo.push(table.id);
        }

        return memo;
      }, []);

      this._removeTables(tableIds, dataSourceId);
    }
  },
  _removeOrphanResources: function _removeOrphanResources(orphanResources) {
    var self = this,
        entity;
    orphanResources = orphanResources || [];

    var entitiesByParent = _.reduce(orphanResources, function (memo, resourceData) {
      if (_.isArray(resourceData)) {
        entity = self._getResourceByParentPath(resourceData);
      } else if (_.isString(resourceData)) {
        entity = self.tables.findWhere({
          name: resourceData
        });
      }

      if (entity) {
        var entityParentId = entity.getParentId(),
            entityId = entity.getId();

        if (entityUtil.isDataSourceGroup(entity)) {
          if (!memo.dataSourceGroupByParent[entityParentId]) {
            memo.dataSourceGroupByParent[entityParentId] = {};
          }

          memo.dataSourceGroupByParent[entityParentId][entityId] = true;
        }

        if (entityUtil.isTable(entity) || entityUtil.isDerivedTable(entity)) {
          if (!memo.tablesByParent[entityParentId]) {
            memo.tablesByParent[entityParentId] = {};
          }

          memo.tablesByParent[entityParentId][entityId] = true;
        }

        if (entityUtil.isField(entity)) {
          if (!memo.fieldsByParent[entityParentId]) {
            memo.fieldsByParent[entityParentId] = {};
          }

          memo.fieldsByParent[entityParentId][entityId] = true;
        }
      }

      return memo;
    }, {
      dataSourceGroupByParent: {},
      tablesByParent: {},
      fieldsByParent: {}
    });

    _.each(entitiesByParent.tablesByParent, function (tableIds, parentId) {
      tableIds = _.keys(tableIds).map(Number);

      self._removeTables(tableIds, Number(parentId));
    });

    _.each(entitiesByParent.fieldsByParent, function (fieldIds, parentId) {
      fieldIds = _.keys(fieldIds).map(Number);
      self.domainSchemaDAO.removeFields(fieldIds, Number(parentId));
    });

    _.each(entitiesByParent.dataSourceGroupByParent, function (dataSourceGroupIds, parentId) {
      dataSourceGroupIds = _.keys(dataSourceGroupIds).map(Number);

      self._removeDataSourceGroups(dataSourceGroupIds, Number(parentId));
    });
  },
  _getResourceByParentPath: function _getResourceByParentPath(namesData) {
    var result;
    var dataSourceGroupName;
    var dataSourceGroup;

    var dataSourceObject = _.findWhere(namesData, {
      type: schemaEntitiesEnum.DATA_SOURCE
    });

    var dataSourceGroupObject = _.findWhere(namesData, {
      type: schemaEntitiesEnum.DATA_SOURCE_GROUP
    });

    var isOrphanSchema = !dataSourceObject && dataSourceGroupObject;

    if (dataSourceGroupObject) {
      dataSourceGroupName = dataSourceGroupObject.name;
      dataSourceGroup = this.dataSourceGroups.byField('name', dataSourceGroupName);
    }

    if (isOrphanSchema) {
      result = dataSourceGroup;
    } else {
      var fieldPath;
      var field;

      var dataSourcePathObject = _.pick(dataSourceObject, 'name');

      var dataSource = this.dataSources.findWhere(dataSourcePathObject);

      if (!dataSourceGroup) {
        dataSourceGroup = dataSource;
      }

      var tablePathObject = _.pick(_.findWhere(namesData, {
        type: schemaEntitiesEnum.TABLE
      }), 'name');

      var table = dataSourceGroup.children.findWhere(tablePathObject);

      var filedObject = _.findWhere(namesData, {
        type: schemaEntitiesEnum.FIELD
      });

      if (filedObject) {
        fieldPath = _.pick(filedObject, 'name');
        field = table.children.findWhere(fieldPath);
      }

      result = field || table;
    }

    return result;
  },
  reset: function reset(domain) {
    this.dataStore.deserialize(domain);
  },
  // resources
  copyTableReference: function copyTableReference(id) {
    this._copyTableReference(id);
  },
  removeTableReference: function removeTableReference(tableReferenceId) {
    if (this.spec.canRemoveTableReference(tableReferenceId)) {
      this.domainSchemaDAO.removeTableReferences(tableReferenceId);

      this._cleanUpAfterResourceRemove();
    } else {
      throw new Error('Can not remove table reference');
    }
  },
  renameTableReference: function renameTableReference(options) {
    var id = options.id,
        name = options.name,
        resourcesToUpdate = options.resources || [];
    var tableReferenceJson = {
      id: id,
      name: name
    };

    if (!this.spec.canRenameTableReference(id, name)) {
      throw new Error('Cannot rename table reference.');
    }

    var oldTableReferenceName = this.tableReferences.byId(id).getName();
    this.domainSchemaDAO.updateTableReference(tableReferenceJson);

    if (resourcesToUpdate.length > 0) {
      this._updateDependentResourcesWithExpressions(resourcesToUpdate);
    }

    this._renameJoinAliasesByTableReference({
      id: id,
      newName: name,
      oldName: oldTableReferenceName
    });
  },
  _renameJoinAliasesByTableReference: function _renameJoinAliasesByTableReference(options) {
    var self = this,
        tableReferenceId = options.id,
        tableReferenceNewName = options.newName,
        tableReferenceOldName = options.oldName;
    var joinAliasesByTableReference = schemaModelUtil.getAllJoinAliasesByTableReferenceId(tableReferenceId, this.dataStore.getCollections());
    joinAliasesByTableReference.forEach(function (joinAlias) {
      if (joinAlias.getTableReferenceId() === tableReferenceId) {
        if (self.spec.shouldRenameJoinAliasOnTableReferenceRename(tableReferenceOldName, joinAlias.getName())) {
          self.domainSchemaDAO.updateJoinAlias({
            id: joinAlias.getId(),
            name: tableReferenceNewName
          });
        }
      }
    });
  },
  _updateDependentResourcesWithExpressions: function _updateDependentResourcesWithExpressions(resources) {
    // Update all expressions which uses tableReference of joinAlias in their expression string
    // We detect and pass such resources outside of the service because
    // some server calls are necessary for expression update.
    var resourcesGroupedByType = _.groupBy(resources, 'entityType');

    _.each(resourcesGroupedByType[schemaEntitiesEnum.CALC_FIELD], function (calcField) {
      this.domainSchemaDAO.updateCalcField({
        id: calcField.id,
        expression: calcField.expression
      }, calcField.sourceId, calcField.sourceType);
    }, this);

    _.each(resourcesGroupedByType[schemaEntitiesEnum.COMPLEX_JOIN], function (complexJoin) {
      this.domainSchemaDAO.updateJoin({
        id: complexJoin.id,
        expression: complexJoin.expression
      });
    }, this);
  },
  addDataSourceGroups: function addDataSourceGroups(dataSourceGroups, parentId) {
    this.domainSchemaDAO.addDataSourceGroups(dataSourceGroups, parentId);
  },
  updateDataSourceGroup: function updateDataSourceGroup(dataSourceGroup) {
    this._updateDataSourceGroup(dataSourceGroup);
  },
  _updateDataSourceGroup: function _updateDataSourceGroup(dataSourceGroup) {
    if (this.spec.canUpdateDataSourceGroup(dataSourceGroup.id, dataSourceGroup.name)) {
      this.domainSchemaDAO.updateDataSourceGroup(dataSourceGroup);
    } else {
      throw new Error('Cannot update data source group');
    }
  },
  removeDataSourceGroups: function removeDataSourceGroups(groupIds, parentId) {
    this._removeDataSourceGroups(groupIds, parentId);

    this._cleanUpAfterResourceRemove();
  },
  removeDataSourceGroupsAndDefaultSchemaChildren: function removeDataSourceGroupsAndDefaultSchemaChildren(options) {
    var defaultSchemaId = options.defaultSchemaId,
        dataSourceGroupIds = options.dataSourceGroupIds,
        dataSourceGroupsParentId = options.dataSourceGroupsParentId;
    var defaultSchema = this.dataSourceGroups.byId(defaultSchemaId),
        children = defaultSchema.children.reduce(function (memo, child) {
      if (entityUtil.isDataSourceGroup(child)) {
        memo.dataSourceGroupIds.push(child.id);
      } else {
        memo.tableIds.push(child.id);
      }

      return memo;
    }, {
      tableIds: [],
      dataSourceGroupIds: []
    });

    this._removeTables(children.tableIds, defaultSchemaId);

    this._removeDataSourceGroups(children.dataSourceGroupIds, defaultSchemaId);

    this._removeDataSourceGroups(dataSourceGroupIds, dataSourceGroupsParentId);

    this._cleanUpAfterResourceRemove();
  },
  _removeDataSourceGroups: function _removeDataSourceGroups(groupIds, parentId) {
    this.domainSchemaDAO.removeDataSourceGroups(groupIds, parentId);
  },
  addTablesWithTableReferences: function addTablesWithTableReferences(tablesWithReferences, parentId) {
    tablesWithReferences = _.isArray(tablesWithReferences) ? tablesWithReferences : [tablesWithReferences];

    _.each(tablesWithReferences, function (tableWithReference) {
      var table = this.domainSchemaDAO.addTables(tableWithReference.table, parentId)[0],
          reference = _.extend({
        tableId: table.getId()
      }, tableWithReference.reference);

      this.domainSchemaDAO.addTableReference(reference);
    }, this);
  },
  removeTables: function removeTables(tableIds, parentId) {
    this._removeTables(tableIds, parentId);

    this._cleanUpAfterResourceRemove();
  },
  _removeTables: function _removeTables(tableIds, parentId) {
    this.domainSchemaDAO.removeTables(tableIds, parentId);
  },
  addDerivedTables: function addDerivedTables(derivedTables, parentId) {
    this._addDerivedTables(derivedTables, parentId);
  },
  _addDerivedTables: function _addDerivedTables(derivedTables, parentId) {
    var tables = this.domainSchemaDAO.addDerivedTables(derivedTables, parentId);
    return this._addTableReferencesByTables(tables);
  },
  updateDerivedTable: function updateDerivedTable(options) {
    var derivedTable = options.derivedTable,
        resourcesToUpdate = options.resources;
    var table = this.domainSchemaDAO.updateTable(derivedTable);

    if (!this.spec.canRenameDerivedTable(derivedTable.id, derivedTable.name, derivedTable.dataSourceId)) {
      throw new Error('Cannot rename derived table');
    }

    var oldFieldsNames = table.getChildren().map(function (item) {
      return item.getName();
    });

    var newFieldsNames = _.pluck(derivedTable.children, 'name');

    var fieldNamesToRemove = _.difference(oldFieldsNames, newFieldsNames);

    var fieldIdsToRemove = table.getChildren().filter(function (item) {
      return _.contains(fieldNamesToRemove, item.getName());
    }).map(entityIdMapper);
    this.domainSchemaDAO.removeFields(fieldIdsToRemove, table.getId());

    var fieldNamesToAdd = _.difference(newFieldsNames, oldFieldsNames);

    var fieldsToAdd = _.filter(derivedTable.children, function (field) {
      return _.contains(fieldNamesToAdd, field.name);
    });

    this.domainSchemaDAO.addFields(fieldsToAdd, table.getId());
    var fieldNameForFieldMap = table.getChildren().reduce(function (map, field) {
      map[field.name] = field;
      return map;
    }, {});
    derivedTable.children.each(function (newFieldInfo) {
      var currentField = fieldNameForFieldMap[newFieldInfo.name];

      if (currentField && currentField.type !== newFieldInfo.type) {
        this.domainSchemaDAO.updateField({
          id: currentField.id,
          type: newFieldInfo.type
        });
      }
    }.bind(this));
    var tableReference = this.tableReferences.find(function (reference) {
      return reference.getTableId() === derivedTable.id;
    });
    var tableReferenceJson = {
      name: table.getName(),
      id: tableReference.getId()
    };

    if (resourcesToUpdate.length > 0) {
      this._updateDependentResourcesWithExpressions(resourcesToUpdate);
    }

    this._renameJoinAliasesByTableReference({
      id: tableReferenceJson.id,
      newName: tableReferenceJson.name,
      oldName: tableReference.getName()
    });

    this.domainSchemaDAO.updateTableReference(tableReferenceJson);

    this._cleanUpAfterResourceRemove();
  },
  copyDerivedTable: function copyDerivedTable(tableId) {
    var table = this.tables.byId(tableId),
        tableReference = this.tableReferences.find(function (tableReference) {
      return tableReference.getTableId() === tableId;
    }),
        copyName = this._getNameForTableReferenceCopy(table.getName()),
        derivedTableJson = table.toJSON();

    derivedTableJson = _.extend(_.omit(derivedTableJson, 'id'), {
      children: table.getChildren().map(function (item) {
        return _.extend(_.omit(item.toJSON(), 'id'), {
          entityType: schemaEntitiesEnum.FIELD
        });
      }),
      name: copyName,
      dataSourceId: table.getDataSourceId()
    });

    var copiedDerivedTables = this._addDerivedTables(derivedTableJson, table.getParentId());

    var derivedTableReferenceCopy = _.first(copiedDerivedTables);

    this._copySingleTableCalcFields(tableReference.getCalcFields().toArray(), derivedTableReferenceCopy);
  },
  getNameForTableReferenceCopy: function getNameForTableReferenceCopy(originalTableReferenceAlias) {
    return this._getNameForTableReferenceCopy(originalTableReferenceAlias);
  },
  _getNameForTableReferenceCopy: function _getNameForTableReferenceCopy(originalTableReferenceAlias) {
    var tableReferences = this.dataStore.getCollection('tableReferences');
    var nextId = 0,
        copyAlias = originalTableReferenceAlias;

    while (tableReferences.by({
      name: copyAlias
    })) {
      nextId++;
      copyAlias = originalTableReferenceAlias + TABLE_REFERENCE_COPY_SUFFIX + nextId;
    }

    return copyAlias;
  },
  addFields: function addFields(fieldGroups) {
    _.each(fieldGroups, function (fieldGroup) {
      this.domainSchemaDAO.addFields(fieldGroup.fields, fieldGroup.parentId);
    }, this);
  },
  // data islands
  generateJoins: function generateJoins(options) {
    var dataSourceId = options.dataSourceId,
        joinsInfo = options.joinsInfo;

    var selfJoinsGroupedByTableId = this._getSelfJoinsGroupedByTableId(joinsInfo);

    var tableReferencesGroupedByTable = this._reCreateTableReferencesForJoinsGeneration(dataSourceId, selfJoinsGroupedByTableId);

    _.each(joinsInfo, function (joinTreeInfo) {
      var joinTree = this._createJoinTree({
        name: joinTreeInfo.name,
        suppressCircularJoins: joinTreeInfo.suppressCircularJoins,
        includeAllDataIslandJoins: joinTreeInfo.includeAllDataIslandJoins
      });

      _.each(joinTreeInfo.joins, function (joinInfo) {
        var leftTableReference, rightTableReference;

        if (joinInfo.leftTableId === joinInfo.rightTableId) {
          leftTableReference = tableReferencesGroupedByTable[joinInfo.leftTableId][0];
          rightTableReference = tableReferencesGroupedByTable[joinInfo.leftTableId][1];
        } else {
          leftTableReference = tableReferencesGroupedByTable[joinInfo.leftTableId];
          rightTableReference = tableReferencesGroupedByTable[joinInfo.rightTableId];

          if (_.isArray(leftTableReference)) {
            leftTableReference = _.first(leftTableReference);
          }

          if (_.isArray(rightTableReference)) {
            rightTableReference = _.first(rightTableReference);
          }
        }

        this._createJoinExpressionUsingSpecs({
          leftTableReferenceId: leftTableReference.getId(),
          rightTableReferenceId: rightTableReference.getId(),
          expression: {
            leftFieldId: joinInfo.leftFieldId,
            rightFieldId: joinInfo.rightFieldId,
            operator: joinInfo.operator
          },
          joinTreeId: joinTree.getId(),
          joinWeight: joinInfo.weight,
          joinType: joinInfo.type
        });
      }, this);
    }, this);
  },
  updateDataIsland: function updateDataIsland(dataIslandId, properties) {
    this.domainSchemaDAO.updateDataIsland(_.extend({
      id: dataIslandId
    }, properties));
  },
  updateJoinAlias: function updateJoinAlias(joinAliasId, joinAliasJSON) {
    joinAliasJSON = _.extend({
      id: joinAliasId
    }, joinAliasJSON);
    this.domainSchemaDAO.updateJoinAlias(joinAliasJSON);
  },
  removeDataIslands: function removeDataIslands(dataIslandIds) {
    dataIslandIds = _.isArray(dataIslandIds) ? dataIslandIds : [dataIslandIds];

    this._checkIfDataIslandsNotExistAndThrowError(dataIslandIds);

    _.each(dataIslandIds, function (dataIslandId) {
      this.domainSchemaDAO.removeDataIslands(dataIslandId);
    }, this);
  },
  generateBundleKeys: function generateBundleKeys(bundleKeys) {
    bundleKeys = bundleKeys || [];
    var self = this;
    bundleKeys.forEach(function (bundleKey) {
      var id = bundleKey.id,
          type = bundleKey.type;

      var entityProps = _.pick(bundleKey, ['id', 'labelId', 'descriptionId']);

      if (entityUtil.isDataIsland(type)) {
        self.domainSchemaDAO.updateDataIsland(entityProps);
      } else if (entityUtil.isPresentationSet(type)) {
        self.domainSchemaDAO.updatePresentationSet(entityProps);
      } else if (entityUtil.isPresentationField(type)) {
        self.domainSchemaDAO.updatePresentationField(entityProps);
      }
    });
  },
  removePresentationItems: function removePresentationItems(options) {
    var parentId = options.parentId,
        presentationItems = options.presentationItems;

    _.each(presentationItems, function (presentationItem) {
      if (entityUtil.isPresentationSet(presentationItem.type)) {
        this.domainSchemaDAO.removePresentationSets(presentationItem.id, parentId);
      } else if (entityUtil.isPresentationField(presentationItem.type)) {
        this.domainSchemaDAO.removePresentationFields(presentationItem.id, parentId);
      }
    }, this);
  },
  removePresentationSets: function removePresentationSets(presentationSetIds, parentId) {
    this.domainSchemaDAO.removePresentationSets(presentationSetIds, parentId);
  },
  removePresentationFields: function removePresentationFields(presentationFieldIds, parentId) {
    this.domainSchemaDAO.removePresentationFields(presentationFieldIds, parentId);
  },
  removeJoinAlias: function removeJoinAlias(joinAliasId) {
    this._removeJoinAliases(joinAliasId);

    this._cleanUpAfterResourceRemove();
  },
  _removeJoinAliases: function _removeJoinAliases(joinAliasIds) {
    this.domainSchemaDAO.removeJoinAliases(joinAliasIds);
  },
  createJoinExpression: function createJoinExpression(options) {
    this._createJoinExpressionUsingSpecs(options);
  },
  createJoinTreeWithJoinExpression: function createJoinTreeWithJoinExpression(joinTreeWithJoinExpression) {
    var joinTree = this._createJoinTree({
      name: joinTreeWithJoinExpression.name,
      suppressCircularJoins: joinTreeWithJoinExpression.suppressCircularJoins,
      includeAllDataIslandJoins: joinTreeWithJoinExpression.includeAllDataIslandJoins
    });

    var joinExpression = _.extend({}, joinTreeWithJoinExpression.joinExpression, {
      joinTreeId: joinTree.id
    });

    this._createJoinExpressionUsingSpecs(joinExpression);

    this._reorderJoinTree(joinTree, joinTreeWithJoinExpression.index);
  },
  reorderJoinTree: function reorderJoinTree(joinTreeId, index) {
    var joinTree = this.joinTrees.byId(joinTreeId);

    this._reorderJoinTree(joinTree, index);
  },
  _reorderJoinTree: function _reorderJoinTree(joinTree, index) {
    var joinTrees = this.joinTrees.toArray();
    joinTrees.splice(index, 0, joinTree);
    joinTrees = _.filter(joinTrees, function (joinTreeEntity, joinTreeIndex) {
      if (joinTreeEntity.id !== joinTree.id) {
        return true;
      } else {
        return index === joinTreeIndex;
      }
    });
    this.domainSchemaDAO.setCollection(schemaCollectionsEnum.JOIN_TREES, joinTrees);
  },
  _createJoinExpressionUsingSpecs: function _createJoinExpressionUsingSpecs(options) {
    var leftTableReferenceId = options.leftTableReferenceId,
        rightTableReferenceId = options.rightTableReferenceId,
        expression = options.expression;

    if (!this.spec.canCreateJoinExpression({
      leftTableReferenceId: leftTableReferenceId,
      rightTableReferenceId: rightTableReferenceId,
      leftTableFieldId: expression.leftFieldId,
      rightTableFieldId: expression.rightFieldId
    })) {
      throw new Error('Can not create join expression with given options');
    }

    var joinType = options.joinType,
        joinWeight = options.joinWeight,
        leftJoinAlias = this.joinAliases.byField('tableReferenceId', leftTableReferenceId),
        rightJoinAlias = this.joinAliases.byField('tableReferenceId', rightTableReferenceId),
        leftJoinTreeId = leftJoinAlias && leftJoinAlias.getJoinTreeId(),
        rightJoinTreeId = rightJoinAlias && rightJoinAlias.getJoinTreeId();
    var bothJoinAliasesExists = leftJoinAlias && rightJoinAlias,
        noneOfJoinAliasesExists = !leftJoinAlias && !rightJoinAlias,
        anyOfJoinAliasesExists = leftJoinAlias || rightJoinAlias,
        sameJoinTree = leftJoinTreeId === rightJoinTreeId;

    if (noneOfJoinAliasesExists) {
      this._addJoinExpressionBasedOnNewJoinAliasesToExistingJoinTree({
        leftTableReferenceId: leftTableReferenceId,
        rightTableReferenceId: rightTableReferenceId,
        expression: expression,
        joinTreeId: options.joinTreeId,
        joinType: joinType,
        joinWeight: joinWeight
      });
    } else if (bothJoinAliasesExists) {
      if (sameJoinTree) {
        this._addJoinExpressionBasedOnExistingJoinAliasesToExistingJoinTree({
          joinTreeId: leftJoinTreeId,
          leftJoinAlias: leftJoinAlias,
          rightJoinAlias: rightJoinAlias,
          expression: expression,
          joinType: joinType,
          joinWeight: joinWeight
        });
      } else {
        throw new Error(domainModelErrorsEnum.CANNOT_CREATE_JOIN_BETWEEN_TWO_JOIN_TREES);
      }
    } else if (anyOfJoinAliasesExists) {
      var targetJoinTreeId = leftJoinTreeId || rightJoinTreeId;

      this._addNotExistingJoinAliasAndJoinExpressionToExistingJoinTree({
        leftTableReferenceId: leftTableReferenceId,
        rightTableReferenceId: rightTableReferenceId,
        joinTreeId: targetJoinTreeId,
        expression: expression,
        joinType: joinType,
        joinWeight: joinWeight
      });
    }
  },
  updateJoinExpression: function updateJoinExpression(expressionId, expression) {
    var joinExpressionProperties = _.omit(expression, protectedJoinExpressionProperties);

    this.domainSchemaDAO.updateJoinExpression(_.extend({
      id: expressionId
    }, joinExpressionProperties));
  },
  removeJoinExpression: function removeJoinExpression(options) {
    var joinExpressionId = options.id,
        joinId = options.joinId;

    this._removeJoinExpression(joinExpressionId, joinId);

    this._cleanUpAfterResourceRemove();
  },
  updateJoin: function updateJoin(joinId, properties) {
    var joinProperties = _.omit(properties, protectedJoinProperties);

    this.domainSchemaDAO.updateJoin(_.extend({
      id: joinId
    }, joinProperties));
  },
  removeJoin: function removeJoin(joinId) {
    this._removeJoin(joinId);

    this._cleanUpAfterResourceRemove();
  },
  _removeJoin: function _removeJoin(joinId) {
    var join = this.joins.byId(joinId),
        joinTreeId = join.getJoinTreeId();

    var usedJoinAliases = this._getAllJoinAliasesFromJoin(join);

    this.domainSchemaDAO.removeJoins(joinId, joinTreeId);

    this._removeSpecificJoinAliasesIfNotUsed(usedJoinAliases, joinTreeId);
  },
  _getAllJoinAliasesFromJoin: function _getAllJoinAliasesFromJoin(join, memo) {
    memo = memo || {};

    if (entityUtil.isJoin(join)) {
      memo[join.getLeftJoinAliasId()] = true;
      memo[join.getRightJoinAliasId()] = true;
    } else if (entityUtil.isComplexJoin(join)) {
      memo = join.fieldReferences.reduce(function (memo, fieldReference) {
        if (entityUtil.isJoinAlias(fieldReference.sourceType)) {
          memo[fieldReference.sourceId] = true;
        }

        return memo;
      }, memo);
    }

    return memo;
  },
  _collectAllUsedJoinAliases: function _collectAllUsedJoinAliases(joinsCollection) {
    return joinsCollection.reduce(function (memo, join) {
      this._getAllJoinAliasesFromJoin(join, memo);

      return memo;
    }, {}, this);
  },
  _collectAllUnUsedJoinAliases: function _collectAllUnUsedJoinAliases(joinAliasesCollection, allUsedJoinAliases) {
    return joinAliasesCollection.filter(function (joinAlias) {
      return !allUsedJoinAliases[joinAlias.id];
    }).map(entityIdMapper);
  },
  _removeSpecificJoinAliasesIfNotUsed: function _removeSpecificJoinAliasesIfNotUsed(joinAliasIdsMapToCheck, joinTreeId) {
    var joinTree = this.joinTrees.byId(joinTreeId);

    var allUsedJoinAliases = this._collectAllUsedJoinAliases(joinTree.joins);

    var unusedJoinAliasesIds = this._collectAllUnUsedJoinAliases(joinTree.joinAliases, allUsedJoinAliases).filter(function (joinAliasId) {
      return joinAliasIdsMapToCheck[joinAliasId];
    });

    this._removeJoinAliases(unusedJoinAliasesIds);
  },
  removeJoinTree: function removeJoinTree(joinTreeId) {
    var dataIsland = this.dataIslands.byField('sourceId', joinTreeId);
    this.domainSchemaDAO.removeJoinTrees(joinTreeId);

    if (dataIsland) {
      this.domainSchemaDAO.removeDataIslands(dataIsland.id);
    }
  },
  updateJoinTree: function updateJoinTree(joinTreeId, properties) {
    this.domainSchemaDAO.updateJoinTree(_.extend({
      id: joinTreeId
    }, properties));
  },
  removeConstantJoinExpression: function removeConstantJoinExpression(constantJoinExpressionId) {
    this.domainSchemaDAO.removeConstantJoinExpressions(constantJoinExpressionId);
  },
  createConstantJoinExpression: function createConstantJoinExpression(constantJoinExpression, joinId) {
    this.domainSchemaDAO.addConstantJoinExpression(constantJoinExpression, joinId);
  },
  updateConstantJoinExpression: function updateConstantJoinExpression(constantJoinExpression) {
    this.domainSchemaDAO.updateConstantJoinExpression(constantJoinExpression);
  },
  // Presentation
  moveDataIslandsUp: function moveDataIslandsUp(options) {
    var i,
        positions = options.position;

    for (i = 0; i < positions.length; i++) {
      this._reorderDataIslands({
        dataIslandIds: [options.dataIslandIds[i]],
        position: positions[i]
      });
    }
  },
  moveDataIslandsDown: function moveDataIslandsDown(options) {
    var i,
        positions = options.position;

    for (i = positions.length - 1; i >= 0; i--) {
      this._reorderDataIslands({
        dataIslandIds: [options.dataIslandIds[i]],
        position: positions[i]
      });
    }
  },
  movePresentationItemsUp: function movePresentationItemsUp(options) {
    var i,
        positions = options.position;

    for (i = 0; i < positions.length; i++) {
      this._reorderPresentationItems({
        presentationItemIds: [options.presentationItemIds[i]],
        position: positions[i],
        targetParentId: options.targetParentId
      });
    }
  },
  movePresentationItemsDown: function movePresentationItemsDown(options) {
    var i,
        positions = options.position;

    for (i = positions.length - 1; i >= 0; i--) {
      this._reorderPresentationItems({
        presentationItemIds: [options.presentationItemIds[i]],
        position: positions[i],
        targetParentId: options.targetParentId
      });
    }
  },
  reorderDataIslands: function reorderDataIslands(options) {
    this._reorderDataIslands(options);
  },
  _reorderDataIslands: function _reorderDataIslands(options) {
    var dataIslandsCollection = this.dataIslands,
        dataIslandIdsForReorder = options.dataIslandIds,
        position = options.position;

    if (!this._isArrayUnique(dataIslandIdsForReorder)) {
      throw new Error('Data island ids are not unique');
    }

    position = this._getNewPosition({
      targetCollection: dataIslandsCollection,
      itemIds: dataIslandIdsForReorder,
      position: position
    });
    options.position = position;
    this.domainSchemaDAO.reorderDataIslands(options);
  },
  reorderPresentationItems: function reorderPresentationItems(options) {
    this._reorderPresentationItems(options);
  },
  _reorderPresentationItems: function _reorderPresentationItems(options) {
    var collections = this.dataStore.getCollections(),
        presentationItemIdsForReorder = options.presentationItemIds,
        position = options.position,
        targetParentId = options.targetParentId,
        targetParent = schemaModelUtil.getDataIslandOrPresentationSetById(targetParentId, collections);

    if (!this._isArrayUnique(presentationItemIdsForReorder)) {
      throw new Error('Presentation item ids are not unique');
    }

    position = this._getNewPosition({
      targetCollection: targetParent.getChildren(),
      itemIds: presentationItemIdsForReorder,
      position: position
    });
    options.position = position;
    this.domainSchemaDAO.reorderPresentationItems(options);
  },
  addDataIslands: function addDataIslands(dataIslands, position) {
    var self = this,
        dataIslandIds = [];

    var allDataIslandsHaveUniqueNames = _.every(dataIslands, function (dataIsland) {
      return self.spec.canUseDataIslandName(dataIsland.name);
    });

    if (!allDataIslandsHaveUniqueNames) {
      throw new Error('Data islands should have unique name.');
    }

    _.each(dataIslands, function (dataIsland) {
      if (this._isPresentationItemNamesAlreadyInUse(dataIsland.children)) {
        throw new Error('Presentation items have names which are already in use');
      }

      var dataIslandEntity = this._addDataIsland(dataIsland),
          presentationItems = dataIsland.children.map(function (child) {
        return _.extend({}, child, {
          parentId: dataIslandEntity.id
        });
      });

      this._addPresentationItems({
        presentationItems: presentationItems
      });

      dataIslandIds.push(dataIslandEntity.id);
    }, this);

    if (!_.isUndefined(position)) {
      this._reorderDataIslands({
        dataIslandIds: dataIslandIds,
        position: position
      });
    }
  },
  addConstantDataIsland: function addConstantDataIsland(options) {
    var dataIslandJSON = options.dataIsland,
        position = options.position;
    var dataIsland = this.domainSchemaDAO.addDataIsland(dataIslandJSON);

    this._reorderDataIslands({
      dataIslandIds: [dataIsland.getId()],
      position: position
    });
  },
  addPresentationItems: function addPresentationItems(options) {
    this._addPresentationItems(options);
  },
  _addPresentationItems: function _addPresentationItems(options) {
    var presentationItems = options.presentationItems,
        position = options.position,
        positionInParent;

    if (this._isPresentationItemNamesAlreadyInUse(presentationItems)) {
      throw new Error('Presentation items have names which are already in use');
    }

    _.each(presentationItems, function (presentationItem, index) {
      var resourceType = presentationItem.entityType;

      if (!_.isUndefined(position)) {
        positionInParent = index + position;
      }

      if (entityUtil.isPresentationSet(resourceType)) {
        this._addPresentationSets({
          presentationSets: presentationItem,
          position: positionInParent
        });
      } else if (entityUtil.isPresentationField(resourceType)) {
        this._addPresentationFields({
          presentationFields: presentationItem,
          position: positionInParent
        });
      }
    }, this);
  },
  _addPresentationSets: function _addPresentationSets(options) {
    options = options || {};
    var position = options.position,
        presentationSets = options.presentationSets;
    presentationSets = _.isArray(options.presentationSets) ? presentationSets : [presentationSets];

    _.each(presentationSets, function (presentationSet, index) {
      var _options = {
        parentId: presentationSet.parentId
      };

      if (!_.isUndefined(position)) {
        _options.positionInParent = index + position;
      }

      this.domainSchemaDAO.addPresentationSets(presentationSet, _options);
    }, this);
  },
  _addPresentationFields: function _addPresentationFields(options) {
    options = options || {};
    var position = options.position,
        presentationFields = options.presentationFields;
    presentationFields = _.isArray(options.presentationFields) ? presentationFields : [presentationFields];

    _.each(presentationFields, function (presentationField, index) {
      var _options = {
        parentId: presentationField.parentId
      };

      if (!_.isUndefined(position)) {
        _options.positionInParent = index + position;
      }

      this.domainSchemaDAO.addPresentationFields(presentationField, _options);
    }, this);
  },
  _isPresentationItemNamesAlreadyInUse: function _isPresentationItemNamesAlreadyInUse(presentationItems) {
    var names = this._flattenPresentationItemNames(presentationItems);

    var presentationItemsMap = schemaModelUtil.reduceCollectionByProperty({
      collection: this.presentationSets.concat(this.presentationFields),
      property: 'name'
    });
    return !this.spec.canUseNewPresentationItemNames(names, presentationItemsMap);
  },
  _flattenPresentationItemNames: function _flattenPresentationItemNames(presentationItems) {
    var self = this;
    return presentationItems.reduce(function (memo, presentationItem) {
      memo.push(presentationItem.name);

      if (presentationItem.children) {
        memo = memo.concat(self._flattenPresentationItemNames(presentationItem.children));
      }

      return memo;
    }, []);
  },
  updatePresentationField: function updatePresentationField(fieldId, properties) {
    this.domainSchemaDAO.updatePresentationField(_.extend({
      id: fieldId
    }, properties));
  },
  updatePresentationSet: function updatePresentationSet(setId, properties) {
    this.domainSchemaDAO.updatePresentationSet(_.extend({
      id: setId
    }, properties));
  },
  addCalcField: function addCalcField(options) {
    var calcField = options.calcField,
        sourceId = options.sourceId,
        sourceType = options.sourceType,
        sourceName = options.sourceName;

    this._validateNewCalcField(options);

    if (sourceName) {
      var parent = this.constantGroups.byField('name', sourceName);

      if (!parent) {
        parent = this.domainSchemaDAO.addConstantGroup({
          name: sourceName
        });
      }

      sourceId = parent.getId();
      sourceType = entityUtil.getEntityName(parent);
    }

    this.domainSchemaDAO.addCalcField(calcField, sourceId, sourceType);
  },
  updateCalcField: function updateCalcField(options) {
    var calcField = options.calcField,
        sourceId = options.sourceId,
        sourceType = options.sourceType,
        resourcesToUpdate = options.resources || [];

    this._validateExistingCalcField(options);

    this.domainSchemaDAO.updateCalcField(calcField, sourceId, sourceType);

    this._updateDependentResourcesWithExpressions(resourcesToUpdate);
  },
  removeCalcField: function removeCalcField(options) {
    var calcFieldId = options.id,
        sourceId = options.sourceId,
        sourceType = options.sourceType;
    this.domainSchemaDAO.removeCalcFields(calcFieldId, sourceId, sourceType);

    this._cleanUpAfterResourceRemove();
  },
  _removeEmptyConstantGroups: function _removeEmptyConstantGroups() {
    var emptyConstantGroupIds = this.constantGroups.chain().filter(function (constantGroup) {
      return constantGroup.calcFields.size() === 0;
    }).map(entityIdMapper).toArray();

    this._removeConstantGroups(emptyConstantGroupIds);
  },
  generateCalcFieldName: function generateCalcFieldName(options) {
    this.calcFieldNameGenerator.reset();
    var isCalcFieldNameAlreadyInUse = invert(_.partial(this.granularSpecs.calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel, options));
    return this.calcFieldNameGenerator.generate(null, isCalcFieldNameAlreadyInUse);
  },
  // Filters
  removeFilter: function removeFilter(options) {
    this._removeFilter(options);
  },
  addFilter: function addFilter(filterJson) {
    this._addFilter(filterJson);
  },
  _addFilter: function _addFilter(filterJson) {
    var filterJsonWithFieldReferences = this._collectFieldReferencesForFilter(filterJson);

    var filterExpression = this.domainSchemaDAO.addFilterExpression(filterJsonWithFieldReferences, filterJson.sourceId, filterJson.sourceType);

    this._updateFieldReferencesInFilterExpression(filterExpression, filterJson);
  },
  updateFilter: function updateFilter(filterJson) {
    var filter = this.filters.byId(filterJson.id);

    if (filter.getSourceId() !== filterJson.sourceId) {
      this._removeFilter({
        id: filter.getId(),
        sourceId: filter.getSourceId(),
        sourceType: filter.getSourceType()
      });

      this._addFilter(filterJson);
    } else {
      var filterJsonWithFieldReferences = this._collectFieldReferencesForFilter(filterJson);

      var filterExpression = this.domainSchemaDAO.updateFilterExpression(filterJsonWithFieldReferences, filterJson.sourceId, filterJson.sourceType);

      this._updateFieldReferencesInFilterExpression(filterExpression, filterJson);
    }
  },
  // private methods
  _collectFieldReferencesForFilter: function _collectFieldReferencesForFilter(filterJson) {
    var fieldReferences = [];
    var leftOperand = filterJson.expression.left;
    var rightOperand = filterJson.expression.right;
    var fieldReferenceProperties = ['fieldId', 'fieldType', 'sourceId', 'sourceType'];

    if (leftOperand.sourceId) {
      fieldReferences.push(_.pick(leftOperand, fieldReferenceProperties));
    }

    if (rightOperand.sourceId) {
      fieldReferences.push(_.pick(rightOperand, fieldReferenceProperties));
    }

    return _.extend({}, filterJson, {
      fieldReferences: fieldReferences,
      expression: {
        left: _.omit(filterJson.expression.left, fieldReferenceProperties),
        operator: filterJson.expression.operator,
        right: _.omit(filterJson.expression.right, fieldReferenceProperties)
      }
    });
  },
  _updateFieldReferencesInFilterExpression: function _updateFieldReferencesInFilterExpression(filterExpression, filterJson) {
    var fieldReferences = filterExpression.getFieldReferences();

    if (fieldReferences.size() > 0) {
      var expression = filterExpression.toJSON().expression;
      var leftOperand = filterJson.expression.left;
      var rightOperand = filterJson.expression.right;

      if (leftOperand.sourceId) {
        expression.left.fieldReferenceId = fieldReferences.at(0).getId();

        if (rightOperand.sourceId) {
          expression.right.fieldReferenceId = fieldReferences.at(1).getId();
        }
      } else if (rightOperand.sourceId) {
        expression.right.fieldReferenceId = fieldReferences.at(0).getId();
      }

      this.domainSchemaDAO.updateFilterExpression({
        id: filterExpression.getId(),
        expression: expression
      }, filterExpression.getSourceId(), filterExpression.getSourceType());
    }
  },
  _removeFilter: function _removeFilter(options) {
    var filterId = options.id,
        sourceId = options.sourceId,
        sourceType = options.sourceType;
    this.domainSchemaDAO.removeFilters(filterId, sourceId, sourceType);
  },
  _removeConstantGroups: function _removeConstantGroups(constantGroupsIds) {
    constantGroupsIds = _.isArray(constantGroupsIds) ? constantGroupsIds : [constantGroupsIds];

    _.each(constantGroupsIds, function (constantGroupId) {
      var dataIsland = this.dataIslands.findWhere({
        sourceId: constantGroupId
      });
      this.domainSchemaDAO.removeConstantGroups(constantGroupId);

      if (dataIsland) {
        this.domainSchemaDAO.removeDataIslands(dataIsland.getId());
      }
    }, this);
  },
  _validateNewCalcField: function _validateNewCalcField(options) {
    var calcField = options.calcField,
        sourceId = options.sourceId,
        sourceType = options.sourceType,
        sourceName = options.sourceName;
    var canCreateCalcField = this.spec.canCreateCalcField({
      sourceId: sourceId,
      sourceType: sourceType,
      calcFieldId: calcField.id,
      calcFieldName: calcField.name,
      sourceName: sourceName
    });

    if (!canCreateCalcField) {
      throw new Error('Cannot create calc field');
    }
  },
  _validateExistingCalcField: function _validateExistingCalcField(options) {
    var calcField = options.calcField,
        sourceId = options.sourceId,
        sourceType = options.sourceType,
        sourceName = options.sourceName;
    var canUpdateCalcField = this.spec.canUpdateCalcField({
      sourceId: sourceId,
      sourceType: sourceType,
      calcFieldId: calcField.id,
      calcFieldName: calcField.name,
      calcFieldType: calcField.type,
      sourceName: sourceName
    });

    if (!canUpdateCalcField) {
      throw new Error('Cannot update calc field');
    }
  },
  _isArrayUnique: function _isArrayUnique(array) {
    var map = array.reduce(function (memo, item) {
      memo[item] = true;
      return memo;
    }, {});
    return _.keys(map).length === array.length;
  },
  _getNewPosition: function _getNewPosition(options) {
    var targetCollection = options.targetCollection,
        presentationItemIds = options.itemIds,
        position = options.position;

    if (position > 0) {
      var filteredTargetCollection = targetCollection.filter(function (item, index) {
        if (index >= position) {
          return false;
        }

        var targetItemId = item.getId();
        return _.some(presentationItemIds, function (itemId) {
          if (targetItemId === itemId) {
            return true;
          }
        });
      });
      position -= filteredTargetCollection.length;
    }

    return position;
  },
  _isJoinTreeHasNoJoins: function _isJoinTreeHasNoJoins(joinTree) {
    return joinTree.getJoins().size() === 0;
  },
  _isJoinTreeHasNoJoinAliases: function _isJoinTreeHasNoJoinAliases(joinTree) {
    return joinTree.getJoinAliases().size() === 0;
  },
  _addTableReferencesByTables: function _addTableReferencesByTables(tables) {
    return _.map(tables, function (table) {
      var tableReferenceJson = {
        name: table.getName(),
        tableId: table.getId()
      };
      return this.domainSchemaDAO.addTableReference(tableReferenceJson);
    }, this);
  },
  _createJoinTree: function _createJoinTree(joinTree) {
    return this.domainSchemaDAO.addJoinTree(joinTree);
  },
  _getDataIslandsConnectedWithJoinTrees: function _getDataIslandsConnectedWithJoinTrees(emptyJoinTreeIds) {
    emptyJoinTreeIds = _.isArray(emptyJoinTreeIds) ? emptyJoinTreeIds : [emptyJoinTreeIds];
    return this.dataIslands.chain().filter(function (dataIsland) {
      var sourceId = dataIsland.getSourceId();
      return emptyJoinTreeIds.indexOf(sourceId) !== -1;
    }).map(entityIdMapper).toArray();
  },
  _removeEmptyJoinTrees: function _removeEmptyJoinTrees() {
    var self = this;
    var emptyJoinTreeIds = this.joinTrees.chain().filter(function (joinTree) {
      // Empty join tree does not have any joins or join aliases
      return self._isJoinTreeHasNoJoins(joinTree) && self._isJoinTreeHasNoJoinAliases(joinTree);
    }).map(entityIdMapper).toArray();

    var dataIslandIds = this._getDataIslandsConnectedWithJoinTrees(emptyJoinTreeIds);

    this.domainSchemaDAO.removeJoinTrees(emptyJoinTreeIds);
    this.domainSchemaDAO.removeDataIslands(dataIslandIds);
  },
  _removeEmptyJoins: function _removeEmptyJoins() {
    var emptyJoins = this.joins.filter(function (join) {
      return entityUtil.isJoin(join) && join.joinExpressions.size() === 0;
    });

    _.each(emptyJoins, function (emptyJoin) {
      this.domainSchemaDAO.removeJoins(emptyJoin.getId(), emptyJoin.getJoinTreeId());
    }, this);
  },
  _removeEmptyDataIslands: function _removeEmptyDataIslands() {
    var emptyDataIslandIds = this.dataIslands.chain().filter(function (dataIsland) {
      return !dataIsland.getSourceId();
    }).map(entityIdMapper).toArray();
    this.domainSchemaDAO.removeDataIslands(emptyDataIslandIds);
  },
  _removeSourceLessDataIslands: function _removeSourceLessDataIslands() {
    var sourceLessDataIslandIds = this.dataIslands.reduce(function (memo, dataIsland) {
      if (!dataIsland.sourceId) {
        memo.push(dataIsland.id);
      }

      return memo;
    }, []);
    this.domainSchemaDAO.removeDataIslands(sourceLessDataIslandIds);
  },
  _createJoin: function _createJoin(options) {
    return this.domainSchemaDAO.addJoin({
      leftJoinAliasId: options.leftJoinAliasId,
      rightJoinAliasId: options.rightJoinAliasId,
      weight: options.weight,
      type: options.type
    }, options.joinTreeId);
  },
  _createJoinAlias: function _createJoinAlias(options) {
    return this.domainSchemaDAO.addJoinAlias({
      tableReferenceId: options.tableReferenceId,
      name: options.name
    }, options.joinTreeId);
  },
  _removeJoinExpression: function _removeJoinExpression(joinExpressionId, joinId) {
    var join = this.joins.byId(joinId);
    this.domainSchemaDAO.removeJoinExpressions(joinExpressionId);

    if (this._shouldRemoveJoinAfterJoinExpressionRemoval(join)) {
      this._removeJoin(joinId);
    }
  },
  _shouldRemoveJoinAfterJoinExpressionRemoval: function _shouldRemoveJoinAfterJoinExpressionRemoval(join) {
    var allJoinExpressionsAreConstants = join.joinExpressions.every(function (joinExpression) {
      return entityUtil.isConstantJoinExpression(joinExpression);
    });
    var hasNoJoinExpressions = join.joinExpressions.size() === 0;
    return hasNoJoinExpressions || allJoinExpressionsAreConstants;
  },
  _removeLoneConstantJoinExpressions: function _removeLoneConstantJoinExpressions() {
    var constantJoinExpressionIdsToRemove = this.joins.reduce(function (memo, join) {
      if (entityUtil.isJoin(join)) {
        var joinExpressions = join.joinExpressions;
        var shouldRemoveConstantJoinExpressions = joinExpressions.every(function (joinExpression) {
          return entityUtil.isConstantJoinExpression(joinExpression);
        });

        if (shouldRemoveConstantJoinExpressions) {
          memo = memo.concat(joinExpressions.map(entityIdMapper));
        }
      }

      return memo;
    }, [], this);
    this.domainSchemaDAO.removeConstantJoinExpressions(constantJoinExpressionIdsToRemove);
  },
  _createJoinExpression: function _createJoinExpression(options) {
    return this.domainSchemaDAO.addJoinExpression({
      leftJoinAliasId: options.leftJoinAliasId,
      rightJoinAliasId: options.rightJoinAliasId,
      leftFieldId: options.expression.leftFieldId,
      rightFieldId: options.expression.rightFieldId,
      operator: options.expression.operator
    }, options.joinId);
  },
  _addJoinExpressionBasedOnNewJoinAliasesToExistingJoinTree: function _addJoinExpressionBasedOnNewJoinAliasesToExistingJoinTree(options) {
    var leftTableReferenceId = options.leftTableReferenceId,
        leftTableReference = this.tableReferences.byId(leftTableReferenceId),
        rightTableReferenceId = options.rightTableReferenceId,
        rightTableReference = this.tableReferences.byId(rightTableReferenceId),
        joinTreeId = options.joinTreeId,
        expression = options.expression,
        joinType = options.joinType,
        joinWeight = options.joinWeight;

    var leftJoinAlias = this._createJoinAlias({
      tableReferenceId: leftTableReferenceId,
      name: leftTableReference.getName(),
      joinTreeId: joinTreeId
    });

    var rightJoinAlias = this._createJoinAlias({
      tableReferenceId: rightTableReferenceId,
      name: rightTableReference.getName(),
      joinTreeId: joinTreeId
    });

    var join = this._createJoin({
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      joinTreeId: joinTreeId,
      type: joinType,
      weight: joinWeight
    });

    this._createJoinExpression({
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      expression: expression,
      joinId: join.getId()
    });
  },
  _addNotExistingJoinAliasAndJoinExpressionToExistingJoinTree: function _addNotExistingJoinAliasAndJoinExpressionToExistingJoinTree(options) {
    var rightTableReferenceId = options.rightTableReferenceId,
        leftTableReferenceId = options.leftTableReferenceId,
        joinTreeId = options.joinTreeId,
        expression = options.expression,
        joinType = options.joinType,
        joinWeight = options.joinWeight;
    var joinTree = this.joinTrees.byId(joinTreeId),
        rightTableReference = this.tableReferences.byId(rightTableReferenceId),
        leftTableReference = this.tableReferences.byId(leftTableReferenceId),
        leftJoinAliasId,
        rightJoinAliasId;
    var leftJoinAlias = this.joinAliases.byField('tableReferenceId', leftTableReferenceId),
        rightJoinAlias = this.joinAliases.byField('tableReferenceId', rightTableReferenceId);

    if (!leftJoinAlias) {
      leftJoinAlias = this._createJoinAlias({
        tableReferenceId: leftTableReferenceId,
        name: leftTableReference.getName(),
        joinTreeId: joinTree.getId()
      });
      leftJoinAliasId = leftJoinAlias.getId();
      rightJoinAliasId = rightJoinAlias.getId();
    } else if (!rightJoinAlias) {
      rightJoinAlias = this._createJoinAlias({
        tableReferenceId: rightTableReferenceId,
        name: rightTableReference.getName(),
        joinTreeId: joinTree.getId()
      });
      leftJoinAliasId = leftJoinAlias.getId();
      rightJoinAliasId = rightJoinAlias.getId();
    }

    var join = this._createJoin({
      leftJoinAliasId: leftJoinAliasId,
      rightJoinAliasId: rightJoinAliasId,
      joinTreeId: joinTree.getId(),
      type: joinType,
      weight: joinWeight
    });

    this._createJoinExpression({
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      expression: expression,
      joinId: join.getId()
    });
  },
  _addJoinExpressionBasedOnExistingJoinAliasesToExistingJoinTree: function _addJoinExpressionBasedOnExistingJoinAliasesToExistingJoinTree(options) {
    var leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        joinTreeId = options.joinTreeId,
        expression = options.expression,
        joinType = options.joinType,
        joinWeight = options.joinWeight;
    var joinTree = this.joinTrees.byId(joinTreeId);

    var joinByJoinAliases = this._findJoinInJoinTreeByJoinAliases(leftJoinAlias.getId(), rightJoinAlias.getId(), joinTree);

    if (!joinByJoinAliases) {
      joinByJoinAliases = this._createJoin({
        leftJoinAliasId: leftJoinAlias.getId(),
        rightJoinAliasId: rightJoinAlias.getId(),
        joinTreeId: joinTreeId,
        type: joinType,
        weight: joinWeight
      });
    }

    this._createJoinExpression({
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      expression: expression,
      joinId: joinByJoinAliases.getId()
    });
  },
  _findJoinInJoinTreeByJoinAliases: function _findJoinInJoinTreeByJoinAliases(leftJoinAliasId, rightJoinAliasId, joinTree) {
    return joinTree.getJoins().find(function (join) {
      return join.getRightJoinAliasId() === rightJoinAliasId && join.getLeftJoinAliasId() === leftJoinAliasId || join.getRightJoinAliasId() === leftJoinAliasId && join.getLeftJoinAliasId() === rightJoinAliasId;
    });
  },
  _checkIfDataIslandsNotExistAndThrowError: function _checkIfDataIslandsNotExistAndThrowError(dataIslandIds) {
    var dataIslandId = _.find(dataIslandIds, function (dataIslandId) {
      return _.isUndefined(this.dataIslands.byId(dataIslandId));
    }, this);

    if (dataIslandId) {
      throw new Error('There is no data island with id ' + dataIslandId);
    }
  },
  _removeAllTableReferencesByDataSourceId: function _removeAllTableReferencesByDataSourceId(dataSourceId) {
    var self = this;
    var allTableReferenceIds = this.tableReferences.chain().filter(function (tableReference) {
      var table = schemaModelUtil.getTableByTableReference(tableReference, self.dataStore.getCollections());
      return table.getDataSourceId() === dataSourceId;
    }).map(entityIdMapper).toArray();
    this.domainSchemaDAO.removeTableReferences(allTableReferenceIds);
  },
  _reCreateTableReferencesForJoinsGeneration: function _reCreateTableReferencesForJoinsGeneration(dataSourceId, selfJoinsGroupedByTableId) {
    this._removeAllTableReferencesByDataSourceId(dataSourceId);

    this._removeEmptyJoinTrees();

    this._removeEmptyDataIslands();

    return this.tables.reduce(function (memo, table) {
      var tableId = table.getId(),
          tableReference,
          tableReferenceCopy;
      tableReference = this.domainSchemaDAO.addTableReference({
        name: table.getName(),
        tableId: tableId
      });
      memo[tableId] = tableReference;

      if (selfJoinsGroupedByTableId[tableId]) {
        tableReferenceCopy = this._copyTableReference(tableReference.getId());
        memo[tableId] = [tableReference, tableReferenceCopy];
      }

      return memo;
    }, {}, this);
  },
  _getSelfJoinsGroupedByTableId: function _getSelfJoinsGroupedByTableId(joinsInfo) {
    return _.chain(joinsInfo).reduce(function (memo, joinTreeInfo) {
      memo = memo.concat(joinTreeInfo.joins);
      return memo;
    }, []).filter(function (joinInfo) {
      return joinInfo.leftTableId === joinInfo.rightTableId;
    }).reduce(function (memo, joinInfo) {
      if (memo[joinInfo.leftTableId]) {
        memo[joinInfo.leftTableId] += 1;
      } else {
        memo[joinInfo.leftTableId] = 1;
      }

      return memo;
    }, {}).value();
  },
  _copyTableReference: function _copyTableReference(id) {
    var tableReferences = this.dataStore.getCollection('tableReferences');
    var originalTableReference = tableReferences.byId(id);

    var tableReferenceCopyName = this._getNameForTableReferenceCopy(originalTableReference.getName());

    var tableReferenceCopy = {
      name: tableReferenceCopyName,
      tableId: originalTableReference.getTableId()
    };
    var tableReference = this.domainSchemaDAO.addTableReference(tableReferenceCopy);

    this._copySingleTableCalcFields(originalTableReference.getCalcFields().toArray(), tableReference);

    return tableReference;
  },
  _copySingleTableCalcFields: function _copySingleTableCalcFields(calcFieldsToCopy, tableReference) {
    if (calcFieldsToCopy.length > 0) {
      calcFieldsToCopy = _.clone(calcFieldsToCopy);
      var table = schemaModelUtil.getTableByTableReference(tableReference, this.dataStore.getCollections()),
          allAvailableFields = schemaModelUtil.getAllTableFields(table);

      var allFieldsIndexedByName = _.indexBy(allAvailableFields, 'name'),
          allConstantsById = this.constantGroups.reduce(function (memo, constantGroup) {
        return memo.concat(constantGroup.getCalcFields().toArray());
      }, []);

      allConstantsById = _.indexBy(allConstantsById, 'id');

      while (calcFieldsToCopy.length > 0) {
        var calcField = this._findCalcFieldWithAllDependenciesWhichAreAlreadyPresent(calcFieldsToCopy, allFieldsIndexedByName, allConstantsById);

        if (!calcField) {
          throw new Error('could not find next calc field to copy');
        }

        var calcFieldJSON = _.omit(calcField.toJSON(), 'id');

        calcFieldJSON.fieldReferences = this._mapAllCalcFieldsDependenciesToNew({
          calcField: calcField,
          allFieldsIndexedByName: allFieldsIndexedByName,
          allConstantsById: allConstantsById,
          source: tableReference
        });
        var newCalcField = this.domainSchemaDAO.addCalcField(calcFieldJSON, tableReference.getId(), entityUtil.getEntityName(tableReference));
        calcFieldsToCopy = _.without(calcFieldsToCopy, calcField);
        allFieldsIndexedByName[newCalcField.getName()] = newCalcField;
      }
    }
  },
  _findCalcFieldWithAllDependenciesWhichAreAlreadyPresent: function _findCalcFieldWithAllDependenciesWhichAreAlreadyPresent(allCalcFields, allFieldsIndexedByName, allConstantsById) {
    var self = this;
    return _.find(allCalcFields, function (calcField) {
      var fieldReferences = calcField.getFieldReferences();

      if (fieldReferences.size() === 0) {
        return true;
      }

      return !fieldReferences.find(function (fieldReference) {
        var field = schemaModelUtil.getFieldByFieldReference(fieldReference, self.dataStore.getCollections());
        var presentInAllAvailableFields = allFieldsIndexedByName[field.getName()],
            isConstant = allConstantsById[field.getId()];
        return !isConstant && !presentInAllAvailableFields;
      });
    });
  },
  _mapAllCalcFieldsDependenciesToNew: function _mapAllCalcFieldsDependenciesToNew(options) {
    var calcField = options.calcField,
        allFieldsIndexedByName = options.allFieldsIndexedByName,
        allConstantsById = options.allConstantsById,
        source = options.source;
    return calcField.getFieldReferences().map(function (fieldReference) {
      var field = schemaModelUtil.getFieldByFieldReference(fieldReference, this.dataStore.getCollections()),
          isConstant = allConstantsById[field.getId()],
          fieldToCopy;

      if (isConstant) {
        fieldToCopy = field;
        return this.domainSchemaDAO.createFieldReference({
          sourceId: fieldToCopy.getSourceId(),
          sourceType: fieldToCopy.getSourceType(),
          fieldId: fieldToCopy.getId(),
          fieldType: entityUtil.getEntityName(fieldToCopy)
        });
      } else {
        fieldToCopy = allFieldsIndexedByName[field.getName()];
        return this.domainSchemaDAO.createFieldReference({
          sourceId: source.getId(),
          sourceType: entityUtil.getEntityName(source),
          fieldId: fieldToCopy.getId(),
          fieldType: entityUtil.getEntityName(fieldToCopy)
        });
      }
    }, this);
  },
  _addDataIsland: function _addDataIsland(dataIsland) {
    return this.domainSchemaDAO.addDataIsland({
      name: dataIsland.name,
      label: dataIsland.name,
      sourceId: dataIsland.sourceId,
      sourceType: dataIsland.sourceType
    });
  }
});

_.extend(DomainSchemaService.prototype, allCollectionsMixin);

module.exports = DomainSchemaService;

});