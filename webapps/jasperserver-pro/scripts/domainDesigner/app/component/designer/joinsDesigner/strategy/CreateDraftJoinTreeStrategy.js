define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CreateDraftJoinTreeStrategy = function CreateDraftJoinTreeStrategy(options) {
  this.initialize(options);
};

_.extend(CreateDraftJoinTreeStrategy.prototype, {
  initialize: function initialize(options) {
    this.draftJoinTreeFactory = options.draftJoinTreeFactory;
    this.joinConstructorFactory = options.joinConstructorFactory;
    this.clientDomainSchemaJoinsDesignerService = options.clientDomainSchemaJoinsDesignerService;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  },
  execute: function execute(item, index) {
    var joinConstructor = this.joinConstructorFactory.create({
      item: item
    });
    var draftJoinTree = this.draftJoinTreeFactory.create({
      name: this.clientDomainSchemaJoinsDesignerService.generateJoinTreeName(),
      join: {
        leftSide: item.resource.parentTableReferenceName
      },
      joinConstructor: joinConstructor,
      index: index || 0
    });
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE, draftJoinTree);
  }
});

module.exports = CreateDraftJoinTreeStrategy;

});