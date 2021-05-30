define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDropPresentationItemsStrategy = function PresentationCanvasDropPresentationItemsStrategy(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDropPresentationItemsStrategy.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'execute');

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  execute: function execute(options) {
    var eventOptions = this._getEventOptions(options);

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS, eventOptions);
  },
  _getEventOptions: function _getEventOptions(options) {
    var eventOptions = {
      targetParentId: options.targetParentId,
      presentationItemIds: options.presentationItemIds
    };

    if (!_.isUndefined(options.position)) {
      eventOptions.position = options.position;
    }

    return eventOptions;
  }
});

module.exports = PresentationCanvasDropPresentationItemsStrategy;

});