define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("./schemaEntitiesEnum");

var schemaCollectionsEnum = require("./schemaCollectionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var entityTypeToCollectionMap = {};
entityTypeToCollectionMap[schemaEntitiesEnum.CONSTANT_GROUP] = schemaCollectionsEnum.CONSTANT_GROUPS;
entityTypeToCollectionMap[schemaEntitiesEnum.DATA_SOURCE] = schemaCollectionsEnum.DATA_SOURCES;
entityTypeToCollectionMap[schemaEntitiesEnum.DATA_SOURCE_GROUP] = schemaCollectionsEnum.DATA_SOURCE_GROUPS;
entityTypeToCollectionMap[schemaEntitiesEnum.TABLE] = schemaCollectionsEnum.TABLES;
entityTypeToCollectionMap[schemaEntitiesEnum.TABLE_REFERENCE] = schemaCollectionsEnum.TABLE_REFERENCES;
entityTypeToCollectionMap[schemaEntitiesEnum.DERIVED_TABLE] = schemaCollectionsEnum.TABLES;
entityTypeToCollectionMap[schemaEntitiesEnum.TABLE_GROUP] = schemaCollectionsEnum.TABLE_GROUPS;
entityTypeToCollectionMap[schemaEntitiesEnum.FIELD] = schemaCollectionsEnum.FIELDS;
entityTypeToCollectionMap[schemaEntitiesEnum.CALC_FIELD] = schemaCollectionsEnum.FIELDS;
entityTypeToCollectionMap[schemaEntitiesEnum.DATA_ISLAND] = schemaCollectionsEnum.DATA_ISLANDS;
entityTypeToCollectionMap[schemaEntitiesEnum.PRESENTATION_SET] = schemaCollectionsEnum.PRESENTATION_SETS;
entityTypeToCollectionMap[schemaEntitiesEnum.PRESENTATION_FIELD] = schemaCollectionsEnum.PRESENTATION_FIELDS;
entityTypeToCollectionMap[schemaEntitiesEnum.JOIN] = schemaCollectionsEnum.JOINS;
entityTypeToCollectionMap[schemaEntitiesEnum.COMPLEX_JOIN] = schemaCollectionsEnum.JOINS;
entityTypeToCollectionMap[schemaEntitiesEnum.JOIN_ALIAS] = schemaCollectionsEnum.JOIN_ALIASES;
entityTypeToCollectionMap[schemaEntitiesEnum.JOIN_EXPRESSION] = schemaCollectionsEnum.JOIN_EXPRESSIONS;
entityTypeToCollectionMap[schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION] = schemaCollectionsEnum.JOIN_EXPRESSIONS;
entityTypeToCollectionMap[schemaEntitiesEnum.JOIN_TREE] = schemaCollectionsEnum.JOIN_TREES;
entityTypeToCollectionMap[schemaEntitiesEnum.FILTER_EXPRESSION] = schemaCollectionsEnum.FILTERS;
entityTypeToCollectionMap[schemaEntitiesEnum.COMPLEX_FILTER] = schemaCollectionsEnum.FILTERS;
module.exports = entityTypeToCollectionMap;

});