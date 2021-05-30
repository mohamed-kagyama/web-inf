define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var defaultSchemaNameEnum = require("../../../../model/enum/defaultSchemaNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function OneSchemaToSchemalessReducer() {
  _.bindAll(this, 'reduce');
}

_.extend(OneSchemaToSchemalessReducer.prototype, {
  reduce: function reduce(options) {
    var collections = options.collections,
        targetEntityOptions = options.targetEntityOptions,
        reducedCollections = options.reducedCollections;
    targetEntityOptions = targetEntityOptions || {};

    if (this._isOneDataSourceGroupEntityAndReplaceDataSourceAction(collections, targetEntityOptions)) {
      return _.reduce(reducedCollections, function (memo, entities, entityType) {
        memo[entityType] = [];
        return memo;
      }, {});
    }

    return reducedCollections;
  },
  _isOneDataSourceGroupEntityAndReplaceDataSourceAction: function _isOneDataSourceGroupEntityAndReplaceDataSourceAction(collections, targetEntityOptions) {
    var entitiesQuantity = _.reduce(collections, function (memo, entities) {
      memo = memo + entities.length;
      return memo;
    }, 0);

    var isOnlyOneEntity = entitiesQuantity === 1,
        isReplaceDataSource = targetEntityOptions.isReplaceDataSource,
        dataSourceGroups = collections[schemaEntitiesEnum.DATA_SOURCE_GROUP] || [];

    if (isReplaceDataSource && isOnlyOneEntity && dataSourceGroups.length) {
      return dataSourceGroups[0].name !== defaultSchemaNameEnum.DEFAULT_SCHEMA;
    }
  }
});

module.exports = OneSchemaToSchemalessReducer;

});