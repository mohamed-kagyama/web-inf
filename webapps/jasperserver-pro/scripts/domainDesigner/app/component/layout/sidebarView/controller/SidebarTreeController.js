define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SidebarTreeController = function SidebarTreeController(options) {
  this.initialize(options);
};

_.extend(SidebarTreeController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.selectionProvider = options.selectionProvider;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.tree = options.tree;
    this.treeDataProvider = options.treeDataProvider;
    this.model = options.model;
    this.fetchTreeEventsBlacklist = options.fetchTreeEventsBlacklist;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._renderFromState);
  },
  _onUpdateViewState: function _onUpdateViewState(state) {
    this.model.setState(state);
  },
  _fetchTreeIfVisible: function _fetchTreeIfVisible(state, options, action) {
    var selection = this._getSelection(state);

    selection = _.isArray(selection) ? selection : [selection];

    if (this.model.get('isVisible')) {
      if (!this.fetchTreeEventsBlacklist[action]) {
        this.tree.fetch(undefined, {
          keepPosition: true
        });
      }

      this.tree.setValue(selection);
    }
  },
  _renderFromState: function _renderFromState(state, options, action) {
    this._onUpdateViewState(state);

    this._setProviderState(state);

    this._fetchTreeIfVisible(state, options, action);
  },
  _getSelection: function _getSelection(state) {
    return this.selectionProvider.get(state);
  },
  _setProviderState: function _setProviderState(state) {
    this.treeDataProvider.setState({
      dataStore: state.dataStore
    });
  }
});

module.exports = SidebarTreeController;

});