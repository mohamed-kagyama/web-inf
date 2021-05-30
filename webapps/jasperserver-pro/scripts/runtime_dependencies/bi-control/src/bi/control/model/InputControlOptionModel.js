define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseModel = require("runtime_dependencies/js-sdk/src/common/model/BaseModel");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("InputControlOptionModel");
module.exports = BaseModel.extend({
  defaults: {
    selected: false,
    label: undefined,
    value: undefined
  },
  initialize: function initialize() {
    this.on('all', localLogger.debug, localLogger);
  }
});

});