define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function matchEntityOrName(entityOrName, value) {
  var result = false;

  if (_.isObject(entityOrName)) {
    result = getEntityName(entityOrName) === value;
  } else if (_.isString(entityOrName)) {
    result = entityOrName === value;
  }

  return result;
}

function isConstantGroup(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.CONSTANT_GROUP);
}

function isDataSource(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.DATA_SOURCE);
}

function isDataSourceGroup(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.DATA_SOURCE_GROUP);
}

function isTable(entity) {
  return isGenericTable(entity) || isDerivedTable(entity);
}

function isGenericTable(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.TABLE);
}

function isDerivedTable(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.DERIVED_TABLE);
}

function isTableGroup(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.TABLE_GROUP);
}

function isField(entity) {
  return isGenericField(entity) || isCalcField(entity);
}

function isFieldReference(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.FIELD_REFERENCE);
}

function isGenericField(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.FIELD);
}

function isCalcField(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.CALC_FIELD);
}

function isFilterExpression(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.FILTER_EXPRESSION);
}

function isComplexFilter(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.COMPLEX_FILTER);
}

function isTableReference(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.TABLE_REFERENCE);
}

function isJoinTree(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.JOIN_TREE);
}

function isJoin(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.JOIN);
}

function isComplexJoin(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.COMPLEX_JOIN);
}

function isJoinAlias(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.JOIN_ALIAS);
}

function isJoinExpression(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.JOIN_EXPRESSION);
}

function isConstantJoinExpression(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION);
}

function isDataIsland(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.DATA_ISLAND);
}

function isPresentationSet(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.PRESENTATION_SET);
}

function isPresentationField(entity) {
  return matchEntityOrName(entity, schemaEntitiesEnum.PRESENTATION_FIELD);
}

function getEntityName(entity) {
  return entity._entityConfig && entity._entityConfig.name;
}

function isEntity(entity) {
  return Boolean(entity._entityConfig);
}

module.exports = {
  getEntityName: getEntityName,
  isEntity: isEntity,
  isTableReference: isTableReference,
  isConstantGroup: isConstantGroup,
  isDataSource: isDataSource,
  isDataSourceGroup: isDataSourceGroup,
  isTable: isTable,
  isDerivedTable: isDerivedTable,
  isGenericTable: isGenericTable,
  isTableGroup: isTableGroup,
  isField: isField,
  isFieldReference: isFieldReference,
  isGenericField: isGenericField,
  isCalcField: isCalcField,
  isFilterExpression: isFilterExpression,
  isComplexFilter: isComplexFilter,
  isJoinTree: isJoinTree,
  isJoin: isJoin,
  isComplexJoin: isComplexJoin,
  isJoinAlias: isJoinAlias,
  isJoinExpression: isJoinExpression,
  isConstantJoinExpression: isConstantJoinExpression,
  isDataIsland: isDataIsland,
  isPresentationSet: isPresentationSet,
  isPresentationField: isPresentationField
};

});