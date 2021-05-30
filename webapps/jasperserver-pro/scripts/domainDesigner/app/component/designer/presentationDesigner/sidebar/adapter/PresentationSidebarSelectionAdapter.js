define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarSelectionAdapter = function PresentationSidebarSelectionAdapter(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarSelectionAdapter.prototype, {
  initialize: function initialize(options) {
    this.rangeSelectionProvider = options.rangeSelectionProvider;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  isSelectionEmpty: function isSelectionEmpty() {
    return this.presentationDesignerViewStateModelService.isPresentationSidebarSelectionEmpty();
  },
  getSelection: function getSelection() {
    return this.presentationDesignerViewStateModelService.getPresentationSidebarSelectedItems();
  },
  getSelectionSize: function getSelectionSize() {
    return this.presentationDesignerViewStateModelService.getPresentationSidebarSelectionSize();
  },
  isSingleSelectionShouldBePerformedOnDrag: function isSingleSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationSidebarSingleSelectShouldBePerformedOnDrag(item);
  },
  isMultiSelectionShouldBePerformedOnDrag: function isMultiSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationSidebarMultiSelectShouldBePerformedOnDrag(item);
  },
  isRangeSelectionShouldBePerformedOnDrag: function isRangeSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationSidebarMultiSelectShouldBePerformedOnDrag(item);
  },
  getNewSelection: function getNewSelection(item, options) {
    var parentId = item.parentId;
    options = _.extend({
      parentId: parentId
    }, options);
    return this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(item, options);
  },
  getRangeSelectionStartItem: function getRangeSelectionStartItem() {
    return this.presentationDesignerViewStateModelService.getPresentationSidebarRangeSelectionStartItem();
  },
  getRangeSelectionItemsByLastSelectedItem: function getRangeSelectionItemsByLastSelectedItem(item) {
    var selection = this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(item);
    return _.values(selection.items);
  }
});

module.exports = PresentationSidebarSelectionAdapter;

});