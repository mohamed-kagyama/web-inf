define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var entityTypeToDependentEntityTypesMap = {};
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.CONSTANT_GROUP] = [schemaEntitiesEnum.CALC_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.DATA_SOURCE] = _.map(schemaEntitiesEnum, function (type) {
  return type;
});
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.DATA_SOURCE_GROUP] = [schemaEntitiesEnum.TABLE, schemaEntitiesEnum.TABLE_GROUP, schemaEntitiesEnum.FIELD, schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.TABLE_REFERENCE, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.TABLE] = [schemaEntitiesEnum.TABLE_GROUP, schemaEntitiesEnum.FIELD, schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.TABLE_REFERENCE, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.DERIVED_TABLE] = entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.TABLE];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.TABLE_GROUP] = entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.TABLE];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.FIELD] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.CALC_FIELD] = [schemaEntitiesEnum.CONSTANT_GROUP, schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.FILTER_EXPRESSION] = [];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.COMPLEX_FILTER] = [];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.TABLE_REFERENCE] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.JOIN_TREE] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.JOIN_ALIAS] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.JOIN] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.COMPLEX_JOIN, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.COMPLEX_JOIN] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.JOIN_EXPRESSION] = [schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION] = [];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.DATA_ISLAND] = [schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.PRESENTATION_SET] = [schemaEntitiesEnum.PRESENTATION_FIELD];
entityTypeToDependentEntityTypesMap[schemaEntitiesEnum.PRESENTATION_FIELD] = [];
module.exports = entityTypeToDependentEntityTypesMap;

});