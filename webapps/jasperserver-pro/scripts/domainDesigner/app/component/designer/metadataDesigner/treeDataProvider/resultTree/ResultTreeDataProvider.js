define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var getResourcesByParentResourceUtil = require("./util/getResourcesByParentResourceUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResultTreeDataProvider = function ResultTreeDataProvider(options) {
  this.initialize(options);
};

_.extend(ResultTreeDataProvider.prototype, {
  initialize: function initialize(options) {
    this.convertToTreeItem = options.convertToTreeItem;
    this.process = options.process || _.identity;
    this.sort = options.sort || _.identity;
    this.match = options.match || _.identity;
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
    this.emptyProfileAttributeValuesToPlaceholderLabelConverter = options.emptyProfileAttributeValuesToPlaceholderLabelConverter;
  },
  getData: function getData(options) {
    var metadataResourceId = options.metadataResourceId,
        metadataResourceType = options.metadataResourceType,
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    var dfd = new $.Deferred(),
        resources = getResourcesByParentResourceUtil.getResources({
      parentId: metadataResourceId,
      parentType: metadataResourceType,
      collections: options.dataStore,
      isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute: isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute
    });

    var items = this._convertResourcesToTreeItems(resources, options),
        sortedItems = this.sort(items),
        total = sortedItems.length; // convert empty profile attribute values to placeholder after sorting for save top position for it
    // convert empty profile attribute values to placeholder after sorting for save top position for it


    sortedItems = _.map(sortedItems, this.emptyProfileAttributeValuesToPlaceholderLabelConverter);
    return dfd.resolve({
      data: sortedItems,
      total: total
    });
  },
  _convertResourcesToTreeItems: function _convertResourcesToTreeItems(resources, options) {
    return resources.filter(this.match).map(function (resource) {
      var processedResource = this.process(resource.toJSON(), {
        entity: resource
      });
      return this.convertToTreeItem(processedResource, {
        selection: options.selection
      });
    }, this).toArray();
  }
});

module.exports = ResultTreeDataProvider;

});