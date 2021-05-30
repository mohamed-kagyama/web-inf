define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jasperserverConfig = require("bundle!jasperserver_config");

var NumberUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DECIMAL_DELIMITER = jasperserverConfig['client.delimiters.decimal'];
var THOUSANDS_DELIMITER = jasperserverConfig['client.delimiters.thousands'];
var NUMBER_DECIMAL_DELIMITER = '.';
var REMOVE_THOUSANDS_DELIMITER_REGEXP = new RegExp('\\' + THOUSANDS_DELIMITER, 'g');
var GET_NUMBER_WITHOUT_ZEROS_AFTER_DECIMAL_DELIMITER_REGEXP = new RegExp('(\\d+)\\' + DECIMAL_DELIMITER + '[0]+$');
var INSERT_THOUSANDS_SEPARATOR_REGEXP = /\B(?=(?:\d{3})+(?!\d))/g;
var HAS_MINUS_SIGN_REGEXP = /^-/;
var numberUtils = new NumberUtils({
  decimalSeparator: DECIMAL_DELIMITER,
  groupingSeparator: THOUSANDS_DELIMITER
});

function replaceLocalizedDecimalDelimiterWithNumberDecimalDelimiter(value) {
  return value.replace(DECIMAL_DELIMITER, NUMBER_DECIMAL_DELIMITER);
}

function removeThousandsDelimiter(value) {
  return value.replace(REMOVE_THOUSANDS_DELIMITER_REGEXP, '');
}

function removeZerosAfterDecimalDelimiter(stringNumber) {
  var match = stringNumber.match(GET_NUMBER_WITHOUT_ZEROS_AFTER_DECIMAL_DELIMITER_REGEXP);

  if (match) {
    return match[1];
  }

  return stringNumber;
}

function formatStringNumber(value) {
  var number = value.split('.'),
      integerPart = number[0],
      decimalPart = number[1];

  if (integerPart.length > 3) {
    integerPart = integerPart.replace(INSERT_THOUSANDS_SEPARATOR_REGEXP, THOUSANDS_DELIMITER);
  }

  return decimalPart ? [integerPart, decimalPart].join(DECIMAL_DELIMITER) : integerPart;
}

module.exports = {
  isInteger: function isInteger(value) {
    value = removeThousandsDelimiter(value);
    return numberUtils.isInt(value);
  },
  isDecimal: function isDecimal(value) {
    value = removeThousandsDelimiter(value);
    return numberUtils.isDecimal(value);
  },
  parseNumber: function parseNumber(value) {
    var valueWithoutDelimiters = removeThousandsDelimiter(value),
        hasMinusSign = Boolean(value.match(HAS_MINUS_SIGN_REGEXP)),
        parsedValue = numberUtils.parseNumber(valueWithoutDelimiters),
        couldNotParse = _.isBoolean(parsedValue) && !parsedValue;

    if (couldNotParse) {
      return hasMinusSign ? -Infinity : Infinity;
    }

    return parsedValue;
  },
  formatNumber: function formatNumber(value) {
    return numberUtils.formatNumber(value);
  },
  replaceLocalizedDecimalDelimiterWithNumberDecimalDelimiter: replaceLocalizedDecimalDelimiterWithNumberDecimalDelimiter,
  removeZerosAfterDecimalDelimiter: removeZerosAfterDecimalDelimiter,
  removeThousandsDelimiter: removeThousandsDelimiter,
  formatStringNumber: formatStringNumber
};

});