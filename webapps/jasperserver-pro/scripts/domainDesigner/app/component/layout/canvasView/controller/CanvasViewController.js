define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CanvasViewController = function CanvasViewController(options) {
  this.initialize(options);
};

_.extend(CanvasViewController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.designerToClassNameMap = options.designerToClassNameMap;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStateChange);
  },
  _onStateChange: function _onStateChange(state) {
    var viewState = state.viewState,
        currentDesigner = viewState.getCurrentDesigner();

    this._setState(currentDesigner);
  },
  _setState: function _setState(designer) {
    this.store.set({
      'className': this.designerToClassNameMap[designer] || '',
      'currentDesigner': designer
    });
  }
});

module.exports = CanvasViewController;

});