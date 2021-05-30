define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MatchSearchCriteria = function MatchSearchCriteria(keyword) {
  _.bindAll(this, 'match');

  this.setKeyword(keyword);
};

_.extend(MatchSearchCriteria.prototype, {
  setKeyword: function setKeyword(keyword) {
    this.searchKeyword = keyword ? keyword.toLowerCase() : '';
  },
  match: function match(resource) {
    var resourceName = resource.name,
        resourceNameToLowerCase = resourceName.toLowerCase();
    return this.searchKeyword ? resourceNameToLowerCase.indexOf(this.searchKeyword) !== -1 : true;
  }
});

module.exports = MatchSearchCriteria;

});