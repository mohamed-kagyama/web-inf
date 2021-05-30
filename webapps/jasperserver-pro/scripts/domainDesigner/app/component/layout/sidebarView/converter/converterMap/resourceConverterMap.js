define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var dataSourceConverterMap = require("./dataSourceConverterMap");

var baseSidebarTreeConverter = require("../baseSidebarTreeConverter");

var schemaModelUtil = require("../../../../../../model/schema/util/schemaModelUtil");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function convertTableReference(tableReference, options) {
  var table = options.table;
  var genericFields = table.getChildren();
  var calcFields = tableReference.getCalcFields();
  return baseSidebarTreeConverter.convertResourceWithChildren(tableReference, _.extend({}, options, {
    tableReference: tableReference,
    children: genericFields.concat(calcFields)
  }));
}

function convertTable(table, options) {
  var tableReferences = schemaModelUtil.getTableReferencesByTableId(table.getId(), options.schema);
  return baseSidebarTreeConverter.convertResources(tableReferences, _.extend({}, options, {
    table: table
  }));
}

var converterMap = _.clone(dataSourceConverterMap);

converterMap[schemaEntitiesEnum.DERIVED_TABLE] = convertTable;
converterMap[schemaEntitiesEnum.TABLE] = convertTable;
converterMap[schemaEntitiesEnum.TABLE_REFERENCE] = convertTableReference;
module.exports = converterMap;

});