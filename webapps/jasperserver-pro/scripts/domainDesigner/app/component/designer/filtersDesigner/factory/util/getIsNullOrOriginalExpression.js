define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var expressionsEnum = require("../../../../../model/enum/expressionsEnum");

var nullExpressionOperatorEnum = require("../../../../../model/enum/nullExpressionOperatorEnum");

var domainDesignerSettings = require("settings!domainSettings");

var getOperatorExpression = require("./getOperatorExpression");

var getVariableOperand = require("./getVariableOperand");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isNullOrExpression(fieldName, originalExpression) {
  return getOperatorExpression({
    operator: expressionsEnum.operators.or.name,
    operands: [getOperatorExpression({
      operator: expressionsEnum.operators.equals.name,
      operands: [getVariableOperand(fieldName), nullExpressionOperatorEnum]
    }), originalExpression]
  });
}

module.exports = function (options) {
  var criteria = options.criteria,
      fieldName = options.fieldName,
      originalExpression = options.originalExpression,
      expressionObject;

  if (domainDesignerSettings.nullLabel.toLowerCase().indexOf(criteria.toLowerCase()) > -1) {
    expressionObject = isNullOrExpression(fieldName, originalExpression);
  } else {
    expressionObject = originalExpression;
  }

  return expressionObject;
};

});