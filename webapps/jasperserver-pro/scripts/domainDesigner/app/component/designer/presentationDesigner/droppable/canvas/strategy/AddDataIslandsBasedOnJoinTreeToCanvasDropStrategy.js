define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var addPresentationItemsToCanvasEventEnum = require("../enum/addPresentationItemsToCanvasEventEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy = function AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy(options) {
  this.initialize(options);
};

_.extend(AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
    this.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter = options.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter;
    this.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter = options.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter;
  },
  execute: function execute(options) {
    var items = options.items,
        nestingLevel = this.presentationCanvasDroppableItemsService.getItemsNestingLevel(items),
        joinTreeIds = this.presentationCanvasDroppableItemsService.getItemsDataIslandSourceId(items),
        resourceIdsInItemsPaths = this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(items),
        isJoinTreesBeingDropped = this.presentationCanvasDroppableItemsService.isJoinTreesBeingDropped(items);
    var presentationItemsGroupedByJoinTree = this.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter.convert({
      nestingLevel: nestingLevel,
      joinTreeIds: joinTreeIds,
      resourceIdsInItemsPaths: resourceIdsInItemsPaths
    });
    var dataIslands = this.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter.convert(presentationItemsGroupedByJoinTree);

    var positionOffset = this._getPositionOffsetForSelection({
      position: options.position,
      isJoinTreesBeingDropped: isJoinTreesBeingDropped
    });

    this.applicationDispatcherEventBus.trigger(addPresentationItemsToCanvasEventEnum.ADD_DATA_ISLANDS, {
      selection: {
        selectChildren: !isJoinTreesBeingDropped,
        itemsQuantity: items.length,
        positionOffset: positionOffset
      },
      dataIslands: dataIslands,
      position: options.position
    });
  },
  _getPositionOffsetForSelection: function _getPositionOffsetForSelection(options) {
    if (options.isJoinTreesBeingDropped && options.position) {
      return options.position;
    }

    return 0;
  }
});

module.exports = AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy;

});