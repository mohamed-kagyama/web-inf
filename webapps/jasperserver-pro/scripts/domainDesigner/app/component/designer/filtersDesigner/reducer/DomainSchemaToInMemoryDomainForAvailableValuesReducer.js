define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var schemaModelUtil = require("../../../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DATA_ISLAND_NAME = 'DataIsland';

var DomainSchemaToInMemoryDomainForAvailableValuesReducer = function DomainSchemaToInMemoryDomainForAvailableValuesReducer(options) {
  this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
  this.schemaModelConverter = options.schemaModelConverter;
};

_.extend(DomainSchemaToInMemoryDomainForAvailableValuesReducer.prototype, {
  reduce: function reduce(fieldReference, schema) {
    var field = schemaModelUtil.getResourceByIdAndType(fieldReference.fieldId, fieldReference.fieldType, schema),
        source = schemaModelUtil.getResourceByIdAndType(fieldReference.sourceId, fieldReference.sourceType, schema);
    var options = {
      source: source,
      field: field,
      schema: schema
    };

    if (entityUtil.isJoinTree(source)) {
      this._reduceCrossTableCalcField(options);
    } else {
      this._reduceTableReferenceField(options);
    }

    return schema;
  },
  _reduceCrossTableCalcField: function _reduceCrossTableCalcField(options) {
    var joinTree = options.source,
        field = options.field,
        schema = options.schema;
    var allUsedResources = {};
    allUsedResources[field.getId()] = true;
    allUsedResources[joinTree.getId()] = true;
    allUsedResources = this._addAllSlaveFieldsToUsedResources(allUsedResources, field);
    allUsedResources = this._addAllResourcesUsedInJoinTreeToUsedResources(joinTree, allUsedResources);
    allUsedResources = this._addTableReferencesUsedInJoinTreeToUsedResources(joinTree, schema, allUsedResources);
    allUsedResources = this._addAllDataSourceMetadataToUsedResources(schema, allUsedResources);

    this._cleanUpAllDomainResources(schema, allUsedResources);

    this._createDataIsland(field, joinTree, schema);
  },
  _reduceTableReferenceField: function _reduceTableReferenceField(options) {
    var source = options.source,
        field = options.field,
        schema = options.schema;
    var tableReference;

    if (entityUtil.isJoinAlias(source)) {
      tableReference = schemaModelUtil.getTableReferenceByJoinAlias(source, schema);
    } else if (entityUtil.isTableReference(source)) {
      tableReference = schema.tableReferences.byId(source.getId());
    }

    var allUsedResources = {};
    allUsedResources[field.getId()] = true;
    allUsedResources[tableReference.getId()] = true;
    allUsedResources = this._addAllSlaveFieldsToUsedResources(allUsedResources, field);
    allUsedResources = this._addAllDataSourceMetadataToUsedResources(schema, allUsedResources);

    this._cleanUpAllDomainResources(schema, allUsedResources);

    this._createDataIsland(field, tableReference, schema);
  },
  _addAllSlaveFieldsToUsedResources: function _addAllSlaveFieldsToUsedResources(allUsedResources, field) {
    return _.extend({}, allUsedResources, this._getAllSlaveFields(field));
  },
  _addAllResourcesUsedInJoinTreeToUsedResources: function _addAllResourcesUsedInJoinTreeToUsedResources(joinTree, allUsedResources) {
    var resourcesUsedInJoinTree = {};
    joinTree.getJoins().each(function (join) {
      if (entityUtil.isComplexJoin(join)) {
        join.getFieldReferences().each(function (fieldReference) {
          if (entityUtil.isJoinAlias(fieldReference.getSourceType())) {
            resourcesUsedInJoinTree[fieldReference.getSourceId()] = true;
          }

          resourcesUsedInJoinTree[fieldReference.getFieldId()] = true;
        });
      } else {
        join.getJoinExpressions().each(function (joinExpression) {
          if (entityUtil.isConstantJoinExpression(joinExpression)) {
            resourcesUsedInJoinTree[joinExpression.getJoinAliasId()] = true;
            resourcesUsedInJoinTree[joinExpression.getFieldId()] = true;
          } else if (entityUtil.isJoinExpression(joinExpression)) {
            resourcesUsedInJoinTree[joinExpression.getLeftJoinAliasId()] = true;
            resourcesUsedInJoinTree[joinExpression.getRightJoinAliasId()] = true;
            resourcesUsedInJoinTree[joinExpression.getLeftFieldId()] = true;
            resourcesUsedInJoinTree[joinExpression.getRightFieldId()] = true;
          } else {
            throw new Error('invalid join expression type');
          }
        });
      }
    });
    return _.extend(resourcesUsedInJoinTree, allUsedResources);
  },
  _addTableReferencesUsedInJoinTreeToUsedResources: function _addTableReferencesUsedInJoinTreeToUsedResources(joinTree, schema, allUsedResources) {
    var usedTableReferences = joinTree.getJoinAliases().reduce(function (memo, joinAlias) {
      if (allUsedResources[joinAlias.getId()]) {
        memo[joinAlias.getTableReferenceId()] = true;
      }

      return memo;
    }, {});
    return _.extend(usedTableReferences, allUsedResources);
  },
  _addAllDataSourceMetadataToUsedResources: function _addAllDataSourceMetadataToUsedResources(schema, allUsedResources) {
    schema.tableReferences.each(function (tableReference) {
      if (allUsedResources[tableReference.getId()]) {
        var table = schemaModelUtil.getTableByTableReference(tableReference, schema);
        allUsedResources = this._addAllParentResourcesToUsedResources({
          schema: schema,
          resource: table,
          allUsedResources: allUsedResources
        });
      }
    }, this);
    return allUsedResources;
  },
  _cleanUpCalcFieldsAndFiltersForSource: function _cleanUpCalcFieldsAndFiltersForSource(source, allUsedResources) {
    this._cleanCollectionByUsedResources(source.getCalcFields(), allUsedResources);

    this._cleanUpFilters(source.getFilters(), {});
  },
  _getAllSlaveFields: function _getAllSlaveFields(field) {
    if (entityUtil.isCalcField(field)) {
      return this.clientDomainSchemaCalcFieldsService.getAllSlaveFields(field.getId()).reduce(function (memo, fieldId) {
        memo[fieldId] = true;
        return memo;
      }, {});
    } else {
      return {};
    }
  },
  _addAllParentResourcesToUsedResources: function _addAllParentResourcesToUsedResources(options) {
    var schema = options.schema,
        resource = options.resource,
        allUsedResources = options.allUsedResources;
    var parent,
        parentId = resource.getParentId();
    allUsedResources[resource.getId()] = true;

    while (parentId) {
      parent = schemaModelUtil.getResourceParent(resource, schema);
      allUsedResources[parent.getId()] = true;
      resource = parent;
      parentId = parent.getParentId && parent.getParentId();
    }

    return allUsedResources;
  },
  _cleanUpAllDomainResources: function _cleanUpAllDomainResources(schema, allUsedResources) {
    this._cleanUpConstantGroups(schema.constantGroups, allUsedResources);

    this._cleanUpTableReferences(schema.tableReferences, allUsedResources);

    this._cleanUpDataSources(schema.dataSources, allUsedResources);

    this._cleanCollectionByUsedResources(schema.dataSourceGroups, allUsedResources);

    this._cleanCollectionByUsedResources(schema.tables, allUsedResources);

    this._cleanCollectionByUsedResources(schema.tableGroups, allUsedResources);

    this._cleanCollectionByUsedResources(schema.fields, allUsedResources);

    this._cleanCollectionByUsedResources(schema.joinAliases, allUsedResources);

    this._cleanUpJoinTrees(schema.joinTrees, allUsedResources);

    this._cleanUpFilters(schema.filters, allUsedResources);

    this._cleanUpPresentationItems(schema, allUsedResources);
  },
  _cleanUpPresentationItems: function _cleanUpPresentationItems(schema, allUsedResources) {
    schema.dataIslands.fromArray([]);
    schema.presentationFields.fromArray([]);
    schema.presentationSets.fromArray([]);
  },
  _cleanUpJoinTrees: function _cleanUpJoinTrees(joinTrees, allUsedResources) {
    var self = this;

    this._cleanCollectionByUsedResources(joinTrees, allUsedResources);

    joinTrees.each(function (joinTree) {
      self._cleanUpCalcFieldsAndFiltersForSource(joinTree, allUsedResources);
    });
  },
  _cleanUpFilters: function _cleanUpFilters(filters, allUsedResources) {
    filters.fromArray([]);
  },
  _cleanUpDataSources: function _cleanUpDataSources(dataSources, allUsedResources) {
    var self = this,
        usedDataSources = {};
    dataSources.each(function (dataSource) {
      self._cleanUpResourceChildrenRecursive(allUsedResources, dataSource);

      if (dataSource.getChildren().size() > 0) {
        usedDataSources[dataSource.getId()] = true;
      }
    }, this);

    this._cleanCollectionByUsedResources(dataSources, usedDataSources);
  },
  _cleanUpTableReferences: function _cleanUpTableReferences(tableReferences, allUsedResources) {
    var self = this;

    this._cleanCollectionByUsedResources(tableReferences, allUsedResources);

    tableReferences.each(function (tableReference) {
      self._cleanUpCalcFieldsAndFiltersForSource(tableReference, allUsedResources);
    });
  },
  _cleanUpConstantGroups: function _cleanUpConstantGroups(constantGroups, allUsedResources) {
    var self = this,
        usedConstantGroups = {};
    constantGroups.each(function (constantGroup) {
      var calcFields = constantGroup.getCalcFields();

      self._cleanCollectionByUsedResources(constantGroup.getCalcFields(), allUsedResources);

      if (calcFields.size() > 0) {
        usedConstantGroups[constantGroup.getId()] = true;
      }
    }, []);

    this._cleanCollectionByUsedResources(constantGroups, usedConstantGroups);
  },
  _cleanCollectionByUsedResources: function _cleanCollectionByUsedResources(collection, allUsedResources) {
    var idsToRemove = collection.reduce(function (memo, entity) {
      if (!allUsedResources[entity.getId()]) {
        memo.push(entity.getId());
      }

      return memo;
    }, []);
    idsToRemove.forEach(function (id) {
      collection.removeById(id);
    });
  },
  _cleanUpResourceChildren: function _cleanUpResourceChildren(allUsedResources, resource) {
    if (_.isFunction(resource.getChildren)) {
      this._cleanCollectionByUsedResources(resource.getChildren(), allUsedResources);
    }
  },
  _cleanUpResourceChildrenRecursive: function _cleanUpResourceChildrenRecursive(allUsedResources, resource) {
    var self = this;

    this._cleanUpResourceChildren(allUsedResources, resource);

    resource.getChildren && resource.getChildren().each(function (resource) {
      self._cleanUpResourceChildrenRecursive(allUsedResources, resource);
    });
  },
  _createDataIsland: function _createDataIsland(field, source, collections) {
    this.schemaModelConverter.parseDataIsland({
      dataIslandJson: {
        name: DATA_ISLAND_NAME,
        label: DATA_ISLAND_NAME,
        sourceId: source.getId(),
        sourceType: entityUtil.getEntityName(source),
        children: [{
          name: field.getName(),
          label: field.getName(),
          sourceId: source.getId(),
          sourceType: entityUtil.getEntityName(source),
          fieldId: field.getId(),
          fieldType: entityUtil.getEntityName(field),
          entityType: schemaEntitiesEnum.PRESENTATION_FIELD
        }]
      },
      collections: collections
    });
  }
});

module.exports = DomainSchemaToInMemoryDomainForAvailableValuesReducer;

});