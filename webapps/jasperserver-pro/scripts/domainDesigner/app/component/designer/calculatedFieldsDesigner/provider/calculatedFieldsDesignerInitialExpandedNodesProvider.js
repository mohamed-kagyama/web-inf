define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var artificialTreeResourceTypesEnum = require("../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

var schemaModelUtil = require("../../../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getExpandedNodesForTableReferenceContext(options) {
  var sourceId = options.sourceId,
      expandedNodes = options.expandedNodes,
      collections = options.collections,
      joinAliasByTableReference;
  joinAliasByTableReference = schemaModelUtil.getJoinAliasByTableReferenceId(sourceId, collections);

  if (joinAliasByTableReference) {
    expandedNodes[joinAliasByTableReference.joinTreeId] = true;
  } else {
    expandedNodes = getExpandedNodesForTableReferenceUnderDataSource({
      sourceId: sourceId,
      collections: collections,
      expandedNodes: expandedNodes
    });
  }

  return expandedNodes;
}

function getExpandedNodesForTableReferenceUnderDataSource(options) {
  var sourceId = options.sourceId,
      collections = options.collections,
      tableParents,
      expandedNodes = options.expandedNodes,
      tableReference = collections.tableReferences.byId(sourceId),
      tableByTableReference = schemaModelUtil.getTableByTableReference(tableReference, collections);

  if (entityUtil.isDerivedTable(tableByTableReference)) {
    expandedNodes[tableByTableReference.dataSourceId] = true;
    expandedNodes[artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP] = true;
  } else {
    tableParents = schemaModelUtil.getResourceParents(tableByTableReference, collections);
    expandedNodes = tableParents.reduce(function (memo, parent) {
      memo[parent.id] = true;
      return memo;
    }, expandedNodes);
  }

  return expandedNodes;
}

module.exports = {
  getExpandedNodes: function getExpandedNodes(collections, context) {
    var sourceId = context.sourceId,
        sourceType = context.sourceType,
        expandedNodes = {};

    if (collections.constantGroups.size()) {
      expandedNodes[artificialTreeResourceTypesEnum.CONSTANT_GROUP] = true;
    }

    if (entityUtil.isJoinTree(sourceType)) {
      expandedNodes[sourceId] = true;
    } else if (entityUtil.isTableReference(sourceType)) {
      expandedNodes = getExpandedNodesForTableReferenceContext({
        expandedNodes: expandedNodes,
        collections: collections,
        sourceId: sourceId
      });
    }

    return expandedNodes;
  }
};

});