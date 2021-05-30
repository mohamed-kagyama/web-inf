define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;
var functionNameToOperatorMap = {};
var functionNameToNotOperatorMap = {};
functionNameToOperatorMap[functions.contains.name] = functions.contains.name;
functionNameToNotOperatorMap[functions.contains.name] = functions.notContains.name;
functionNameToOperatorMap[functions.startsWith.name] = functions.startsWith.name;
functionNameToNotOperatorMap[functions.startsWith.name] = functions.notStartsWith.name;
functionNameToOperatorMap[functions.endsWith.name] = functions.endsWith.name;
functionNameToNotOperatorMap[functions.endsWith.name] = functions.notEndsWith.name;
functionNameToOperatorMap[functions.isAnyValue.name] = operators["in"].name;
module.exports = {
  create: function create(functionName, options) {
    options = options || {};

    if (options.isNot) {
      return functionNameToNotOperatorMap[functionName];
    }

    return functionNameToOperatorMap[functionName];
  }
};

});