define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDropItemsController = function PresentationCanvasDropItemsController(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDropItemsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerDropStrategyFactory = options.presentationDesignerDropStrategyFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'dropZone:drop', this._executeDropStrategy);
    this.listenTo(this.presentationDesignerEventBus, 'sidebar:dragStop', this._hideDropZones);
    this.listenTo(this.presentationDesignerEventBus, 'canvas:dragStop', this._hideDropZones);
  },
  _executeDropStrategy: function _executeDropStrategy(items, dropZone) {
    var dropStrategy;
    dropStrategy = this.presentationDesignerDropStrategyFactory.create({
      dropZoneModel: dropZone,
      items: this._sortItemsByIndex(items)
    });
    dropStrategy.execute();
  },
  _hideDropZones: function _hideDropZones() {
    this.store.get('models').forEach(function (model) {
      if (model.isDropZone) {
        model.isVisible = false;
      }
    });
  },
  _sortItemsByIndex: function _sortItemsByIndex(items) {
    return _.sortBy(items, function (item) {
      return item.index;
    });
  }
});

module.exports = PresentationCanvasDropItemsController;

});