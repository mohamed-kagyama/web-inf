define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ComplexFilterWithoutStringExpressionWithContextProvider = function ComplexFilterWithoutStringExpressionWithContextProvider(options) {
  this.initialize(options);
};

_.extend(ComplexFilterWithoutStringExpressionWithContextProvider.prototype, {
  initialize: function initialize(options) {
    this.complexFilterExpressionVariableMapper = options.complexFilterExpressionVariableMapper;
  },
  getExpressionsWithContext: function getExpressionsWithContext(complexFilters, collections) {
    return this._getComplexFiltersExpressionsWithContext(complexFilters, collections);
  },
  _getComplexFiltersExpressionsWithContext: function _getComplexFiltersExpressionsWithContext(complexFilters, collections) {
    return _.map(complexFilters, function (filter) {
      return {
        expression: {
          object: filter.getExpression().object
        },
        variables: filter.getFieldReferences().map(_.partial(this.complexFilterExpressionVariableMapper, collections))
      };
    }, this);
  }
});

module.exports = ComplexFilterWithoutStringExpressionWithContextProvider;

});