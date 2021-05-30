define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var schemaEntityToPresentationItemConverter = require("../schemaEntityToPresentationItemConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var converterMap = {};
converterMap[schemaEntitiesEnum.TABLE_REFERENCE] = schemaEntityToPresentationItemConverter.convertTableReference;
converterMap[schemaEntitiesEnum.TABLE_GROUP] = schemaEntityToPresentationItemConverter.convertTableGroup;
converterMap[schemaEntitiesEnum.FIELD] = schemaEntityToPresentationItemConverter.convertField;
converterMap[schemaEntitiesEnum.CALC_FIELD] = schemaEntityToPresentationItemConverter.convertCalcField;
converterMap[schemaEntitiesEnum.JOIN_TREE] = schemaEntityToPresentationItemConverter.convertJoinTree;
converterMap[schemaEntitiesEnum.JOIN_ALIAS] = schemaEntityToPresentationItemConverter.convertJoinAlias;
module.exports = converterMap;

});