define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* eslint no-console: "off" */
var DevApplicationLogger = function DevApplicationLogger() {
  this.logEntries = [];
};

_.extend(DevApplicationLogger.prototype, {
  create: function create(area) {
    var self = this;
    return function (args, action) {
      self._log(area, args, action);
    };
  },
  _log: function _log(area, args, action) {
    this.logEntries.push({
      area: area,
      action: action,
      args: args
    });
    console.log(area, action, args);
  },
  getLogEntries: function getLogEntries() {
    return this.logEntries;
  }
});

module.exports = DevApplicationLogger;

});