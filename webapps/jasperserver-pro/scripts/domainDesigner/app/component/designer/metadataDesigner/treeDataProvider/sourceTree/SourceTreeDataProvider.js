define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var unwrapMetadataUtil = require("./util/unwrapMetadataUtil");

var serverSchemaResourceTypeUtil = require("../../../../../model/util/serverSchemaResourceTypeUtil");

var getCollectionByEntityType = require("../../../../../../model/schema/util/getCollectionByEntityType");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SourceTreeDataProvider = function SourceTreeDataProvider(options) {
  this.initialize(options);
};

_.extend(SourceTreeDataProvider.prototype, {
  initialize: function initialize(options) {
    this.convertToTreeItem = options.convertToTreeItem;
    this.metadataService = options.metadataService;
    this.sort = options.sort || _.identity;
    this.match = options.match;
  },
  getData: function getData(options) {
    var self = this,
        dataSourceUri = options.dataSourceUri,
        metadataResourcePath = options.metadataResourcePath;
    var deferred = new $.Deferred();
    var metadataResourcePaths = metadataResourcePath.length > 0 ? [metadataResourcePath] : metadataResourcePath;
    this.metadataService.getMetadata(dataSourceUri, metadataResourcePaths).then(function (data) {
      data = unwrapMetadataUtil.unwrap(data, options);

      var items = self._convertMetadataToTreeItems(data, options),
          sortedItems = self.sort(items),
          total = sortedItems.length;

      deferred.resolve({
        data: sortedItems,
        total: total
      });
    }).fail(function () {
      deferred.resolve({
        data: [],
        total: 0
      });
    });
    return deferred.promise();
  },
  // private
  _convertMetadataToTreeItems: function _convertMetadataToTreeItems(data, options) {
    var selection = options.selection,
        highlightInvalidResources = options.highlightInvalidResources,
        currentMetadataResourceId = options.currentMetadataResourceId;

    if (_.isEmpty(data)) {
      return data;
    }

    var resourceType = this._getMetadataResourceType(data),
        resourceCollection = this._getCollectionByResourceType(resourceType, options);

    return _.chain(data).filter(function (resource) {
      return this.match(resource.group, {
        collection: resourceCollection,
        currentMetadataResourceId: currentMetadataResourceId
      });
    }, this).map(function (resource) {
      return this.convertToTreeItem(resource, {
        selection: selection,
        highlightInvalidResources: highlightInvalidResources
      });
    }, this).value();
  },
  _getCollectionByResourceType: function _getCollectionByResourceType(resourceType, options) {
    return getCollectionByEntityType(options.dataStore, resourceType);
  },
  _getMetadataResourceType: function _getMetadataResourceType(data) {
    var firstItem = _.first(data);

    return serverSchemaResourceTypeUtil.getMetadataResourceType(firstItem);
  }
});

module.exports = SourceTreeDataProvider;

});