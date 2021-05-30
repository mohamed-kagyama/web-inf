define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var lazyDraggableMixin = require("../../../../../common/mixin/draggable/lazyDraggableMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSidebarTreeDraggablePlugin = function JoinsDesignerSidebarTreeDraggablePlugin(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSidebarTreeDraggablePlugin.prototype, {
  draggable: {
    selector: 'li',
    scroll: false,
    containment: 'body',
    onDragStart: 'onDragStart',
    onDrag: 'onDrag',
    onDragStop: 'onDragStop',
    shouldBeDraggable: 'shouldBeDraggable',
    attrs: ['id']
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.joinsDesignerSidebarIsItemDraggableSpecification = options.joinsDesignerSidebarIsItemDraggableSpecification;
    this._initializeDraggable && this._initializeDraggable();
  },
  shouldBeDraggable: function shouldBeDraggable(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    return this.joinsDesignerSidebarIsItemDraggableSpecification.isSatisfiedBy(treeItem.resource);
  },
  onDragStart: function onDragStart(item) {
    var treeItem = this.sidebarTreeModel.getNode(item.id);
    this.joinsDesignerEventBus.trigger('sidebar:selectItem', treeItem.resource);

    var dropItem = this._getDropItem(treeItem.resource);

    return {
      label: dropItem.label,
      data: dropItem
    };
  },
  onDrag: function onDrag(data, item, event) {
    this.joinsDesignerEventBus.trigger('sidebar:drag', event);
  },
  onDragStop: function onDragStop() {
    this.joinsDesignerEventBus.trigger('sidebar:dragStop');
  },
  _getDropItem: function _getDropItem(item) {
    return {
      label: item.name,
      id: item.id,
      resource: {
        id: item.resourceId,
        type: item.type,
        parentTableReferenceId: item.parentTableReferenceId,
        parentTableReferenceName: item.parentTableReferenceName,
        parentJoinTreeId: item.parentJoinTreeId
      }
    };
  }
}, lazyDraggableMixin);

module.exports = JoinsDesignerSidebarTreeDraggablePlugin;

});