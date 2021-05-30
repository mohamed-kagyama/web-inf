define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseModel = require("runtime_dependencies/js-sdk/src/common/model/BaseModel");

var substitutions = require('../enum/substitutionConstants');

var dateUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var timeUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/time");

var numberUtilsOptions = require("settings!decimalFormatSymbols");

var NumberUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils");

var i18n = require("bundle!InputControlsValidation");

var InputControlOptionCollection = require('../collection/InputControlOptionCollection');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("InputControlStateModel");
var numberUtils = new NumberUtils(numberUtilsOptions);
module.exports = BaseModel.extend({
  defaults: {
    id: undefined,
    value: undefined,
    options: undefined,
    uri: undefined,
    error: undefined
  },
  initialize: function initialize() {
    BaseModel.prototype.initialize.apply(this, arguments);
    this.isValue = _.isUndefined(this.get('options'));
    this.options = new InputControlOptionCollection(this.get('options') || []);
    this.on('change:options', _.bind(function () {
      this.options.reset(this.get('options') || []);
    }, this));
    this.on('all', localLogger.debug, localLogger);
  },
  validation: function validation() {
    var value = this.get('value'),
        compare,
        dataType = this.dataType;

    if (this.isValue) {
      if (this.mandatory && (value === '' || _.isUndefined(value) || value === substitutions.NULL_SUBSTITUTION_VALUE)) {
        return i18n['fillParameters.error.mandatoryField'];
      }
    } else {
      if (this.mandatory && !this.getData().length) {
        return i18n['fillParameters.error.mandatoryField'];
      }

      return null;
    }

    if (!dataType || value === '') {
      return null;
    }

    if (dataType.type === 'text') {
      if (dataType.pattern && !RegExp('^' + dataType.pattern + '$').test(value)) {
        return i18n['fillParameters.error.invalidPattern'];
      }
    }

    if (dataType.type === 'number') {
      value = numberUtils.parseNumber(value);

      if (!_.isNumber(value) || _.isNaN(value)) {
        return i18n['fillParameters.error.invalidValueForType'].replace('{0}', 'number');
      }

      if (dataType.minValue) {
        if (dataType.strictMin && dataType.minValue >= value) {
          return i18n['fillParameters.error.smallerThan'];
        }

        if (!dataType.strictMin && dataType.minValue > value) {
          return i18n['fillParameters.error.smallerOrEqual'];
        }
      }

      if (dataType.maxValue) {
        if (dataType.strictMax && dataType.maxValue <= value) {
          return i18n['fillParameters.error.greaterThan'];
        }

        if (!dataType.strictMax && dataType.maxValue < value) {
          return i18n['fillParameters.error.greaterOrEqual'];
        }
      }
    } // TODO add validation for relative dates comparation with min/max dates (date and datetime types)
    // TODO add validation for relative dates comparation with min/max dates (date and datetime types)


    if (dataType.type === 'date') {
      var localizedDate = dateUtils.isoDateToLocalizedDate(value);

      if (!dateUtils.isDate(localizedDate) && !dateUtils.isRelativeDate(value)) {
        return i18n['fillParameters.error.invalidValueForType'].replace('{0}', 'Date');
      }

      if (dataType.minValue) {
        compare = dateUtils.compareDates(dateUtils.isoDateToLocalizedDate(dataType.minValue.substr(0, 10)), localizedDate);

        if (dataType.strictMin) {
          if (compare !== -1) {
            return i18n['fillParameters.error.smallerThan'];
          }
        } else {
          if (compare !== -1 && compare !== 0) {
            return i18n['fillParameters.error.smallerOrEqual'];
          }
        }
      }

      if (dataType.maxValue) {
        compare = dateUtils.compareDates(dateUtils.isoDateToLocalizedDate(dataType.maxValue.substr(0, 10)), localizedDate);

        if (dataType.strictMax) {
          if (compare !== 1) {
            return i18n['fillParameters.error.greaterThan'];
          }
        } else {
          if (compare !== 1 && compare !== 0) {
            return i18n['fillParameters.error.greaterOrEqual'];
          }
        }
      }
    }

    if (dataType.type === 'time') {
      var localizedTime = dateUtils.isoTimeToLocalizedTime(value);

      if (!timeUtils.isTime(localizedTime)) {
        return i18n['fillParameters.error.invalidValueForType'].replace('{0}', 'Time');
      }

      if (dataType.minValue) {
        compare = timeUtils.compareTimes(dateUtils.isoTimeToLocalizedTime(dataType.minValue), localizedTime);

        if (dataType.strictMin) {
          if (compare !== -1) {
            return i18n['fillParameters.error.smallerThan'];
          }
        } else {
          if (compare !== -1 && compare !== 0) {
            return i18n['fillParameters.error.smallerOrEqual'];
          }
        }
      }

      if (dataType.maxValue) {
        compare = timeUtils.compareTimes(dateUtils.isoTimeToLocalizedTime(dataType.maxValue), localizedTime);

        if (dataType.strictMax) {
          if (compare !== 1) {
            return i18n['fillParameters.error.greaterThan'];
          }
        } else {
          if (compare !== 1 && compare !== 0) {
            return i18n['fillParameters.error.greaterOrEqual'];
          }
        }
      }
    }

    if (dataType.type === 'datetime') {
      var localizedTimestamp = dateUtils.isoTimestampToLocalizedTimestamp(value);

      if (!dateUtils.isTimestamp(localizedTimestamp) && !dateUtils.isRelativeTimestamp(value)) {
        return i18n['fillParameters.error.invalidValueForType'].replace('{0}', 'DateTime');
      }

      if (dataType.minValue) {
        compare = dateUtils.compareTimestamps(dateUtils.isoTimestampToLocalizedTimestamp(dataType.minValue), localizedTimestamp);

        if (dataType.strictMin) {
          if (compare !== -1) {
            return i18n['fillParameters.error.smallerThan'];
          }
        } else {
          if (compare !== -1 && compare !== 0) {
            return i18n['fillParameters.error.smallerOrEqual'];
          }
        }
      }

      if (dataType.maxValue) {
        compare = dateUtils.compareTimestamps(dateUtils.isoTimestampToLocalizedTimestamp(dataType.maxValue), localizedTimestamp);

        if (dataType.strictMax) {
          if (compare !== 1) {
            return i18n['fillParameters.error.greaterThan'];
          }
        } else {
          if (compare !== 1 && compare !== 0) {
            return i18n['fillParameters.error.greaterOrEqual'];
          }
        }
      }
    }

    return null;
  },
  changeState: function changeState(data) {
    if (this.isValue) {
      this.set('value', data);
    } else {
      data = _.isArray(data) ? data : [data];
      this.options.each(function (option) {
        option.set('selected', _.contains(data, option.get('value')), {
          silent: true
        });
      });
      this.options.trigger('change:selected');
      this.options.trigger('change');
    }

    var error = this.validation();
    this.set('error', error);
    return error;
  },
  getData: function getData() {
    if (this.isValue) {
      return [this.get('value')];
    } else {
      return this.options.reduce(function (memo, option) {
        if (option.get('selected')) {
          memo.push(option.get('value'));
        }

        return memo;
      }, []);
    }
  }
});

});