define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReorderJoinTreeStrategy = function ReorderJoinTreeStrategy(options) {
  this.initialize(options);
};

_.extend(ReorderJoinTreeStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  execute: function execute(item, index) {
    var joinTreeId = item.resource.id;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REORDER_JOIN_TREE, joinTreeId, index);
  }
});

module.exports = ReorderJoinTreeStrategy;

});