define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceMetadataTreeController = function DataSourceMetadataTreeController(options) {
  this.initialize(options);
};

_.extend(DataSourceMetadataTreeController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.model = options.model;
    this.treeView = options.treeView;
    this.treeDataProvider = options.treeDataProvider;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.selectionEvent = options.selectionEvent;
    this.viewModelOptionsProvider = options.viewModelOptionsProvider;
    this.treeDataProviderOptionsProvider = options.treeDataProviderOptionsProvider;
    this.treeSearchKeywordProvider = options.treeSearchKeywordProvider;
    this.treeSelectionProvider = options.treeSelectionProvider;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.treeView, 'selection:change', this._onTreeSelectionChange);
    this.listenTo(this.storeChangeEventBus, 'change', this._renderFromState);
  },
  _onTreeSelectionChange: function _onTreeSelectionChange(selection) {
    this.applicationDispatcherEventBus.trigger(this.selectionEvent, {
      selection: selection
    });
  },
  _renderFromState: function _renderFromState(state, options, event) {
    this._setState(state);

    this._renderTreeIfVisible(event);
  },
  _setState: function _setState(state) {
    this._setSelectionToTreeDataProvider(state);

    this._setStateToViewModel(state);

    this._setSearchKeywordToDataProvider(state);

    this._setTreeDataProviderState(state);
  },
  _setStateToViewModel: function _setStateToViewModel(state) {
    var viewState = state.viewState;
    this.model.setState(_.extend({
      'currentDesigner': viewState.getCurrentDesigner()
    }, this.viewModelOptionsProvider.get(state)));
  },
  _setSearchKeywordToDataProvider: function _setSearchKeywordToDataProvider(state) {
    var searchKeyword = this.treeSearchKeywordProvider.get(state);
    this.treeDataProvider.setSearchKeyword(searchKeyword);
  },
  _isResourcePresent: function _isResourcePresent() {
    return Boolean(this.model.get('currentMetadataResourceId'));
  },
  _isVisible: function _isVisible() {
    return this.model.get('isVisible');
  },
  _setTreeDataProviderState: function _setTreeDataProviderState(state) {
    var options;

    if (this._isResourcePresent()) {
      options = this.treeDataProviderOptionsProvider.get(state);
      this.treeDataProvider.setState(options);
    }
  },
  _renderTreeIfVisible: function _renderTreeIfVisible(event) {
    if (this._isVisible()) {
      this._renderTree(event);
    }
  },
  _renderTree: function _renderTree(event) {
    if (this._isResourcePresent()) {
      if (event !== this.selectionEvent) {
        this.treeView.fetch({
          keepPosition: true
        });
      }
    }
  },
  _setSelectionToTreeDataProvider: function _setSelectionToTreeDataProvider(state) {
    this.treeDataProvider.setSelection(this.treeSelectionProvider.get(state));
  }
});

module.exports = DataSourceMetadataTreeController;

});