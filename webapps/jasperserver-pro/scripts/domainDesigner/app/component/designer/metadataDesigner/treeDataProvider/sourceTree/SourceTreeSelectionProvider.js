define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var serverSchemaResourceTypeUtil = require("../../../../../model/util/serverSchemaResourceTypeUtil");

var unwrapMetadataUtil = require("./util/unwrapMetadataUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SourceTreeSelectionProvider = function SourceTreeSelectionProvider(options) {
  this.initialize(options);
};

_.extend(SourceTreeSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.metadataService = options.metadataService;
  },
  getSelectedResources: function getSelectedResources(options) {
    var selection = options.selection,
        dataSourceUri = options.dataSourceUri,
        metadataResourcePath = options.metadataResourcePath;
    var metadataResourcesPaths = metadataResourcePath.length > 0 ? [metadataResourcePath] : metadataResourcePath;
    return this.metadataService.getMetadata(dataSourceUri, metadataResourcesPaths).then(function (data) {
      data = unwrapMetadataUtil.unwrap(data, options);

      var resources = _.chain(data).filter(function (resource) {
        return Boolean(selection[resource.group.name]);
      }).map(function (resource) {
        return {
          name: resource.group.name,
          type: serverSchemaResourceTypeUtil.getMetadataResourceType(resource)
        };
      }).value();

      return new $.Deferred().resolve(resources);
    });
  }
});

module.exports = SourceTreeSelectionProvider;

});