define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerSidebarSelectionController = function MetadataDesignerSidebarSelectionController(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerSidebarSelectionController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.canSelectItem = options.canSelectItem;
    this.metadataDesignerEventBus = options.metadataDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.metadataDesignerEventBus, 'sidebar:selectItem', this.selectItem);
    this.listenTo(this.metadataDesignerEventBus, 'sidebarContextMenu:show', this.selectItem);
  },
  selectItem: function selectItem(item) {
    if (this.canSelectItem(item)) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.METADATA_DESIGNER_SELECT_RESOURCE, {
        resource: item
      });
    }
  }
});

module.exports = MetadataDesignerSidebarSelectionController;

});