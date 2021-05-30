define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function treeItemIsEmptyDataSourceGroup(item, options) {
  if (entityUtil.isDataSourceGroup(item.type)) {
    item.isEmptyDataSourceGroup = !Boolean(options.dataSourceGroup.children.size());
  }

  return item;
}

module.exports = treeItemIsEmptyDataSourceGroup;

});