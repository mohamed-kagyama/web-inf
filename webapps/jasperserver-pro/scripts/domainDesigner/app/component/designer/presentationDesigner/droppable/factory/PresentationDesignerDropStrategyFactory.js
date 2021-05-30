define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draggableOriginEnum = require("../../draggable/enum/draggableOriginEnum");

var dropZonePositionEnum = require("../../enum/dropZonePositionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerDropStrategyFactory = function PresentationDesignerDropStrategyFactory(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerDropStrategyFactory.prototype, {
  initialize: function initialize(options) {
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
    this.presentationSidebarToCanvasDropStrategyFactory = options.presentationSidebarToCanvasDropStrategyFactory;
    this.presentationCanvasDropStrategyFactory = options.presentationCanvasDropStrategyFactory;
  },
  create: function create(options) {
    var items = options.items,
        dropZoneModel = options.dropZoneModel,
        draggableOrigin = this._getDraggableOrigin(items),
        strategyOptions;

    var genericOptions = this._getStrategyGenericOptions(options);

    if (draggableOriginEnum.SIDEBAR === draggableOrigin) {
      strategyOptions = this._getOptionsForSidebarDropStrategy(genericOptions, dropZoneModel);
      return this.presentationSidebarToCanvasDropStrategyFactory.create(strategyOptions);
    } else if (draggableOriginEnum.CANVAS === draggableOrigin) {
      strategyOptions = this._getOptionsForCanvasDropStrategy(genericOptions, dropZoneModel);
      return this.presentationCanvasDropStrategyFactory.create(strategyOptions);
    } else {
      throw new Error('Draggable origin not supported: ' + draggableOrigin);
    }
  },
  _getOptionsForSidebarDropStrategy: function _getOptionsForSidebarDropStrategy(options, dropZoneModel) {
    var items = options.items,
        accepts = dropZoneModel.accepts;
    return _.extend({}, options, {
      areResourcesReferencedByDataIsland: this.presentationCanvasDroppableItemsService.areResourcesReferencedByDataIsland(items),
      areResourcesLocatedUnderAJoinTree: this.presentationCanvasDroppableItemsService.areResourcesLocatedUnderAJoinTree(items),
      isConstantGroupCalcFieldsAreDropped: this.presentationCanvasDroppableItemsService.isConstantGroupCalcFieldsAreDropped(items),
      isAcceptsSetsOrFields: this.presentationCanvasDroppableItemsService.isDropZoneAcceptsSetsAndFields(accepts)
    });
  },
  _getOptionsForCanvasDropStrategy: function _getOptionsForCanvasDropStrategy(options, dropZoneModel) {
    var items = options.items,
        accepts = dropZoneModel.accepts;
    return _.extend({}, options, {
      isDataIslandsBeingDropped: this.presentationCanvasDroppableItemsService.isDataIslandsBeingDropped(items),
      isAcceptsDataIslands: this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(accepts),
      isAcceptsSetsOrFields: this.presentationCanvasDroppableItemsService.isDropZoneAcceptsSetsAndFields(accepts)
    });
  },
  _getStrategyGenericOptions: function _getStrategyGenericOptions(options) {
    var dropZoneModel = options.dropZoneModel;
    return {
      items: options.items,
      isMiddleDropZone: dropZoneModel.which === dropZonePositionEnum.MIDDLE,
      targetId: dropZoneModel.ownerId,
      targetParentId: dropZoneModel.parentId,
      position: dropZoneModel.index
    };
  },
  _getDraggableOrigin: function _getDraggableOrigin(items) {
    return _.first(items).origin;
  }
});

module.exports = PresentationDesignerDropStrategyFactory;

});