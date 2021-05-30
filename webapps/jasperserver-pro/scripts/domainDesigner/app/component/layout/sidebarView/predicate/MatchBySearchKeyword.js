define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MatchBySearchKeyword = function MatchBySearchKeyword(options) {
  this.initialize(options);
};

_.extend(MatchBySearchKeyword.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, "match");

    options = options || {};
    this.getSearchProperty = options.getSearchProperty;
    this.searchKeywordProvider = options.searchKeywordProvider;
  },
  match: function match(options) {
    var resource = options.resource,
        parentMatchResult = options.parentMatchResult;

    if (parentMatchResult) {
      return true;
    }

    var searchSourceProperty = this.getSearchProperty(resource, options);
    searchSourceProperty = _.isArray(searchSourceProperty) ? searchSourceProperty : [searchSourceProperty];
    var searchKeyword = (this.searchKeywordProvider.get() || "").toLocaleLowerCase();

    if (searchKeyword) {
      return _.find(searchSourceProperty, function (searchSourceProperty) {
        return searchSourceProperty.indexOf(searchKeyword) >= 0;
      });
    } else {
      return true;
    }
  }
});

module.exports = MatchBySearchKeyword;

});