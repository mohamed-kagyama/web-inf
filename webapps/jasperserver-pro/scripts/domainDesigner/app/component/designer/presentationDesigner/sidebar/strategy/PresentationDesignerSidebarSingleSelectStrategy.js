define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarSingleSelectStrategy = function PresentationDesignerSidebarSingleSelectStrategy(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarSingleSelectStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  execute: function execute(item) {
    item = _.extend({
      rangeSelectionStartItem: true
    }, item);

    var selection = this._getNewPresentationSidebarSelection(item),
        canSelectItem = this.presentationDesignerViewStateModelService.canSelectPresentationSidebarItem(item);

    if (canSelectItem) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION, {
        selection: selection
      });
    }
  },
  _getNewPresentationSidebarSelection: function _getNewPresentationSidebarSelection(item) {
    return this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(item, {
      parentId: item.parentId
    });
  }
});

module.exports = PresentationDesignerSidebarSingleSelectStrategy;

});