define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var date = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var globalConfiguration = require("settings!globalConfiguration");

var timezoneFormattingUtil = require("./timezoneFormattingUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var serverTimezoneId = globalConfiguration.serverTimezoneId;

function convertIsoDateToLocalizedDate(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForDate()) {
    value = date.isoDateToLocalizedDateByTimezone(value, serverTimezoneId);
  } else {
    value = date.isoDateToLocalizedDate(value);
  }

  return value;
}

function convertLocalizedDateToIsoDate(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForDate()) {
    value = date.localizedDateToIsoDateByTimezone(value, serverTimezoneId);
  } else {
    value = date.localizedDateToIsoDate(value);
  }

  return value;
}

function convertIsoTimeToLocalizedTime(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForTime()) {
    value = date.isoTimeToLocalizedTimeByTimezone(value, serverTimezoneId);
  } else {
    value = date.isoTimeToLocalizedTime(value);
  }

  return value;
}

function convertLocalizedTimeToIsoTime(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForTime()) {
    value = date.localizedTimeToIsoTimeByTimezone(value, serverTimezoneId);
  } else {
    value = date.localizedTimeToIsoTime(value);
  }

  return value;
}

function convertIsoTimestampToLocalizedTimestamp(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForTimestamp()) {
    value = date.isoTimestampToLocalizedTimestampByTimezone(value, serverTimezoneId);
  } else {
    value = date.isoTimestampToLocalizedTimestamp(value);
  }

  return value;
}

function convertLocalizedTimestampToIsoTimestamp(value) {
  if (timezoneFormattingUtil.isTimezoneFormattingShouldBeAppliedForTimestamp()) {
    value = date.localizedTimestampToIsoTimestampByTimezone(value, serverTimezoneId);
  } else {
    value = date.localizedTimestampToIsoTimestamp(value);
  }

  return value;
}

module.exports = _.extend({
  convertIsoDateToLocalizedDate: convertIsoDateToLocalizedDate,
  convertLocalizedDateToIsoDate: convertLocalizedDateToIsoDate,
  convertIsoTimeToLocalizedTime: convertIsoTimeToLocalizedTime,
  convertLocalizedTimeToIsoTime: convertLocalizedTimeToIsoTime,
  convertIsoTimestampToLocalizedTimestamp: convertIsoTimestampToLocalizedTimestamp,
  convertLocalizedTimestampToIsoTimestamp: convertLocalizedTimestampToIsoTimestamp
}, date);

});