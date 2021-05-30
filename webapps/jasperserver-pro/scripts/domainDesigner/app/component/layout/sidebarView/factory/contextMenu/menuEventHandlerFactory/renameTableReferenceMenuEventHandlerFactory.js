define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var eventBus = options.eventBus;
    var eventHandler = {};

    eventHandler[menuOptionsEventsEnum.RENAME_TABLE_REFERENCE.eventWithPrefix] = function (item, event, view, model) {
      var resource = item.resource;
      eventBus.trigger(model.get('triggerEvent'), {
        id: resource.tableReferenceId || resource.resourceId,
        name: resource.name
      });
    };

    return eventHandler;
  }
};

});