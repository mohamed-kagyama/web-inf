define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ConstantJoinExpressionWithContextProvider = function ConstantJoinExpressionWithContextProvider(options) {
  this.initialize(options);
};

_.extend(ConstantJoinExpressionWithContextProvider.prototype, {
  initialize: function initialize(options) {
    this.constantJoinExpressionObjectFactory = options.constantJoinExpressionObjectFactory;
  },
  getExpressionsWithContext: function getExpressionsWithContext(constantJoinExpressions, collections) {
    return this._getConstantJoinExpressionsWithContext(constantJoinExpressions, collections);
  },
  _getConstantJoinExpressionsWithContext: function _getConstantJoinExpressionsWithContext(constantJoinExpressions, collections) {
    var fields = collections.fields;
    return _.map(constantJoinExpressions, function (constantJoinExpression) {
      var constantJoinExpressionJSON = constantJoinExpression.toJSON(),
          field = fields.byId(constantJoinExpressionJSON.fieldId);
      return this.constantJoinExpressionObjectFactory.create(constantJoinExpressionJSON, field.toJSON());
    }, this);
  }
});

module.exports = ConstantJoinExpressionWithContextProvider;

});