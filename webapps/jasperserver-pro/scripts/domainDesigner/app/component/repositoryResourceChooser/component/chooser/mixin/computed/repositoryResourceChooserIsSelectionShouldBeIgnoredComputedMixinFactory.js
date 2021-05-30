define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceChooserDialogUtil = require("../../util/repositoryResourceChooserDialogUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getComputed(options) {
  var store = options.store,
      test = options.test;
  return {
    computed: {
      isSelectionShouldBeIgnored: function isSelectionShouldBeIgnored() {
        var mode = store.searchResultMode,
            repositoryTreeSelection = store.repositoryTree.selection,
            resourcesListSelection = store.resourcesList.selection,
            repositoryTreeNodes = store.repositoryTree.nodes,
            resourcesListItems = store.resourcesList.nodes,
            selection,
            nodes;

        if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
          selection = repositoryTreeSelection;
          nodes = repositoryTreeNodes;
        } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
          selection = resourcesListSelection;
          nodes = resourcesListItems;
        }

        return test ? test(selection, nodes) : false;
      }
    }
  };
}

module.exports = {
  create: getComputed
};

});