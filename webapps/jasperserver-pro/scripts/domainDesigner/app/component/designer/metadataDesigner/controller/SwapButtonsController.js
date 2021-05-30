define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var metadataDesignerUtil = require("../util/metadataDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SwapButtonsController = function SwapButtonsController(options) {
  this.initialize(options);
};

_.extend(SwapButtonsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.swapButtonsStore = options.swapButtonsStore;
    this.storeChangeEventBus = options.storeChangeEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStoreChange);
  },
  _onStoreChange: function _onStoreChange(state) {
    var currentResource = metadataDesignerUtil.getCurrentResource(state),
        currentResourceId = currentResource && currentResource.resourceId,
        selection = metadataDesignerUtil.getCurrentSelection(state);
    var sourceTreeSelection = selection.sourceTree[currentResourceId] || [],
        resultTreeSelection = selection.resultTree[currentResourceId] || [];
    this.swapButtonsStore.set({
      isMoveToResultButtonDisabled: sourceTreeSelection.length === 0,
      isMoveToSourceButtonDisabled: resultTreeSelection.length === 0
    });
  }
});

module.exports = SwapButtonsController;

});