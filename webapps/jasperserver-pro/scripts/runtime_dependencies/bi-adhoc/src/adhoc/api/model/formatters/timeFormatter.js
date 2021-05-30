define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var moment = require("momentExtension");

var formatsMappingUtil = require('./formatsMappingUtil');

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  format: function format(val, _format, options) {
    if (formatsMappingUtil.isNullOrEmpty(val)) {
      return '';
    }

    if (formatsMappingUtil.isOtherNode(val)) {
      return val;
    }

    if (formatsMappingUtil.shouldBeReturnedAsLocalazedDayOfWeek(options)) {
      return formatsMappingUtil.getLocalizedDayOfWeek(val);
    }

    _format = formatsMappingUtil.getFormatForMoment(_format, options);

    if (_format) {
      if (/^zh/.test(config.userLocale)) {
        _format = _format.replace('A', AmPmForZhCN(convertToIso(val)));
      }

      if (options && options.ignoreTimezone) {
        val = formatsMappingUtil.setToUserTimezone(val);
      } else {
        val = formatsMappingUtil.ensureTimezone(val);
      }

      return momentLocaleTimezone(convertToIso(val)).format(_format);
    }

    return val;
  }
};

function AmPmForZhCN(val) {
  //上午 = A.M.
  //下午 = P.M.
  return parseInt(momentLocaleTimezone(val).format('HH')) >= 12 ? '下午' : '上午';
}

function momentLocaleTimezone(val) {
  return moment(val).locale(config.userLocale).tz(config.userTimezone);
}

function convertToIso(value) {
  // If value already ISO formatted just return it.
  if (/T/.test(value)) {
    return value;
  } else {
    return '1970-01-01T' + value;
  }
}

});