define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var addPresentationItemsToCanvasEventEnum = require("../enum/addPresentationItemsToCanvasEventEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy = function AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy(options) {
  this.initialize(options);
};

_.extend(AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
    this.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter = options.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter;
    this.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter = options.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter;
  },
  execute: function execute(options) {
    var items = options.items,
        nestingLevel = this.presentationCanvasDroppableItemsService.getItemsNestingLevel(items),
        resourceIdsInItemsPaths = this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(items),
        isTableReferencesBeingDropped = this.presentationCanvasDroppableItemsService.isTableReferencesBeingDropped(items);
    var presentationItemsGroupedByTableReference = this.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter.convert({
      nestingLevel: nestingLevel,
      resourceIdsInItemsPaths: resourceIdsInItemsPaths
    });
    var dataIslands = this.presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter.convert(presentationItemsGroupedByTableReference);

    var positionOffset = this._getPositionOffsetForSelection({
      position: options.position,
      isTableReferencesBeingDropped: isTableReferencesBeingDropped
    });

    this.applicationDispatcherEventBus.trigger(addPresentationItemsToCanvasEventEnum.ADD_DATA_ISLANDS, {
      selection: {
        selectChildren: !isTableReferencesBeingDropped,
        itemsQuantity: items.length,
        positionOffset: positionOffset
      },
      dataIslands: dataIslands,
      position: options.position
    });
  },
  _getPositionOffsetForSelection: function _getPositionOffsetForSelection(options) {
    if (options.isTableReferencesBeingDropped && options.position) {
      return options.position;
    }

    return 0;
  }
});

module.exports = AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy;

});