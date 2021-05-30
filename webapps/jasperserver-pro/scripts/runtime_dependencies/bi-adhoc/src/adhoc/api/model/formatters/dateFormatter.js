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
      return momentLocale(convertToIso(val)).format(_format);
    }

    return val;
  }
};

function momentLocale(val) {
  return moment(val).locale(config.userLocale);
}

function convertToIso(value) {
  if (/Q1/.test(value)) {
    return value.slice(0, 4).concat('-01-05T01:32:21.196Z');
  } else if (/Q2/.test(value)) {
    return value.slice(0, 4).concat('-04-05T01:32:21.196Z');
  } else if (/Q3/.test(value)) {
    return value.slice(0, 4).concat('-07-05T01:32:21.196Z');
  } else if (/Q4/.test(value)) {
    return value.slice(0, 4).concat('-10-05T01:32:21.196Z');
  } else if (/^\d{4}$/.test(value)) {
    return value.concat('-01-05T01:32:21.196Z');
  } else {
    return value;
  }
}

});