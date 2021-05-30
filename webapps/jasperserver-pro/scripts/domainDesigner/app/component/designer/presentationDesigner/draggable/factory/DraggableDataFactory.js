define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DraggableDataFactory = function DraggableDataFactory(options) {
  this.initialize(options);
};

_.extend(DraggableDataFactory.prototype, {
  initialize: function initialize(options) {
    this.selectionService = options.selectionService;
    this.draggableItemsFactory = options.draggableItemsFactory;
  },
  getDraggableData: function getDraggableData(options) {
    var item = options.item,
        selection = this.selectionService.getSelection(),
        data = this.draggableItemsFactory.create(selection),
        rangeSelection;
    item = _.first(this.draggableItemsFactory.create(item));
    var isSingleSelectShouldBePerformed = options.isSingleSelectShouldBePerformed,
        isMultipleSelectShouldBePerformed = options.isMultipleSelectShouldBePerformed,
        isRangeSelectionShouldBePerformed = options.isRangeSelectionShouldBePerformed;

    if (isSingleSelectShouldBePerformed) {
      data = [];
      data.push(item);
    } else if (isMultipleSelectShouldBePerformed) {
      data.push(item);
    } else if (isRangeSelectionShouldBePerformed) {
      rangeSelection = this.selectionService.getRangeSelectionItemsByLastSelectedItem(options.item);
      data = this.draggableItemsFactory.create(rangeSelection);
    }

    return data;
  }
});

module.exports = DraggableDataFactory;

});