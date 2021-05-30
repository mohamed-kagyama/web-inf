define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (item) {
  var isTableReference = entityUtil.isTableReference(item.type);
  var isJoinAlias = entityUtil.isJoinAlias(item.type);

  if (isTableReference) {
    return item.resourceId;
  } else if (isJoinAlias) {
    return item.tableReferenceId;
  }
};

});