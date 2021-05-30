define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var childrenPropertyEnum = require("./enum/childrenPropertyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter = function PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter(options) {
  this.initialize(options);
};

_.extend(PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.dataSourceResourcesConverter = options.dataSourceResourcesConverter;
    this.presentationItemDTONameGenerator = options.presentationItemDTONameGenerator;
    this.comparator = options.comparator;
  },
  convert: function convert(options) {
    var dataStore = this.clientDomainSchemaService.getDataStore();
    this.presentationItemDTONameGenerator.reset();
    var presentationItemsByTableReference = this.dataSourceResourcesConverter.convert(_.extend({
      schema: dataStore,
      comparator: this.comparator,
      childrenProperty: childrenPropertyEnum.CHILDREN_PROPERTY
    }, options)).reduce(function (memo, presentationItem) {
      if (!memo[presentationItem.sourceId]) {
        memo[presentationItem.sourceId] = [];
      }

      memo[presentationItem.sourceId].push(presentationItem);
      return memo;
    }, {});
    return _.map(presentationItemsByTableReference, function (presentationItems, tableReferenceId) {
      return {
        sourceId: parseInt(tableReferenceId, 10),
        sourceType: schemaEntitiesEnum.TABLE_REFERENCE,
        presentationItems: presentationItems
      };
    });
  }
});

module.exports = PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter;

});