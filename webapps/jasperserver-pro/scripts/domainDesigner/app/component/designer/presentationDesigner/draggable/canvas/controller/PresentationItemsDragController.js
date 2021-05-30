define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemsDragController = function PresentationItemsDragController(options) {
  this.initialize(options);
};

_.extend(PresentationItemsDragController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationItemsOnDragStartSelectionFactory = options.presentationItemsOnDragStartSelectionFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'canvas:dragStart', this._selectItemOnDragStartIfNeeded);
  },
  _selectItemOnDragStartIfNeeded: function _selectItemOnDragStartIfNeeded(options) {
    var selection = this.presentationItemsOnDragStartSelectionFactory.getSelection(options);

    if (selection) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION, selection);
    }
  }
});

module.exports = PresentationItemsDragController;

});