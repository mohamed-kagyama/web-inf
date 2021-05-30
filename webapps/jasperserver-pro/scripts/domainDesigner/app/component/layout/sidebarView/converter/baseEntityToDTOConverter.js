define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function convertDerivedTableGroup(derivedTableGroup, options) {
  var properties = options.properties;
  return _.extend({
    resourceId: derivedTableGroup.id,
    name: derivedTableGroup.name,
    type: derivedTableGroup.type
  }, properties);
}

function convertConstantGroup(constantGroup, options) {
  var properties = options.properties;
  return _.extend({
    resourceId: constantGroup.id,
    name: constantGroup.name,
    type: constantGroup.type
  }, properties);
}

function convertDataSource(dataSource, options) {
  var properties = options.properties,
      dataSourceObj = {};
  dataSourceObj.resourceId = dataSource.getId();
  dataSourceObj.name = dataSource.getName();
  dataSourceObj.type = schemaEntitiesEnum.DATA_SOURCE;
  return _.extend(dataSourceObj, properties);
}

function convertDataSourceGroup(dataSourceGroup, options) {
  var properties = options.properties,
      dataSourceGroupObj = {};
  dataSourceGroupObj.resourceId = dataSourceGroup.getId();
  dataSourceGroupObj.name = dataSourceGroup.getName();
  var sourceName = dataSourceGroup.getSourceName();

  if (sourceName) {
    dataSourceGroupObj.sourceName = sourceName;
  }

  dataSourceGroupObj.type = schemaEntitiesEnum.DATA_SOURCE_GROUP;
  return _.extend(dataSourceGroupObj, properties);
}

function convertDataIsland(dataIsland, options) {
  var properties = options.properties,
      dataIslandObj = {};
  dataIslandObj.resourceId = dataIsland.getId();
  dataIslandObj.name = dataIsland.getLabel() || dataIsland.getName();
  dataIslandObj.type = schemaEntitiesEnum.DATA_ISLAND;
  return _.extend(dataIslandObj, properties);
}

function convertJoinTree(joinTree, options) {
  var properties = options.properties,
      joinTreeObj = {};
  joinTreeObj.resourceId = joinTree.id;
  joinTreeObj.name = joinTree.name;
  joinTreeObj.type = schemaEntitiesEnum.JOIN_TREE;
  return _.extend(joinTreeObj, properties);
}

function convertTableGroup(tableGroup, options) {
  var properties = options.properties,
      tableGroupObj = {};
  tableGroupObj.resourceId = tableGroup.getId();
  tableGroupObj.name = tableGroup.getName();
  tableGroupObj.type = schemaEntitiesEnum.TABLE_GROUP;
  return _.extend(tableGroupObj, properties);
}

function convertTableReference(tableReference, options) {
  var properties = options.properties,
      tableReferenceObj = {};
  tableReferenceObj.resourceId = tableReference.getId();
  tableReferenceObj.name = tableReference.getName();
  tableReferenceObj.type = schemaEntitiesEnum.TABLE_REFERENCE;
  return _.extend(tableReferenceObj, properties);
}

function convertGenericTable(table, options) {
  var properties = options.properties,
      tableObj = {};
  tableObj.resourceId = table.getId();
  tableObj.name = table.getName();
  tableObj.type = schemaEntitiesEnum.TABLE;
  return _.extend(tableObj, properties);
}

function convertDerivedTable(derivedTable, options) {
  var properties = options.properties,
      derivedTableObj = {};
  derivedTableObj.resourceId = derivedTable.getId();
  derivedTableObj.name = derivedTable.getName();
  derivedTableObj.query = derivedTable.getQuery();
  derivedTableObj.type = schemaEntitiesEnum.DERIVED_TABLE;
  return _.extend(derivedTableObj, properties);
}

function convertJoinAlias(joinAlias, options) {
  var tableReference = options.tableReference;
  var joinAliasJSON = {
    resourceId: joinAlias.getId(),
    name: tableReference.getName(),
    type: schemaEntitiesEnum.JOIN_ALIAS,
    alwaysIncludeTable: Boolean(joinAlias.getAlwaysIncludeTable()),
    tableReferenceId: tableReference.getId()
  };
  return _.extend(joinAliasJSON, options.properties);
}

function convertGenericField(field, options) {
  var properties = options.properties,
      fieldObj = {};
  fieldObj.resourceId = field.getId();
  fieldObj.name = field.getName();
  fieldObj.sourceName = field.getSourceName();
  fieldObj.type = schemaEntitiesEnum.FIELD;
  return _.extend(fieldObj, properties);
}

function convertCalcField(calcField, options) {
  var properties = options.properties,
      calcFieldObj = {};
  calcFieldObj.resourceId = calcField.getId();
  calcFieldObj.name = calcField.getName();
  calcFieldObj.type = schemaEntitiesEnum.CALC_FIELD;
  return _.extend(calcFieldObj, properties);
}

module.exports = {
  convertConstantGroup: convertConstantGroup,
  convertDerivedTableGroup: convertDerivedTableGroup,
  convertDataSource: convertDataSource,
  convertDataSourceGroup: convertDataSourceGroup,
  convertDataIsland: convertDataIsland,
  convertJoinTree: convertJoinTree,
  convertTableGroup: convertTableGroup,
  convertTableReference: convertTableReference,
  convertGenericTable: convertGenericTable,
  convertDerivedTable: convertDerivedTable,
  convertJoinAlias: convertJoinAlias,
  convertGenericField: convertGenericField,
  convertCalcField: convertCalcField
};

});