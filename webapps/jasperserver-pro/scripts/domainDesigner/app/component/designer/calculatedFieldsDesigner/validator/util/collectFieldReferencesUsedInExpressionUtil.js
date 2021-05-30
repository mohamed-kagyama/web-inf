define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionVariables = require('../../../../../model/expression/expressionVariables');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var collectExpressionVariables = expressionVariables.collect;

function groupCalcFieldValidationContextByName(validationContext) {
  return _.indexBy(validationContext.allowed, 'name');
}

function collectFieldsUsedInExpression(expression, validationContext) {
  expression = expression.object;
  var context = groupCalcFieldValidationContextByName(validationContext);
  var variables = collectExpressionVariables(expression);
  return variables.map(function (variable) {
    return _.pick(context[variable], ['fieldId', 'fieldType', 'sourceId', 'sourceType']);
  });
}

module.exports = collectFieldsUsedInExpression;

});