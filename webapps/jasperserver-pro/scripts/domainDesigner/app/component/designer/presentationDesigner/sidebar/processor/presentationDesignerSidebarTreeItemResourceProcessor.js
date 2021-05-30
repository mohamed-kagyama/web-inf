define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function presentationDesignerSidebarTreeItemResourceProcessor(item, options) {
  var parent = options.parent || {},
      parentId = parent.id || null;
  item.resource = _.pick(item, ['id', 'name', 'type', 'resourceId', 'sourceId', 'sourceType', 'dataIslandSourceId', 'isJoinTreeItem', 'calcFieldSourceId', 'calcFieldSourceType']);
  item.resource.parentId = parentId;
  delete item.sourceId;
  delete item.sourceType;
  delete item.calcFieldSourceId;
  delete item.calcFieldSourceType;
  delete item.dataIslandSourceId;
  delete item.isJoinTreeItem;
  return item;
}

module.exports = presentationDesignerSidebarTreeItemResourceProcessor;

});