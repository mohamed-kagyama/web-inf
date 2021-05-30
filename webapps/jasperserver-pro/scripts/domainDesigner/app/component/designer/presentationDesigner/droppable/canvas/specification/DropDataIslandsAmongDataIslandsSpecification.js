define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DropDataIslandsAmongDataIslandsSpecification = function DropDataIslandsAmongDataIslandsSpecification(options) {
  this.initialize(options);
};

_.extend(DropDataIslandsAmongDataIslandsSpecification.prototype, {
  initialize: function initialize(options) {
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  isSatisfiedBy: function isSatisfiedBy(items, dropZoneActivator) {
    var model = dropZoneActivator,
        accepts = model.accepts;
    var isDropZoneAcceptsDataIslands = this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(accepts),
        isMiddleDropZone = this.presentationCanvasDroppableItemsService.isMiddleDropZone(model),
        isItemsBeingDroppedFromCanvas = this.presentationCanvasDroppableItemsService.isItemsBeingDroppedFromCanvas(items);
    return isDropZoneAcceptsDataIslands && isItemsBeingDroppedFromCanvas && !isMiddleDropZone;
  }
});

module.exports = DropDataIslandsAmongDataIslandsSpecification;

});