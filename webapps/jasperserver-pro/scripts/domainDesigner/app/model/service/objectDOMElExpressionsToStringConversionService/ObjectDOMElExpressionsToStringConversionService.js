define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ObjectDOMElExpressionsToStringConversionService = function ObjectDOMElExpressionsToStringConversionService(options) {
  this.initialize(options);
};

_.extend(ObjectDOMElExpressionsToStringConversionService.prototype, {
  initialize: function initialize(options) {
    this.validationService = options.validationService;
    this.filterExpressionsSerializer = options.filterExpressionsSerializer;
    this.entityFactory = options.entityFactory;
    this.complexFilterExpressionsWithContextProvider = options.complexFilterExpressionsWithContextProvider;
  },
  convertObjectDOMElExpressionsToString: function convertObjectDOMElExpressionsToString(dataStore) {
    var self = this,
        tableReferencesFilters = this._getTableReferencesFilters(dataStore),
        joinTreesFilters = this._getJoinTreesFilters(dataStore),
        tableReferencesFiltersAsComplexFilters = this._createComplexFilters(tableReferencesFilters),
        joinTreesFiltersAsComplexFilters = this._createComplexFilters(joinTreesFilters);

    var allComplexFilters = tableReferencesFiltersAsComplexFilters.concat(joinTreesFiltersAsComplexFilters);
    var complexFilterExpressionsWithContext = this.complexFilterExpressionsWithContextProvider.getExpressionsWithContext(allComplexFilters, dataStore);
    return this.validationService.validateDOMElCollection(complexFilterExpressionsWithContext).then(function (response) {
      return self._updateComplexFilterExpressions({
        expressionContexts: response.expressionContexts,
        tableReferencesFilters: tableReferencesFiltersAsComplexFilters,
        joinTreesFilters: joinTreesFiltersAsComplexFilters
      });
    }).then(function (complexFilters) {
      return self._replaceFiltersToComplexFilters({
        dataStore: dataStore,
        complexFilters: complexFilters,
        filters: tableReferencesFilters.concat(joinTreesFilters)
      });
    });
  },
  _getTableReferencesFilters: function _getTableReferencesFilters(dataStore) {
    var self = this;
    return dataStore.tableReferences.reduce(function (memo, tableReference) {
      var expression,
          fieldReferences,
          filters = tableReference.filters.toArray();

      if (filters.length) {
        fieldReferences = filters.reduce(function (memo, filter) {
          return memo.concat(filter.fieldReferences.toArray());
        }, []);
        expression = self.filterExpressionsSerializer.serializeTableReferenceFilters(tableReference, dataStore);
        memo.push({
          source: tableReference,
          expression: expression,
          fieldReferences: fieldReferences
        });
      }

      return memo;
    }, []);
  },
  _getJoinTreesFilters: function _getJoinTreesFilters(dataStore) {
    var self = this;
    return dataStore.joinTrees.reduce(function (memo, joinTree) {
      var expression,
          fieldReferences,
          filters = joinTree.filters.toArray();

      if (filters.length) {
        fieldReferences = filters.reduce(function (memo, filter) {
          return memo.concat(filter.fieldReferences.toArray());
        }, []);
        expression = self.filterExpressionsSerializer.serializeJoinTreeFilters(joinTree, dataStore);
        memo.push({
          source: joinTree,
          expression: expression,
          fieldReferences: fieldReferences
        });
      }

      return memo;
    }, [], this);
  },
  _createComplexFilters: function _createComplexFilters(filters) {
    return _.map(filters, function (filter) {
      var complexFilter = this.entityFactory.createComplexFilter({
        sourceId: filter.source.id,
        sourceType: entityUtil.getEntityName(filter.source),
        expression: filter.expression
      });
      complexFilter.setFieldReferences(filter.fieldReferences);
      return complexFilter;
    }, this);
  },
  _updateComplexFilterExpressions: function _updateComplexFilterExpressions(options) {
    var expressionContexts = options.expressionContexts,
        tableReferencesFilters = options.tableReferencesFilters,
        joinTreesFilters = options.joinTreesFilters;
    var tableReferencesFiltersContexts = expressionContexts.slice(0, tableReferencesFilters.length),
        joinTreesFiltersContexts = expressionContexts.slice(tableReferencesFiltersContexts.length, expressionContexts.length);

    _.each(tableReferencesFiltersContexts, function (expressionContext, index) {
      tableReferencesFilters[index].setExpression({
        string: expressionContext.expression.string
      });
    });

    _.each(joinTreesFiltersContexts, function (expressionContext, index) {
      joinTreesFilters[index].setExpression({
        string: expressionContext.expression.string
      });
    });

    return tableReferencesFilters.concat(joinTreesFilters);
  },
  _replaceFiltersToComplexFilters: function _replaceFiltersToComplexFilters(options) {
    var dataStore = options.dataStore,
        filters = options.filters,
        complexFilters = options.complexFilters;

    var complexFilterBySourceId = _.reduce(complexFilters, function (memo, complexFilter) {
      memo[complexFilter.sourceId] = complexFilter;
      return memo;
    }, {});

    _.each(filters, function removeFiltersFromFilterSources(filter) {
      var filterSource = filter.source;
      filterSource.filters.fromArray([complexFilterBySourceId[filterSource.id]]);
    });

    dataStore.filters.fromArray(complexFilters);
    return dataStore;
  }
});

module.exports = ObjectDOMElExpressionsToStringConversionService;

});