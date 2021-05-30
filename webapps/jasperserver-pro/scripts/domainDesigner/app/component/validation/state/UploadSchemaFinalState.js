define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaFinalState = function UploadSchemaFinalState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaFinalState.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  enter: function enter(context, stateFactory) {
    var options = context.designerState;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_UPLOAD_SCHEMA, options);
  }
});

module.exports = UploadSchemaFinalState;

});