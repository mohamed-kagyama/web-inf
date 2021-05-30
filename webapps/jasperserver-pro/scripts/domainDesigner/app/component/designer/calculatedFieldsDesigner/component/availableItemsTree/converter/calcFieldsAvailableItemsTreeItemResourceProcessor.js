define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function calcFieldsAvailableItemsTreeItemResourceProcessor(resource) {
  return _.extend({
    resource: _.omit(resource, ['id', 'name', 'elements', 'levelNesting', 'expanded'])
  }, {
    id: resource.id,
    type: resource.type,
    expanded: resource.expanded,
    resourceId: resource.resourceId,
    name: resource.name,
    elements: resource.elements,
    levelNesting: resource.levelNesting
  });
}

module.exports = calcFieldsAvailableItemsTreeItemResourceProcessor;

});