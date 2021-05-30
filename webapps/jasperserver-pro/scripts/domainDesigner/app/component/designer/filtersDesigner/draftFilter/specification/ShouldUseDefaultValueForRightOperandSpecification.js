define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypes = require("../../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EQUALS_AND_NOTEQUAL_OPERATORS = [clientExpressionsEnum.operators.equals.name, clientExpressionsEnum.operators.notEqual.name];
var STRING_RAW_LITERAL_EDITORS = [clientExpressionsEnum.functions.contains.name, clientExpressionsEnum.functions.notContains.name, clientExpressionsEnum.functions.startsWith.name, clientExpressionsEnum.functions.notStartsWith.name, clientExpressionsEnum.functions.endsWith.name, clientExpressionsEnum.functions.notEndsWith.name];

function isString(options) {
  return options.currentFilter.dataType === genericTypes.STRING;
}

function isSwitchingFromRawValueEditor(options) {
  var targetRawValueEditor = options.newFilterOptions.isRawValueEditor;
  return isFromEqualsOrNotEqual(options) && options.currentFilter.isRawValueEditor && !_.isUndefined(targetRawValueEditor) && !targetRawValueEditor;
}

function isSwitchingToRawValueEditor(options) {
  var targetRawValueEditor = options.newFilterOptions.isRawValueEditor,
      currentRawValueEditor = options.currentFilter.isRawValueEditor;
  return isFromEqualsOrNotEqual(options) && (targetRawValueEditor || _.isUndefined(targetRawValueEditor) && currentRawValueEditor);
}

function isFromStringRawLiteralEditors(options) {
  return _.indexOf(STRING_RAW_LITERAL_EDITORS, options.currentFilter.expression.operator) >= 0;
}

function isToLiteral(options) {
  return filterOperandTypeUtil.isLiteral(options.newFilterOptions.rightOperandType);
}

function isToEqualsOrNotEqual(options) {
  return _.indexOf(EQUALS_AND_NOTEQUAL_OPERATORS, options.newFilterOptions.operator) >= 0;
}

function isToList(options) {
  return filterOperandTypeUtil.isList(options.newFilterOptions.rightOperandType);
}

function isFromEqualsOrNotEqual(options) {
  return _.indexOf(EQUALS_AND_NOTEQUAL_OPERATORS, options.currentFilter.expression.operator) >= 0;
}

function rightValueAbsent(options) {
  var right = options.currentFilter.expression.right,
      valueAbsent = true;

  if (right) {
    var rightValueIsAList = right.items && right.items.length > 0;
    var rightValueIsALiteral = !_.isUndefined(right.value);
    valueAbsent = !(rightValueIsAList || rightValueIsALiteral);
  }

  return valueAbsent;
}

function isSwitchingToSingleSelectEquals(options) {
  return (rightValueAbsent(options) || isFromStringRawLiteralEditors(options)) && isToLiteral(options) && isToEqualsOrNotEqual(options) && !isSwitchingFromRawValueEditor(options) && !isSwitchingToRawValueEditor(options);
}

function isSwitchingToListFromEqualsOrNotEqualsWithValue(options) {
  return !rightValueAbsent(options) && isToList(options) && isFromEqualsOrNotEqual(options);
}

var ShouldUseDefaultValueForRightOperandSpecification = function ShouldUseDefaultValueForRightOperandSpecification(options) {
  this.initialize(options);
};

_.extend(ShouldUseDefaultValueForRightOperandSpecification.prototype, {
  initialize: function initialize(options) {
    this.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification = options.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    return isString(options) && (isSwitchingToSingleSelectEquals(options) || isSwitchingToListFromEqualsOrNotEqualsWithValue(options)) || this.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification.isSatisfiedBy(options);
  }
});

module.exports = ShouldUseDefaultValueForRightOperandSpecification;

});