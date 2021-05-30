define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BaseDesignerViewController = function BaseDesignerViewController(options) {
  this.initialize(options);
};

_.extend(BaseDesignerViewController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.model = options.model;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeViewState);
  },
  // Event Handlers
  _onChangeViewState: function _onChangeViewState(state) {
    var viewState = state.viewState;
    this.model.set({
      'currentDesigner': viewState.getCurrentDesigner()
    });
  }
});

module.exports = BaseDesignerViewController;

});