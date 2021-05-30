define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DoNotSkipChildrenConversion = function DoNotSkipChildrenConversion(options) {
  this.initialize(options);
};

_.extend(DoNotSkipChildrenConversion.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'match');

    options = options || {};
    this.searchKeywordProvider = options.searchKeywordProvider;
    this.isExpanded = options.isExpanded;
  },
  match: function match(options) {
    var resource = options.resource,
        isResourceExpanded = this.isExpanded(resource.id);
    return Boolean(this.searchKeywordProvider.get() || isResourceExpanded);
  }
});

module.exports = DoNotSkipChildrenConversion;

});