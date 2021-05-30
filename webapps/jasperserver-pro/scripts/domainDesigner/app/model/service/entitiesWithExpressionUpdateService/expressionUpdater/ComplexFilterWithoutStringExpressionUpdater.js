define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ComplexFilterWithoutStringExpressionUpdater = function ComplexFilterWithoutStringExpressionUpdater() {};

_.extend(ComplexFilterWithoutStringExpressionUpdater.prototype, {
  update: function update(expressionContexts, entities) {
    _.each(expressionContexts, function (expressionContext, index) {
      var complexFilter = entities[index];
      complexFilter.setExpression(expressionContext.expression);
    });
  }
});

module.exports = ComplexFilterWithoutStringExpressionUpdater;

});