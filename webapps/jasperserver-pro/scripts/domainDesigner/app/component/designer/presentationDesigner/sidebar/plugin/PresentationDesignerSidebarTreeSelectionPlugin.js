define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var selectionMixin = require("../../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarTreeSelectionPlugin = function PresentationDesignerSidebarTreeSelectionPlugin(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarTreeSelectionPlugin.prototype, {
  selection: {
    selector: '.jr-jTreeItem',
    multiple: true,
    attrs: ['id'],
    onSelection: 'selectItem',
    onRangeSelection: 'onRangeSelection',
    onToggleSelection: 'toggleItemSelection'
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this._initializeSelectable && this._initializeSelectable();
  },
  selectItem: function selectItem(item) {
    this.presentationDesignerEventBus.trigger('sidebar:selectItem', this._getResource(item));
  },
  onRangeSelection: function onRangeSelection(item) {
    this.presentationDesignerEventBus.trigger('sidebar:rangeSelection', this._getResource(item));
  },
  toggleItemSelection: function toggleItemSelection(item) {
    this.presentationDesignerEventBus.trigger('sidebar:toggleSelection', this._getResource(item));
  },
  _getResource: function _getResource(item) {
    item = this.sidebarTreeModel.getNode(item.id);
    return item.resource;
  }
}, selectionMixin);

module.exports = PresentationDesignerSidebarTreeSelectionPlugin;

});