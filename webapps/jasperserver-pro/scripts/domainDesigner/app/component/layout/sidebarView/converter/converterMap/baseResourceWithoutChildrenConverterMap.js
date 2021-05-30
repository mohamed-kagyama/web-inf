define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var artificialTreeResourceTypesEnum = require("../../enum/artificialTreeResourceTypesEnum");

var baseEntityToDTOConverter = require('../baseEntityToDTOConverter');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var converterMap = {};
converterMap[artificialTreeResourceTypesEnum.CONSTANT_GROUP] = baseEntityToDTOConverter.convertConstantGroup;
converterMap[schemaEntitiesEnum.DATA_SOURCE] = baseEntityToDTOConverter.convertDataSource;
converterMap[schemaEntitiesEnum.DATA_SOURCE_GROUP] = baseEntityToDTOConverter.convertDataSourceGroup;
converterMap[artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP] = baseEntityToDTOConverter.convertDerivedTableGroup;
converterMap[schemaEntitiesEnum.DERIVED_TABLE] = baseEntityToDTOConverter.convertDerivedTable;
converterMap[schemaEntitiesEnum.TABLE_REFERENCE] = baseEntityToDTOConverter.convertTableReference;
converterMap[schemaEntitiesEnum.TABLE] = baseEntityToDTOConverter.convertGenericTable;
converterMap[schemaEntitiesEnum.TABLE_GROUP] = baseEntityToDTOConverter.convertTableGroup;
converterMap[schemaEntitiesEnum.FIELD] = baseEntityToDTOConverter.convertGenericField;
converterMap[schemaEntitiesEnum.CALC_FIELD] = baseEntityToDTOConverter.convertCalcField;
converterMap[schemaEntitiesEnum.JOIN_TREE] = baseEntityToDTOConverter.convertJoinTree;
converterMap[schemaEntitiesEnum.JOIN_ALIAS] = baseEntityToDTOConverter.convertJoinAlias;
module.exports = converterMap;

});