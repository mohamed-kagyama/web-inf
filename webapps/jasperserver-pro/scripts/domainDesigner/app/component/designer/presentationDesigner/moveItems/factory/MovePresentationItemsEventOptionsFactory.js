define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var movePresentationItemsUtil = require("../util/movePresentationItemsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function MovePresentationItemsEventOptionsFactory(options) {
  this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  this.getMovePositionStrategyFactory = options.getMovePositionStrategyFactory;
}

_.extend(MovePresentationItemsEventOptionsFactory.prototype, {
  create: function create(action) {
    var parentId = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectionParentId(),
        selectedItems = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems();
    var amountOfEntities = this.presentationDesignerViewStateModelService.getItemsCountOnSelectedLevel(),
        positionsOfSelectedItems = movePresentationItemsUtil.getPositionsOfSelectedItems(selectedItems);
    var getMovePositionStrategy = this.getMovePositionStrategyFactory.getStrategy(action),
        position = getMovePositionStrategy.getPosition(amountOfEntities, positionsOfSelectedItems);
    var idsOfSelectedItems = movePresentationItemsUtil.getIdsOfSelectedItems(selectedItems);
    return this._getEventOptions(idsOfSelectedItems, position, parentId);
  },
  _isDataIsland: function _isDataIsland(parentId) {
    return !parentId;
  },
  _getEventOptions: function _getEventOptions(idsOfSelectedItems, position, parentId) {
    if (this._isDataIsland(parentId)) {
      return this._getDataIslandEventOptions(idsOfSelectedItems, position, parentId);
    } else {
      return this._getPresentationItemsEventOptions(idsOfSelectedItems, position, parentId);
    }
  },
  _getDataIslandEventOptions: function _getDataIslandEventOptions(idsOfSelectedItems, position, parentId) {
    return {
      dataIslandIds: idsOfSelectedItems,
      position: position
    };
  },
  _getPresentationItemsEventOptions: function _getPresentationItemsEventOptions(idsOfSelectedItems, position, parentId) {
    return {
      presentationItemIds: idsOfSelectedItems,
      position: position,
      targetParentId: parentId
    };
  }
});

module.exports = MovePresentationItemsEventOptionsFactory;

});