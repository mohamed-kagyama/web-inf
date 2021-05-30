define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDropStrategyFactory = function PresentationCanvasDropStrategyFactory(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDropStrategyFactory.prototype, {
  initialize: function initialize(options) {
    this.presentationCanvasDropDataIslandsStrategy = options.presentationCanvasDropDataIslandsStrategy;
    this.presentationCanvasDropPresentationItemsStrategy = options.presentationCanvasDropPresentationItemsStrategy;
  },
  create: function create(options) {
    var itemIds = getItemIds(options.items);

    if (options.isAcceptsDataIslands) {
      if (options.isDataIslandsBeingDropped) {
        return getDropStrategy(this.presentationCanvasDropDataIslandsStrategy, {
          dataIslandsIds: itemIds,
          position: options.position
        });
      }
    } else if (options.isAcceptsSetsOrFields) {
      if (options.isMiddleDropZone) {
        return getDropStrategy(this.presentationCanvasDropPresentationItemsStrategy, {
          presentationItemIds: itemIds,
          targetParentId: options.targetId
        });
      } else {
        return getDropStrategy(this.presentationCanvasDropPresentationItemsStrategy, {
          targetParentId: options.targetParentId,
          position: options.position,
          presentationItemIds: itemIds
        });
      }
    }
  }
});

function getDropStrategy(strategy, options) {
  return {
    execute: _.partial(strategy.execute, options)
  };
}

function getItemIds(items) {
  return _.map(items, function (item) {
    return item.id;
  });
}

module.exports = PresentationCanvasDropStrategyFactory;

});