define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function RepositoryListNodeProvider(options) {
  options = options || options;

  _.bindAll(this, 'getData');

  this.resourceService = options.resourceService;
  this.toTreeNode = options.resourceLookupToTreeNodeConverter.convert;
  this.defaultSearchParams = _.defaults(options.defaultSearchParams || {});
}

_.extend(RepositoryListNodeProvider.prototype, {
  getData: function getData(options) {
    options = options || {};
    this.fileType = options.fileType;
    var self = this,
        offset = options.offset,
        limit = options.limit;

    var searchParams = _.defaults({
      offset: offset,
      limit: limit,
      recursive: true
    }, this.defaultSearchParams);

    return this.resourceService.search(searchParams).then(function (searchResult) {
      searchResult.data.each(function (item) {
        item.fileType = self.fileType;
      });
      return {
        data: searchResult.data.map(self.toTreeNode),
        total: searchResult.total
      };
    });
  },
  getQueryKeyword: function getQueryKeyword() {
    return this.defaultSearchParams.q;
  },
  setQueryKeyword: function setQueryKeyword(queryKeyword) {
    this.defaultSearchParams.q = queryKeyword;
  },
  resetQueryKeyword: function resetQueryKeyword() {
    delete this.defaultSearchParams.q;
  }
});

module.exports = RepositoryListNodeProvider;

});