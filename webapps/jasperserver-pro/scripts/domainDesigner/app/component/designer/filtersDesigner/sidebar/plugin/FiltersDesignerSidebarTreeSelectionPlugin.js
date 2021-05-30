define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var selectionMixin = require("../../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EVENT_TYPES = {
  CLICK: 'click',
  DBLCLICK: 'dblclick'
};

var FiltersDesignerSidebarTreeSelectionPlugin = function FiltersDesignerSidebarTreeSelectionPlugin(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerSidebarTreeSelectionPlugin.prototype, {
  selection: {
    selector: 'li',
    attrs: ['id'],
    event: 'click dblclick',
    onSelection: 'onSelection'
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this._initializeSelectable && this._initializeSelectable();
  },
  onSelection: function onSelection(item, e) {
    var treeItem = this.sidebarTreeModel.getNode(item.id),
        eventType = e && e.type;

    if (eventType === EVENT_TYPES.CLICK) {
      this.filtersDesignerEventBus.trigger('sidebar:selectItem', treeItem.resource);
    } else if (eventType === EVENT_TYPES.DBLCLICK) {
      this.filtersDesignerEventBus.trigger('sidebar:doubleClickItem', treeItem.resource);
    }
  }
}, selectionMixin);

module.exports = FiltersDesignerSidebarTreeSelectionPlugin;

});