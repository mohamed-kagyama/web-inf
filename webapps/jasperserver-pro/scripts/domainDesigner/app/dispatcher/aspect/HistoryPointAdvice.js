define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var VIEW_STATE_MODEL_NOT_PERSISTENT_PROPERTIES = ['runtime'];

var HistoryPointAdvice = function HistoryPointAdvice(options) {
  this.initialize(options);
};

_.extend(HistoryPointAdvice.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'pushState', 'pushViewState', 'pushStateAndClearHistory');

    this.historyModel = options.historyModel;
    this.dataStore = options.dataStore;
    this.viewStateModel = options.viewStateModel;
    this.resourceProperties = options.resourceProperties;
  },
  pushState: function pushState() {
    this.historyModel.pushState(this._getState());
  },
  pushViewState: function pushViewState() {
    this.historyModel.pushViewState(this._getStateForPushViewState());
  },
  pushStateAndClearHistory: function pushStateAndClearHistory() {
    this.historyModel.pushState(this._getState());
    this.historyModel.clearHistory();
  },
  _getState: function _getState() {
    return {
      viewState: this._getViewState(),
      domainState: this._getDomainSchemaState(),
      resourceProperties: this._getResourceProperties()
    };
  },
  _getStateForPushViewState: function _getStateForPushViewState() {
    var state = this.historyModel.getState(),
        currentEntry = state.list[state.position];
    return {
      viewState: this._getViewState(),
      domainState: currentEntry.domainState,
      resourceProperties: currentEntry.resourceProperties
    };
  },
  _getDomainSchemaState: function _getDomainSchemaState() {
    return this.dataStore.serialize();
  },
  _getResourceProperties: function _getResourceProperties() {
    return this.resourceProperties.toJSON();
  },
  _getViewState: function _getViewState() {
    return _.omit(this.viewStateModel.toJSON(), VIEW_STATE_MODEL_NOT_PERSISTENT_PROPERTIES);
  }
});

module.exports = HistoryPointAdvice;

});