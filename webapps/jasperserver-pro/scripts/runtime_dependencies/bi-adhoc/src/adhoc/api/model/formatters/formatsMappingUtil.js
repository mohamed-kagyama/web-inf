define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var formatsMapping = require('./formatsMapping');

var i18n = require("bundle!AdHocBundle");

var moment = require("momentExtension");

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var timezoneRegExp = /[+-]\d{2}:?\d{2}$/;

function getMappingForLocale(locale) {
  var mapping = formatsMapping[locale];

  if (!mapping) {
    mapping = formatsMapping[locale.split('_')[0]];
  }

  if (!mapping) {
    mapping = formatsMapping['en'];
  }

  return mapping;
}

function getFormatForMoment(format, categorizer) {
  var mappingForLocale = getMappingForLocale(config.userLocale);
  categorizer = parseCategorizer(categorizer);
  format = mappingForLocale[categorizer][format];
  return format;
}

function parseCategorizer(categorizer) {
  //backwards compatibility.
  if (_.isObject(categorizer) && categorizer.categorizer) {
    categorizer = categorizer.categorizer;
  } else {
    categorizer = categorizer || 'none';
  }

  return categorizer;
}

function shouldBeFormattedByDateFormatter(categorizer) {
  return _.contains(['year', 'quarter', 'month', 'day'], parseCategorizer(categorizer));
}

function shouldBeReturnedAsLocalazedDayOfWeek(categorizer) {
  return parseCategorizer(categorizer) === 'day_of_week';
}

function getLocalizedDayOfWeek(val) {
  return i18n['adhoc.day.of.week.' + val] || val;
}

function setToUserTimezone(value) {
  var userTimezone;

  if (/T/.test(value)) {
    userTimezone = moment(value).tz(config.userTimezone).format('Z');
  } else {
    userTimezone = moment('1970-01-01').tz(config.userTimezone).format('Z');
  }

  if (timezoneRegExp.test(value)) {
    value = value.replace(timezoneRegExp, userTimezone);
  } else {
    value += userTimezone;
  }

  return value;
}

function ensureTimezone(value) {
  var userTimezone;

  if (!timezoneRegExp.test(value)) {
    if (/T/.test(value)) {
      userTimezone = moment(value).tz(config.userTimezone).format('Z');
    } else {
      userTimezone = moment('1970-01-01').tz(config.userTimezone).format('Z');
    }

    value += userTimezone;
  }

  return value;
}

function isNullOrEmpty(value) {
  return value === null || value === '';
}

function isOtherNode(value) {
  return value === i18n['adhoc.node.other.node'];
}

module.exports = {
  getFormatForMoment: getFormatForMoment,
  getLocalizedDayOfWeek: getLocalizedDayOfWeek,
  setToUserTimezone: setToUserTimezone,
  ensureTimezone: ensureTimezone,
  shouldBeFormattedByDateFormatter: shouldBeFormattedByDateFormatter,
  shouldBeReturnedAsLocalazedDayOfWeek: shouldBeReturnedAsLocalazedDayOfWeek,
  isNullOrEmpty: isNullOrEmpty,
  isOtherNode: isOtherNode
};

});