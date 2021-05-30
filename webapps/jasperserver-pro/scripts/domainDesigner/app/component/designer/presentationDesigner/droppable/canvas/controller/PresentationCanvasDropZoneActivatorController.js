define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDropZoneActivatorController = function PresentationCanvasDropZoneActivatorController(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDropZoneActivatorController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'dropZoneActivator:over', this._onDraggableOverDropZoneActivator);
    this.listenTo(this.presentationDesignerEventBus, "lastRowDropZone:over", this._onLastRowDropZoneOver);
  },
  _onDraggableOverDropZoneActivator: function _onDraggableOverDropZoneActivator(activator) {
    this.store.get('models').forEach(function (model) {
      var sameOwner, samePosition;

      if (model.isDropZone) {
        sameOwner = model.ownerId === activator.ownerId;
        samePosition = model.which === activator.which;
        model.isVisible = sameOwner && samePosition;
      }
    });
  },
  _onLastRowDropZoneOver: function _onLastRowDropZoneOver() {
    this.store.get("models").forEach(function (model) {
      if (model.isDropZone) {
        model.isVisible = false;
      }
    });
  }
});

module.exports = PresentationCanvasDropZoneActivatorController;

});