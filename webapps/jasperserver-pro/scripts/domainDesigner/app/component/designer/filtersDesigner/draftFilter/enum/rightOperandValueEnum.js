define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../../../../../model/util/profileAttributeUtil");

var genericTypesEnum = require("../../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

var booleanStringEquivalentEnum = require("../../../../../util/designer/filters/enum/booleanStringEquivalentEnum");

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var stringDefaultValue = '';
var numberDefaultValue = '';
var dateDefaultValue = '';
var booleanDefaultValue = booleanStringEquivalentEnum.FALSE;

function toLiteralDefault(defaultValue, options) {
  var expression = options.currentFilter.expression;
  var dataType = options.currentFilter.dataType;
  var availableValues = options.newFilterOptions.availableValues;
  var value = defaultValue;

  if (dataType) {
    var availableValuesPresent = availableValues && availableValues.length > 0;
    var rightOperandPresentAndIsNotVariable = expression.right && !filterOperandTypeUtil.isVariable(expression.right.type);

    if (availableValuesPresent) {
      value = availableValues[0];
    } else if (rightOperandPresentAndIsNotVariable) {
      if (filterOperandTypeUtil.isLiteral(expression.right.type)) {
        var isValuePresent = !_.isUndefined(expression.right.value);

        if (isValuePresent) {
          value = expression.right.value;
        }
      } else if (filterOperandTypeUtil.isList(expression.right.type)) {
        var items = expression.right.items,
            isItemsPresent = items && items.length > 0;

        if (isItemsPresent) {
          value = items[0];
        }
      } else if (filterOperandTypeUtil.isRange(expression.right.type)) {
        var start = expression.right.start,
            isStartValuePresent = !_.isUndefined(start.value);

        if (isStartValuePresent) {
          value = start.value;
        }
      }
    }
  }

  return {
    type: options.newFilterOptions.rightOperandType,
    value: value
  };
}

function toRangeDefault(defaultValue, options) {
  var expression = options.currentFilter.expression,
      start = defaultValue,
      end = defaultValue;

  if (expression.right) {
    var rightOperandType = expression.right.type;

    if (filterOperandTypeUtil.isLiteral(rightOperandType)) {
      start = expression.right.value;
      end = expression.right.value;
    } else if (filterOperandTypeUtil.isList(rightOperandType)) {
      var items = expression.right.items;

      if (items && items.length > 0) {
        start = items[0];
        end = items[items.length - 1];
      }
    } else if (filterOperandTypeUtil.isRange(rightOperandType)) {
      start = expression.right.start.value;
      end = expression.right.end.value;
    }
  }

  return {
    type: options.newFilterOptions.rightOperandType,
    start: {
      value: start
    },
    end: {
      value: end
    }
  };
}

function toVariableDefault(options) {
  var expression = options.currentFilter.expression;

  if (expression.right && filterOperandTypeUtil.isVariable(expression.right.type)) {
    return expression.right;
  } else {
    return {
      type: options.newFilterOptions.rightOperandType
    };
  }
}

function isDefaultListValue(operator, isAll, options) {
  var expression = options.currentFilter.expression,
      right = expression.right || {};
  var isInOperator = operator === expression.operator;
  var isEmptyItems = _.size(right.items) === 0;
  var isDefaultValueForInOperator = isEmptyItems && Boolean(right.isAll) === isAll;
  return isInOperator && isDefaultValueForInOperator;
}

var defaultNotInValue = _.partial(isDefaultListValue, clientExpressionsEnum.operators.notIn.name, false);

var defaultInValue = _.partial(isDefaultListValue, clientExpressionsEnum.operators["in"].name, true); // STRING


function toStringList(isAll, isDefaultValueForOppositeListOperator, options) {
  var expression = options.currentFilter.expression,
      right = expression.right || {},
      defaultValue = stringDefaultValue,
      value;
  var result = {
    type: options.newFilterOptions.rightOperandType,
    items: [],
    isAll: isAll
  };

  if (expression.right) {
    if (filterOperandTypeUtil.isList(right.type)) {
      if (!isDefaultValueForOppositeListOperator(options)) {
        result = _.extend({}, result, {
          items: right.items,
          isAll: right.isAll
        });
      }
    } else if (filterOperandTypeUtil.isLiteral(right.type)) {
      value = expression.right.value;

      if (value !== defaultValue) {
        var allowedOperatorsForKeepingValue = [clientExpressionsEnum.operators.equals.name, clientExpressionsEnum.operators.notEqual.name];

        if (_.indexOf(allowedOperatorsForKeepingValue, expression.operator) > -1) {
          var isProfileAttribute = profileAttributeUtil.containsProfileAttribute(value);
          var availableValues = options.newFilterOptions.availableValues;

          if (!isProfileAttribute && (!availableValues || availableValues.length === 0 || value !== availableValues[0])) {
            result = _.extend({}, result, {
              items: [value],
              isAll: false
            });
          }
        }
      }
    }
  }

  return result;
}

function toStringLiteral(options) {
  var expression = options.currentFilter.expression;
  var dataType = options.currentFilter.dataType;
  var availableValues = options.newFilterOptions.availableValues;
  var value = stringDefaultValue;

  if (dataType) {
    var availableValuesPresent = availableValues && availableValues.length > 0;
    var rightOperandPresentAndIsNotVariable = expression.right && !filterOperandTypeUtil.isVariable(expression.right.type);

    if (availableValuesPresent && !options.newFilterOptions.isRawValueEditor) {
      value = availableValues[0];
    } else if (rightOperandPresentAndIsNotVariable) {
      if (filterOperandTypeUtil.isLiteral(expression.right.type)) {
        var sourceOperatorsForNotPreserve = [clientExpressionsEnum.functions.contains.name, clientExpressionsEnum.functions.notContains.name, clientExpressionsEnum.functions.startsWith.name, clientExpressionsEnum.functions.notStartsWith.name, clientExpressionsEnum.functions.endsWith.name, clientExpressionsEnum.functions.notEndsWith.name];
        var targetOperatorsForNotPreserve = [clientExpressionsEnum.operators.equals.name, clientExpressionsEnum.operators.notEqual.name];
        var shouldPreserveValue = _.indexOf(sourceOperatorsForNotPreserve, expression.operator) < 0 || _.indexOf(targetOperatorsForNotPreserve, options.newFilterOptions.operator) < 0;

        if (shouldPreserveValue) {
          var isValuePresent = !_.isUndefined(expression.right.value);

          if (isValuePresent && (!availableValuesPresent || expression.right.value !== availableValues[0])) {
            value = expression.right.value;
          }
        }
      } else if (filterOperandTypeUtil.isList(expression.right.type)) {
        var items = expression.right.items,
            isItemsPresent = items && items.length > 0;

        if (isItemsPresent) {
          value = items[0];
        }
      }
    }
  }

  return {
    type: options.newFilterOptions.rightOperandType,
    value: value
  };
}

var stringListOperand = {};
stringListOperand[clientExpressionsEnum.operators["in"].name] = _.partial(toStringList, true, defaultNotInValue);
stringListOperand[clientExpressionsEnum.operators.notIn.name] = _.partial(toStringList, false, defaultInValue);
var stringLiteralOperand = {};
stringLiteralOperand[clientExpressionsEnum.operators.equals.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.operators.notEqual.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.contains.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.notContains.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.startsWith.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.notStartsWith.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.endsWith.name] = toStringLiteral;
stringLiteralOperand[clientExpressionsEnum.functions.notEndsWith.name] = toStringLiteral;
var stringVariableOperand = {};
stringVariableOperand[clientExpressionsEnum.operators.equals.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.operators.notEqual.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.contains.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.notContains.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.startsWith.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.notStartsWith.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.endsWith.name] = toVariableDefault;
stringVariableOperand[clientExpressionsEnum.functions.notEndsWith.name] = toVariableDefault;
var string = {};
string[filterOperandTypesEnum.LIST] = stringListOperand;
string[filterOperandTypesEnum.LITERAL] = stringLiteralOperand;
string[filterOperandTypesEnum.VARIABLE] = stringVariableOperand; // NUMBER

var numberLiteralDefault = _.partial(toLiteralDefault, numberDefaultValue);

var numberRangeDefault = _.partial(toRangeDefault, numberDefaultValue);

function toNumberList(isAll, isDefaultValueForOppositeListOperator, options) {
  var expression = options.currentFilter.expression,
      right = expression.right || {};
  var result = {
    type: options.newFilterOptions.rightOperandType,
    items: [],
    isAll: isAll
  };

  if (expression.right) {
    if (filterOperandTypeUtil.isList(right.type)) {
      if (!isDefaultValueForOppositeListOperator(options)) {
        result = _.extend({}, result, {
          items: right.items,
          isAll: right.isAll
        });
      }
    }
  }

  return result;
}

var numberListOperand = {};
numberListOperand[clientExpressionsEnum.operators["in"].name] = _.partial(toNumberList, true, defaultNotInValue);
numberListOperand[clientExpressionsEnum.operators.notIn.name] = _.partial(toNumberList, false, defaultInValue);
var numberRangeOperand = {};
numberRangeOperand[clientExpressionsEnum.operators["in"].name] = numberRangeDefault;
numberRangeOperand[clientExpressionsEnum.operators.notIn.name] = numberRangeDefault;
var numberLiteralOperand = {};
numberLiteralOperand[clientExpressionsEnum.operators.equals.name] = numberLiteralDefault;
numberLiteralOperand[clientExpressionsEnum.operators.notEqual.name] = numberLiteralDefault;
numberLiteralOperand[clientExpressionsEnum.operators.greater.name] = numberLiteralDefault;
numberLiteralOperand[clientExpressionsEnum.operators.less.name] = numberLiteralDefault;
numberLiteralOperand[clientExpressionsEnum.operators.greaterOrEqual.name] = numberLiteralDefault;
numberLiteralOperand[clientExpressionsEnum.operators.lessOrEqual.name] = numberLiteralDefault;
var numberVariableOperand = {};
numberVariableOperand[clientExpressionsEnum.operators.equals.name] = toVariableDefault;
numberVariableOperand[clientExpressionsEnum.operators.notEqual.name] = toVariableDefault;
numberVariableOperand[clientExpressionsEnum.operators.greater.name] = toVariableDefault;
numberVariableOperand[clientExpressionsEnum.operators.less.name] = toVariableDefault;
numberVariableOperand[clientExpressionsEnum.operators.greaterOrEqual.name] = toVariableDefault;
numberVariableOperand[clientExpressionsEnum.operators.lessOrEqual.name] = toVariableDefault;
var number = {};
number[filterOperandTypesEnum.LIST] = numberListOperand;
number[filterOperandTypesEnum.RANGE] = numberRangeOperand;
number[filterOperandTypesEnum.LITERAL] = numberLiteralOperand;
number[filterOperandTypesEnum.VARIABLE] = numberVariableOperand; // DATE

var dateLiteralDefault = _.partial(toLiteralDefault, dateDefaultValue);

var dateRangeDefault = _.partial(toRangeDefault, dateDefaultValue);

var dataRangeOperand = {};
dataRangeOperand[clientExpressionsEnum.operators["in"].name] = dateRangeDefault;
dataRangeOperand[clientExpressionsEnum.operators.notIn.name] = dateRangeDefault;
var dataLiteralOperand = {};
dataLiteralOperand[clientExpressionsEnum.operators.equals.name] = dateLiteralDefault;
dataLiteralOperand[clientExpressionsEnum.operators.notEqual.name] = dateLiteralDefault;
dataLiteralOperand[clientExpressionsEnum.operators.greater.name] = dateLiteralDefault;
dataLiteralOperand[clientExpressionsEnum.operators.less.name] = dateLiteralDefault;
dataLiteralOperand[clientExpressionsEnum.operators.greaterOrEqual.name] = dateLiteralDefault;
dataLiteralOperand[clientExpressionsEnum.operators.lessOrEqual.name] = dateLiteralDefault;
var dataVariableOperand = {};
dataVariableOperand[clientExpressionsEnum.operators.equals.name] = toVariableDefault;
dataVariableOperand[clientExpressionsEnum.operators.notEqual.name] = toVariableDefault;
dataVariableOperand[clientExpressionsEnum.operators.greater.name] = toVariableDefault;
dataVariableOperand[clientExpressionsEnum.operators.less.name] = toVariableDefault;
dataVariableOperand[clientExpressionsEnum.operators.greaterOrEqual.name] = toVariableDefault;
dataVariableOperand[clientExpressionsEnum.operators.lessOrEqual.name] = toVariableDefault;
var date = {};
date[filterOperandTypesEnum.RANGE] = dataRangeOperand;
date[filterOperandTypesEnum.LITERAL] = dataLiteralOperand;
date[filterOperandTypesEnum.VARIABLE] = dataVariableOperand; //BOOLEAN
//BOOLEAN

function toBooleanList(isAll, isDefaultValueForOppositeListOperator, options) {
  var expression = options.currentFilter.expression,
      right = expression.right || {},
      defaultValue = booleanDefaultValue,
      value;
  var result = {
    type: options.newFilterOptions.rightOperandType,
    items: [],
    isAll: isAll
  };

  if (expression.right) {
    if (filterOperandTypeUtil.isList(right.type)) {
      if (!isDefaultValueForOppositeListOperator(options)) {
        result = _.extend({}, result, {
          items: right.items,
          isAll: right.isAll
        });
      }
    } else if (filterOperandTypeUtil.isLiteral(right.type)) {
      value = expression.right.value;

      if (value !== defaultValue) {
        var valueValidator = options.validatorConfig[filterOperandTypesEnum.LITERAL][genericTypesEnum.BOOLEAN];
        var validationResult = valueValidator.validate(value);

        var isValid = _.isUndefined(validationResult);

        if (isValid) {
          var isProfileAttribute = profileAttributeUtil.containsProfileAttribute(value);

          if (!isProfileAttribute) {
            result = _.extend({}, result, {
              items: [value],
              isAll: false
            });
          }
        }
      }
    }
  }

  return result;
}

function toBooleanLiteral(options) {
  var expression = options.currentFilter.expression;
  var dataType = options.currentFilter.dataType;
  var value = booleanDefaultValue;

  if (dataType) {
    var rightOperandPresentAndIsNotVariable = expression.right && !filterOperandTypeUtil.isVariable(expression.right.type);

    if (rightOperandPresentAndIsNotVariable) {
      if (filterOperandTypeUtil.isLiteral(expression.right.type)) {
        var isValuePresent = !_.isUndefined(expression.right.value);
        var isSwitchFromRawValueEditor = options.currentFilter.isRawValueEditor;
        var isSwitchToRawValueEditor = options.newFilterOptions.isRawValueEditor;

        if (isValuePresent) {
          if (isSwitchFromRawValueEditor && isSwitchToRawValueEditor) {
            value = expression.right.value;
          } else {
            var valueValidator = options.validatorConfig[filterOperandTypesEnum.LITERAL][genericTypesEnum.BOOLEAN];
            var validationResult = valueValidator.validate(expression.right.value);

            var isValid = _.isUndefined(validationResult);

            if (isValid) {
              value = expression.right.value;
            }
          }
        }
      } else if (filterOperandTypeUtil.isList(expression.right.type)) {
        var items = expression.right.items,
            isItemsPresent = items && items.length > 0;

        if (isItemsPresent) {
          value = items[0];
        }
      }
    }
  }

  return {
    type: options.newFilterOptions.rightOperandType,
    value: value
  };
}

var booleanListOperand = {};
booleanListOperand[clientExpressionsEnum.operators["in"].name] = _.partial(toBooleanList, true, defaultNotInValue);
booleanListOperand[clientExpressionsEnum.operators.notIn.name] = _.partial(toBooleanList, false, defaultInValue);
var booleanLiteralOperand = {};
booleanLiteralOperand[clientExpressionsEnum.operators.equals.name] = toBooleanLiteral;
booleanLiteralOperand[clientExpressionsEnum.operators.notEqual.name] = toBooleanLiteral;
var booleanVariableOperand = {};
booleanVariableOperand[clientExpressionsEnum.operators.equals.name] = toVariableDefault;
booleanVariableOperand[clientExpressionsEnum.operators.notEqual.name] = toVariableDefault;
var _boolean = {};
_boolean[filterOperandTypesEnum.LIST] = booleanListOperand;
_boolean[filterOperandTypesEnum.LITERAL] = booleanLiteralOperand;
_boolean[filterOperandTypesEnum.VARIABLE] = booleanVariableOperand;
var rightOperandDefaultValueEnum = {};
rightOperandDefaultValueEnum[genericTypesEnum.STRING] = string;
rightOperandDefaultValueEnum[genericTypesEnum.INTEGER] = number;
rightOperandDefaultValueEnum[genericTypesEnum.DECIMAL] = number;
rightOperandDefaultValueEnum[genericTypesEnum.DATE] = date;
rightOperandDefaultValueEnum[genericTypesEnum.TIMESTAMP] = date;
rightOperandDefaultValueEnum[genericTypesEnum.TIME] = date;
rightOperandDefaultValueEnum[genericTypesEnum.BOOLEAN] = _boolean;
module.exports = rightOperandDefaultValueEnum;

});