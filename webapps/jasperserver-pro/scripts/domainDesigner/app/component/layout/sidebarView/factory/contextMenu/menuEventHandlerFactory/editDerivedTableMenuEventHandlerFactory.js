define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
    var eventHandler = {};

    eventHandler[menuOptionsEventsEnum.EDIT_DERIVED_TABLE.eventWithPrefix] = function (item, event, view, model) {
      var resource = item.resource;
      applicationCrossComponentEventBus.trigger(model.get('triggerEvent'), resource.derivedTableId);
    };

    return eventHandler;
  }
};

});