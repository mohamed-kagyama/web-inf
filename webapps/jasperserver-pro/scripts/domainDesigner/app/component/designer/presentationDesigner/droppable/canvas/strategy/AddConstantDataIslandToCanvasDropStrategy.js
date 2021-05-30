define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var constantDataIslandLabelEnum = require("../../../enum/constantDataIslandLabelEnum");

var addPresentationItemsToCanvasEventEnum = require("../enum/addPresentationItemsToCanvasEventEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddConstantDataIslandToCanvasDropStrategy = function AddConstantDataIslandToCanvasDropStrategy(options) {
  this.initialize(options);
};

_.extend(AddConstantDataIslandToCanvasDropStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter = options.presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  execute: function execute(options) {
    var items = options.items,
        position = options.position;
    var nestingLevel = this.presentationCanvasDroppableItemsService.getItemsNestingLevel(items),
        constantGroupId = this.presentationCanvasDroppableItemsService.getItemsConstantGroupId(items),
        resourceIdsInItemsPaths = this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(items);
    var dataIslandsDTO = this.presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter.convert({
      nestingLevel: nestingLevel,
      constantGroupId: constantGroupId,
      resourceIdsInItemsPaths: resourceIdsInItemsPaths,
      constantDataIslandLabel: constantDataIslandLabelEnum.CONSTANT_DATA_ISLAND_LABEL,
      constantDataIslandName: this.clientDomainSchemaService.generateConstantDataIslandName()
    });
    this.applicationDispatcherEventBus.trigger(addPresentationItemsToCanvasEventEnum.ADD_CONSTANT_DATA_ISLAND, {
      selection: {
        positionOffset: 0,
        itemsQuantity: items.length
      },
      dataIsland: dataIslandsDTO[0],
      position: position
    });
  }
});

module.exports = AddConstantDataIslandToCanvasDropStrategy;

});