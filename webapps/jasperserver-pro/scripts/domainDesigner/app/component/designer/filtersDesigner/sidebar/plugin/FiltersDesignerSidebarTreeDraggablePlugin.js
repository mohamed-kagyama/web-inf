define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var lazyDraggableMixin = require("../../../../../common/mixin/draggable/lazyDraggableMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerSidebarTreeDraggablePlugin = function FiltersDesignerSidebarTreeDraggablePlugin(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerSidebarTreeDraggablePlugin.prototype, {
  draggable: {
    selector: 'li',
    onDragStart: 'onDragStart',
    onDragStop: 'onDragStop',
    shouldBeDraggable: 'shouldBeDraggable',
    attrs: ['id']
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this._initializeDraggable && this._initializeDraggable();
  },
  shouldBeDraggable: function shouldBeDraggable(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    return entityUtil.isField(treeItem.resource.type);
  },
  onDragStart: function onDragStart(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    this.filtersDesignerEventBus.trigger('sidebar:selectItem', treeItem.resource);
    return {
      label: treeItem.label,
      data: treeItem.resource
    };
  }
}, lazyDraggableMixin);

module.exports = FiltersDesignerSidebarTreeDraggablePlugin;

});