define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var eventBusFactory = require("../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('applicationDispatcherEventBus', eventBusFactory.create());
  context.register('storeChangeEventBus', eventBusFactory.create());
  context.register('applicationCrossComponentEventBus', eventBusFactory.create());
};

});