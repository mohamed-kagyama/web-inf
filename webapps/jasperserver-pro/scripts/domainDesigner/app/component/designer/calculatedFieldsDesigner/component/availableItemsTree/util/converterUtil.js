define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getContextKey(resourceId, options) {
  var sourceId,
      source,
      isJoinTreeContext = entityUtil.isJoinTree(options.calcFieldsContext.sourceType);

  if (options.constantGroup) {
    sourceId = options.constantGroupId || options.resource.getSourceId();
  } else {
    source = options.tableReference || options.joinTree;

    if (isJoinTreeContext && options.joinAlias) {
      source = options.joinAlias;
    }

    sourceId = source.getId();
  }

  return sourceId + ':' + resourceId;
}

module.exports = {
  getContextKey: getContextKey
};

});