define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaModelUtil = require("../../../../../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getResources(options) {
  var parentId = options.parentId,
      parentType = options.parentType,
      isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = options.isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute,
      collections = options.collections;
  var parent = schemaModelUtil.getResourceByIdAndType(parentId, parentType, collections),
      collection,
      firstChild;

  if (isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
    firstChild = parent.getChildren().first();
    collection = firstChild.getChildren();
  } else {
    collection = parent.getChildren();
  }

  return collection.chain().filter(function (entity) {
    return !entityUtil.isDerivedTable(entity);
  });
}

module.exports = {
  getResources: getResources
};

});