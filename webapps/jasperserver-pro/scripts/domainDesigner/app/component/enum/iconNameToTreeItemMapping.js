define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var treeItemIconClassEnum = require("./treeItemIconClassEnum");

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var artificialTreeResourceTypesEnum = require("../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var mapping = {};
mapping[schemaEntitiesEnum.DATA_SOURCE] = treeItemIconClassEnum.DATA_SOURCE;
mapping[schemaEntitiesEnum.TABLE] = treeItemIconClassEnum.TABLE;
mapping[schemaEntitiesEnum.TABLE_REFERENCE] = treeItemIconClassEnum.TABLE;
mapping[schemaEntitiesEnum.FIELD] = treeItemIconClassEnum.COLUMN;
mapping[schemaEntitiesEnum.PRESENTATION_FIELD] = treeItemIconClassEnum.ITEM;
mapping[schemaEntitiesEnum.PRESENTATION_SET] = treeItemIconClassEnum.SET;
mapping[schemaEntitiesEnum.CALC_FIELD] = treeItemIconClassEnum.CALC_FIELD;
mapping[schemaEntitiesEnum.DATA_ISLAND] = treeItemIconClassEnum.ISLAND;
mapping[schemaEntitiesEnum.JOIN_TREE] = treeItemIconClassEnum.JOIN_TREE;
mapping[schemaEntitiesEnum.DATA_SOURCE_GROUP] = treeItemIconClassEnum.SCHEMA;
mapping[schemaEntitiesEnum.DERIVED_TABLE] = treeItemIconClassEnum.DERIVED_TABLE;
mapping[schemaEntitiesEnum.CONSTANT_GROUP] = treeItemIconClassEnum.CALC_FIELDS;
mapping[schemaEntitiesEnum.FILTER_EXPRESSION] = treeItemIconClassEnum.FILTER;
mapping[schemaEntitiesEnum.COMPLEX_FILTER] = treeItemIconClassEnum.FILTER;
mapping[artificialTreeResourceTypesEnum.PRE_FILTER] = treeItemIconClassEnum.FILTER;
mapping[artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP] = treeItemIconClassEnum.DERIVED_TABLES;
mapping[artificialTreeResourceTypesEnum.CONSTANT_GROUP] = treeItemIconClassEnum.CALC_FIELDS;
mapping[artificialTreeResourceTypesEnum.DEPENDENCY_DIALOG_GROUP] = treeItemIconClassEnum.FOLDER;
mapping[artificialTreeResourceTypesEnum.PROFILE_ATTRIBUTE_DATA_SOURCE_GROUP] = treeItemIconClassEnum.ATTRIBUTE_SCHEMA;
module.exports = mapping;

});