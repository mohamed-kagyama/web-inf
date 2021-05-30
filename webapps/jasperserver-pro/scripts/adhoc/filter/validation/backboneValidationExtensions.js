define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var numberUtilsOptions = require("settings!decimalFormatSymbols");

var NumberUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils");

var dateUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var timeUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/time");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var ValidationError = require('./ValidationError');

var validationMessageCodes = require('./validationMessageCodes');

require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var numberUtils = new NumberUtils(numberUtilsOptions);
var ATTRIBUTE_INDEX_SEPARATOR = ValidationError.ATTRIBUTE_INDEX_SEPARATOR;
var NULL_SUBSTITUTION_VALUE = jrsConfigs.inputControlsConstants && jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE ? jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE.toLowerCase() : '~null~';
var BLANK_SUBSTITUTION_VALUE = '~BLANK~';

var hasValue = function hasValue(value) {
  return !(_.isNull(value) || _.isUndefined(value) || _.isString(value) && value === '');
};

var validateList = function validateList(value, attr, customValue, model, validators) {
  var validationResults = [],
      itemValidationResult;

  for (var i = 0; i < value.length; i++) {
    itemValidationResult = undefined;

    for (var validatorName in validators) {
      itemValidationResult = Backbone.Validation.validators[validatorName](value[i], attr + ATTRIBUTE_INDEX_SEPARATOR + (i + 1), validators[validatorName], model);

      if (!_.isUndefined(itemValidationResult)) {
        break;
      }
    }

    validationResults.push(itemValidationResult);
  }

  return _.reject(validationResults, function (result) {
    return _.isUndefined(result);
  });
};

