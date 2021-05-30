define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var metadataDesignerUtil = require("../../util/metadataDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeSearchKeywordProvider = function TreeSearchKeywordProvider(options) {
  this.treeName = options.treeName;
};

_.extend(TreeSearchKeywordProvider.prototype, {
  get: function get(state) {
    return metadataDesignerUtil.getTreeSearchKeyword(this.treeName, state.viewState);
  }
});

module.exports = TreeSearchKeywordProvider;

});