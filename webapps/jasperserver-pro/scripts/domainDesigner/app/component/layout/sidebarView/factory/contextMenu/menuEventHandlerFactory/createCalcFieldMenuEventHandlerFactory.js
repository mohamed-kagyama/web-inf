define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var calcFieldContextFactory = options.calcFieldContextFactory,
        applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    var eventHandler = {};

    eventHandler[menuOptionsEventsEnum.CREATE_CALC_FIELD.eventWithPrefix] = function (item, event, view, model) {
      var context = calcFieldContextFactory.create(item.resource);
      applicationDispatcherEventBus.trigger(model.get('triggerEvent'), context);
    };

    return eventHandler;
  }
};

});