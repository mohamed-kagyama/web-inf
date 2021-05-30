define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var baseSidebarTreeConverter = require("../baseSidebarTreeConverter");

var schemaModelUtil = require("../../../../../../model/schema/util/schemaModelUtil");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function convertJoinTree(joinTree, options) {
  var joinAliases = joinTree.joinAliases,
      crossTableCalcFields = joinTree.calcFields;
  var children = joinAliases.concat(crossTableCalcFields);
  return baseSidebarTreeConverter.convertResourceWithChildren(joinTree, _.extend({}, options, {
    joinTree: joinTree,
    children: children
  }));
}

function convertJoinAlias(joinAlias, options) {
  var schema = options.schema,
      tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, schema),
      table = schemaModelUtil.getTableByTableReference(tableReference, schema);
  var genericFields = table.getChildren();
  var calcFields = tableReference.getCalcFields();
  return baseSidebarTreeConverter.convertResourceWithChildren(joinAlias, _.extend({}, options, {
    joinAlias: joinAlias,
    tableReference: tableReference,
    table: table,
    children: genericFields.concat(calcFields)
  }));
}

function convertTableReference(tableReference, options) {
  var table = schemaModelUtil.getTableByTableReference(tableReference, options.schema);
  var genericFields = table.getChildren();
  var calcFields = tableReference.getCalcFields();
  return baseSidebarTreeConverter.convertResourceWithChildren(tableReference, _.extend({}, options, {
    tableReference: tableReference,
    table: table,
    children: genericFields.concat(calcFields)
  }));
}

function convertTableGroup(tableGroup, options) {
  return baseSidebarTreeConverter.convertResourceWithChildren(tableGroup, _.extend({}, options, {
    tableGroup: tableGroup,
    children: tableGroup.getChildren()
  }));
}

function convertAnyField(field, options) {
  return options.convertResourceNoChildren(field, options);
}

var converterMap = {};
converterMap[schemaEntitiesEnum.JOIN_TREE] = convertJoinTree;
converterMap[schemaEntitiesEnum.JOIN_ALIAS] = convertJoinAlias;
converterMap[schemaEntitiesEnum.TABLE_REFERENCE] = convertTableReference;
converterMap[schemaEntitiesEnum.TABLE_GROUP] = convertTableGroup;
converterMap[schemaEntitiesEnum.FIELD] = convertAnyField;
converterMap[schemaEntitiesEnum.CALC_FIELD] = convertAnyField;
module.exports = converterMap;

});