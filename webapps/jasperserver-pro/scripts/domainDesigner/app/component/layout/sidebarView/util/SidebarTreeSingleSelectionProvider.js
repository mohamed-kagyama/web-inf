define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SidebarTreeSingleSelectionProvider = function SidebarTreeSingleSelectionProvider(options) {
  this.initialize(options);
};

_.extend(SidebarTreeSingleSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.clientViewStateModelService = options.clientViewStateModelService;
  },
  get: function get() {
    return this.clientViewStateModelService.getSidebarSelectionPath();
  }
});

module.exports = SidebarTreeSingleSelectionProvider;

});