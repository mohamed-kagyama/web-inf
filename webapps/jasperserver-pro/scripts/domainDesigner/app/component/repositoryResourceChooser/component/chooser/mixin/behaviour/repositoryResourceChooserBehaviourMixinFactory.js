define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var repositoryResourceChooserDialogUtil = require("../../util/repositoryResourceChooserDialogUtil");

var repositoryResourceChooserSearchResultModeEnum = require("../../enum/repositoryResourceChooserSearchResultModeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getMutations(options) {
  var store = options.store,
      repositoryResourceChooserActions = options.repositoryResourceChooserActions,
      repositoryResourceChooserStateMutations = options.repositoryResourceChooserStateMutations;
  return {
    methods: {
      fetch: function fetch(options) {
        return repositoryResourceChooserActions.fetch(options).then(function (options) {
          repositoryResourceChooserStateMutations.setRepositoryTreeState({
            nodes: options.repositoryTreeData
          });
          repositoryResourceChooserStateMutations.setResourcesListState({
            nodes: options.resourcesListData
          });
        });
      },
      selectListItem: function selectListItem(treeNode) {
        var options = store.selectionOptions || {};
        repositoryResourceChooserActions.selectListItem(treeNode, options).then(function (options) {
          repositoryResourceChooserStateMutations.setResourcesListState({
            nodes: options.visibleNodes,
            selection: options.selection
          });
        });
      },
      selectTreeNode: function selectTreeNode(treeNode) {
        var options = store.selectionOptions || {};
        repositoryResourceChooserActions.selectTreeNode(treeNode, options).then(function (options) {
          repositoryResourceChooserStateMutations.setRepositoryTreeState({
            nodes: options.visibleNodes,
            selection: options.selection
          });
        });
      },
      toggleRepositoryTree: function toggleRepositoryTree(treeNode) {
        repositoryResourceChooserActions.toggleRepositoryTree(treeNode).then(function (options) {
          repositoryResourceChooserStateMutations.setRepositoryTreeState({
            nodes: options.visibleNodes,
            selection: options.selection
          });
        });
      },
      toggleSearchResultMode: function toggleSearchResultMode(searchResultMode) {
        repositoryResourceChooserStateMutations.toggleSearchResultMode(searchResultMode);
      },
      submitSearchKeyword: function submitSearchKeyword(searchKeyword) {
        var mutations = repositoryResourceChooserStateMutations;
        repositoryResourceChooserActions.getResourceListDataByQueryWord(searchKeyword).then(function (options) {
          mutations.setSearchKeyword(options.queryWord);
          mutations.setResourcesListState({
            nodes: options.data,
            selection: {}
          });
          mutations.toggleSearchResultMode(repositoryResourceChooserSearchResultModeEnum.LIST);
        });
      },
      resetSearchKeyword: function resetSearchKeyword() {
        var mutations = repositoryResourceChooserStateMutations;
        repositoryResourceChooserActions.resetSearchKeyword().then(function (options) {
          mutations.setSearchKeyword('');
          mutations.toggleSearchResultMode(repositoryResourceChooserSearchResultModeEnum.LIST);
          mutations.setResourcesListState({
            nodes: options.resourcesListData
          });
          mutations.setRepositoryTreeState({
            nodes: options.repositoryTreeData
          });
        });
      },
      closeErrorPopover: function closeErrorPopover() {
        repositoryResourceChooserStateMutations.setPopoverErrorMessage('');
        var mode = store.searchResultMode;

        if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
          repositoryResourceChooserStateMutations.resetTreeNodesInvalidState();
        } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
          repositoryResourceChooserStateMutations.resetListNodesInvalidState();
        }
      }
    }
  };
}

module.exports = {
  create: getMutations
};

});