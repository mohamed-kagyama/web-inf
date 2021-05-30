define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var selectionMixin = require("../../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerSidebarTreeSelectionPlugin = function MetadataDesignerSidebarTreeSelectionPlugin(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerSidebarTreeSelectionPlugin.prototype, {
  selection: {
    selector: 'li',
    attrs: ['id'],
    onSelection: 'selectItem'
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.metadataDesignerEventBus = options.metadataDesignerEventBus;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this._initializeSelectable && this._initializeSelectable();
  },
  selectItem: function selectItem(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    this.metadataDesignerEventBus.trigger('sidebar:selectItem', treeItem.resource);
  }
}, selectionMixin);

module.exports = MetadataDesignerSidebarTreeSelectionPlugin;

});