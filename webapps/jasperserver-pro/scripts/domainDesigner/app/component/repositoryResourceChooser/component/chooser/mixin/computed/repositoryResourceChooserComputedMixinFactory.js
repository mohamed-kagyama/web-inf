define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var repositoryResourceChooserDialogUtil = require("../../util/repositoryResourceChooserDialogUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isAnyInvalidNodes(nodes) {
  return _.some(nodes, function (node) {
    return node.invalid;
  });
}

function getComputed(options) {
  var store = options.store;
  return {
    computed: {
      isRepositoryChooserSelectionEmptyInCurrentMode: function isRepositoryChooserSelectionEmptyInCurrentMode() {
        var mode = store.searchResultMode,
            repositoryTreeSelection = store.repositoryTree.selection,
            resourcesListSelection = store.resourcesList.selection;

        if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
          return _.isEmpty(repositoryTreeSelection);
        } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
          return _.isEmpty(resourcesListSelection);
        }
      },
      isAnyInvalidRepositoryChooserResourcesInCurrentMode: function isAnyInvalidRepositoryChooserResourcesInCurrentMode() {
        var mode = store.searchResultMode,
            repositoryTreeNodes = store.repositoryTree.nodes,
            resourcesListNodes = store.resourcesList.nodes;

        if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
          return isAnyInvalidNodes(repositoryTreeNodes);
        } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
          return isAnyInvalidNodes(resourcesListNodes);
        }
      }
    }
  };
}

module.exports = {
  create: getComputed
};

});