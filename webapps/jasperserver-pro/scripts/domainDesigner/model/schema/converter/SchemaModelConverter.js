define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../util/entityUtil");

var schemaCollectionsEnum = require("../enum/schemaCollectionsEnum");

var domainSchemaCollectionsFactory = require("../factory/domainSchemaCollectionsFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function addNotEmptyArrayToJson(array, json, propName) {
  if (array.length > 0) {
    json[propName] = array;
  }
}

function updateJSONWithEntityType(json, entity) {
  json.entityType = entityUtil.getEntityName(entity);
  return json;
}

var SchemaModelConverter = function SchemaModelConverter(options) {
  this.entityFactory = options.entityFactory;
};

_.extend(SchemaModelConverter.prototype, {
  // toJson
  toJSON: function toJSON(collections) {
    var dataSources = collections[schemaCollectionsEnum.DATA_SOURCES],
        tableReferences = collections[schemaCollectionsEnum.TABLE_REFERENCES],
        joinTrees = collections[schemaCollectionsEnum.JOIN_TREES],
        dataIslands = collections[schemaCollectionsEnum.DATA_ISLANDS],
        constantGroups = collections[schemaCollectionsEnum.CONSTANT_GROUPS];
    var json = {};
    var constantGroupsJSON = constantGroups.map(function (constantGroup) {
      return this.constantGroupToJson(constantGroup);
    }, this);
    var dataSourcesJSON = dataSources.map(function (dataSource) {
      return this.dataSourceToJSON(dataSource);
    }, this);
    var tableReferencesJSON = tableReferences.map(function (tableReference) {
      return this.tableReferenceToJSON(tableReference);
    }, this);
    var joinTreesJSON = joinTrees.map(function (joinTree) {
      return this.joinTreeToJSON(joinTree);
    }, this);
    var dataIslandsJSON = dataIslands.map(function (dataIsland) {
      return this.dataIslandToJSON(dataIsland);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(constantGroupsJSON), json, schemaCollectionsEnum.CONSTANT_GROUPS);
    addNotEmptyArrayToJson(Object.freeze(dataSourcesJSON), json, schemaCollectionsEnum.DATA_SOURCES);
    addNotEmptyArrayToJson(Object.freeze(tableReferencesJSON), json, schemaCollectionsEnum.TABLE_REFERENCES);
    addNotEmptyArrayToJson(Object.freeze(joinTreesJSON), json, schemaCollectionsEnum.JOIN_TREES);
    addNotEmptyArrayToJson(Object.freeze(dataIslandsJSON), json, schemaCollectionsEnum.DATA_ISLANDS);
    return Object.freeze(json);
  },
  constantGroupToJson: function constantGroupToJson(constantGroup) {
    var resourceJSON = constantGroup.toJSON();
    var childrenJSON = constantGroup.calcFields.map(function (calcField) {
      return this.calcFieldToJson(calcField);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(childrenJSON), resourceJSON, 'calcFields');
    return Object.freeze(resourceJSON);
  },
  calcFieldToJson: function calcFieldToJson(calcField) {
    var calcFieldJson = calcField.toJSON();
    var fieldReferences = calcField.fieldReferences.map(function (fieldReference) {
      return this.fieldReferenceToJson(fieldReference);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(fieldReferences), calcFieldJson, 'fieldReferences');
    return Object.freeze(calcFieldJson);
  },
  tableReferenceToJSON: function tableReferenceToJSON(tableReference) {
    var tableReferenceJson = tableReference.toJSON();
    var calcFieldsJson = tableReference.calcFields.map(function (calcField) {
      return this.calcFieldToJson(calcField);
    }, this);
    var filtersJson = tableReference.filters.map(function (filter) {
      return this.anyFilterToJson(filter);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(calcFieldsJson), tableReferenceJson, 'calcFields');
    addNotEmptyArrayToJson(Object.freeze(filtersJson), tableReferenceJson, 'filters');
    return Object.freeze(tableReferenceJson);
  },
  dataSourceToJSON: function dataSourceToJSON(dataSource) {
    var resourceJSON = dataSource.toJSON();
    resourceJSON = this.resourceChildrenToJson(resourceJSON, dataSource.children);
    return Object.freeze(resourceJSON);
  },
  dataSourceGroupToJSON: function dataSourceGroupToJSON(dataSourceGroup) {
    return this.resourceWithChildrenToJson(dataSourceGroup);
  },
  tableToJSON: function tableToJSON(table) {
    return this.resourceWithChildrenToJson(table);
  },
  tableGroupToJSON: function tableGroupToJSON(tableGroup) {
    return this.resourceWithChildrenToJson(tableGroup);
  },
  fieldToJSON: function fieldToJSON(field) {
    var fieldJSON = field.toJSON();
    fieldJSON = updateJSONWithEntityType(fieldJSON, field);
    return Object.freeze(fieldJSON);
  },
  joinTreeToJSON: function joinTreeToJSON(joinTree) {
    var joinTreeJson = joinTree.toJSON();
    var joins = joinTree.joins.map(function (join) {
      return this.anyJoinToJson(join);
    }, this);
    var joinAliases = joinTree.joinAliases.map(function (joinAlias) {
      return this.joinAliasToJSON(joinAlias);
    }, this);
    var calcFieldsJson = joinTree.calcFields.map(function (calcField) {
      return this.calcFieldToJson(calcField);
    }, this);
    var filtersJson = joinTree.filters.map(function (calcField) {
      return this.anyFilterToJson(calcField);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(joins), joinTreeJson, 'joins');
    addNotEmptyArrayToJson(Object.freeze(joinAliases), joinTreeJson, 'joinAliases');
    addNotEmptyArrayToJson(Object.freeze(calcFieldsJson), joinTreeJson, 'calcFields');
    addNotEmptyArrayToJson(Object.freeze(filtersJson), joinTreeJson, 'filters');
    return Object.freeze(joinTreeJson);
  },
  joinToJSON: function joinToJSON(join) {
    var joinJson = join.toJSON();
    joinJson = updateJSONWithEntityType(joinJson, join);
    var joinExpressions = join.joinExpressions.map(function (joinExpression) {
      return this.anyJoinExpressionToJson(joinExpression);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(joinExpressions), joinJson, 'joinExpressions');
    return Object.freeze(joinJson);
  },
  complexJoinToJSON: function complexJoinToJSON(complexJoin) {
    var complexJoinJson = complexJoin.toJSON();
    complexJoinJson = updateJSONWithEntityType(complexJoinJson, complexJoin);
    var fieldReferences = complexJoin.fieldReferences.map(function (fieldReference) {
      return this.fieldReferenceToJson(fieldReference);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(fieldReferences), complexJoinJson, 'fieldReferences');
    return Object.freeze(complexJoinJson);
  },
  joinAliasToJSON: function joinAliasToJSON(joinAlias) {
    return Object.freeze(joinAlias.toJSON());
  },
  joinExpressionToJSON: function joinExpressionToJSON(joinExpression) {
    var joinExpressionJson = joinExpression.toJSON();
    joinExpressionJson = updateJSONWithEntityType(joinExpressionJson, joinExpression);
    return Object.freeze(joinExpressionJson);
  },
  constantJoinExpressionToJSON: function constantJoinExpressionToJSON(constantJoinExpression) {
    var constantJoinExpressionJson = constantJoinExpression.toJSON();
    constantJoinExpressionJson = updateJSONWithEntityType(constantJoinExpressionJson, constantJoinExpression);
    return Object.freeze(constantJoinExpressionJson);
  },
  dataIslandToJSON: function dataIslandToJSON(dataIsland) {
    var dataIslandJson = dataIsland.toJSON();
    var children = dataIsland.children.map(function (child) {
      return this.anyPresentationItemToJson(child);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(children), dataIslandJson, 'children');
    return Object.freeze(dataIslandJson);
  },
  presentationSetToJson: function presentationSetToJson(set) {
    var setJson = set.toJSON();
    setJson = updateJSONWithEntityType(setJson, set);
    var children = set.children.map(function (child) {
      return this.anyPresentationItemToJson(child);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(children), setJson, 'children');
    return Object.freeze(setJson);
  },
  presentationFieldToJson: function presentationFieldToJson(field) {
    var fieldJson = field.toJSON();
    fieldJson = updateJSONWithEntityType(fieldJson, field);
    return Object.freeze(fieldJson);
  },
  resourceWithChildrenToJson: function resourceWithChildrenToJson(resource) {
    var resourceJSON = resource.toJSON();
    resourceJSON = updateJSONWithEntityType(resourceJSON, resource);
    resourceJSON = this.resourceChildrenToJson(resourceJSON, resource.children);
    return Object.freeze(resourceJSON);
  },
  resourceChildrenToJson: function resourceChildrenToJson(resourceJSON, children) {
    var childrenJSON = children.map(function (child) {
      return this.dataSourceResourceToJson(child);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(childrenJSON), resourceJSON, 'children');
    return resourceJSON;
  },
  dataSourceResourceToJson: function dataSourceResourceToJson(resource) {
    if (entityUtil.isDataSourceGroup(resource)) {
      return this.dataSourceGroupToJSON(resource);
    } else if (entityUtil.isTable(resource)) {
      return this.tableToJSON(resource);
    } else if (entityUtil.isTableGroup(resource)) {
      return this.tableGroupToJSON(resource);
    } else if (entityUtil.isField(resource)) {
      return this.fieldToJSON(resource);
    }
  },
  anyFilterToJson: function anyFilterToJson(filter) {
    if (entityUtil.isFilterExpression(filter)) {
      return this.filterExpressionToJson(filter);
    } else if (entityUtil.isComplexFilter(filter)) {
      return this.complexFilterToJson(filter);
    }
  },
  filterExpressionToJson: function filterExpressionToJson(filterExpression) {
    var filterExpressionJson = filterExpression.toJSON();
    var fieldReferences = filterExpression.fieldReferences.map(function (fieldReference) {
      return this.fieldReferenceToJson(fieldReference, {
        serializeId: true
      });
    }, this);
    addNotEmptyArrayToJson(Object.freeze(fieldReferences), filterExpressionJson, 'fieldReferences');
    filterExpressionJson = updateJSONWithEntityType(filterExpressionJson, filterExpression);
    return Object.freeze(filterExpressionJson);
  },
  complexFilterToJson: function complexFilterToJson(complexFilter) {
    var complexFilterJson = complexFilter.toJSON();
    var fieldReferences = complexFilter.fieldReferences.map(function (fieldReference) {
      return this.fieldReferenceToJson(fieldReference);
    }, this);
    addNotEmptyArrayToJson(Object.freeze(fieldReferences), complexFilterJson, 'fieldReferences');
    complexFilterJson = updateJSONWithEntityType(complexFilterJson, complexFilter);
    return Object.freeze(complexFilterJson);
  },
  fieldReferenceToJson: function fieldReferenceToJson(fieldReference, options) {
    var fieldReferenceJSON = fieldReference.toJSON();
    options = options || {};

    if (options.serializeId) {
      fieldReferenceJSON.id = fieldReference.id;
    }

    return Object.freeze(fieldReferenceJSON);
  },
  anyJoinToJson: function anyJoinToJson(join) {
    if (entityUtil.isJoin(join)) {
      return this.joinToJSON(join);
    } else if (entityUtil.isComplexJoin(join)) {
      return this.complexJoinToJSON(join);
    }
  },
  anyJoinExpressionToJson: function anyJoinExpressionToJson(joinExpression) {
    if (entityUtil.isJoinExpression(joinExpression)) {
      return this.joinExpressionToJSON(joinExpression);
    } else if (entityUtil.isConstantJoinExpression(joinExpression)) {
      return this.constantJoinExpressionToJSON(joinExpression);
    }
  },
  anyPresentationItemToJson: function anyPresentationItemToJson(presentationItem) {
    if (entityUtil.isPresentationSet(presentationItem)) {
      return this.presentationSetToJson(presentationItem);
    } else if (entityUtil.isPresentationField(presentationItem)) {
      return this.presentationFieldToJson(presentationItem);
    }
  },
  // parse
  parse: function parse(options) {
    options = _.defaults(options || {}, {
      json: {},
      collections: {}
    });
    options.json = _.defaults({}, options.json, {
      constantGroups: [],
      dataIslands: [],
      dataSources: [],
      tableReferences: [],
      joinTrees: []
    });
    options.collections = _.defaults({}, options.collections, domainSchemaCollectionsFactory.create());
    var json = options.json,
        collections = options.collections;

    _.each(json.constantGroups, function (constantGroup) {
      this.parseConstantGroup({
        constantGroupJson: constantGroup,
        collections: collections
      });
    }, this);

    _.each(json.dataSources, function (dataSource) {
      this.parseDataSource({
        dataSourceJson: dataSource,
        collections: collections
      });
    }, this);

    _.each(json.tableReferences, function (tableReferenceJson) {
      this.parseTableReference({
        tableReferenceJson: tableReferenceJson,
        collections: collections
      });
    }, this);

    _.each(json.joinTrees, function (joinTreeJson) {
      this.parseJoinTree({
        joinTreeJson: joinTreeJson,
        collections: collections
      });
    }, this);

    _.each(json.dataIslands, function (dataIslandJson) {
      this.parseDataIsland({
        dataIslandJson: dataIslandJson,
        collections: collections
      });
    }, this);

    return collections;
  },
  parseConstantGroup: function parseConstantGroup(options) {
    var collections = options.collections,
        constantGroupJson = options.constantGroupJson,
        constantGroup = this.entityFactory.createConstantGroup({
      id: constantGroupJson.id,
      name: constantGroupJson.name
    });
    constantGroup.setCalcFields(_.map(constantGroupJson.calcFields || [], function (calcFieldJson) {
      return this.parseCalcField({
        calcFieldJson: calcFieldJson,
        parent: constantGroup,
        collections: collections
      });
    }, this));
    collections.constantGroups.add(constantGroup);
    return constantGroup;
  },
  parseCalcField: function parseCalcField(options) {
    var calcFieldJson = options.calcFieldJson,
        parent = options.parent,
        collections = options.collections,
        calcField = this.entityFactory.createCalcField({
      id: calcFieldJson.id,
      sourceId: calcFieldJson.sourceId || parent.id,
      sourceType: calcFieldJson.sourceType || entityUtil.getEntityName(parent)
    });
    calcField.update(calcFieldJson);
    calcField.setFieldReferences(_.map(calcFieldJson.fieldReferences || [], function (fieldReference) {
      return this.parseFieldReference({
        fieldReferenceJson: fieldReference
      });
    }, this));
    collections.fields.add(calcField);
    return calcField;
  },
  parseTableReference: function parseTableReference(options) {
    var tableReferenceJson = options.tableReferenceJson,
        collections = options.collections,
        tableReference = this.entityFactory.createTableReference({
      id: tableReferenceJson.id
    });
    tableReference.update(tableReferenceJson);
    tableReference.setCalcFields(_.map(tableReferenceJson.calcFields || [], function (calcFieldJson) {
      return this.parseCalcField({
        calcFieldJson: calcFieldJson,
        parent: tableReference,
        collections: collections
      });
    }, this));
    tableReference.setFilters(_.map(tableReferenceJson.filters || [], function (filterJson) {
      return this.parseAnyFilter({
        filterJson: filterJson,
        parent: tableReference,
        collections: collections
      });
    }, this));
    collections.tableReferences.add(tableReference);
    return tableReference;
  },
  parseDataSource: function parseDataSource(options) {
    var dataSourceJson = options.dataSourceJson,
        collections = options.collections,
        dataSource = this.entityFactory.createDataSource({
      id: dataSourceJson.id,
      name: dataSourceJson.name
    });
    dataSource.setChildren(_.map(dataSourceJson.children || [], function (child) {
      return this.parseDataSourceResource({
        resource: child,
        parent: dataSource,
        dataSource: dataSource,
        collections: options.collections
      });
    }, this));
    collections.dataSources.add(dataSource);
    return dataSource;
  },
  parseDataSourceGroup: function parseDataSourceGroup(options) {
    var dataSourceGroupJson = options.resource,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var dataSourceGroup = this.entityFactory.createDataSourceGroup({
      id: dataSourceGroupJson.id,
      name: dataSourceGroupJson.name,
      sourceName: dataSourceGroupJson.sourceName,
      parentId: dataSourceGroupJson.parentId || parent.id,
      dataSourceId: dataSourceGroupJson.dataSourceId || dataSource.id
    });
    dataSourceGroup.setChildren(_.map(dataSourceGroupJson.children || [], function (child) {
      return this.parseDataSourceResource({
        resource: child,
        parent: dataSourceGroup,
        dataSource: dataSource,
        collections: collections
      });
    }, this));
    collections.dataSourceGroups.add(dataSourceGroup);
    return dataSourceGroup;
  },
  parseGenericTable: function parseGenericTable(options) {
    var tableJson = options.resource,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var table = this.entityFactory.createGenericTable({
      id: tableJson.id,
      name: tableJson.name,
      parentId: tableJson.parentId || parent.id,
      dataSourceId: tableJson.dataSourceId || dataSource.id
    });
    table.setChildren(_.map(tableJson.children || [], function (child) {
      return this.parseDataSourceResource({
        resource: child,
        parent: table,
        table: table,
        dataSource: dataSource,
        collections: collections
      });
    }, this));
    collections.tables.add(table);
    return table;
  },
  parseDerivedTable: function parseDerivedTable(options) {
    var tableJson = options.resource,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var derivedTable = this.entityFactory.createDerivedTable({
      id: tableJson.id,
      name: tableJson.name,
      query: tableJson.query,
      parentId: tableJson.parentId || parent.id,
      dataSourceId: tableJson.dataSourceId || dataSource.id
    });
    derivedTable.setChildren(_.map(tableJson.children || [], function (child) {
      return this.parseDataSourceResource({
        resource: child,
        parent: derivedTable,
        table: derivedTable,
        dataSource: dataSource,
        collections: collections
      });
    }, this));
    collections.tables.add(derivedTable);
    return derivedTable;
  },
  parseTableGroup: function parseTableGroup(options) {
    var tableGroupJson = options.resource,
        parent = options.parent,
        table = options.table,
        dataSource = options.dataSource,
        collections = options.collections;
    var tableGroup = this.entityFactory.createTableGroup({
      id: tableGroupJson.id,
      name: tableGroupJson.name,
      parentId: tableGroupJson.parentId || parent.id,
      tableId: tableGroupJson.tableId || table.id,
      dataSourceId: tableGroupJson.dataSourceId || dataSource.id
    });
    tableGroup.setChildren(_.map(tableGroupJson.children || [], function (child) {
      return this.parseDataSourceResource({
        resource: child,
        parent: tableGroup,
        table: table,
        dataSource: dataSource,
        collections: collections
      });
    }, this));
    collections.tableGroups.add(tableGroup);
    return tableGroup;
  },
  parseField: function parseField(options) {
    var fieldJson = options.resource,
        parent = options.parent,
        table = options.table,
        dataSource = options.dataSource,
        collections = options.collections;
    var field = this.entityFactory.createGenericField({
      id: fieldJson.id,
      type: fieldJson.type,
      name: fieldJson.name,
      sourceName: fieldJson.sourceName,
      parentId: fieldJson.parentId || parent.id,
      tableId: fieldJson.tableId || table.id,
      dataSourceId: fieldJson.dataSourceId || dataSource.id
    });
    collections.fields.add(field);
    return field;
  },
  parseFieldReference: function parseFieldReference(options) {
    var fieldReferenceJson = options.fieldReferenceJson;
    return this.entityFactory.createFieldReference(fieldReferenceJson);
  },
  parseJoinTree: function parseJoinTree(options) {
    var joinTreeJson = options.joinTreeJson,
        collections = options.collections,
        joinTree = this.entityFactory.createJoinTree({
      id: joinTreeJson.id
    });
    joinTree.update(joinTreeJson);
    joinTree.setJoinAliases(_.map(joinTreeJson.joinAliases || [], function (joinAliasJson) {
      return this.parseJoinAlias({
        joinAliasJson: joinAliasJson,
        joinTree: joinTree,
        collections: collections
      });
    }, this));
    joinTree.setJoins(_.map(joinTreeJson.joins || [], function (joinJson) {
      return this.parseAnyJoin({
        joinJson: joinJson,
        joinTree: joinTree,
        collections: collections
      });
    }, this));
    joinTree.setCalcFields(_.map(joinTreeJson.calcFields || [], function (calcFieldJson) {
      return this.parseCalcField({
        calcFieldJson: calcFieldJson,
        parent: joinTree,
        collections: collections
      });
    }, this));
    joinTree.setFilters(_.map(joinTreeJson.filters || [], function (filterJson) {
      return this.parseAnyFilter({
        filterJson: filterJson,
        parent: joinTree,
        collections: collections
      });
    }, this));
    collections.joinTrees.add(joinTree);
    return joinTree;
  },
  parseJoin: function parseJoin(options) {
    var joinJson = options.joinJson,
        joinTree = options.joinTree,
        collections = options.collections,
        join = this.entityFactory.createJoin({
      id: joinJson.id,
      joinTreeId: joinTree.id || joinJson.joinTreeId,
      leftJoinAliasId: joinJson.leftJoinAliasId,
      rightJoinAliasId: joinJson.rightJoinAliasId,
      weight: joinJson.weight,
      type: joinJson.type
    });
    join.setJoinExpressions(_.map(joinJson.joinExpressions || [], function (joinExpressionJson) {
      return this.parseAnyJoinExpression({
        joinExpressionJson: joinExpressionJson,
        join: join,
        collections: collections
      });
    }, this));
    collections.joins.add(join);
    return join;
  },
  parseComplexJoin: function parseComplexJoin(options) {
    var complexJoinJson = options.joinJson,
        joinTree = options.joinTree,
        collections = options.collections,
        complexJoin = this.entityFactory.createComplexJoin({
      id: complexJoinJson.id,
      joinTreeId: joinTree.id || complexJoinJson.joinTreeId,
      leftJoinAliasId: complexJoinJson.leftJoinAliasId,
      rightJoinAliasId: complexJoinJson.rightJoinAliasId,
      weight: complexJoinJson.weight,
      type: complexJoinJson.type,
      expression: complexJoinJson.expression
    });
    complexJoin.setFieldReferences(_.map(complexJoinJson.fieldReferences || [], function (fieldReference) {
      return this.parseFieldReference({
        fieldReferenceJson: fieldReference
      });
    }, this));
    collections.joins.add(complexJoin);
    return complexJoin;
  },
  parseJoinAlias: function parseJoinAlias(options) {
    var joinAliasJson = options.joinAliasJson,
        joinTree = options.joinTree,
        collections = options.collections,
        joinAlias = this.entityFactory.createJoinAlias({
      id: joinAliasJson.id,
      joinTreeId: joinTree.id || joinAliasJson.joinTreeId,
      tableReferenceId: joinAliasJson.tableReferenceId,
      alwaysIncludeTable: joinAliasJson.alwaysIncludeTable,
      name: joinAliasJson.name
    });
    collections.joinAliases.add(joinAlias);
    return joinAlias;
  },
  parseJoinExpression: function parseJoinExpression(options) {
    var joinExpressionJson = options.joinExpressionJson,
        join = options.join,
        collections = options.collections,
        joinExpression = this.entityFactory.createJoinExpression(joinExpressionJson);

    if (join.id) {
      joinExpression.setJoinId(join.id);
    }

    collections.joinExpressions.add(joinExpression);
    return joinExpression;
  },
  parseConstantJoinExpression: function parseConstantJoinExpression(options) {
    var constantJoinExpressionJson = options.joinExpressionJson,
        join = options.join,
        collections = options.collections,
        constantJoinExpression = this.entityFactory.createConstantJoinExpression(constantJoinExpressionJson);

    if (join.id) {
      constantJoinExpression.setJoinId(join.id);
    }

    collections.joinExpressions.add(constantJoinExpression);
    return constantJoinExpression;
  },
  parseFilterExpression: function parseFilterExpression(options) {
    var filterExpressionJson = options.filterJson,
        parent = options.parent,
        collections = options.collections,
        filterExpression = this.entityFactory.createFilterExpression({
      id: filterExpressionJson.id,
      sourceId: filterExpressionJson.parentId || parent.id,
      sourceType: filterExpressionJson.parentType || entityUtil.getEntityName(parent)
    });
    filterExpression.update(filterExpressionJson);
    filterExpression.setFieldReferences(_.map(filterExpressionJson.fieldReferences || [], function (fieldReference) {
      return this.parseFieldReference({
        fieldReferenceJson: fieldReference
      });
    }, this));
    collections.filters.add(filterExpression);
    return filterExpression;
  },
  parseDataIsland: function parseDataIsland(options) {
    var dataIslandJson = options.dataIslandJson,
        collections = options.collections,
        dataIsland = this.entityFactory.createDataIsland({
      id: dataIslandJson.id
    });
    dataIsland.update(dataIslandJson);
    dataIsland.setChildren(_.map(dataIslandJson.children || [], function (child) {
      return this.parseAnyPresentationItem({
        presentationItem: child,
        dataIsland: dataIsland,
        parent: dataIsland,
        collections: collections
      });
    }, this));
    collections.dataIslands.add(dataIsland);
    return dataIsland;
  },
  parsePresentationSet: function parsePresentationSet(options) {
    var setJson = options.presentationItem,
        dataIsland = options.dataIsland,
        parent = options.parent,
        collections = options.collections;
    var set = this.entityFactory.createPresentationSet(setJson);
    set.setDataIslandId(setJson.dataIslandId || dataIsland.id);
    set.setParentId(setJson.parentId || parent.id);
    set.setChildren(_.map(setJson.children || [], function (child) {
      return this.parseAnyPresentationItem({
        presentationItem: child,
        dataIsland: dataIsland,
        parent: set,
        collections: collections
      });
    }, this));
    collections.presentationSets.add(set);
    return set;
  },
  parsePresentationField: function parsePresentationField(options) {
    var fieldJson = options.presentationItem,
        dataIsland = options.dataIsland,
        parent = options.parent,
        collections = options.collections;
    var field = this.entityFactory.createPresentationField(fieldJson);
    field.setDataIslandId(fieldJson.dataIslandId || dataIsland.id);
    field.setParentId(fieldJson.parentId || parent.id);
    collections.presentationFields.add(field);
    return field;
  },
  parseAnyFilter: function parseAnyFilter(options) {
    var filterJson = options.filterJson,
        entityType = filterJson.entityType;

    if (entityUtil.isFilterExpression(entityType)) {
      return this.parseFilterExpression(options);
    } else if (entityUtil.isComplexFilter(entityType)) {
      return this.parseComplexFilter(options);
    }
  },
  parseComplexFilter: function parseComplexFilter(options) {
    var complexFilterJson = options.filterJson,
        parent = options.parent,
        collections = options.collections,
        complexFilter = this.entityFactory.createComplexFilter({
      id: complexFilterJson.id,
      sourceId: complexFilterJson.parentId || parent.id,
      sourceType: complexFilterJson.parentType || entityUtil.getEntityName(parent)
    });
    complexFilter.update(complexFilterJson);
    complexFilter.setFieldReferences(_.map(complexFilterJson.fieldReferences || [], function (fieldReference) {
      return this.parseFieldReference({
        fieldReferenceJson: fieldReference
      });
    }, this));
    collections.filters.add(complexFilter);
    return complexFilter;
  },
  parseDataSourceResource: function parseDataSourceResource(options) {
    var resource = options.resource,
        entityType = resource.entityType;

    if (entityUtil.isDataSourceGroup(entityType)) {
      return this.parseDataSourceGroup(options);
    } else if (entityUtil.isGenericTable(entityType)) {
      return this.parseGenericTable(options);
    } else if (entityUtil.isDerivedTable(entityType)) {
      return this.parseDerivedTable(options);
    } else if (entityUtil.isTableGroup(entityType)) {
      return this.parseTableGroup(options);
    } else if (entityUtil.isField(entityType)) {
      return this.parseField(options);
    }
  },
  parseAnyJoin: function parseAnyJoin(options) {
    var entityType = options.joinJson.entityType;

    if (entityUtil.isComplexJoin(entityType)) {
      return this.parseComplexJoin(options);
    } else if (entityUtil.isJoin(entityType)) {
      return this.parseJoin(options);
    }
  },
  parseAnyJoinExpression: function parseAnyJoinExpression(options) {
    var entityType = options.joinExpressionJson.entityType;

    if (entityUtil.isConstantJoinExpression(entityType)) {
      return this.parseConstantJoinExpression(options);
    } else if (entityUtil.isJoinExpression(entityType)) {
      return this.parseJoinExpression(options);
    }
  },
  parseAnyPresentationItem: function parseAnyPresentationItem(options) {
    var presentationItem = options.presentationItem,
        entityType = presentationItem.entityType;

    if (entityUtil.isPresentationSet(entityType)) {
      return this.parsePresentationSet(options);
    } else if (entityUtil.isPresentationField(entityType)) {
      return this.parsePresentationField(options);
    }
  }
});

module.exports = SchemaModelConverter;

});