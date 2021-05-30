define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var propertiesToTransfer = ['parentJoinTreeId', 'parentTableReferenceId', 'parentTableReferenceName', 'canDeleteTableReference', 'alwaysIncludeTableEnabled', 'isDerivedTable', 'tableReferenceId', 'alwaysIncludeTable', 'calcFieldSourceId', 'calcFieldSourceType', 'derivedTableParentId', 'derivedTableId'];

function joinsDesignerSidebarTreeItemResourceProcessor(resource, options) {
  resource = _.clone(resource);

  var resourceProperties = _.pick(resource, propertiesToTransfer);

  resource = _.omit(resource, propertiesToTransfer);
  resourceProperties = _.extend({
    id: resource.id,
    name: resource.name,
    resourceId: resource.resourceId,
    type: resource.type
  }, resourceProperties);
  return _.extend({
    resource: resourceProperties
  }, resource);
}

module.exports = joinsDesignerSidebarTreeItemResourceProcessor;

});