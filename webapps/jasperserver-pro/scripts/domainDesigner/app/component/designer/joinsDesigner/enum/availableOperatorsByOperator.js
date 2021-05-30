define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require('../../../../model/enum/clientExpressionsEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var OPERATORS = {
  IN_AND_NOT_IN: [operators["in"].name, operators.notIn.name],
  ALL_EXCEPT_IN_AND_NOT_IN: [operators.equals.name, operators.notEqual.name, operators.greater.name, operators.less.name, operators.greaterOrEqual.name, operators.lessOrEqual.name]
};
var availableOperatorsByOperatorMap = {};

var inAndNotInOperators = _.pick(operators, OPERATORS.IN_AND_NOT_IN);

availableOperatorsByOperatorMap[operators["in"].name] = inAndNotInOperators;
availableOperatorsByOperatorMap[operators.notIn.name] = inAndNotInOperators;

var operatorsWithoutInAndNotIn = _.pick(operators, OPERATORS.ALL_EXCEPT_IN_AND_NOT_IN);

availableOperatorsByOperatorMap[operators.equals.name] = operatorsWithoutInAndNotIn;
availableOperatorsByOperatorMap[operators.notEqual.name] = operatorsWithoutInAndNotIn;
availableOperatorsByOperatorMap[operators.less.name] = operatorsWithoutInAndNotIn;
availableOperatorsByOperatorMap[operators.lessOrEqual.name] = operatorsWithoutInAndNotIn;
availableOperatorsByOperatorMap[operators.greater.name] = operatorsWithoutInAndNotIn;
availableOperatorsByOperatorMap[operators.greaterOrEqual.name] = operatorsWithoutInAndNotIn;
module.exports = availableOperatorsByOperatorMap;

});