define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function ContextMenuTreePlugin(options) {
  this.initialize(options);
}

_.extend(ContextMenuTreePlugin.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.tree = options.tree;
    this.actionsMap = {};

    if (!options) {
      throw new Error('Initialization error. Options required.');
    }

    this.onTreeContextMenuEvent = options.onTreeContextMenuEvent || function () {};

    this.getOptionsToSelect = options.getOptionsToSelect || function () {
      return [];
    };

    this.contextMenuEvents = options.contextMenuEvents || function () {
      return {};
    };

    this.getContextMenuOptions = options.getContextMenuOptions || function () {
      return [];
    };

    this.showContextMenuCondition = options.showContextMenuCondition || function () {
      return true;
    };

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.tree, 'list:item:contextmenu', this._onContextMenuEvent);
  },
  _onContextMenuEvent: function _onContextMenuEvent(item, event) {
    this.onTreeContextMenuEvent(item);

    this._removeLastContextMenu();

    if (this.showContextMenuCondition(item)) {
      this.contextMenu = this._getContextMenu(item);

      this._initContextMenuEvents(item, event);

      this._preselectOptions(item);

      this.contextMenu.show({
        left: event.pageX,
        top: event.pageY
      });
      this.lastContextMenu = this.contextMenu;
    }
  },
  _getContextMenu: function _getContextMenu(item) {
    var constructorOptions = this.getContextMenuOptions(item);
    return constructorOptions.contextMenu || new ContextMenu(constructorOptions.options, constructorOptions.additionalSettings);
  },
  _initContextMenuEvents: function _initContextMenuEvents(item, event) {
    var events = _.isFunction(this.contextMenuEvents) ? this.contextMenuEvents(item) : this.contextMenuEvents;

    if (events) {
      _.each(events, function (callback, contextMenuEvent) {
        this.listenTo(this.contextMenu, contextMenuEvent, _.partial(callback, item, event));
      }, this);
    }
  },
  _preselectOptions: function _preselectOptions(item) {
    var optionsToSelect = this.getOptionsToSelect(item) || [];

    if (optionsToSelect.length) {
      _.each(optionsToSelect, function (option) {
        this.contextMenu.select(option);
      }, this);
    }
  },
  _removeLastContextMenu: function _removeLastContextMenu() {
    if (this.lastContextMenu) {
      this.stopListening(this.lastContextMenu);
      this.lastContextMenu.remove();
    }
  },
  remove: function remove() {
    this.stopListening();
    this.contextMenu && this.contextMenu.remove();
  }
});

module.exports = ContextMenuTreePlugin;

});