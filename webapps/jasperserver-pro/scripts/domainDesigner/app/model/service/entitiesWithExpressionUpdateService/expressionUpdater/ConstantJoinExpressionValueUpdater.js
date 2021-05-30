define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ConstantJoinExpressionValueUpdater = function ConstantJoinExpressionValueUpdater(options) {
  this.initialize(options);
};

_.extend(ConstantJoinExpressionValueUpdater.prototype, {
  initialize: function initialize(options) {
    this.constantJoinExpressionStringFactory = options.constantJoinExpressionStringFactory;
  },
  update: function update(expressionContexts, entities) {
    _.each(expressionContexts, function (expressionContext, index) {
      var constantJoinExpression = entities[index],
          expressionString = this.constantJoinExpressionStringFactory.create(constantJoinExpression.getOperator(), expressionContext.expression);
      constantJoinExpression.setValue(expressionString);
    }, this);
  }
});

module.exports = ConstantJoinExpressionValueUpdater;

});