define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerDeleteDataIslandsBySelectionStrategy = function PresentationDesignerDeleteDataIslandsBySelectionStrategy(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerDeleteDataIslandsBySelectionStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  execute: function execute() {
    var dataIslands = this._getDataIslandsToRemoveBySelection();

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS, dataIslands);
  },
  _getDataIslandsToRemoveBySelection: function _getDataIslandsToRemoveBySelection() {
    var selection = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems();
    return _.map(selection, function (item) {
      return item.id;
    });
  }
});

module.exports = PresentationDesignerDeleteDataIslandsBySelectionStrategy;

});