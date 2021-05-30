define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var DevToolsDialog = require("./DevToolsDialog");

var devGlobalErrorHandler = require("./devGlobalErrorHandler");

var devToolsEnum = require("./devToolsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DevTools = function DevTools(context, options) {
  _.bindAll(this, 'open', 'setError', 'setState', 'getState', 'copyState', 'getContext', 'getLog', 'copyLog', 'remove', '_setStateFromDialog');

  this.context = context;
  this.options = options;
  this.lastError = null;
};

_.extend(DevTools.prototype, Backbone.Events, {
  start: function start() {
    var api = this._getDevToolsAPI();

    this._initGlobals(api);

    this._initDialog();

    this._initGlobalErrorHandling(api);
  },
  remove: function remove() {
    this._removeGlobals();

    this._removeDialog();

    this._removeGlobalErrorHandling();
  },
  setError: function setError(error) {
    this.lastError = error;
  },
  setState: function setState(state) {
    var historyModel = this._getHistoryModel();

    historyModel.setState(state.list, state.position);
  },
  getState: function getState() {
    var historyModel = this._getHistoryModel();

    return _.extend(historyModel.getState(), {
      error: this.lastError
    });
  },
  copyState: function copyState() {
    var state = this.getState();
    window.copy(state);
  },
  getContext: function getContext() {
    return _.reduce(this.context.getNames(), function (memo, name) {
      memo[name] = this.context.get(name);
      return memo;
    }, {}, this);
  },
  getLog: function getLog() {
    return this.options.devApplicationLogger.getLogEntries();
  },
  copyLog: function copyLog() {
    window.copy(this.getLog());
  },
  open: function open() {
    this.dialog.open(this.getState());
  },
  _initDialog: function _initDialog() {
    this.dialog = new DevToolsDialog();
    this.listenTo(this.dialog, 'button:update', this._setStateFromDialog);
  },
  _removeDialog: function _removeDialog() {
    this.stopListening(this.dialog);
    this.dialog.remove();
  },
  _setStateFromDialog: function _setStateFromDialog() {
    var state = this.dialog.getState();

    if (state) {
      this.setState(state);
    }

    this.dialog.close();
  },
  _getHistoryModel: function _getHistoryModel() {
    return this.context.get('historyModel');
  },
  _getDevToolsAPI: function _getDevToolsAPI() {
    return {
      open: this.open,
      setError: this.setError,
      remove: this.remove,
      setState: this.setState,
      getState: this.getState,
      copyState: this.copyState,
      getContext: this.getContext,
      getLog: this.getLog,
      copyLog: this.copyLog
    };
  },
  _initGlobals: function _initGlobals(devTools) {
    window[devToolsEnum.GLOBAL_DEV_TOOLS_VAR] = devTools;
  },
  _removeGlobals: function _removeGlobals() {
    delete window[devToolsEnum.GLOBAL_DEV_TOOLS_VAR];
  },
  _initGlobalErrorHandling: function _initGlobalErrorHandling(devTools) {
    devGlobalErrorHandler.init(devTools);
  },
  _removeGlobalErrorHandling: function _removeGlobalErrorHandling() {
    devGlobalErrorHandler.remove();
  }
});

module.exports = DevTools;

});