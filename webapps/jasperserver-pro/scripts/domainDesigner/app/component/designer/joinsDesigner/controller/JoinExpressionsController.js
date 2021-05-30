define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinExpressionsController = function JoinExpressionsController(options) {
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.joinsDesignerEventBus = options.joinsDesignerEventBus;

  this._initEvents();
};

_.extend(JoinExpressionsController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'remove:joinExpression', this._onBeforeRemoveJoinExpression);
    this.listenTo(this.joinsDesignerEventBus, 'update:joinExpression', this._onBeforeUpdateJoinExpression);
  },
  // Before action event handlers
  _onBeforeRemoveJoinExpression: function _onBeforeRemoveJoinExpression(joinExpression) {
    var joinId = joinExpression.joinId,
        joinExpressionId = joinExpression.id,
        joinTreeId = joinExpression.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_EXPRESSION, {
      id: joinExpressionId,
      joinId: joinId,
      joinTreeId: joinTreeId
    });
  },
  _onBeforeUpdateJoinExpression: function _onBeforeUpdateJoinExpression(joinExpression, options) {
    var joinId = joinExpression.joinId,
        joinExpressionId = joinExpression.id,
        joinTreeId = joinExpression.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_EXPRESSION, {
      joinExpressionId: joinExpressionId,
      joinTreeId: joinTreeId,
      joinId: joinId,
      options: options
    });
  }
});

module.exports = JoinExpressionsController;

});