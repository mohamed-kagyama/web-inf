define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerInitialDropZoneController = function PresentationDesignerInitialDropZoneController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerInitialDropZoneController.prototype, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.dropAcceptedByDropZoneResourcesSpecification = options.dropAcceptedByDropZoneResourcesSpecification;
    this.presentationDesignerDropStrategyFactory = options.presentationDesignerDropStrategyFactory;
    this.presentationSidebarDraggableItemsFactory = options.presentationSidebarDraggableItemsFactory;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStoreChangeEventBus);
    this.listenTo(this.presentationDesignerEventBus, 'emptyDataIslandsDropZone:drop', this._onDrop);
    this.listenTo(this.presentationDesignerEventBus, 'emptyDataIslandsDropZone:over', this._onDropZoneOver);
    this.listenTo(this.presentationDesignerEventBus, 'emptyDataIslandsDropZone:out', this._onDropZoneOut);
  },
  _onStoreChangeEventBus: function _onStoreChangeEventBus() {
    var dropZone = this.store.get('emptyDataIslandsDropZone'),
        items = this.presentationDesignerViewStateModelService.getPresentationSidebarSelectedItems();
    items = this.presentationSidebarDraggableItemsFactory.create(items);
    dropZone.isActive = this.dropAcceptedByDropZoneResourcesSpecification.isSatisfiedBy(items, dropZone);
  },
  _onDrop: function _onDrop(items) {
    var strategy,
        dropZone = this.store.get('emptyDataIslandsDropZone');
    strategy = this.presentationDesignerDropStrategyFactory.create({
      items: items,
      dropZoneModel: dropZone
    });
    strategy && strategy.execute();
    dropZone.isOver = false;
  },
  _onDropZoneOver: function _onDropZoneOver() {
    var dropZone = this.store.get('emptyDataIslandsDropZone');
    dropZone.isOver = true;
  },
  _onDropZoneOut: function _onDropZoneOut() {
    var dropZone = this.store.get('emptyDataIslandsDropZone');
    dropZone.isOver = false;
  }
}, Backbone.Events);

module.exports = PresentationDesignerInitialDropZoneController;

});