define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ApplicationDispatcherEventConfigInitializer = function ApplicationDispatcherEventConfigInitializer(options) {
  this.initialize(options);
};

_.extend(ApplicationDispatcherEventConfigInitializer.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    options = options || {};
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.applicationDispatcher = options.applicationDispatcher;
    this.applicationStateActionsEnum = options.applicationStateActionsEnum;
  },
  // API
  // enforces one of the application startup strategies
  initEvents: function initEvents() {
    var self = this;

    _.each(this.applicationStateActionsEnum, function (config, action) {
      var event = config.event;
      this.listenTo(this.applicationDispatcherEventBus, event, function () {
        var args = [action].concat(Array.prototype.slice.call(arguments, 0));
        self.applicationDispatcher.execute.apply(null, args);
      });
    }, this);
  },
  remove: function remove() {
    this.stopListening();
  }
});

module.exports = ApplicationDispatcherEventConfigInitializer;

});