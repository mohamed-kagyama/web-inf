define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var selectionMixin = require("../../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSidebarTreeSelectionPlugin = function JoinsDesignerSidebarTreeSelectionPlugin(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSidebarTreeSelectionPlugin.prototype, {
  selection: {
    selector: 'li',
    attrs: ['id'],
    onSelection: 'selectItem'
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this._initializeSelectable && this._initializeSelectable();
  },
  selectItem: function selectItem(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    this.joinsDesignerEventBus.trigger('sidebar:selectItem', treeItem.resource);
  }
}, selectionMixin);

module.exports = JoinsDesignerSidebarTreeSelectionPlugin;

});