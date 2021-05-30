define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var entitiesToOmit = [schemaEntitiesEnum.JOIN, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.COMPLEX_JOIN];
var entitiesToOmitByTargetEntityTypeEnum = {};
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.CONSTANT_GROUP] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.DATA_SOURCE] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.DATA_SOURCE_GROUP] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.TABLE] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.DERIVED_TABLE] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.TABLE_GROUP] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.FIELD] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.CALC_FIELD] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.FILTER_EXPRESSION] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.COMPLEX_FILTER] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.TABLE_REFERENCE] = entitiesToOmit;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.JOIN_TREE] = entitiesToOmit;
var entitiesToOmitWithJoinTree = entitiesToOmit.concat(schemaEntitiesEnum.JOIN_TREE);
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.JOIN_ALIAS] = entitiesToOmitWithJoinTree;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.JOIN] = entitiesToOmitWithJoinTree;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.COMPLEX_JOIN] = entitiesToOmitWithJoinTree;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.JOIN_EXPRESSION] = entitiesToOmitWithJoinTree;
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.DATA_ISLAND] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.PRESENTATION_SET] = [];
entitiesToOmitByTargetEntityTypeEnum[schemaEntitiesEnum.PRESENTATION_FIELD] = [];
module.exports = entitiesToOmitByTargetEntityTypeEnum;

});