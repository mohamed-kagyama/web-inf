define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var childrenPropertyEnum = require("./enum/childrenPropertyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter = function PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.presentationItemDTONameGenerator = options.presentationItemDTONameGenerator;
    this.joinTreesConverter = options.joinTreesConverter;
    this.comparator = options.comparator;
  },
  convert: function convert(options) {
    var dataStore = this.clientDomainSchemaService.getDataStore(),
        joinTreeIds = options.joinTreeIds;
    this.presentationItemDTONameGenerator.reset();
    var joinTrees = dataStore.joinTrees.filter(function (joinTree) {
      return _.indexOf(joinTreeIds, joinTree.getId()) >= 0;
    }).sort(this.comparator);
    var presentationItemsByJoinTree = this.joinTreesConverter.convert(_.extend({
      schema: dataStore,
      joinTrees: joinTrees,
      comparator: this.comparator,
      childrenProperty: childrenPropertyEnum.CHILDREN_PROPERTY
    }, options)).reduce(function (memo, presentationItem) {
      var sourceJoinTreeId = presentationItem.sourceJoinTreeId;
      presentationItem = _.omit(presentationItem, 'sourceJoinTreeId');

      if (memo[sourceJoinTreeId]) {
        memo[sourceJoinTreeId].push(presentationItem);
      } else {
        memo[sourceJoinTreeId] = [presentationItem];
      }

      return memo;
    }, {});
    return _.map(presentationItemsByJoinTree, function (presentationItems, joinTreeId) {
      return {
        sourceId: parseInt(joinTreeId, 10),
        sourceType: schemaEntitiesEnum.JOIN_TREE,
        presentationItems: presentationItems
      };
    });
  }
});

module.exports = PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter;

});