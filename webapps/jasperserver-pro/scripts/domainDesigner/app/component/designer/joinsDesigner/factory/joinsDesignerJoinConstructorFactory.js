define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getLeftDroppableAreaDefaults(item) {
  return {
    fieldId: item.resource.id,
    fieldLabel: item.label,
    joinTreeId: item.resource.parentJoinTreeId,
    tableReferenceId: item.resource.parentTableReferenceId,
    tableReferenceLabel: item.resource.parentTableReferenceName,
    isDropAreaEnabled: false
  };
}

function getRightDroppableAreaDefaults() {
  return {
    fieldId: null,
    fieldLabel: '',
    joinTreeId: null,
    tableReferenceId: null,
    tableReferenceLabel: '',
    isDropAreaEnabled: false
  };
}

module.exports = {
  create: function create(options) {
    var item = options.item,
        joinTreeId = options.joinTreeId;
    return {
      joinTreeId: joinTreeId,
      leftSide: getLeftDroppableAreaDefaults(item),
      rightSide: getRightDroppableAreaDefaults()
    };
  }
};

});