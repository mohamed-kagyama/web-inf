define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AsyncApplicationDispatcher = function AsyncApplicationDispatcher(options) {
  this.initialize(options);
};

_.extend(AsyncApplicationDispatcher.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute', '_executeAllActionsInList');

    options = options || {};
    this.applicationMutations = options.applicationMutations;
    this.actionsList = [];
    this.startExecutionTimeout = options.startExecutionTimeout;
    this._executeAllActionsInList = _.throttle(this._executeAllActionsInList, this.startExecutionTimeout, {
      leading: false
    });
  },
  execute: function execute(action) {
    var args = Array.prototype.slice.call(arguments, 1);
    this.actionsList.push({
      action: action,
      args: args
    });

    this._executeAllActionsInList();
  },
  _executeAllActionsInList: function _executeAllActionsInList() {
    _.each(this.actionsList, this._executeAction, this);

    this.actionsList = [];
  },
  _executeAction: function _executeAction(actionOptions) {
    var action = actionOptions.action,
        args = actionOptions.args;
    this.applicationMutations[action].apply(this.applicationMutations, args);
  }
});

module.exports = AsyncApplicationDispatcher;

});