define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var LoaderDialogController = function LoaderDialogController(options) {
  this.loader = options.loader;
  this.loaderEventBus = options.loaderEventBus;

  this._initEvents();
};

_.extend(LoaderDialogController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.loaderEventBus, 'show', this._show);
    this.listenTo(this.loaderEventBus, 'hide', this._hide);
  },
  _show: function _show() {
    this.loader.open();
  },
  _hide: function _hide() {
    this.loader.close();
  }
});

module.exports = LoaderDialogController;

});