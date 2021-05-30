define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeItemExpandedProcessor = function TreeItemExpandedProcessor(options) {
  this.initialize(options);
};

_.extend(TreeItemExpandedProcessor.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'process');

    this.isExpanded = options.isExpanded;
    this.isCollapsed = options.isCollapsed;
    this.searchKeywordProvider = options.searchKeywordProvider;
  },
  process: function process(resource) {
    var expanded = false,
        searchKeyword = this.searchKeywordProvider.get();

    if (!entityUtil.isField(resource.type)) {
      if (searchKeyword) {
        expanded = !this.isCollapsed(resource.resourceId);
      } else {
        expanded = this.isExpanded(resource.resourceId);
      }

      resource.expanded = expanded;
    }

    return resource;
  }
});

module.exports = TreeItemExpandedProcessor;

});