define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var dropZonesAcceptTypesEnum = require("../enum/dropZonesAcceptTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerLastRowDropZonePropertiesFactory = function PresentationDesignerLastRowDropZonePropertiesFactory(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerLastRowDropZonePropertiesFactory.prototype, {
  initialize: function initialize(options) {
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  create: function create(options) {
    var items = options.items,
        lastRow = options.lastRow;
    var dropZone = {};
    var dataIslandDropZone = {
      index: lastRow.lastDataIslandIndex,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_AND_DATA_ISLANDS
    };
    var presentationItemIndex = lastRow.isOwnerDataIsland ? 0 : lastRow.lastItemIndex;
    var presentationItemDropZone = {
      index: presentationItemIndex,
      ownerId: lastRow.ownerId,
      parentId: lastRow.parentId,
      dataIslandId: lastRow.dataIslandId,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS
    };

    if (this.presentationCanvasDroppableItemsService.isItemsBeingDroppedFromCanvas(items)) {
      if (this.presentationCanvasDroppableItemsService.isDataIslandsBeingDropped(items)) {
        dropZone = dataIslandDropZone;
      } else {
        dropZone = presentationItemDropZone;
      }
    } else {
      var itemsReferencedByDataIsland = this.presentationCanvasDroppableItemsService.areResourcesReferencedByDataIsland(items),
          isConstantGroupCalcFieldsAreDropped = this.presentationCanvasDroppableItemsService.isConstantGroupCalcFieldsAreDropped(items);

      if ((lastRow.isOwnerExpanded || lastRow.isOwnerLeaf) && (itemsReferencedByDataIsland || isConstantGroupCalcFieldsAreDropped)) {
        dropZone = presentationItemDropZone;
      } else {
        dropZone = dataIslandDropZone;
      }
    }

    return dropZone;
  }
});

module.exports = PresentationDesignerLastRowDropZonePropertiesFactory;

});