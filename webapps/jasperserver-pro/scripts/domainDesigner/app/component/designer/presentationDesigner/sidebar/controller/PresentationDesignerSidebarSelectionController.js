define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarSelectionController = function PresentationDesignerSidebarSelectionController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarSelectionController.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerSidebarSingleSelectStrategy = options.presentationDesignerSidebarSingleSelectStrategy;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.presentationSidebarItemsRangeSelectionProvider = options.presentationSidebarItemsRangeSelectionProvider;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'sidebar:selectItem', this.selectItem);
    this.listenTo(this.presentationDesignerEventBus, 'sidebar:rangeSelection', this.onRangeSelection);
    this.listenTo(this.presentationDesignerEventBus, 'sidebar:toggleSelection', this.toggleItemSelection);
  },
  selectItem: function selectItem(item) {
    this.presentationDesignerSidebarSingleSelectStrategy.execute(item);
  },
  toggleItemSelection: function toggleItemSelection(item) {
    var selection;

    if (this._isSelectionEmpty()) {
      this.selectItem(item);
    } else if (this._canTogglePresentationSidebarSelection(item)) {
      selection = this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(item, {
        toggle: true,
        parentId: item.parentId
      });
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION, {
        selection: selection
      });
    }
  },
  onRangeSelection: function onRangeSelection(item) {
    var selection;

    if (this._isSelectionEmpty()) {
      this.selectItem(item);
    } else if (this._canTogglePresentationSidebarSelection(item)) {
      selection = this.presentationSidebarItemsRangeSelectionProvider.getRangeSelectionByLastSelectedItem(item);
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION, {
        selection: selection
      });
    }
  },
  _canTogglePresentationSidebarSelection: function _canTogglePresentationSidebarSelection(item) {
    return this.presentationDesignerViewStateModelService.canTogglePresentationSidebarSelection(item);
  },
  _isSelectionEmpty: function _isSelectionEmpty() {
    return this.presentationDesignerViewStateModelService.isPresentationSidebarSelectionEmpty();
  }
}, Backbone.Events);

module.exports = PresentationDesignerSidebarSelectionController;

});