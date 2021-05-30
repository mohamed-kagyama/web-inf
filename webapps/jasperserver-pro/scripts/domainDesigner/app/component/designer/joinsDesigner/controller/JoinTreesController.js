define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinTreesController = function JoinTreesController(options) {
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.joinsDesignerEventBus = options.joinsDesignerEventBus;
  this.joinConstructorFactory = options.joinConstructorFactory;
  this.openCannotCreateJoinAttentionDialogStrategy = options.openCannotCreateJoinAttentionDialogStrategy;
  this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = options.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

  this._initEvents();
};

_.extend(JoinTreesController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'joinTree:drop', this._onJoinTreeDrop);
    this.listenTo(this.joinsDesignerEventBus, 'remove:joinAlias', this._onBeforeRemoveJoinAlias);
    this.listenTo(this.joinsDesignerEventBus, 'remove:joinTree', this._onBeforeRemoveJoinTree);
    this.listenTo(this.joinsDesignerEventBus, 'toggle:joinTree', this._onBeforeToggleJoinTree);
  },
  _onJoinTreeDrop: function _onJoinTreeDrop(options) {
    if (this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(options.item)) {
      this.openCannotCreateJoinAttentionDialogStrategy.execute({
        item: options.item
      });
    } else {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE, this.joinConstructorFactory.create(options));
    }
  },
  // Before action event handlers
  _onBeforeRemoveJoinAlias: function _onBeforeRemoveJoinAlias(joinAliasId) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_ALIAS, joinAliasId);
  },
  _onBeforeRemoveJoinTree: function _onBeforeRemoveJoinTree(id) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_TREE, id);
  },
  _onBeforeToggleJoinTree: function _onBeforeToggleJoinTree(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN_TREE, {
      joinTreeId: model.id,
      isExpanded: !model.isExpanded
    });
  }
});

module.exports = JoinTreesController;

});