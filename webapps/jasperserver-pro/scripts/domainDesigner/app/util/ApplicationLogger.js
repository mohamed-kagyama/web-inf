define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register('DomainDesigner');

var ApplicationLogger = function ApplicationLogger(options) {
  _.bindAll(this, 'log');

  this.name = options.name;
};

ApplicationLogger.prototype.log = function (args, action) {
  log.debug(this.name, action, args);
};

module.exports = ApplicationLogger;

});