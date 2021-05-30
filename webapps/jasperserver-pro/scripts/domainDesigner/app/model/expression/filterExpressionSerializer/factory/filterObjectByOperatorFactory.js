define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var functions = clientExpressionsEnum.functions;

function not(filterObject) {
  var not = {};
  not[operators.not.name] = {};
  not[operators.not.name][operators.operands.name] = [filterObject];
  return not;
}

function getOperands(options) {
  var operands = [];
  options.leftOperand && operands.push(options.leftOperand);
  options.rightOperand && operands.push(options.rightOperand);
  return operands;
}

function getFilterObjectByOperator(operator, options) {
  var filterObject = {};
  filterObject[operator] = {};
  filterObject[operator][operators.operands.name] = getOperands(options);
  return filterObject;
}

function getFilterObjectByFunctionName(functionName, options) {
  var filterObject = {};
  filterObject[functions["function"].name] = {};
  filterObject[functions["function"].name][functions.functionName.name] = functionName;
  filterObject[functions["function"].name][operators.operands.name] = getOperands(options);
  return filterObject;
}

function equalsFilterBuilder(options) {
  return getFilterObjectByOperator(operators.equals.name, options);
}

function notEqualFilterBuilder(options) {
  return getFilterObjectByOperator(operators.notEqual.name, options);
}

function greaterFilterBuilder(options) {
  return getFilterObjectByOperator(operators.greater.name, options);
}

function lessFilterBuilder(options) {
  return getFilterObjectByOperator(operators.less.name, options);
}

function greaterOrEqualFilterBuilder(options) {
  return getFilterObjectByOperator(operators.greaterOrEqual.name, options);
}

function lessOrEqualFilterBuilder(options) {
  return getFilterObjectByOperator(operators.lessOrEqual.name, options);
}

function inFilterBuilder(options) {
  if (options.isAll) {
    return isAnyValueFilterBuilder(options);
  }

  return getFilterObjectByOperator(operators["in"].name, options);
}

function notInFilterBuilder(options) {
  return not(inFilterBuilder(options));
}

function startsWithFilterBuilder(options) {
  return getFilterObjectByFunctionName(functions.startsWith.name, options);
}

function notStartsWithFilterBuilder(options) {
  return not(startsWithFilterBuilder(options));
}

function containsFilterBuilder(options) {
  return getFilterObjectByFunctionName(functions.contains.name, options);
}

function notContainsFilterBuilder(options) {
  return not(containsFilterBuilder(options));
}

function endsWithFilterBuilder(options) {
  return getFilterObjectByFunctionName(functions.endsWith.name, options);
}

function notEndsWithFilterBuilder(options) {
  return not(endsWithFilterBuilder(options));
}

function isAnyValueFilterBuilder(options) {
  return getFilterObjectByFunctionName(functions.isAnyValue.name, options);
}

var filterBuilderByOperatorMap = {};
filterBuilderByOperatorMap[operators.equals.name] = equalsFilterBuilder;
filterBuilderByOperatorMap[operators.notEqual.name] = notEqualFilterBuilder;
filterBuilderByOperatorMap[operators.greater.name] = greaterFilterBuilder;
filterBuilderByOperatorMap[operators.less.name] = lessFilterBuilder;
filterBuilderByOperatorMap[operators.greaterOrEqual.name] = greaterOrEqualFilterBuilder;
filterBuilderByOperatorMap[operators.lessOrEqual.name] = lessOrEqualFilterBuilder;
filterBuilderByOperatorMap[operators["in"].name] = inFilterBuilder;
filterBuilderByOperatorMap[operators.notIn.name] = notInFilterBuilder;
filterBuilderByOperatorMap[functions.startsWith.name] = startsWithFilterBuilder;
filterBuilderByOperatorMap[functions.notStartsWith.name] = notStartsWithFilterBuilder;
filterBuilderByOperatorMap[functions.contains.name] = containsFilterBuilder;
filterBuilderByOperatorMap[functions.notContains.name] = notContainsFilterBuilder;
filterBuilderByOperatorMap[functions.endsWith.name] = endsWithFilterBuilder;
filterBuilderByOperatorMap[functions.notEndsWith.name] = notEndsWithFilterBuilder;
module.exports = {
  create: function create(operator, options) {
    var filterBuilder = filterBuilderByOperatorMap[operator];

    if (filterBuilder) {
      return filterBuilder(options);
    }
  }
};

});