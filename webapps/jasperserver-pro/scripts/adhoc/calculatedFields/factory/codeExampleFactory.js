define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getArg = function getArg(arg) {
  var result = i18n['ADH_425_ARGS_' + arg];
  return result ? result : arg;
};

var codeExamples = [{
  // IsNull ("FieldName")
  functions: ['IsNull'],
  code: '"' + getArg('FIELD') + '"'
}, {
  // Absolute("NumberFieldName")
  functions: ['Absolute', 'Rank'],
  code: '"' + getArg('NUMBER_FIELD') + '"'
}, {
  // DayNumber("DateFieldName")
  functions: ['DayName', 'DayNumber', 'MonthName', 'MonthNumber', 'Year'],
  code: '"' + getArg('DATE_FIELD') + '"'
}, {
  // Length("TextFieldName")
  functions: ['Length'],
  code: '"' + getArg('TEXT_FIELD') + '"'
}, {
  // CountAll("FieldName", 'Level')
  functions: ['Mode', 'CountAll', 'CountDistinct'],
  code: '"' + getArg('FIELD') + '", \'' + getArg('LEVEL') + '\''
}, {
  // PercentOf("NumberFieldName", 'Level')
  functions: ['PercentOf', 'Range', 'StdDevP', 'StdDevS', 'Sum', 'Average'],
  code: '"' + getArg('NUMBER_FIELD') + '", \'' + getArg('LEVEL') + '\''
}, {
  // Round("NumberFieldName", Integer)
  functions: ['Round'],
  code: '"' + getArg('NUMBER_FIELD') + '", ' + getArg('INTEGER')
}, {
  // WeightedAverage("NumberFieldName1", "NumberFieldName2", 'Level')
  functions: ['WeightedAverage'],
  code: '"' + getArg('NUMBER_FIELD') + '1", "' + getArg('NUMBER_FIELD') + '2", \'' + getArg('LEVEL') + '\''
}, {
  // Median("NumberOrDateFieldName", 'Level')
  functions: ['Max', 'Min', 'Median'],
  code: '"' + getArg('NUMBER_OR_DATE_FIELD') + '", \'' + getArg('LEVEL') + '\''
}, {
  // ElapsedDays("DateFieldName1", "DateFieldName2")
  functions: ['ElapsedDays', 'ElapsedWeeks', 'ElapsedMonths', 'ElapsedQuarters', 'ElapsedSemis', 'ElapsedYears'],
  code: '"' + getArg('DATE_FIELD') + '1", "' + getArg('DATE_FIELD') + '2"'
}, {
  // ElapsedHours("DateTimeFieldName1", "DateTimeFieldName2")
  functions: ['ElapsedHours', 'ElapsedMinutes', 'ElapsedSeconds'],
  code: '"' + getArg('DATETIME_FIELD') + '1", "' + getArg('DATETIME_FIELD') + '2"'
}, {
  // startsWith("TextFieldName", 'string expression')
  functions: ['Contains', 'EndsWith', 'StartsWith'],
  code: '"' + getArg('TEXT_FIELD') + '", \'' + getArg('TEXT_STRING') + '\''
}, {
  // Concatenate("TextFieldName", 'string expression', ...)
  functions: ['Concatenate'],
  code: '"' + getArg('TEXT_FIELD') + '", \'' + getArg('TEXT_STRING') + '\', ...'
}, {
  // Mid("TextFieldName", Start_Pos, Length)
  functions: ['Mid'],
  code: '"' + getArg('TEXT_FIELD') + '", ' + getArg('START_POSITION') + ', ' + getArg('LENGTH')
}, {
  // IF("BooleanFieldName", TrueCalc, FalseCalc)
  functions: ['IF'],
  code: '"' + getArg('BOOLEAN_FIELD') + '", ' + getArg('TRUE_CALC') + ', ' + getArg('FALSE_CALC')
}, {
  // Today(Integer_Offset)
  functions: ['Today'],
  code: getArg('INTEGER_OFFSET')
}, {
  // Case("FieldName", FieldValue1, ReturnValue1, FieldValue2, ReturnValue2, ..., ElseReturnValue)
  functions: ['Case', 'CaseRange'],
  code: '"' + getArg('FIELD') + '", ' + getArg('FIELD_VALUE') + '1, ' + getArg('RETURN_VALUE') + '1, ' + getArg('FIELD_VALUE') + '2, ' + getArg('RETURN_VALUE') + '2, ..., ' + getArg('ELSE_RETURN_VALUE')
}, {
  // CaseWhen("FieldName1" >= FieldValue1, ReturnValue1, "FieldName2" in (FieldValue21, FieldValue22,...), ReturnValue2, ..., ElseReturnValue)
  functions: ['CaseWhen'],
  code: '"' + getArg('FIELD') + '1" >= ' + getArg('FIELD_VALUE') + '1, ' + getArg('RETURN_VALUE') + '1, "' + getArg('FIELD') + '2" in (' + getArg('FIELD_VALUE') + '21, ' + getArg('FIELD_VALUE') + '22,...), ' + getArg('RETURN_VALUE') + '2, ..., ' + getArg('ELSE_RETURN_VALUE')
}, {
  // Attribute('string expression', category)
  functions: ['Attribute'],
  code: '\'' + getArg('NAME_STRING') + '\', \'' + getArg('CATEGORY_STRING') + '\''
}, {
  // Boolean('true')
  functions: ['Boolean'],
  code: '\'true\''
}, {
  // Date('string expression')
  functions: ['Date', 'Decimal', 'Integer', 'Time', 'Timestamp'],
  code: '\'' + getArg('TEXT_STRING') + '\''
}];

module.exports = function (functionName, includeArgs) {
  var result = '';

  if (includeArgs) {
    var example = _.find(codeExamples, function (ex) {
      return _.contains(ex.functions, functionName);
    });

    result = example ? example.code : '';
  }

  return functionName + '(' + result + ')';
};

});