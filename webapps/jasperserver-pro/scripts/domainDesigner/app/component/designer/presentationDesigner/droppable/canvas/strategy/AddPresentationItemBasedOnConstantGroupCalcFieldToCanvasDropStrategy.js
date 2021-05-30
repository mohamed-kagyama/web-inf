define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var constantDataIslandLabelEnum = require("../../../enum/constantDataIslandLabelEnum");

var addPresentationItemsToCanvasEventEnum = require("../enum/addPresentationItemsToCanvasEventEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy = function AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy(options) {
  this.initialize(options);
};

_.extend(AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
    this.presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter = options.presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter;
  },
  execute: function execute(options) {
    var items = options.items,
        position = options.position,
        parentId = options.parentId;
    var nestingLevel = this.presentationCanvasDroppableItemsService.getItemsNestingLevel(items),
        constantGroupId = this.presentationCanvasDroppableItemsService.getItemsConstantGroupId(items),
        resourceIdsInItemsPaths = this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(items);
    var presentationItems = this.presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter.convert({
      parentId: parentId,
      nestingLevel: nestingLevel,
      constantGroupId: constantGroupId,
      resourceIdsInItemsPaths: resourceIdsInItemsPaths,
      constantDataIslandName: this.clientDomainSchemaService.generateConstantDataIslandName(),
      constantDataIslandLabel: constantDataIslandLabelEnum.CONSTANT_DATA_ISLAND_LABEL
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

module.exports = AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy;

});