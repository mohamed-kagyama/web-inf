define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var baseSidebarTreeConverter = require("../baseSidebarTreeConverter");

var artificialTreeResourceTypesEnum = require("../../enum/artificialTreeResourceTypesEnum");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function convertConstantGroup(constantGroup, options) {
  return baseSidebarTreeConverter.convertResourceWithChildren(constantGroup, _.extend({}, options, {
    constantGroup: constantGroup,
    children: constantGroup.children,
    convertResourceNoChildren: options.convertResourceNoChildren
  }));
}

function convertCalcField(calcField, options) {
  return options.convertResourceNoChildren(calcField, _.extend(options, {
    constantGroupId: calcField.getSourceId()
  }));
}

var converterMap = {};
converterMap[artificialTreeResourceTypesEnum.CONSTANT_GROUP] = convertConstantGroup;
converterMap[schemaEntitiesEnum.CALC_FIELD] = convertCalcField;
module.exports = converterMap;

});