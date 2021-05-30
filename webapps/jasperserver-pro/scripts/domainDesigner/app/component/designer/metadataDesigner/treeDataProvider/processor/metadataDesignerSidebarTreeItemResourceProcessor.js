define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function metadataDesignerSidebarTreeItemResourceProcessor(resource, options) {
  var embeddedResource = _.pick(resource, ['id', 'resourceId', 'type', 'calcFieldSourceId', 'calcFieldSourceType', 'derivedTableId', 'derivedTableParentId']);

  return _.extend({
    resource: embeddedResource
  }, _.omit(resource, ['derivedTableId', 'derivedTableParentId', 'calcFieldSourceId', 'calcFieldSourceType']));
}

module.exports = metadataDesignerSidebarTreeItemResourceProcessor;

});