_.extend(Backbone.Validation.validators, {
  required: function required(value, attr, _required, model, computed) {
    var isRequired = _.isFunction(_required) ? _required.call(model, value, attr, computed) : _required;

    if (!isRequired && !hasValue(value)) {
      return false; // overrides all other validators
    }

    if (isRequired && !hasValue(value)) {
      return new ValidationError(value, attr, validationMessageCodes.REQUIRED, 'required');
    }
  },
  integer: function integer(value, attr, customValue, model) {
    if (!numberUtils.isInt(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_INTEGER, 'integer');
    }
  },
  integerRange: function integerRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'integerRange');
    }

    var errors = validateList(value, attr, true, model, {
      required: true,
      nullable: false,
      integer: true
    });

    if (errors.length) {
      return errors;
    }

    var integer1 = numberUtils.parseNumber(value[0]),
        integer2 = numberUtils.parseNumber(value[1]);

    if (integer1 > integer2) {
      return new ValidationError(value, attr, validationMessageCodes.START_BIGGER_THAN_END, 'integerRange');
    }
  },
  listWithTrueAll: function listWithTrueAll(value, attr, customValue, model, computedValues) {
    if (!(_.isArray(value) && value.length > 0 || computedValues.isAnyValue === true)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_TRUE_ALL_LIST, 'listWithTrueAll');
    }
  },
  list: function list(value, attr, customValue, model, computedValues) {
    if (!_.isArray(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_LIST, 'list');
    }
  },
  decimal: function decimal(value, attr, customValue, model) {
    var parsedNumber = numberUtils.parseNumber(value);

    if (!numberUtils.isDecimal(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_DECIMAL, 'decimal');
    } else if (!parsedNumber && parsedNumber !== 0) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_NUMBER_RANGE, 'decimal');
    }
  },
  numberRange: function numberRange(value, attr, customValue, model) {
    var parsedNumber = numberUtils.parseNumber(value);

    if (!parsedNumber && parsedNumber !== 0) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_NUMBER_RANGE, 'decimal');
    }
  },
  decimalRange: function decimalRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'decimalRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      nullable: false,
      decimal: true,
      numberRange: true
    });

    if (errors.length) {
      return errors;
    }

    var integer1 = numberUtils.parseNumber(value[0]),
        integer2 = numberUtils.parseNumber(value[1]);

    if (integer1 > integer2) {
      return new ValidationError(value, attr, validationMessageCodes.START_BIGGER_THAN_END, 'decimalRange');
    }
  },
  "long": function long(value, attr, customValue, model) {
    if (!numberUtils.isInt(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_LONG, 'long');
    }
  },
  longRange: function longRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'longRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      nullable: false,
      "long": true
    });

    if (errors.length) {
      return errors;
    }

    var integer1 = numberUtils.parseNumber(value[0]),
        integer2 = numberUtils.parseNumber(value[1]); // in case of very long numbers, we can't have exact Number representation so we can't compare values
    // ignore this case and leave it to server-side validation
    // in case of very long numbers, we can't have exact Number representation so we can't compare values
    // ignore this case and leave it to server-side validation
    // in case of very long numbers, we can't have exact Number representation so we can't compare values
    // ignore this case and leave it to server-side validation
    // in case of very long numbers, we can't have exact Number representation so we can't compare values
    // ignore this case and leave it to server-side validation

    if (integer1 === false || integer2 === false) {
      return;
    }

    if (integer1 > integer2) {
      return new ValidationError(value, attr, validationMessageCodes.START_BIGGER_THAN_END, 'longRange');
    }
  },
  string: function string(value, attr, customValue, model) {
    if (!_.isString(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_STRING, 'string');
    }
  },
  nullable: function nullable(value, attr, customValue, model) {
    if (customValue === true && _.isString(value) && NULL_SUBSTITUTION_VALUE === value.toLowerCase()) {
      return false; // overrides all other validators
    }

    if (customValue === false && _.isString(value) && NULL_SUBSTITUTION_VALUE === value.toLowerCase()) {
      return new ValidationError(value, attr, validationMessageCodes.NOT_NULLABLE, 'nullable');
    }
  },
  stringRange: function stringRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'stringRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      string: true,
      nullable: false
    });

    if (errors.length) {
      return errors;
    }
  },
  date: function date(value, attr, customValue, model) {
    if (!dateUtils.isDate(value) && !dateUtils.isRelativeDate(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_DATE, 'date');
    }
  },
  dateRange: function dateRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'dateRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      nullable: false,
      date: true
    });

    if (errors.length) {
      return errors;
    }

    var comparisonResult = dateUtils.compareDates(value[0], value[1]); // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case

    if (typeof comparisonResult !== 'undefined' && comparisonResult > 0) {
      return new ValidationError(value, attr, validationMessageCodes.START_DATE_LATER_THAN_FINISH, 'dateRange');
    }
  },
  timestamp: function timestamp(value, attr, customValue, model) {
    if (!dateUtils.isTimestamp(value) && !dateUtils.isRelativeTimestamp(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_TIMESTAMP, 'timestamp');
    }
  },
  timestampRange: function timestampRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'timestampRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      nullable: false,
      timestamp: true
    });

    if (errors.length) {
      return errors;
    }

    var comparisonResult = dateUtils.compareTimestamps(value[0], value[1]); // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case

    if (typeof comparisonResult !== 'undefined' && comparisonResult > 0) {
      return new ValidationError(value, attr, validationMessageCodes.START_DATE_LATER_THAN_FINISH, 'timestampRange');
    }
  },
  time: function time(value, attr, customValue, model) {
    // relative times are not currently supported
    // if (!timeUtils.isTime(value) && !timeUtils.isRelativeTime(value)) {
    if (!timeUtils.isTime(value)) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_TIME, 'time');
    }
  },
  timeRange: function timeRange(value, attr, customValue, model) {
    if (!_.isArray(value) || value.length !== 2) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_RANGE, 'timeRange');
    }

    var errors = validateList(value, attr, customValue, model, {
      required: true,
      nullable: false,
      time: true
    });

    if (errors.length) {
      return errors;
    }

    var comparisonResult = timeUtils.compareTimes(value[0], value[1]); // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case
    // we receive comparisonResult === undefined in case when we try to compare relative date/time with real one
    // for now we don't handle this case

    if (typeof comparisonResult !== 'undefined' && comparisonResult > 0) {
      return new ValidationError(value, attr, validationMessageCodes.START_TIME_LATER_THAN_FINISH, 'timeRange');
    }
  },
  "boolean": function boolean(value, attr, customValue, model) {
    if (!_.isBoolean(value) && !(_.isString(value) && _.include(['true', 'false'], value.toLowerCase()))) {
      return new ValidationError(value, attr, validationMessageCodes.INVALID_BOOLEAN, 'boolean');
    }
  },
  blank: function blank(value, attr, customValue, model) {
    if (customValue === true && value === BLANK_SUBSTITUTION_VALUE) {
      return false; // overrides all other validators
    }

    if (customValue === false && value === BLANK_SUBSTITUTION_VALUE) {
      return new ValidationError(value, attr, validationMessageCodes.NOT_BLANK, 'blank');
    }
  }
});

module.exports = Backbone.Validation;

});