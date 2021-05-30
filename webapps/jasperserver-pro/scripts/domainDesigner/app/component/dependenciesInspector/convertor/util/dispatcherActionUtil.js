define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getTargetEntityType: function getTargetEntityType(dispatcherAction) {
    var targetEntityType;

    if (dispatcherAction.changes && dispatcherAction.changes.schema) {
      targetEntityType = dispatcherAction.changes.schema.entityType;
    }

    return targetEntityType;
  },
  getTargetEntitiesIds: function getTargetEntitiesIds(dispatcherAction) {
    var targetEntityIds,
        firstArg = _.first(dispatcherAction.args); // assume that application dispatcher actions follow next convention in passing entity id or ids
    // assume that application dispatcher actions follow next convention in passing entity id or ids


    if (_.isObject(firstArg)) {
      if (firstArg.id) {
        targetEntityIds = [firstArg.id];
      } else if (firstArg.ids) {
        targetEntityIds = firstArg.ids;
      }
    } else if (firstArg) {
      targetEntityIds = [firstArg];
    }

    if (!targetEntityIds) {
      targetEntityIds = [];
    }

    return targetEntityIds;
  }
};

});