define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReorderDraftJoinTreeStrategy = function ReorderDraftJoinTreeStrategy(options) {
  this.initialize(options);
};

_.extend(ReorderDraftJoinTreeStrategy.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.joinsDesignerViewStateModelService = options.joinsDesignerViewStateModelService;
  },
  execute: function execute(item, index) {
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree();
    draftJoinTree = _.extend({}, draftJoinTree, {
      index: index
    });
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE, draftJoinTree);
  }
});

module.exports = ReorderDraftJoinTreeStrategy;

});