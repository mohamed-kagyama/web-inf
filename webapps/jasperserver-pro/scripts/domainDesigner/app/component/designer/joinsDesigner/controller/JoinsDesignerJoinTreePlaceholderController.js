define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerJoinTreePlaceholderController = function JoinsDesignerJoinTreePlaceholderController(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerJoinTreePlaceholderController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.createDraftJoinTreeStrategy = options.createDraftJoinTreeStrategy;
    this.reorderJoinTreeStrategy = options.reorderJoinTreeStrategy;
    this.reorderDraftJoinTreeStrategy = options.reorderDraftJoinTreeStrategy;
    this.openCannotCreateJoinAttentionDialogStrategy = options.openCannotCreateJoinAttentionDialogStrategy;
    this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = options.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'joinTreePlaceholder:drop', this._onDrop);
  },
  _onDrop: function _onDrop(options) {
    var item = options.item,
        index = options.index,
        type = item.resource.type;

    if (this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(item)) {
      this.openCannotCreateJoinAttentionDialogStrategy.execute({
        item: item
      });
    } else if (entityUtil.isField(type)) {
      this.createDraftJoinTreeStrategy.execute(item, index);
    } else if (item.resource.isDraftJoinTree) {
      this.reorderDraftJoinTreeStrategy.execute(item, index);
    } else if (entityUtil.isJoinTree(type)) {
      this.reorderJoinTreeStrategy.execute(item, index);
    }
  }
});

module.exports = JoinsDesignerJoinTreePlaceholderController;

});