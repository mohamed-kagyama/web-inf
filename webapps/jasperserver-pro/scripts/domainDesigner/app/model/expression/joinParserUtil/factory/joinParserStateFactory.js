define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var joinParserStateNamesEnum = require("../enum/joinParserStateNamesEnum");

var ParseJoinExpressionOperatorState = require("../state/ParseJoinExpressionOperatorState");

var ParseJoinExpressionState = require("../state/ParseJoinExpressionState");

var ParseConstantJoinExpressionState = require("../state/ParseConstantJoinExpressionState");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var stateNamesToStatesMap = {};
stateNamesToStatesMap[joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_OPERATOR_STATE] = ParseJoinExpressionOperatorState;
stateNamesToStatesMap[joinParserStateNamesEnum.PARSE_JOIN_EXPRESSION_STATE] = ParseJoinExpressionState;
stateNamesToStatesMap[joinParserStateNamesEnum.PARSE_CONSTANT_JOIN_EXPRESSION_STATE] = ParseConstantJoinExpressionState;

function joinParserStateFactory(stateName, context) {
  var StateConstructor = stateNamesToStatesMap[stateName];

  if (StateConstructor) {
    return new StateConstructor({
      context: context,
      factory: {
        create: joinParserStateFactory
      }
    });
  }
}

module.exports = {
  create: joinParserStateFactory
};

});