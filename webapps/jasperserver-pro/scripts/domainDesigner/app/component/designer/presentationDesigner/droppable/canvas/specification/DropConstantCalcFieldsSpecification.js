define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DropConstantCalcFieldsSpecification = function DropConstantCalcFieldsSpecification(options) {
  this.initialize(options);
};

_.extend(DropConstantCalcFieldsSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  isSatisfiedBy: function isSatisfiedBy(items, dropZoneActivator) {
    var dataIslandId = dropZoneActivator.dataIslandId,
        accepts = dropZoneActivator.accepts;
    var isConstantDataIslandAlreadyExists = this.clientDomainSchemaService.isConstantDataIslandAlreadyExists(),
        isDropZoneAcceptsDataIslands = this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(accepts),
        isItemsHaveTheSameSourceAsDataIsland = Boolean(dataIslandId && this.presentationCanvasDroppableItemsService.isItemsHaveTheSameSourceAsDataIsland(items, dataIslandId)),
        isItemsHaveTheSameSource = this.presentationCanvasDroppableItemsService.isItemsHaveTheSameSource(items),
        isConstantDataIsland = Boolean(dataIslandId && this.clientDomainSchemaService.isConstantDataIsland(dataIslandId));

    if (isDropZoneAcceptsDataIslands) {
      return !isConstantDataIslandAlreadyExists && isItemsHaveTheSameSource;
    }

    return isItemsHaveTheSameSourceAsDataIsland || !isConstantDataIsland;
  }
});

module.exports = DropConstantCalcFieldsSpecification;

});