define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarDragController = function PresentationDesignerSidebarDragController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarDragController.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationSidebarOnDragStartSelectionFactory = options.presentationSidebarOnDragStartSelectionFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'sidebar:dragStart', this.onDragStart);
  },
  onDragStart: function onDragStart(item, options) {
    this._setSelectionOnDragStart(options);
  },
  _setSelectionOnDragStart: function _setSelectionOnDragStart(options) {
    var selection = this.presentationSidebarOnDragStartSelectionFactory.getSelection(options);

    if (selection) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION, {
        selection: selection
      });
    }
  }
}, Backbone.Events);

module.exports = PresentationDesignerSidebarDragController;

});