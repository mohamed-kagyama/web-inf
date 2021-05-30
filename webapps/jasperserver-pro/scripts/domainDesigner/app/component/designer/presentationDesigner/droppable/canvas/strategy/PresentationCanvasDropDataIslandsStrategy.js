define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDropDataIslandsStrategy = function PresentationCanvasDropDataIslandsStrategy(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDropDataIslandsStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  execute: function execute(options) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS, {
      dataIslandIds: options.dataIslandsIds,
      position: options.position
    });
  }
});

module.exports = PresentationCanvasDropDataIslandsStrategy;

});