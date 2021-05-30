define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SearchComponentController = function SearchComponentController(options) {
  this.initialize(options);
};

_.extend(SearchComponentController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.eventBus = options.eventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.store = options.store;
    this.searchKeywordProvider = options.searchKeywordProvider;
    this.dispatcherEventName = options.dispatcherEventName;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.onChangeStateSearchStrategy = options.onChangeStateSearchStrategy;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
    this.listenTo(this.eventBus, 'change:searchKeyword', this._onChangeSearchKeyword);
  },
  _onChangeState: function _onChangeState(state) {
    this.onChangeStateSearchStrategy.execute({
      state: state,
      store: this.store,
      searchKeyword: this.searchKeywordProvider.get(state)
    });
  },
  _onChangeSearchKeyword: function _onChangeSearchKeyword(searchKeyword) {
    this.applicationDispatcherEventBus.trigger(this.dispatcherEventName, searchKeyword);
  }
});

module.exports = SearchComponentController;

});