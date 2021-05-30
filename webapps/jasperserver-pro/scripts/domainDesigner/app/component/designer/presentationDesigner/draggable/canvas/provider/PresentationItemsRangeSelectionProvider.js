define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemsRangeSelectionProvider = function PresentationItemsRangeSelectionProvider(options) {
  this.initialize(options);
};

_.extend(PresentationItemsRangeSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  getRangeSelectionByLastSelectedItem: function getRangeSelectionByLastSelectedItem(item) {
    var parentId = item.parentId,
        rangeSelectionStartItem = this.presentationDesignerViewStateModelService.getPresentationItemsRangeSelectionStartItem();

    if (!rangeSelectionStartItem) {
      throw new Error('Range selection start item is undefined');
    }

    var range = this._getSelectionRange(rangeSelectionStartItem, item);

    var presentationItems = this.clientDomainSchemaService.getPresentationItemsInRangeOnLevel({
      levelId: parentId,
      start: range.start,
      end: range.end
    });

    var items = this._getItemsForSelection({
      range: range,
      presentationItems: presentationItems,
      rangeSelectionStartItem: rangeSelectionStartItem
    });

    return this.presentationDesignerViewStateModelService.getNewPresentationItemsSelection(items, {
      parentId: parentId
    });
  },
  _getSelectionRange: function _getSelectionRange(startItem, endItem) {
    return {
      start: Math.min(startItem.index, endItem.index),
      end: Math.max(startItem.index, endItem.index)
    };
  },
  _getItemsForSelection: function _getItemsForSelection(options) {
    var range = options.range,
        presentationItems = options.presentationItems,
        rangeSelectionStartItem = options.rangeSelectionStartItem;
    return _.map(presentationItems, function (presentationItem, index) {
      var itemIndex = range.start + index;

      var item = _.extend({
        index: itemIndex
      }, _.pick(presentationItem, ['id', 'type', 'parentId', 'dataIslandId']));

      if (rangeSelectionStartItem.index === itemIndex) {
        item.rangeSelectionStartItem = true;
      }

      return item;
    });
  }
});

module.exports = PresentationItemsRangeSelectionProvider;

});