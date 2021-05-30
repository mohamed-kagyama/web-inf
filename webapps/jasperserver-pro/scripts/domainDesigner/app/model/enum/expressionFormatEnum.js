define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require("./expressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var andExpression = expressionsEnum.operators.and.expressionString;
var notExpression = expressionsEnum.operators.not.expressionString;
var equalsExpression = expressionsEnum.operators.equals.expressionString;
var notEqualExpression = expressionsEnum.operators.notEqual.expressionString;
var greaterExpression = expressionsEnum.operators.greater.expressionString;
var lessExpression = expressionsEnum.operators.less.expressionString;
var greaterOrEqualExpression = expressionsEnum.operators.greaterOrEqual.expressionString;
var lessOrEqualExpression = expressionsEnum.operators.lessOrEqual.expressionString;
var inExpression = expressionsEnum.operators["in"].expressionString;

var identityTemplate = _.template('{{=value}}');

var operatorWithTwoOperands = _.template('{{=leftOperand}} {{=operator}} {{=rightOperand}}');

function getTemplateForSpecificOperatorWithTwoOperands(operator) {
  return function (options) {
    options = _.defaults(options, {
      operator: operator
    });
    return operatorWithTwoOperands(options);
  };
}

module.exports = {
  string: _.template('\'{{=value}}\''),
  integer: identityTemplate,
  "boolean": identityTemplate,
  decimal: identityTemplate,
  date: identityTemplate,
  time: identityTemplate,
  timestamp: identityTemplate,
  range: _.template('({{=start}}:{{=end}})'),
  list: _.template('({{_.each(items, function(item, index) {if (index > 0) { print(\', \'); } print(item); }); }})'),
  and: getTemplateForSpecificOperatorWithTwoOperands(andExpression),
  equals: getTemplateForSpecificOperatorWithTwoOperands(equalsExpression),
  notEqual: getTemplateForSpecificOperatorWithTwoOperands(notEqualExpression),
  greater: getTemplateForSpecificOperatorWithTwoOperands(greaterExpression),
  less: getTemplateForSpecificOperatorWithTwoOperands(lessExpression),
  greaterOrEqual: getTemplateForSpecificOperatorWithTwoOperands(greaterOrEqualExpression),
  lessOrEqual: getTemplateForSpecificOperatorWithTwoOperands(lessOrEqualExpression),
  'in': getTemplateForSpecificOperatorWithTwoOperands(inExpression),
  notIn: _.template(notExpression + ' ({{=leftOperand}} ' + inExpression + ' {{=rightOperand}})'),
  operatorWithTwoOperands: operatorWithTwoOperands
};

});