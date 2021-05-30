define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var endpointsEnum = require("../enum/endpointsEnum");

var mimeTypes = require("../enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataService = function MetadataService(options) {
  this.initialize(options);
};

_.extend(MetadataService.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.contextExecutor = options.contextExecutor;
  },

  /**
   * Get datasource metadata for given datasource and specific resourcepath.
   * getMetadata loads metadadta only one level deep,
   * so when you want to load next level resource path to this level should be passed
   *
   * @param dataSourceUri data source for which we going to load metadata
   * @param resources path to level we want to load. or array of such pathes. root level if empty
   * @param options additional options
   * @returns {*} array of groups/elements or single group/element
   */
  getMetadata: function getMetadata(dataSourceUri, resources, options) {
    options = options || {};
    resources = resources || [];
    var dataSourceContextData = JSON.stringify({
      uri: dataSourceUri
    });
    var dataSourceContext = {
      contentType: mimeTypes.RESOURCE_LOOKUP,
      data: dataSourceContextData
    };
    var contextOptionsData = {
      includes: resources
    };

    if (options.loadReferences) {
      contextOptionsData.loadReferences = options.loadReferences;
    }

    var contextOptions = {
      url: endpointsEnum.DATA_SOURCE_METADATA,
      contentType: mimeTypes.DATA_SOURCE_METADATA,
      data: JSON.stringify(contextOptionsData)
    };
    return this.contextExecutor.execute(dataSourceContext, contextOptions, options);
  }
});

module.exports = MetadataService;

});