define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetDomainDesignerStateState = function SetDomainDesignerStateState(options) {
  this.initialize(options);
};

_.extend(SetDomainDesignerStateState.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  enter: function enter(context) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.SET_STATE, context.domainDesignerState);
  }
});

module.exports = SetDomainDesignerStateState;

});