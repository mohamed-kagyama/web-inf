define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var selectionRulesUtil = require("../../../../../common/util/selectionRulesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OnDragStartOptionsFactory = function OnDragStartOptionsFactory(options) {
  this.initialize(options);
};

_.extend(OnDragStartOptionsFactory.prototype, {
  initialize: function initialize(options) {
    this.selectionService = options.selectionService;
  },
  getOptions: function getOptions(options) {
    var event = options.event,
        item = options.item;
    var isSelectionEmpty = this.selectionService.isSelectionEmpty(),
        isSingleSelectShouldBePerformed,
        isMultipleSelectShouldBePerformed,
        isRangeSelectionShouldBePerformed;
    var singleSelection = selectionRulesUtil.isSingleSelection(event),
        multipleSelection = selectionRulesUtil.isMultipleSelection(event),
        rangeSelection = selectionRulesUtil.isRangeSelection(event);

    if (!isSelectionEmpty) {
      isSingleSelectShouldBePerformed = singleSelection && this.selectionService.isSingleSelectionShouldBePerformedOnDrag(item);
      isMultipleSelectShouldBePerformed = multipleSelection && this.selectionService.isMultiSelectionShouldBePerformedOnDrag(item);
      isRangeSelectionShouldBePerformed = rangeSelection && this.selectionService.isRangeSelectionShouldBePerformedOnDrag(item);
    }

    options = {
      item: item
    };

    if (isSelectionEmpty) {
      isSingleSelectShouldBePerformed = true;
    }

    _.extend(options, {
      isSingleSelectShouldBePerformed: isSingleSelectShouldBePerformed,
      isMultipleSelectShouldBePerformed: isMultipleSelectShouldBePerformed,
      isRangeSelectionShouldBePerformed: isRangeSelectionShouldBePerformed
    });

    return options;
  }
});

module.exports = OnDragStartOptionsFactory;

});