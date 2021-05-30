define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var mimeTypes = require("../enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var QueryExecutionService = function QueryExecutionService(options) {
  this.initialize(options);
};

_.extend(QueryExecutionService.prototype, {
  initialize: function initialize(options) {
    this.contextExecutor = options.contextExecutor;
  },
  executeAdhocQuery: function executeAdhocQuery(options) {
    var adhocQuery = options.adhocQuery,
        domain = options.domain,
        queryParams = options.queryParams || {},
        queryParamsString = $.param(queryParams);
    var createContextOptions = {
      contentType: mimeTypes.ADHOC_MULTILEVEL_QUERY,
      accept: mimeTypes.ADHOC_MULTILEVEL_QUERY,
      data: JSON.stringify({
        dataSource: {
          domain: domain
        },
        query: adhocQuery
      })
    };
    var runContextOptions = {
      url: '/data' + (queryParamsString ? '?' + queryParamsString : ''),
      type: 'GET',
      accept: mimeTypes.ADHOC_MULTILEVEL_DATA
    };
    return this.contextExecutor.execute(createContextOptions, runContextOptions);
  }
});

module.exports = QueryExecutionService;

});