define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var virtualDataUtil = require("../../../common/util/virtualDataUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function DependenciesGroupsToVirtualDataOptionsConverter(options) {
  _.bindAll(this, 'convert');

  this.dependenciesTreeStateModel = options.dependenciesTreeStateModel;
}

_.extend(DependenciesGroupsToVirtualDataOptionsConverter.prototype, {
  convert: function convert(options) {
    var allItems = options.allItems;
    var collapsedItems = this.dependenciesTreeStateModel.get('collapsedItems');
    var shouldToggleItems = !_.isEmpty(collapsedItems);

    if (shouldToggleItems) {
      allItems = this._toggleItems(allItems, collapsedItems);
    }

    var visualDataOptions = virtualDataUtil.getVisibleDataOptions({
      collection: allItems,
      scrollPos: options.scrollPos,
      canvasHeight: options.canvasHeight
    });
    var visibleCollection = allItems.slice(visualDataOptions.startPosition, visualDataOptions.endPosition);
    return {
      collection: visibleCollection,
      startPosition: visualDataOptions.startPosition,
      endPosition: visualDataOptions.endPosition,
      height: visualDataOptions.height,
      top: visualDataOptions.top
    };
  },
  _toggleItems: function _toggleItems(allItems, collapsedItems) {
    var result = _.reduce(allItems, this._toggleItem, {
      collapsedItems: _.extend({}, collapsedItems),
      allItems: []
    });

    return result.allItems;
  },
  _toggleItem: function _toggleItem(memo, item, itemIndex, array) {
    itemIndex = Number(itemIndex);

    var isCollapsable = _.isBoolean(item.open);

    if (isCollapsable) {
      var isCollapsed = memo.collapsedItems[itemIndex];
      item.open = !isCollapsed;
      var nextIndex = itemIndex + 1;
      var nextTreeItem = array[nextIndex];
      memo.allItems.push(item);

      while (nextTreeItem && nextTreeItem.level > item.level) {
        if (!isCollapsed) {
          memo.allItems.push(nextTreeItem);
        }

        nextIndex = nextIndex + 1;
        nextTreeItem = array[nextIndex];
      }
    }

    return memo;
  }
});

module.exports = DependenciesGroupsToVirtualDataOptionsConverter;

});