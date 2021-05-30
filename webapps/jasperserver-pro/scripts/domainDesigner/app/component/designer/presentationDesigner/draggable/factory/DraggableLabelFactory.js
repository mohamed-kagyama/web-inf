define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var MULTIPLE_ITEMS_IS_DRAGGED_LABEL = 'domain.designer.draggable.items.selected';

var DraggableLabelFactory = function DraggableLabelFactory(options) {
  this.initialize(options);
};

_.extend(DraggableLabelFactory.prototype, {
  initialize: function initialize(options) {
    this.selectionService = options.selectionService;
  },
  getDraggableLabel: function getDraggableLabel(options) {
    var item = options.item,
        rangeSelectionStartItem,
        rangeSelectionItemsQuantity,
        label = '';
    var selectionSize = this.selectionService.getSelectionSize(),
        isSingleSelectShouldBePerformed = options.isSingleSelectShouldBePerformed,
        isMultipleSelectShouldBePerformed = options.isMultipleSelectShouldBePerformed,
        isRangeSelectShouldBePerformed = options.isRangeSelectionShouldBePerformed,
        oneOrNoneOfTheItemsSelected = selectionSize <= 1;

    if (isRangeSelectShouldBePerformed) {
      rangeSelectionStartItem = this.selectionService.getRangeSelectionStartItem();
      rangeSelectionItemsQuantity = Math.abs(item.index - rangeSelectionStartItem.index);
      label = i18nMessage(MULTIPLE_ITEMS_IS_DRAGGED_LABEL, rangeSelectionItemsQuantity + 1);
    } else if (isSingleSelectShouldBePerformed) {
      label = item.name;
    } else if (isMultipleSelectShouldBePerformed) {
      label = i18nMessage(MULTIPLE_ITEMS_IS_DRAGGED_LABEL, selectionSize + 1);
    } else {
      label = oneOrNoneOfTheItemsSelected ? item.name : i18nMessage(MULTIPLE_ITEMS_IS_DRAGGED_LABEL, selectionSize);
    }

    return label;
  }
});

module.exports = DraggableLabelFactory;

});