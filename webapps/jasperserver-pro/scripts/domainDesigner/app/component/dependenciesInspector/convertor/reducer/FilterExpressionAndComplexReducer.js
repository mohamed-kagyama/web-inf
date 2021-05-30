define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function FilterExpressionAndComplexReducer(options) {
  options = options || {};

  _.bindAll(this, 'reduce');

  this.filterExpressionSerializer = options.filterExpressionSerializer;
}

_.extend(FilterExpressionAndComplexReducer.prototype, {
  reduce: function reduce(collections, reducedCollections) {
    var filterExpressions = collections[schemaEntitiesEnum.FILTER_EXPRESSION],
        complexFilters = collections[schemaEntitiesEnum.COMPLEX_FILTER],
        result = {};
    result[schemaEntitiesEnum.FILTER_EXPRESSION] = this._convertFilterExpressions(filterExpressions);
    result[schemaEntitiesEnum.COMPLEX_FILTER] = this._convertComplexFilters(complexFilters);
    return _.extend({}, reducedCollections, result);
  },
  _convertFilterExpressions: function _convertFilterExpressions(filterExpressions) {
    return _.map(filterExpressions, function (filterExpression) {
      return this._convertFilterExpression(filterExpression);
    }, this);
  },
  _convertComplexFilters: function _convertComplexFilters(complexFilters) {
    return _.map(complexFilters, function (complexFilter) {
      return this._convertComplexFilter(complexFilter);
    }, this);
  },
  _convertFilterExpression: function _convertFilterExpression(entity) {
    var filterExpressionObjectName = this.filterExpressionSerializer.serialize(entity),
        filterExpressionLeft = filterExpressionObjectName.leftString,
        filterExpressionOperator = filterExpressionObjectName.operatorString,
        filterExpressionRight = filterExpressionObjectName.rightString;
    var entityName = filterExpressionLeft + ' ' + filterExpressionOperator + ' ' + filterExpressionRight;
    return _.extend({}, entity, {
      name: entityName
    });
  },
  _convertComplexFilter: function _convertComplexFilter(entity) {
    return _.extend({}, entity, {
      name: entity.expression.string
    });
  }
});

module.exports = FilterExpressionAndComplexReducer;

});