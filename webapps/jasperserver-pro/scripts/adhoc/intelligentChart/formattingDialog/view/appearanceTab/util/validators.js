define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var maxOverMinMessage = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_ERROR_MAX_OVER_MIN';
var wrongOrderMessage = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_ERROR_ORDER';

var isNumber = function isNumber(value) {
  // borrowed from jQuery
  return value - parseFloat(value) >= 0;
};

var isInteger = function isInteger(value) {
  // yes, it's not a mistake to use 'parseFloat' because it keeps decimals
  var parsed = parseFloat(value);
  return value !== '' && isNumber(value) && Math.floor(parsed) === parsed;
};

var isPositiveNumber = function isPositiveNumber(value) {
  return isNumber(value) && parseFloat(value) > 0;
};

var notNegativeInteger = function notNegativeInteger(value) {
  return isInteger(value) && parseInt(value, 10) >= 0;
};

var numberInRange = function numberInRange(value, lower, upper) {
  var val = parseFloat(value);
  return lower <= val && val <= upper;
};

var validateGaugesProps = function validateGaugesProps(props) {
  var errors = new Map();
  var minIsOk = true;
  var maxIsOK = true;
  var stop1IsNumber = true;
  var stop2IsNumber = true;
  var stop3IsNumber = true;
  var stop4IsNumber = true;

  if (!isNumber(props.gaugesMinValue)) {
    errors.set('gaugesMinValue', 'Enter correct min value');
    minIsOk = false;
  }

  if (!isNumber(props.gaugesMaxValue)) {
    errors.set('gaugesMaxValue', 'Enter correct max value');
    maxIsOK = false;
  }

  if (minIsOk && maxIsOK) {
    var minValue = parseFloat(props.gaugesMinValue);
    var maxValue = parseFloat(props.gaugesMaxValue);

    if (!(minValue < maxValue)) {
      errors.set('gaugesMaxValue', i18n[maxOverMinMessage]);
    }
  }

  if (props.gaugesDecimalPlaces !== '' && !notNegativeInteger(props.gaugesDecimalPlaces)) {
    errors.set('gaugesDecimalPlaces', 'Enter correct decimal places value');
  } else {
    var decimalPlaces = parseInt(props.gaugesDecimalPlaces, 10);

    if (decimalPlaces > 8) {
      errors.set('gaugesDecimalPlaces', 'Decimal places can\'t be more than 8');
    }
  }

  if (!isPositiveNumber(props.gaugeStopColor1Value)) {
    errors.set('gaugeStopColor1Value', 'Enter correct color 1 stop value');
    stop1IsNumber = false;
  }

  if (!numberInRange(props.gaugeStopColor1Value, 0, 1)) {
    errors.set('gaugeStopColor1Value', 'Enter correct color 1 stop value');
  }

  if (!isPositiveNumber(props.gaugeStopColor2Value)) {
    errors.set('gaugeStopColor2Value', 'Enter correct color 2 stop value');
    stop2IsNumber = false;
  }

  if (!numberInRange(props.gaugeStopColor2Value, 0, 1)) {
    errors.set('gaugeStopColor2Value', 'Enter correct color 2 stop value');
  }

  if (!isPositiveNumber(props.gaugeStopColor3Value)) {
    errors.set('gaugeStopColor3Value', 'Enter correct color 3 stop value');
    stop3IsNumber = false;
  }

  if (!numberInRange(props.gaugeStopColor3Value, 0, 1)) {
    errors.set('gaugeStopColor3Value', 'Enter correct color 3 stop value');
  }

  if (!isPositiveNumber(props.gaugeStopColor4Value)) {
    errors.set('gaugeStopColor4Value', 'Enter correct color 4 stop value');
    stop4IsNumber = false;
  }

  if (!numberInRange(props.gaugeStopColor4Value, 0, 1)) {
    errors.set('gaugeStopColor4Value', 'Enter correct color 4 stop value');
  }

  if (stop1IsNumber && stop2IsNumber) {
    var stop1Value = parseFloat(props.gaugeStopColor1Value);
    var stop2Value = parseFloat(props.gaugeStopColor2Value);

    if (!(stop1Value < stop2Value)) {
      errors.set('gaugeStopColor2Value', i18n[wrongOrderMessage].replace('{0}', '2'));
    }
  }

  if (stop2IsNumber && stop3IsNumber) {
    var _stop2Value = parseFloat(props.gaugeStopColor2Value);

    var stop3Value = parseFloat(props.gaugeStopColor3Value);

    if (!(_stop2Value < stop3Value)) {
      errors.set('gaugeStopColor3Value', i18n[wrongOrderMessage].replace('{0}', '3'));
    }
  }

  if (stop3IsNumber && stop4IsNumber) {
    var _stop3Value = parseFloat(props.gaugeStopColor3Value);

    var stop4Value = parseFloat(props.gaugeStopColor4Value);

    if (!(_stop3Value < stop4Value)) {
      errors.set('gaugeStopColor4Value', i18n[wrongOrderMessage].replace('{0}', '4'));
    }
  }

  return errors;
};

module.exports = {
  isNumber: isNumber,
  isInteger: isInteger,
  isPositiveNumber: isPositiveNumber,
  notNegativeInteger: notNegativeInteger,
  numberInRange: numberInRange,
  validateGaugesProps: validateGaugesProps
};

});