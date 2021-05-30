define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draggableOriginEnum = require("../../enum/draggableOriginEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarDraggableItemsFactory = function PresentationSidebarDraggableItemsFactory(options) {};

_.extend(PresentationSidebarDraggableItemsFactory.prototype, {
  create: function create(items) {
    items = _.isArray(items) ? items : [items];
    return this._getItems(items);
  },
  _getItems: function _getItems(items) {
    return _.map(items, function (item) {
      var resourceId = item.resourceId;
      item = _.omit(item, 'resourceId');
      return _.extend({}, item, {
        id: resourceId,
        path: item.id,
        origin: draggableOriginEnum.SIDEBAR
      });
    }, this);
  }
});

module.exports = PresentationSidebarDraggableItemsFactory;

});