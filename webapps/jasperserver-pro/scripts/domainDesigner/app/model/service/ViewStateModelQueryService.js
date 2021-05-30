define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ViewStateModelQueryService = function ViewStateModelQueryService(options) {
  this.initialize(options);
};

_.extend(ViewStateModelQueryService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isNodeExpanded', 'isNodeCollapsed');

    this.viewStateModel = options.viewStateModel;
  },
  isNodeExpanded: function isNodeExpanded(id) {
    var expandedNodes = this.viewStateModel.getSidebarExpandedNodes();
    return Boolean(expandedNodes[id]);
  },
  isNodeCollapsed: function isNodeCollapsed(id) {
    var collapsedNodes = this.viewStateModel.getSidebarCollapsedNodes();
    return Boolean(collapsedNodes[id]);
  },
  getDraftState: function getDraftState() {
    return this.viewStateModel.getDraftState();
  }
});

module.exports = ViewStateModelQueryService;

});