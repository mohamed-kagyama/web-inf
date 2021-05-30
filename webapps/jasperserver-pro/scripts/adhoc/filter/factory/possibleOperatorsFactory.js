define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataTypes = require('../enum/filterDataTypes');

var operators = require('../enum/filterOperators');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var possibleOperatorsMap = {};
possibleOperatorsMap[dataTypes.STRING] = [operators.IN, operators.NOT_IN, operators.EQUALS, operators.NOT_EQUAL, operators.CONTAINS, operators.NOT_CONTAINS, operators.STARTS_WITH, operators.NOT_STARTS_WITH, operators.ENDS_WITH, operators.NOT_ENDS_WITH];
possibleOperatorsMap[dataTypes.NUMERIC] = [operators.IN, operators.NOT_IN, operators.EQUALS, operators.NOT_EQUAL, operators.LESS, operators.GREATER, operators.GREATER_OR_EQUAL, operators.LESS_OR_EQUAL, operators.BETWEEN, operators.NOT_BETWEEN];
possibleOperatorsMap[dataTypes.BOOLEAN] = [operators.IN, operators.NOT_IN, operators.EQUALS, operators.NOT_EQUAL];
possibleOperatorsMap[dataTypes.TIMESTAMP] = [operators.EQUALS, operators.NOT_EQUAL, operators.LESS, operators.GREATER, operators.GREATER_OR_EQUAL, operators.LESS_OR_EQUAL, operators.BETWEEN_DATES, operators.NOT_BETWEEN_DATES];
possibleOperatorsMap[dataTypes.TIME] = [operators.EQUALS, operators.NOT_EQUAL, operators.LESS, operators.GREATER, operators.GREATER_OR_EQUAL, operators.LESS_OR_EQUAL, operators.BETWEEN, operators.NOT_BETWEEN];
possibleOperatorsMap[dataTypes.INTEGER] = possibleOperatorsMap[dataTypes.NUMERIC];
possibleOperatorsMap[dataTypes.LONG] = possibleOperatorsMap[dataTypes.NUMERIC];
possibleOperatorsMap[dataTypes.DECIMAL] = possibleOperatorsMap[dataTypes.NUMERIC];
possibleOperatorsMap[dataTypes.DATE] = possibleOperatorsMap[dataTypes.TIMESTAMP];
var olapPossibleOperatorsMap = [operators.IN, operators.NOT_IN, operators.EQUALS, operators.NOT_EQUAL];

module.exports = function (dataType, isOlap) {
  if (isOlap) {
    return olapPossibleOperatorsMap;
  } else {
    if (possibleOperatorsMap.hasOwnProperty(dataType)) {
      return possibleOperatorsMap[dataType];
    } else {
      return [];
    }
  }
};

});