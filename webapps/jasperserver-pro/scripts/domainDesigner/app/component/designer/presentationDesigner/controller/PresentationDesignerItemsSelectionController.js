define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerItemsSelectionController = function PresentationDesignerItemsSelectionController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerItemsSelectionController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.presentationItemsRangeSelectionProvider = options.presentationItemsRangeSelectionProvider;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'presentationItem:select', this.selectItem);
    this.listenTo(this.presentationDesignerEventBus, 'presentationItem:addToSelectionRange', this.onRangeSelection);
    this.listenTo(this.presentationDesignerEventBus, 'presentationItem:toggleSelection', this.toggleItemSelection);
  },
  onRangeSelection: function onRangeSelection(item) {
    var selection;

    if (this.presentationDesignerViewStateModelService.isPresentationItemsSelectionEmpty()) {
      this.selectItem(item);
    } else if (this.presentationDesignerViewStateModelService.canTogglePresentationItemSelection(item)) {
      selection = this.presentationItemsRangeSelectionProvider.getRangeSelectionByLastSelectedItem(item);
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION, selection);
    }
  },
  toggleItemSelection: function toggleItemSelection(item) {
    var selection,
        canToggleItemSelection = this.presentationDesignerViewStateModelService.canTogglePresentationItemSelection(item);

    if (this.presentationDesignerViewStateModelService.isPresentationItemsSelectionEmpty()) {
      this.selectItem(item);
    } else if (canToggleItemSelection) {
      selection = this.presentationDesignerViewStateModelService.getNewPresentationItemsSelection(item, {
        toggle: true,
        parentId: item.parentId
      });
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION, selection);
    }
  },
  selectItem: function selectItem(item) {
    var selection,
        canSelectItem = this.presentationDesignerViewStateModelService.canSelectPresentationItem(item);

    if (canSelectItem) {
      _.extend(item, {
        rangeSelectionStartItem: true
      });

      selection = this.presentationDesignerViewStateModelService.getNewPresentationItemsSelection(item, {
        parentId: item.parentId
      });
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION, selection);
    }
  }
});

module.exports = PresentationDesignerItemsSelectionController;

});