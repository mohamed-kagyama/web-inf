define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceChooserSearchResultModeEnum = require("../enum/repositoryResourceChooserSearchResultModeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isRepositoryTreeMode: function isRepositoryTreeMode(mode) {
    return mode === repositoryResourceChooserSearchResultModeEnum.TREE;
  },
  isResourcesListMode: function isResourcesListMode(mode) {
    return mode === repositoryResourceChooserSearchResultModeEnum.LIST;
  }
};

});