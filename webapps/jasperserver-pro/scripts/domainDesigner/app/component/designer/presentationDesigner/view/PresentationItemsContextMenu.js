define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ContextMenu.extend({
  constructor: function constructor(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.menuOptionsFactory = options.menuOptionsFactory;
    this.menuOptions = this.menuOptionsFactory.create();
    ContextMenu.call(this, this.menuOptions, {
      collection: options.collection
    });
  },
  show: function show(position, model) {
    this._stopListeningForMenuOptionsEvents();

    this._resetOptionsCollection(model);

    this._initMenuOptionsEvents(model);

    this._signOffTryHide();

    ContextMenu.prototype.show.call(this, position);
  },
  // private methods
  _resetOptionsCollection: function _resetOptionsCollection(model) {
    this.menuOptions = this.menuOptionsFactory.create(model);
    this.collection.reset(this.menuOptions);
  },
  _initMenuOptionsEvents: function _initMenuOptionsEvents(model) {
    _.each(this.menuOptions, function (menuOption) {
      this.listenTo(this, 'option:' + menuOption.action, _.partial(this._onMenuAction, menuOption.triggerEvent, model));
    }, this);
  },
  _stopListeningForMenuOptionsEvents: function _stopListeningForMenuOptionsEvents() {
    _.each(this.menuOptions, function (menuOption) {
      this.stopListening(this, 'option:' + menuOption.action);
    }, this);
  },
  // Event handlers
  _onMenuAction: function _onMenuAction(triggerEvent, model) {
    this.presentationDesignerEventBus.trigger(triggerEvent, model);
  }
});

});