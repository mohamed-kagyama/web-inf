define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DropItemsIntoDropZoneSpecification = function DropItemsIntoDropZoneSpecification(options) {
  this.initialize(options);
};

_.extend(DropItemsIntoDropZoneSpecification.prototype, {
  initialize: function initialize(options) {
    this.dropAcceptedByDropZoneResourcesSpecification = options.dropAcceptedByDropZoneResourcesSpecification;
    this.dropConstantCalcFieldsSpecification = options.dropConstantCalcFieldsSpecification;
    this.dropDataIslandsAmongDataIslandsSpecification = options.dropDataIslandsAmongDataIslandsSpecification;
    this.dropSetsAndFieldsAmongSetsAndFieldsSpecification = options.dropSetsAndFieldsAmongSetsAndFieldsSpecification;
    this.dropSidebarResourcesToCreateNewDataIslandsSpecification = options.dropSidebarResourcesToCreateNewDataIslandsSpecification;
    this.dropSidebarResourcesToAddPresentationItemsSpecification = options.dropSidebarResourcesToAddPresentationItemsSpecification;
    this.presentationCanvasDroppableItemsService = options.presentationCanvasDroppableItemsService;
  },
  isSatisfiedBy: function isSatisfiedBy(items, dropZoneActivator) {
    if (!this.dropAcceptedByDropZoneResourcesSpecification.isSatisfiedBy(items, dropZoneActivator)) {
      return false;
    } else if (this.presentationCanvasDroppableItemsService.isConstantGroupCalcFieldsAreDropped(items)) {
      return this.dropConstantCalcFieldsSpecification.isSatisfiedBy(items, dropZoneActivator);
    } else {
      return this.dropSidebarResourcesToCreateNewDataIslandsSpecification.isSatisfiedBy(items, dropZoneActivator) || this.dropSidebarResourcesToAddPresentationItemsSpecification.isSatisfiedBy(items, dropZoneActivator) || this.dropDataIslandsAmongDataIslandsSpecification.isSatisfiedBy(items, dropZoneActivator) || this.dropSetsAndFieldsAmongSetsAndFieldsSpecification.isSatisfiedBy(items, dropZoneActivator);
    }
  }
});

module.exports = DropItemsIntoDropZoneSpecification;

});