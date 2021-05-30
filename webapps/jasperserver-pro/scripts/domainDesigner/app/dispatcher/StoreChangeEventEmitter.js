define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var StoreChangeEventEmitter = function StoreChangeEventEmitter(options) {
  _.bindAll(this, 'emitStoreChange');

  this.storeChangeEventBus = options.storeChangeEventBus;
  this.viewState = options.viewState;
  this.resourceProperties = options.resourceProperties;
  this.dataStoreProvider = options.dataStoreProvider;
  this.applicationStateActionsEnum = options.applicationStateActionsEnum;
};

_.extend(StoreChangeEventEmitter.prototype, {
  emitStoreChange: function emitStoreChange(result, args, action) {
    var state = this._getStateByAction(action),
        event = this._getEmitEventNameByAction(action);

    this._emitChangeByAction(event, state, args);

    this._emitParticularStoreChangeEvents(action, state, args);

    this._emitChangeStoreEvent(state, args, event);
  },
  _emitChangeByAction: function _emitChangeByAction(event, state, args) {
    this.storeChangeEventBus.trigger(event, state, args);
  },
  _emitChangeStoreEvent: function _emitChangeStoreEvent(state, args, event) {
    this.storeChangeEventBus.trigger('change', state, args, event);
  },
  _emitParticularStoreChangeEvents: function _emitParticularStoreChangeEvents(action, state, args) {
    var actionConfig = this.applicationStateActionsEnum[action];

    if (actionConfig.changes.schema) {
      this.storeChangeEventBus.trigger('change:schema', state, args);
    }

    if (actionConfig.changes.viewState) {
      this.storeChangeEventBus.trigger('change:viewState', state, args);
    }

    if (actionConfig.changes.resourceProperties) {
      this.storeChangeEventBus.trigger('change:resourceProperties', state, args);
    }
  },
  _getEmitEventNameByAction: function _getEmitEventNameByAction(action) {
    var actionConfig = this.applicationStateActionsEnum[action];
    return actionConfig.emitEvent || actionConfig.event;
  },
  _getStateByAction: function _getStateByAction(action) {
    return {
      dataStore: this._getDataStore(),
      viewState: this._cloneViewState(),
      resourceProperties: this._cloneResourceProperties()
    };
  },
  _getDataStore: function _getDataStore() {
    return this.dataStoreProvider.getDataStore();
  },
  _cloneViewState: function _cloneViewState() {
    return this.viewState.clone();
  },
  _cloneResourceProperties: function _cloneResourceProperties() {
    return _.cloneDeep(this.resourceProperties.toJSON());
  }
});

module.exports = StoreChangeEventEmitter;

});