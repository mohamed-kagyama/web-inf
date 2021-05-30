define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSidebarSingleSelectStrategy = function JoinsDesignerSidebarSingleSelectStrategy(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSidebarSingleSelectStrategy.prototype, {
  initialize: function initialize(options) {
    this.canSelectItem = options.canSelectItem;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  execute: function execute(item) {
    if (this.canSelectItem(item)) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SELECT_RESOURCE, {
        resource: item
      });
    }
  }
});

module.exports = JoinsDesignerSidebarSingleSelectStrategy;

});