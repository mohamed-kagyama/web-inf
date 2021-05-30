define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var addPresentationItemsToCanvasEventEnum = require("../enum/addPresentationItemsToCanvasEventEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy = function AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy(options) {
  this.initialize(options);
};

_.extend(AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
    this.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter = options.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter;
    this.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter = options.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter;
  },
  execute: function execute(options) {
    var items = options.items,
        position = options.position,
        parentId = options.parentId;
    var nestingLevel = this.presentationCanvasDroppableItemsService.getItemsNestingLevel(items),
        resourceIdsInItemsPaths = this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(items);
    var presentationItemsGroupedByJoinTree = this.presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter.convert({
      nestingLevel: nestingLevel,
      resourceIdsInItemsPaths: resourceIdsInItemsPaths
    });
    var presentationItems = this.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter.convert({
      parentId: parentId,
      presentationItemsGroupedByEntity: presentationItemsGroupedByJoinTree
    });
    this.applicationDispatcherEventBus.trigger(addPresentationItemsToCanvasEventEnum.ADD_PRESENTATION_ITEMS, {
      selection: {
        parentId: parentId,
        positionOffset: position,
        itemsQuantity: items.length
      },
      presentationItems: presentationItems,
      position: position
    });
  }
});

module.exports = AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy;

});