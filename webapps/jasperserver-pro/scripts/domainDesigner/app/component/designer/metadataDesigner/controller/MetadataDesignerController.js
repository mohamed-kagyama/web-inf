define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataDesignerController = function MetadataDesignerController(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.metadataDesignerEventBus = options.metadataDesignerEventBus;
    this.metadataDesignerVueStore = options.metadataDesignerVueStore;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.metadataDesignerEventBus, 'errorPopover:close', this._onErrorPopoverClose);
  },
  _onErrorPopoverClose: function _onErrorPopoverClose() {
    this.metadataDesignerVueStore.set({
      'popoverText': '',
      'isSourceTreeInvalid': false
    });
  },
  'metadataDesigner:setAddResourcesError': function metadataDesignerSetAddResourcesError() {
    this._showAddResourcesError();
  },
  'add:dataSourceGroups': function addDataSourceGroups() {
    this._showAddResourcesError();
  },
  'add:tablesWithTableReferences': function addTablesWithTableReferences() {
    this._showAddResourcesError();
  },
  _showAddResourcesError: function _showAddResourcesError() {
    var error = this.metadataDesignerViewStateModelService.getAddResourcesError();

    if (error.highlightInvalidResources) {
      this.metadataDesignerVueStore.set({
        'popoverText': error.popoverMessage,
        'isSourceTreeInvalid': true
      });
    }
  }
});

module.exports = MetadataDesignerController;

});