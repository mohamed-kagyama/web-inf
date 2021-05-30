define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerDeletePresentationItemsBySelectionStrategy = function PresentationDesignerDeletePresentationItemsBySelectionStrategy(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerDeletePresentationItemsBySelectionStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  execute: function execute() {
    var presentationItems = this._getPresentationItemsToDeleteBySelection(),
        parentId = this._getSelectionParentId();

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS, {
      presentationItems: presentationItems,
      parentId: parentId
    });
  },
  _getSelectionParentId: function _getSelectionParentId() {
    return this.presentationDesignerViewStateModelService.getPresentationCanvasSelectionParentId();
  },
  _getPresentationItemsToDeleteBySelection: function _getPresentationItemsToDeleteBySelection() {
    var selection = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems();
    return _.map(selection, function (item) {
      return {
        id: item.id,
        type: item.type
      };
    });
  }
});

module.exports = PresentationDesignerDeletePresentationItemsBySelectionStrategy;

});