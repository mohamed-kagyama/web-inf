define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsController = function JoinsController(options) {
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.joinsDesignerEventBus = options.joinsDesignerEventBus;

  this._initEvents();
};

_.extend(JoinsController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'toggle:join', this._onBeforeToggleJoin);
    this.listenTo(this.joinsDesignerEventBus, 'remove:join', this._onBeforeRemoveJoin);
    this.listenTo(this.joinsDesignerEventBus, 'update:join', this._onBeforeUpdateJoin);
  },
  // Before action event handlers
  _onBeforeToggleJoin: function _onBeforeToggleJoin(join) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN, {
      joinTreeId: join.joinTreeId,
      joinId: join.id,
      isExpanded: !join.isExpanded
    });
  },
  _onBeforeRemoveJoin: function _onBeforeRemoveJoin(join) {
    var joinId = join.id,
        joinTreeId = join.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN, {
      id: joinId,
      joinTreeId: joinTreeId
    });
  },
  _onBeforeUpdateJoin: function _onBeforeUpdateJoin(join, options) {
    var joinId = join.id,
        joinTreeId = join.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN, {
      joinId: joinId,
      joinTreeId: joinTreeId,
      options: options
    });
  }
});

module.exports = JoinsController;

});