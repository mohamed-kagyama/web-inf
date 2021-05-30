define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var uriUtil = require("../../../../../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarItemsRangeSelectionProvider = function PresentationSidebarItemsRangeSelectionProvider(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarItemsRangeSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.sidebarTreeModel = options.sidebarTreeModel;
  },
  getRangeSelectionByLastSelectedItem: function getRangeSelectionByLastSelectedItem(item) {
    var rangeSelectionStartItem = this.presentationDesignerViewStateModelService.getPresentationSidebarRangeSelectionStartItem();

    if (!rangeSelectionStartItem) {
      throw new Error('Range selection start item is undefined');
    }

    var parentPath = uriUtil.getParentUri(String(item.id));
    var node = this.sidebarTreeModel.getNode(parentPath),
        children = parentPath === uriUtil.getSeparator() ? node : node.elements;

    var range = this._getSelectionRange(rangeSelectionStartItem, item);

    children = this._getChildrenInRange(children, range);

    var items = this._getSelectionItems({
      items: children,
      rangeSelectionStartItem: rangeSelectionStartItem
    });

    return this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(items, {
      parentId: item.parentId
    });
  },
  _getChildrenInRange: function _getChildrenInRange(children, range) {
    return _.reduce(children, function (memo, child, index) {
      if (index >= range.start && index <= range.end) {
        memo.push(child.resource);
      }

      return memo;
    }, []);
  },
  _getSelectionRange: function _getSelectionRange(startItem, endItem) {
    return {
      start: Math.min(startItem.index, endItem.index),
      end: Math.max(startItem.index, endItem.index)
    };
  },
  _getSelectionItems: function _getSelectionItems(options) {
    var items = options.items,
        rangeSelectionStartItem = options.rangeSelectionStartItem;
    return _.map(items, function (item) {
      item = _.clone(item);

      if (rangeSelectionStartItem.index === item.index) {
        item.rangeSelectionStartItem = true;
      }

      return item;
    }, this);
  }
});

module.exports = PresentationSidebarItemsRangeSelectionProvider;

});