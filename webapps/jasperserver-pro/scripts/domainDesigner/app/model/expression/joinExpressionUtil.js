define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("../../util/pathUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var expressionsEnum = require("../enum/expressionsEnum");

var expressionFormatEnum = require("../enum/expressionFormatEnum");

var expressionVariables = require('./expressionVariables');

var expressionFormatter = require("./expressionFormatter");

var joinVariableParser = require("./joinParserUtil/util/joinVariableParser");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = expressionsEnum.operators;
var collectExpressionVariables = expressionVariables.collect;

function collectJoinVariables(expression) {
  var variables = collectExpressionVariables(expression);
  return _.reduce(variables, function (memo, variable) {
    variable = joinVariableParser.parse(variable);

    if (!memo[variable.alias]) {
      memo[variable.alias] = [];
    }

    memo[variable.alias].push(variable.field);
    return memo;
  }, {});
}

function getVariableByJoinAliasIdAndFieldId(joinAliasId, fieldId, collections) {
  var joinAlias = collections.joinAliases.byId(joinAliasId),
      tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
  var fieldsAndCalcFields = schemaModelUtil.getTableFieldsByJoinAlias(joinAlias, collections).concat(tableReference.getCalcFields().toArray());

  var field = _.findWhere(fieldsAndCalcFields, {
    id: fieldId
  });

  return pathUtil.join([joinAlias.getName(), field.getName()], '\\', '.');
}

function formatJoinExpressions(joinExpressions, collections) {
  return joinExpressions.reduce(function (memo, joinExpression) {
    var expressionString;

    if (entityUtil.isJoinExpression(joinExpression)) {
      expressionString = formatJoinExpression(joinExpression, collections);
    } else if (entityUtil.isConstantJoinExpression(joinExpression)) {
      expressionString = formatConstantJoinExpression(joinExpression, collections);
    }

    var template = expressionFormatEnum[operators.and.name];

    if (memo) {
      return template({
        leftOperand: memo,
        rightOperand: expressionString
      });
    } else {
      return expressionString;
    }
  }, '');
}

function formatJoinExpression(joinExpression, collections) {
  var leftJoinAliasId = joinExpression.getLeftJoinAliasId(),
      rightJoinAliasId = joinExpression.getRightJoinAliasId(),
      leftFieldId = joinExpression.getLeftFieldId(),
      rightFieldId = joinExpression.getRightFieldId();
  var leftVariable = getVariableByJoinAliasIdAndFieldId(leftJoinAliasId, leftFieldId, collections),
      rightVariable = getVariableByJoinAliasIdAndFieldId(rightJoinAliasId, rightFieldId, collections);
  return expressionFormatter.formatOperatorWithTwoOperands({
    leftOperand: leftVariable,
    rightOperand: rightVariable,
    operator: joinExpression.getOperator()
  });
}

function formatConstantJoinExpression(constantJoinExpression, collections) {
  var joinAliasId = constantJoinExpression.getJoinAliasId(),
      fieldId = constantJoinExpression.getFieldId();
  var variable = getVariableByJoinAliasIdAndFieldId(joinAliasId, fieldId, collections);
  return expressionFormatter.formatOperatorWithTwoOperands({
    leftOperand: variable,
    rightOperand: constantJoinExpression.getValue(),
    operator: constantJoinExpression.getOperator()
  });
}

module.exports = {
  collectJoinVariables: collectJoinVariables,
  formatJoinExpression: formatJoinExpression,
  formatConstantJoinExpression: formatConstantJoinExpression,
  formatJoinExpressions: formatJoinExpressions
};

});