define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draggableOriginEnum = require("../../enum/draggableOriginEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDraggableItemsFactory = function PresentationCanvasDraggableItemsFactory(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDraggableItemsFactory.prototype, {
  initialize: function initialize() {},
  create: function create(items) {
    items = _.isArray(items) ? items : [items];
    return this._getItems(items);
  },
  _getItems: function _getItems(items) {
    return _.map(items, function (item) {
      return _.extend({
        origin: draggableOriginEnum.CANVAS
      }, item);
    });
  }
});

module.exports = PresentationCanvasDraggableItemsFactory;

});