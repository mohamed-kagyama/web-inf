define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DropSidebarResourcesToAddPresentationItemsSpecification = function DropSidebarResourcesToAddPresentationItemsSpecification(options) {
  this.initialize(options);
};

_.extend(DropSidebarResourcesToAddPresentationItemsSpecification.prototype, {
  initialize: function initialize(options) {
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  isSatisfiedBy: function isSatisfiedBy(items, dropZoneActivator) {
    var model = dropZoneActivator,
        accepts = model.accepts;
    var isDropZoneAcceptsSetsAndFields = this.presentationCanvasDroppableItemsService.isDropZoneAcceptsSetsAndFields(accepts),
        areResourcesReferencedByDataIsland = this.presentationCanvasDroppableItemsService.areResourcesReferencedByDataIsland(items),
        isItemsFromTheSameSourceAsDropZoneDataIsland = this.presentationCanvasDroppableItemsService.isItemsFromTheSameSourceAsDropZoneDataIsland(items, model);
    return isDropZoneAcceptsSetsAndFields && areResourcesReferencedByDataIsland && isItemsFromTheSameSourceAsDropZoneDataIsland;
  }
});

module.exports = DropSidebarResourcesToAddPresentationItemsSpecification;

});