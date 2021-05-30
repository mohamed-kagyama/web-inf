define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    var eventHandler = {};

    eventHandler[menuOptionsEventsEnum.REMOVE_CALC_FIELD.eventWithPrefix] = function (item, event, view, model) {
      applicationDispatcherEventBus.trigger(model.get('triggerEvent'), {
        id: item.resource.resourceId,
        sourceId: item.resource.calcFieldSourceId,
        sourceType: item.resource.calcFieldSourceType
      });
    };

    return eventHandler;
  }
};

});