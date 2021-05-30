define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinConstructorController = function JoinConstructorController(options) {
  this.initialize(options);
};

_.extend(JoinConstructorController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.joinExpressionByJoinConstructorAndResourceFactory = options.joinExpressionByJoinConstructorAndResourceFactory;
    this.openCannotCreateJoinAttentionDialogStrategy = options.openCannotCreateJoinAttentionDialogStrategy;
    this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = options.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'joinConstructor:leftField:remove', this._onLeftDropAreaResourceRemove);
    this.listenTo(this.joinsDesignerEventBus, 'joinConstructor:rightField:drop', this._onRightFieldDrop);
  },
  // Event handlers
  _onRightFieldDrop: function _onRightFieldDrop(joinConstructor, resource) {
    var joinExpression = this.joinExpressionByJoinConstructorAndResourceFactory.create(joinConstructor, resource);
    var item = {
      label: resource.label,
      resource: resource
    };

    if (this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(item)) {
      this.openCannotCreateJoinAttentionDialogStrategy.execute({
        item: item
      });
    } else {
      this._addJoinExpression(joinExpression);
    }
  },
  _onLeftDropAreaResourceRemove: function _onLeftDropAreaResourceRemove() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE, {});
  },
  // Private methods
  _addJoinExpression: function _addJoinExpression(joinExpression) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_CREATE_JOIN_EXPRESSION, joinExpression, schemaEntitiesEnum.JOIN_TREE);
  }
});

module.exports = JoinConstructorController;

});