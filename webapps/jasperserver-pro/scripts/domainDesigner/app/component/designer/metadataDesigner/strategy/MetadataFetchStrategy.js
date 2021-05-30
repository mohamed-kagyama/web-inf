define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataFetchStrategy = function MetadataFetchStrategy(options) {
  this.metadataService = options.metadataService;
};

_.extend(MetadataFetchStrategy.prototype, {
  fetch: function fetch(options) {
    var parentPath = options.parentPath,
        resources = options.resources,
        resourceType = options.resourceType,
        dataSourceUri = options.dataSourceUri;
    var resourcesToFetch = resources.map(function (resource) {
      if (entityUtil.isTable(resourceType) && parentPath) {
        return [].concat(parentPath).concat(resource.name);
      }

      return [resource.name];
    });
    return this.metadataService.getMetadata(dataSourceUri, resourcesToFetch).then(function (data) {
      if (data) {
        data = _.isArray(data) ? data : [data];
      }

      return data || [];
    });
  }
});

module.exports = MetadataFetchStrategy;

});