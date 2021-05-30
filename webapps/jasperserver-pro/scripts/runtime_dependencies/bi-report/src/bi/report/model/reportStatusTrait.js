define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var reportStatuses = require('../enum/reportStatuses');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isCompleted: function isCompleted() {
    return !_.isUndefined(this.get('status')) && (this.isFailed() || this.isReady() || this.isCancelled());
  },
  isFailed: function isFailed() {
    return this.get('status') === reportStatuses.FAILED;
  },
  isCancelled: function isCancelled() {
    return this.get('status') === reportStatuses.CANCELLED;
  },
  isReady: function isReady() {
    return this.get('status') === reportStatuses.READY;
  },
  isQueued: function isQueued() {
    return this.get('status') === reportStatuses.QUEUED;
  },
  isExecuting: function isExecuting() {
    return this.get('status') === reportStatuses.EXECUTION;
  }
};

});