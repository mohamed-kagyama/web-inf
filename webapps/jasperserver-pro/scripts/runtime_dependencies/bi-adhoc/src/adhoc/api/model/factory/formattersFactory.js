define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!AdHocBundle");

var dateFormatter = require('../formatters/dateFormatter');

var timeFormatter = require('../formatters/timeFormatter');

var timestampFormatter = require('../formatters/timestampFormatter');

var numberFormatter = require('../formatters/numberFormatter');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var defaultFormatter = {
  format: function format(val, _format, opts) {
    if (val === null || val === '') {
      return '';
    }

    if (val === i18n['node.other.node']) {
      return val;
    }

    return val;
  }
};
var formatters = {
  'java.math.BigDecimal': numberFormatter,
  'java.lang.Byte': numberFormatter,
  'java.lang.Short': numberFormatter,
  'java.lang.Integer': numberFormatter,
  'java.math.BigInteger': numberFormatter,
  'java.lang.Long': numberFormatter,
  'java.lang.Float': numberFormatter,
  'java.lang.Double': numberFormatter,
  'java.lang.Decimal': numberFormatter,
  'java.util.Date': dateFormatter,
  'java.sql.Date': dateFormatter,
  'java.sql.Time': timeFormatter,
  'java.sql.Timestamp': timestampFormatter,
  'bigDecimal': numberFormatter,
  'byte': numberFormatter,
  'short': numberFormatter,
  'integer': numberFormatter,
  'bigInteger': numberFormatter,
  'long': numberFormatter,
  'float': numberFormatter,
  'double': numberFormatter,
  'decimal': numberFormatter,
  'date': dateFormatter,
  'time': timeFormatter,
  'timestamp': timestampFormatter
};

module.exports = function (type) {
  return formatters[type] || defaultFormatter;
};

});