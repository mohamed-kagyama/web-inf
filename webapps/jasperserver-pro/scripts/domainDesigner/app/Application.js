define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./component/validation/state/enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var Application = function Application(options) {
  this.initialize(options);
};

_.extend(Application.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.applicationDispatcherEventConfigInitializer = options.applicationDispatcherEventConfigInitializer;
    this.applicationVueStore = options.applicationVueStore;
    this.validationStateFactory = options.validationStateFactory;
    this.applicationDispatcherEventConfigInitializer.initEvents();
    this.applicationVueStore.set('isVisible', true);
    this.initialStartupOptions = options.initialStartupOptions;
  },
  startup: function startup() {
    this.validationStateFactory.enter(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE, this.initialStartupOptions);
  }
});

module.exports = Application;

});