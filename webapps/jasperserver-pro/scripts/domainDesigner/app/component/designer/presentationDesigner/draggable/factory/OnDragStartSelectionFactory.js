define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OnDragSelectionFactory = function OnDragSelectionFactory(options) {
  this.initialize(options);
};

_.extend(OnDragSelectionFactory.prototype, {
  initialize: function initialize(options) {
    this.selectionService = options.selectionService;
    this.rangeSelectionProvider = options.rangeSelectionProvider;
  },
  getSelection: function getSelection(options) {
    var selection,
        item = options.item;
    var isSingleSelectShouldBePerformed = options.isSingleSelectShouldBePerformed,
        isMultipleSelectShouldBePerformed = options.isMultipleSelectShouldBePerformed,
        isRangeSelectShouldBePerformed = options.isRangeSelectionShouldBePerformed;

    if (isSingleSelectShouldBePerformed) {
      _.extend(item, {
        rangeSelectionStartItem: true
      });

      selection = this.selectionService.getNewSelection(item);
    } else if (isMultipleSelectShouldBePerformed) {
      selection = this.selectionService.getNewSelection(item, {
        toggle: true
      });
    } else if (isRangeSelectShouldBePerformed) {
      selection = this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(item);
    }

    return selection;
  }
});

module.exports = OnDragSelectionFactory;

});