define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var artificialTreeResourceTypesEnum = require("../../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

var constantGroupEntityToPresentationItemConverter = require("../constantGroupEntityToPresentationItemConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var converterMap = {};
converterMap[schemaEntitiesEnum.CALC_FIELD] = constantGroupEntityToPresentationItemConverter.convertCalcField;
converterMap[artificialTreeResourceTypesEnum.CONSTANT_GROUP] = constantGroupEntityToPresentationItemConverter.convertConstantGroup;
module.exports = converterMap;

});