define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTotalHeight(collection) {
  return _.reduce(collection, function (memo, item) {
    return memo + item.height;
  }, 0);
}

function getTopAndStartIndex(options) {
  var height = options.height,
      canvasHeight = options.canvasHeight,
      scrollPos = options.scrollPos,
      collection = options.collection;
  var top = 0,
      index = 0;

  if (height > canvasHeight) {
    if (scrollPos <= Math.ceil(height) - Math.floor(canvasHeight)) {
      while (true) {
        if (top + collection[index].height < scrollPos) {
          top += collection[index].height;
          index++;
        } else {
          break;
        }
      }
    } else {
      //Branch will be used when scrollPos === MAX_SCROLL
      index = collection.length - 1;
      var visibleItemsHeight = collection[index].height;

      while (visibleItemsHeight < canvasHeight && index > 0) {
        index--;
        visibleItemsHeight += collection[index].height;
      }

      top = height - visibleItemsHeight;
    }
  }

  return {
    index: index,
    top: top
  };
}

function getEndPosition(options) {
  var top = options.scrollPos,
      startPosition = options.startPosition,
      canvasHeight = options.canvasHeight,
      collection = options.collection;

  if (canvasHeight > 0) {
    var height = startPosition.top - top,
        index = startPosition.index;

    while (height < canvasHeight && index < collection.length) {
      height += collection[index].height;
      index++;
    }

    return Math.max(index, startPosition.index + 1);
  } else {
    return startPosition.index;
  }
}

module.exports = {
  getTotalHeight: getTotalHeight,
  getVisibleDataOptions: function getVisibleDataOptions(options) {
    var collection = options.collection,
        totalHeight = options.totalHeight || getTotalHeight(collection),
        startPosition = getTopAndStartIndex({
      height: totalHeight,
      collection: collection,
      canvasHeight: options.canvasHeight,
      scrollPos: options.scrollPos
    }),
        endPosition = getEndPosition({
      startPosition: startPosition,
      scrollPos: options.scrollPos,
      canvasHeight: options.canvasHeight,
      collection: collection
    });
    return {
      height: totalHeight,
      top: startPosition.top,
      startPosition: startPosition.index,
      endPosition: endPosition
    };
  }
};

});