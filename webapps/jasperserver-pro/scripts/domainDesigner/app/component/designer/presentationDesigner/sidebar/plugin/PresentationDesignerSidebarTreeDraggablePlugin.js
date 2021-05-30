define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var lazyDraggableMixin = require("../../../../../common/mixin/draggable/lazyDraggableMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarTreeDraggablePlugin = function PresentationDesignerSidebarTreeDraggablePlugin(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarTreeDraggablePlugin.prototype, {
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
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.sidebarTreeModel = options.sidebarTreeModel;
    this.presentationSidebarOnDragStartOptionsFactory = options.presentationSidebarOnDragStartOptionsFactory;
    this.presentationSidebarDraggableLabelFactory = options.presentationSidebarDraggableLabelFactory;
    this.presentationSidebarDraggableDataFactory = options.presentationSidebarDraggableDataFactory;
    this._initializeDraggable && this._initializeDraggable();
  },
  shouldBeDraggable: function shouldBeDraggable(item) {
    item = this._getResource(item);
    return !entityUtil.isConstantGroup(item.type);
  },
  onDrag: function onDrag(data, item, event) {
    this.presentationDesignerEventBus.trigger('sidebar:drag', event);
  },
  onDragStart: function onDragStart(item, event) {
    item = this._getResource(item);
    var options = this.presentationSidebarOnDragStartOptionsFactory.getOptions({
      event: event,
      item: item
    });

    var label = this._getDraggableLabel(options),
        data = this._getSelectionData(options);

    this.presentationDesignerEventBus.trigger('sidebar:dragStart', item, options);
    return {
      label: label,
      data: data
    };
  },
  onDragStop: function onDragStop(item) {
    this.presentationDesignerEventBus.trigger('sidebar:dragStop', this._getResource(item));
  },
  _getDraggableLabel: function _getDraggableLabel(options) {
    return this.presentationSidebarDraggableLabelFactory.getDraggableLabel(options);
  },
  _getSelectionData: function _getSelectionData(options) {
    return this.presentationSidebarDraggableDataFactory.getDraggableData(options);
  },
  _getResource: function _getResource(item) {
    item = this.sidebarTreeModel.getNode(item.id);
    return item.resource;
  }
}, lazyDraggableMixin);

module.exports = PresentationDesignerSidebarTreeDraggablePlugin;

});