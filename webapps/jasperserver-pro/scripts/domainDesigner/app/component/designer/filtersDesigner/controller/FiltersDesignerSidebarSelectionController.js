define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerSidebarSelectionController = function FiltersDesignerSidebarSelectionController(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerSidebarSelectionController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.filtersDesignerEventBus, 'sidebar:selectItem', this.selectItem);
    this.listenTo(this.filtersDesignerEventBus, 'sidebarContextMenu:show', this.selectItem);
  },
  selectItem: function selectItem(item) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SELECT_RESOURCE, {
      resource: item
    });
  }
});

module.exports = FiltersDesignerSidebarSelectionController;

});