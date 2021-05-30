define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerActionsController = function JoinsDesignerActionsController(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerActionsController.prototype, {
  initialize: function initialize(options) {
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.joinsDesignerSidebarSingleSelectStrategy = options.joinsDesignerSidebarSingleSelectStrategy;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'sidebarContextMenu:show', this._onContextMenuShow);
  },
  _onContextMenuShow: function _onContextMenuShow(item) {
    this.joinsDesignerSidebarSingleSelectStrategy.execute(item);
  }
}, Backbone.Events);

module.exports = JoinsDesignerActionsController;

});