define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var entityAllowedTypes = [schemaEntitiesEnum.TABLE, schemaEntitiesEnum.DERIVED_TABLE];

function TableReferencesReducer(options) {
  _.bindAll(this, 'reduce');

  this.clientDomainSchemaService = options.clientDomainSchemaService;
}

_.extend(TableReferencesReducer.prototype, {
  reduce: function reduce(options) {
    var collections = options.collections,
        targetEntityOptions = options.targetEntityOptions,
        reducedCollections = options.reducedCollections;
    var result = {},
        targetTableNames,
        isAnyTableReferencesWereDeleted = collections[schemaEntitiesEnum.TABLE_REFERENCE];
    result[schemaEntitiesEnum.TABLE_REFERENCE] = collections[schemaEntitiesEnum.TABLE_REFERENCE] || [];

    if (isAnyTableReferencesWereDeleted) {
      if (this._isAllowedTargetEntityType(targetEntityOptions)) {
        targetTableNames = this._getTableNamesOfAffectedEntities(targetEntityOptions);
        result[schemaEntitiesEnum.TABLE_REFERENCE] = this._omitTableReferencesByTableNames(collections, targetTableNames);
      }

      result[schemaEntitiesEnum.TABLE_REFERENCE] = this._omitDerivedTableBasedTableReferences(collections, result);
    }

    return _.extend({}, reducedCollections, result);
  },
  _isAllowedTargetEntityType: function _isAllowedTargetEntityType(targetEntityOptions) {
    var targetEntityType = targetEntityOptions.targetEntityType;
    return targetEntityType && _.contains(entityAllowedTypes, targetEntityType);
  },
  _omitTableReferencesByTableNames: function _omitTableReferencesByTableNames(collections, tableNames) {
    return _.reduce(collections[schemaEntitiesEnum.TABLE_REFERENCE], function (memo, tableReference) {
      if (!tableNames[tableReference.name]) {
        memo.push(tableReference);
      }

      return memo;
    }, []);
  },
  _omitDerivedTableBasedTableReferences: function _omitDerivedTableBasedTableReferences(collections, result) {
    var derivedTables = collections[schemaEntitiesEnum.DERIVED_TABLE] || [];

    var derivedTableNames = _.reduce(derivedTables, function (memo, derivedTable) {
      memo[derivedTable.name] = true;
      return memo;
    }, {});

    return result[schemaEntitiesEnum.TABLE_REFERENCE].filter(function (tableReference) {
      return !derivedTableNames[tableReference.name];
    });
  },
  _getTableNamesOfAffectedEntities: function _getTableNamesOfAffectedEntities(targetEntityOptions) {
    return _.map(targetEntityOptions.targetEntitiesIds, function (value, tableId) {
      tableId = parseInt(tableId, 10);
      var table = this.clientDomainSchemaService.getTableById(tableId);
      return table.name;
    }, this).reduce(function (memo, tableName) {
      memo[tableName] = true;
      return memo;
    }, {});
  }
});

module.exports = TableReferencesReducer;

});