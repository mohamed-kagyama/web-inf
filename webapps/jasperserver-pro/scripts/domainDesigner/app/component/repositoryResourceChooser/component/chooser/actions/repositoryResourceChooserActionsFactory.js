define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var repositoryResourceChooserDialogUtil = require("../util/repositoryResourceChooserDialogUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getActions(options) {
  var resourceListNodeProvider = options.resourceListNodeProvider,
      resourcesListActions = options.resourcesListActions,
      repositoryTreeActions = options.repositoryTreeActions,
      repositoryResourcesListNodeProvider = options.repositoryResourcesListNodeProvider,
      store = options.store;
  return {
    selectListItem: function selectListItem(item, options) {
      return resourcesListActions.select(item, options);
    },
    selectTreeNode: function selectTreeNode(node, options) {
      return repositoryTreeActions.select(node, options);
    },
    toggleRepositoryTree: function toggleRepositoryTree(treeNode) {
      return repositoryTreeActions.toggle(treeNode);
    },
    getResourceListDataByQueryWord: function getResourceListDataByQueryWord(queryWord) {
      repositoryResourcesListNodeProvider.setQueryKeyword(queryWord);
      return this.refreshResourcesList().then(function (data) {
        return {
          queryWord: queryWord,
          data: data
        };
      });
    },
    resetSearchKeyword: function resetSearchKeyword() {
      repositoryResourcesListNodeProvider.resetQueryKeyword();
      return this.refreshResourcesList().then(function (resourcesListData) {
        return {
          searchKeyword: '',
          resourcesListData: resourcesListData
        };
      });
    },
    refreshResourcesList: function refreshResourcesList() {
      return resourceListNodeProvider.getData(undefined, {
        clearSelection: true
      }).then(function (data) {
        return data.visibleNodes;
      });
    },
    fetch: function fetch(options) {
      options = options || {};

      if (options.resetSearchKeyword) {
        repositoryResourcesListNodeProvider.resetQueryKeyword();
      }

      return $.when(resourcesListActions.fetch(options), repositoryTreeActions.fetch(options)).then(function (resourcesListData, repositoryTreeData) {
        return {
          resourcesListData: resourcesListData,
          repositoryTreeData: repositoryTreeData
        };
      });
    },
    getCurrentModeSelection: function getCurrentModeSelection() {
      var selectedNodes,
          mode = store.searchResultMode;

      if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
        selectedNodes = _.keys(store.repositoryTree.selection);
      } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
        selectedNodes = _.keys(store.resourcesList.selection);
      }

      return selectedNodes;
    }
  };
}

module.exports = {
  create: getActions
};

});