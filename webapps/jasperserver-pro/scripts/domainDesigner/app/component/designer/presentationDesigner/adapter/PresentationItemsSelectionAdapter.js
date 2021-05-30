define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemsSelectionAdapter = function PresentationItemsSelectionAdapter(options) {
  this.initialize(options);
};

_.extend(PresentationItemsSelectionAdapter.prototype, {
  initialize: function initialize(options) {
    this.rangeSelectionProvider = options.rangeSelectionProvider;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  isSelectionEmpty: function isSelectionEmpty() {
    return this.presentationDesignerViewStateModelService.isPresentationItemsSelectionEmpty();
  },
  getSelection: function getSelection() {
    return this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems();
  },
  getSelectionSize: function getSelectionSize() {
    return this.presentationDesignerViewStateModelService.getPresentationItemsSelectionSize();
  },
  isSingleSelectionShouldBePerformedOnDrag: function isSingleSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationItemSingleSelectShouldBePerformedOnDrag(item);
  },
  isMultiSelectionShouldBePerformedOnDrag: function isMultiSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationItemMultiSelectShouldBePerformedOnDrag(item);
  },
  isRangeSelectionShouldBePerformedOnDrag: function isRangeSelectionShouldBePerformedOnDrag(item) {
    return this.presentationDesignerViewStateModelService.isPresentationItemMultiSelectShouldBePerformedOnDrag(item);
  },
  getNewSelection: function getNewSelection(item, options) {
    var parentId = item.parentId;
    options = _.extend({
      parentId: parentId
    }, options);
    return this.presentationDesignerViewStateModelService.getNewPresentationItemsSelection(item, options);
  },
  getRangeSelectionStartItem: function getRangeSelectionStartItem() {
    return this.presentationDesignerViewStateModelService.getPresentationItemsRangeSelectionStartItem();
  },
  getRangeSelectionItemsByLastSelectedItem: function getRangeSelectionItemsByLastSelectedItem(item) {
    var selection = this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(item);
    return _.values(selection.items);
  }
});

module.exports = PresentationItemsSelectionAdapter;

});