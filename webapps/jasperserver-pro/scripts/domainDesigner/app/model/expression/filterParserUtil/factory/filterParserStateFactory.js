define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterParserStateNamesEnum = require("../enum/filterParserStateNamesEnum");

var SetFilterExpressionOperatorState = require("../state/SetFilterExpressionOperatorState");

var SetFilterExpressionLeftOperandState = require("../state/SetFilterExpressionLeftOperandState");

var SetFilterExpressionRightOperandState = require("../state/SetFilterExpressionRightOperandState");

var SetFilterExpressionLiteralProfileAttributeRightOperandState = require("../state/SetFilterExpressionLiteralProfileAttributeRightOperandState");

var SetFilterExpressionRangeProfileAttributeRightOperandState = require("../state/SetFilterExpressionRangeProfileAttributeRightOperandState");

var SetFilterExpressionLiteralRightOperandState = require("../state/SetFilterExpressionLiteralRightOperandState");

var SetFilterExpressionRangeRightOperandState = require("../state/SetFilterExpressionRangeRightOperandState");

var SetFilterExpressionListRightOperandState = require("../state/SetFilterExpressionListRightOperandState");

var SetFilterExpressionVariableRightOperandState = require("../state/SetFilterExpressionVariableRightOperandState");

var ParseComplexFilterExpressionState = require("../state/ParseComplexFilterExpressionState");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var stateNamesToStatesMap = {};
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE] = SetFilterExpressionOperatorState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LEFT_OPERAND_STATE] = SetFilterExpressionLeftOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RIGHT_OPERAND_STATE] = SetFilterExpressionRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE] = SetFilterExpressionLiteralProfileAttributeRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE] = SetFilterExpressionRangeProfileAttributeRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LITERAL_RIGHT_OPERAND_STATE] = SetFilterExpressionLiteralRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE] = SetFilterExpressionRangeRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE] = SetFilterExpressionListRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.SET_FILTER_EXPRESSION_VARIABLE_RIGHT_OPERAND_STATE] = SetFilterExpressionVariableRightOperandState;
stateNamesToStatesMap[filterParserStateNamesEnum.PARSE_COMPLEX_FILTER_EXPRESSION_STATE] = ParseComplexFilterExpressionState;

function filterParserStateFactory(stateName, context) {
  var StateConstructor = stateNamesToStatesMap[stateName];

  if (StateConstructor) {
    return new StateConstructor({
      context: context,
      factory: {
        create: filterParserStateFactory
      }
    });
  }
}

module.exports = {
  create: filterParserStateFactory
};

});