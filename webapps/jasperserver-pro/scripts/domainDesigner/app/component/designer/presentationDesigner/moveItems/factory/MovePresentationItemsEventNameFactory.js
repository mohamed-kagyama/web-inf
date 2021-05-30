define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var actionToDataIslandsEventMap = require("../enum/actionToDataIslandsEventMap");

var actionToPresentationItemsEventMap = require("../enum/actionToPresentationItemsEventMap");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function MovePresentationItemsEventNameFactory(options) {
  this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
}

_.extend(MovePresentationItemsEventNameFactory.prototype, {
  create: function create(action) {
    var parentId = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectionParentId(),
        isDataIsland = this._isDataIsland(parentId);

    var map = isDataIsland ? actionToDataIslandsEventMap : actionToPresentationItemsEventMap;
    return map[action];
  },
  _isDataIsland: function _isDataIsland(parentId) {
    return !parentId;
  }
});

module.exports = MovePresentationItemsEventNameFactory;

});