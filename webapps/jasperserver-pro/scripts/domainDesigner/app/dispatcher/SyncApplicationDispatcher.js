define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SyncApplicationDispatcher = function SyncApplicationDispatcher(options) {
  this.initialize(options);
};

_.extend(SyncApplicationDispatcher.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    options = options || {};
    this.applicationMutations = options.applicationMutations;
  },
  execute: function execute(action) {
    var args = Array.prototype.slice.call(arguments, 1);
    this.applicationMutations[action].apply(this.applicationMutations, args);
  }
});

module.exports = SyncApplicationDispatcher;

});