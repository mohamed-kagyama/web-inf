define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var endpointsEnum = require("../enum/endpointsEnum");

var mimeTypes = require("../enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTableMetadataService = function DerivedTableMetadataService(options) {
  this.initialize(options);
};

_.extend(DerivedTableMetadataService.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.contextExecutor = options.contextExecutor;
  },
  getDerivedTableMetadata: function getDerivedTableMetadata(dataSourceUri, query) {
    var dataSourceContextData = JSON.stringify({
      dataSourceUri: dataSourceUri,
      sql: query
    });
    var dataSourceContext = {
      contentType: mimeTypes.SQL_EXECUTION_REQUEST_CONTEXT,
      data: dataSourceContextData
    };
    var contextOptions = {
      type: 'GET',
      accept: mimeTypes.DATASET_JSON,
      url: endpointsEnum.DATA_SOURCE_METADATA,
      contentType: mimeTypes.SQL_EXECUTION_REQUEST_CONTEXT
    };
    return this.contextExecutor.execute(dataSourceContext, contextOptions);
  }
});

module.exports = DerivedTableMetadataService;

});