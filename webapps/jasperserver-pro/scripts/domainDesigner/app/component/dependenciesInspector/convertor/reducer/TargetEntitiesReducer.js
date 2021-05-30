define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityTypeToDependentEntityTypesMap = require("./enum/entityTypeToDependentEntityTypesMap");

var entitiesToOmitByTargetEntityTypeEnum = require("./enum/entitiesToOmitByTargetEntityTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function TargetEntitiesReducer() {
  _.bindAll(this, 'reduce');
}

_.extend(TargetEntitiesReducer.prototype, {
  reduce: function reduce(collections, targetEntityOptions) {
    return this._getCollectionsWithoutTargetEntitiesAndTheirChildren(collections, targetEntityOptions);
  },
  _getCollectionsWithoutTargetEntitiesAndTheirChildren: function _getCollectionsWithoutTargetEntitiesAndTheirChildren(collections, targetEntityOptions) {
    var result = {},
        type = targetEntityOptions.targetEntityType,
        ids = targetEntityOptions.targetEntitiesIds;

    if (type) {
      result = _.pick(collections, entityTypeToDependentEntityTypesMap[type]);

      if (result[type]) {
        result[type] = _.filter(collections[type], function (entity) {
          return !ids[entity.id];
        });
      }

      result = _.omit(result, entitiesToOmitByTargetEntityTypeEnum[type]);
    } else {
      result = collections;
    }

    return result;
  }
});

module.exports = TargetEntitiesReducer;

});