define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getFunctionExpression = require("./util/getFunctionExpression");

var getStringValueOperand = require("./util/getStringValueOperand");

var getIsNullOrOriginalExpression = require("./util/getIsNullOrOriginalExpression");

var getVariableOperand = require("./util/getVariableOperand");

var clientExpressionsEnum = require("../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AdhocQueryNumberFilterExpressionFactory = function AdhocQueryNumberFilterExpressionFactory(options) {
  this.initialize(options);
};

_.extend(AdhocQueryNumberFilterExpressionFactory.prototype, {
  initialize: function initialize(options) {
    this.converter = options.converter;
  },
  create: function create(options) {
    var criteria = options.criteria,
        fieldName = options.fieldName;
    criteria = this.converter.convert(criteria);
    return {
      "object": getIsNullOrOriginalExpression({
        criteria: criteria,
        fieldName: fieldName,
        originalExpression: getFunctionExpression({
          functionName: clientExpressionsEnum.functions.contains.name,
          leftOperand: getFunctionExpression({
            functionName: clientExpressionsEnum.functions.concat.name,
            leftOperand: getVariableOperand(fieldName),
            rightOperand: getStringValueOperand("")
          }),
          rightOperand: getStringValueOperand(criteria)
        })
      })
    };
  }
});

module.exports = AdhocQueryNumberFilterExpressionFactory;

});