define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SidebarSearchKeywordProvider = function SidebarSearchKeywordProvider(options) {
  this.initialize(options);
};

_.extend(SidebarSearchKeywordProvider.prototype, {
  initialize: function initialize(options) {
    this.service = options.service;
  },
  get: function get() {
    return this.service.getSidebarSearchKeyword();
  }
});

module.exports = SidebarSearchKeywordProvider;

});