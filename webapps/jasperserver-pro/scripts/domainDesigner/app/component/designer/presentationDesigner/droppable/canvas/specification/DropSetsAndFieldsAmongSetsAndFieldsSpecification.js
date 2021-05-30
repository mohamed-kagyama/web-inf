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
        parentId = model.parentId,
        accepts = model.accepts;
    var isDropZoneAcceptsSetsAndFields = this.presentationCanvasDroppableItemsService.isDropZoneAcceptsSetsAndFields(accepts),
        isItemsAreFromSameDataIslandAsDropZone = this.presentationCanvasDroppableItemsService.isItemsAreFromSameDataIslandAsDropZone(items, model),
        isParentBeingDroppedIntoChild = this.presentationCanvasDroppableItemsService.isParentBeingDroppedIntoChild(items, parentId);
    return isDropZoneAcceptsSetsAndFields && isItemsAreFromSameDataIslandAsDropZone && !isParentBeingDroppedIntoChild;
  }
});

module.exports = DropDataIslandsAmongDataIslandsSpecification;

});