define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var InputControlOptionModel = require('../model/InputControlOptionModel');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("InputControlOptionCollection");
module.exports = Backbone.Collection.extend({
  model: InputControlOptionModel,
  initialize: function initialize() {
    this.on('all', localLogger.debug, localLogger);
  }
});

});