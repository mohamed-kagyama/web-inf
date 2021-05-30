define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarActionsController = function PresentationDesignerSidebarActionsController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarActionsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerSidebarSingleSelectStrategy = options.presentationDesignerSidebarSingleSelectStrategy;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'sidebarContextMenu:show', this._onContextMenuShow);
  },
  _onContextMenuShow: function _onContextMenuShow(item) {
    this.presentationDesignerSidebarSingleSelectStrategy.execute(item);
  }
});

module.exports = PresentationDesignerSidebarActionsController;

});