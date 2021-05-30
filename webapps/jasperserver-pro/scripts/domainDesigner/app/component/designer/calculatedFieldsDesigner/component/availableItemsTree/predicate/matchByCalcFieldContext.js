define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

var converterUtil = require("../util/converterUtil");

var artificialTreeResourceEntityUtil = require("../../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil");

var schemaModelUtil = require("../../../../../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  var schema = options.schema,
      resource = options.resource,
      calcFieldsContext = options.calcFieldsContext,
      sourceType = calcFieldsContext.sourceType,
      sourceId = calcFieldsContext.sourceId,
      tableReference,
      table,
      joinTree;
  var canUseVariable = false;

  if (entityUtil.isField(resource)) {
    var contextKey = converterUtil.getContextKey(resource.id, options);
    canUseVariable = Boolean(calcFieldsContext.availableVariables[contextKey]);
  }

  if (canUseVariable) {
    if (entityUtil.isConstantGroup(sourceType)) {
      //it's for sure constant so we can use it
      canUseVariable = true;
    } else if (entityUtil.isCalcField(resource) && entityUtil.isConstantGroup(resource.sourceType)) {
      //it's for sure constant so we can use it
      canUseVariable = true;
    } else if (entityUtil.isTableReference(sourceType)) {
      //going to create single table calc field
      //should be able to use fields and calc fields from same table reference
      tableReference = options.tableReference;
      canUseVariable = tableReference && tableReference.id === sourceId;
    } else if (entityUtil.isJoinTree(sourceType)) {
      //going to create cross table calc field
      //should be able to use fields and calc fields from same join tree and it's join aliases
      canUseVariable = options.joinTree && options.joinTree.id === sourceId;
    }
  } else if (artificialTreeResourceEntityUtil.isConstantGroup(resource) || entityUtil.isTable(resource)) {
    canUseVariable = true;
  } else {
    if (entityUtil.isTableReference(sourceType)) {
      if (entityUtil.isTableReference(resource)) {
        canUseVariable = resource.id === sourceId;
      } else if (entityUtil.isJoinAlias(resource)) {
        tableReference = schemaModelUtil.getTableReferenceByJoinAlias(resource, schema);
        canUseVariable = tableReference.id === sourceId;
      } else if (entityUtil.isTableGroup(resource)) {
        tableReference = options.tableReference;
        canUseVariable = tableReference.id === sourceId;
      } else if (entityUtil.isDataSource(resource) || entityUtil.isDataSourceGroup(resource)) {
        tableReference = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, schema);
        table = schemaModelUtil.getTableByTableReference(tableReference, schema);
        var parents = schemaModelUtil.getResourceParents(table, schema);
        parents = _.groupBy(parents, 'id');
        var joinAlias = schemaModelUtil.getJoinAliasByTableReferenceId(tableReference.id, schema);
        canUseVariable = Boolean(parents[resource.id]) && !joinAlias;
      } else if (artificialTreeResourceEntityUtil.isDerivedTableGroup(resource)) {
        tableReference = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, schema);
        table = schemaModelUtil.getTableByTableReference(tableReference, schema);
        canUseVariable = entityUtil.isDerivedTable(table);
      } else if (entityUtil.isJoinTree(resource)) {
        joinTree = resource;
        canUseVariable = joinTree.joinAliases.some(function (joinAlias) {
          return joinAlias.tableReferenceId === sourceId;
        });
      }
    } else if (entityUtil.isJoinTree(sourceType)) {
      if (entityUtil.isJoinAlias(resource) || entityUtil.isTableGroup(resource)) {
        joinTree = options.joinTree;
        canUseVariable = joinTree.id === sourceId;
      } else if (entityUtil.isJoinTree(resource)) {
        joinTree = resource;
        canUseVariable = joinTree.id === sourceId;
      }
    }
  }

  return canUseVariable;
};

});