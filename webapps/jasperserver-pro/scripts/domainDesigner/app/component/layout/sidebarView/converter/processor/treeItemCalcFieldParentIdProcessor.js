define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function treeItemCalcFieldParentIdProcessor(resource, options) {
  if (entityUtil.isCalcField(resource.type)) {
    var joinTree = options.joinTree,
        tableReference = options.tableReference;

    if (tableReference) {
      resource.calcFieldSourceId = tableReference.getId();
      resource.calcFieldSourceType = entityUtil.getEntityName(tableReference);
    } else if (joinTree) {
      resource.calcFieldSourceId = options.joinTree.id;
      resource.calcFieldSourceType = schemaEntitiesEnum.JOIN_TREE;
    } else if (options.constantGroupId) {
      resource.calcFieldSourceId = options.constantGroupId;
      resource.calcFieldSourceType = schemaEntitiesEnum.CONSTANT_GROUP;
    } else {
      throw new Error('Unknown type of calc field');
    }
  }

  return resource;
}

module.exports = treeItemCalcFieldParentIdProcessor;

});