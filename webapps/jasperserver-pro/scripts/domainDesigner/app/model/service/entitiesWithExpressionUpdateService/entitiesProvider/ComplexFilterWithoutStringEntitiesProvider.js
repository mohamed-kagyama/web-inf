define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var isComplexFilterExpressionWithoutStringPredicate = require("./predicate/isComplexFilterExpressionWithoutStringPredicate");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ComplexFilterWithoutStringEntitiesProvider = function ComplexFilterWithoutStringEntitiesProvider() {};

_.extend(ComplexFilterWithoutStringEntitiesProvider.prototype, {
  getEntities: function getEntities(collections) {
    return collections.filters.filter(isComplexFilterExpressionWithoutStringPredicate);
  }
});

module.exports = ComplexFilterWithoutStringEntitiesProvider;

});