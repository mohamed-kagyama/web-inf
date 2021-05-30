define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var emToPxUtil = require("../../../../common/component/util/emToPxUtil");

var presentationDesignerColumnsResizingUtil = require("../util/presentationDesignerColumnsResizingUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerResizableCellsController = function PresentationDesignerResizableCellsController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerResizableCellsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.minCanvasWidth = emToPxUtil.convertEmToPx(options.minCanvasWidthEm);
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerStore = options.presentationDesignerStore;
    this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.applicationCrossComponentEventBus, 'sidebar:resize', this._onSidebarResize);
    this.listenTo(this.presentationDesignerEventBus, 'canvas:resize:left:column', this._onDesignerResizeLeftColumn);
    this.listenTo(this.presentationDesignerEventBus, 'canvas:resize:right:column', this._onDesignerResizeRightColumn);
  },
  _onSidebarResize: function _onSidebarResize(width, prevWidth) {
    var deltaWidth = width - prevWidth;
    var canvasWidth = this.presentationDesignerStore.get('canvasWidth');

    if (canvasWidth) {
      this.presentationDesignerStore.set({
        canvasWidth: canvasWidth - deltaWidth
      });
    }
  },
  _onDesignerResizeLeftColumn: function _onDesignerResizeLeftColumn(options) {
    var offsetLeft = options.offsetLeft,
        canvasWidth = this._getCanvasOrMinWidth(),
        column0Width = this._getColumn0WidthInPx({
      canvasWidth: canvasWidth
    });

    this._updateColumnsWidths({
      canvasWidth: canvasWidth,
      offsetLeft: column0Width + offsetLeft
    });
  },
  _onDesignerResizeRightColumn: function _onDesignerResizeRightColumn(options) {
    var offsetLeft = options.offsetLeft;

    this._updateColumnsWidths({
      canvasWidth: this._getCanvasOrMinWidth(),
      offsetLeft: offsetLeft
    });
  },
  _getColumn0WidthInPx: function _getColumn0WidthInPx(options) {
    var column0Width = this.presentationDesignerStore.get('column0Width');
    return presentationDesignerColumnsResizingUtil.convertOffsetLeftToPx(column0Width, options.canvasWidth);
  },
  _getCanvasOrMinWidth: function _getCanvasOrMinWidth(canvasWidth) {
    canvasWidth = canvasWidth || this.presentationDesignerStore.get('canvasWidth');
    var scrollBarWidth = this.presentationDesignerStore.get('scrollBarWidth'),
        isScrollBarPresent = this.presentationDesignerStore.get('isScrollBarPresent'),
        minCanvasWidth = this.minCanvasWidth;
    return presentationDesignerColumnsResizingUtil.getCanvasOrMinWidth({
      canvasWidth: canvasWidth,
      scrollBarWidth: scrollBarWidth,
      isScrollBarPresent: isScrollBarPresent,
      minCanvasWidth: minCanvasWidth
    });
  },
  _updateColumnsWidths: function _updateColumnsWidths(options) {
    var resizer = this.presentationDesignerStore.get('resizer'),
        columnsWidths = presentationDesignerColumnsResizingUtil.getColumnsWidths({
      canvasWidth: options.canvasWidth,
      offsetLeft: options.offsetLeft
    });
    var isResizerWithinBoundaries = presentationDesignerColumnsResizingUtil.isResizerWithinBoundaries({
      offsetLeft: options.offsetLeft,
      canvasWidth: options.canvasWidth,
      minOffsetInPercent: resizer.minOffsetInPercent,
      maxOffsetInPercent: resizer.maxOffsetInPercent
    });

    if (isResizerWithinBoundaries) {
      this.presentationDesignerStore.set(columnsWidths);
    }
  }
});

module.exports = PresentationDesignerResizableCellsController;

});