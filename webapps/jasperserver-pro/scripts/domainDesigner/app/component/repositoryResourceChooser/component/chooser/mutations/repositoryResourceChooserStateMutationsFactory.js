define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var repositoryResourceChooserDialogUtil = require("../util/repositoryResourceChooserDialogUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getMutations(options) {
  var store = options.store;
  return {
    setRepositoryTreeState: function setRepositoryTreeState(state) {
      state = _.defaults({}, state, store.repositoryTree);
      store.repositoryTree = state;
    },
    setResourcesListState: function setResourcesListState(state) {
      state = _.defaults({}, state, store.resourcesList);
      store.resourcesList = state;
    },
    setSearchKeyword: function setSearchKeyword(searchKeyword) {
      store.searchKeyword = searchKeyword;
    },
    toggleSearchResultMode: function toggleSearchResultMode(searchResultMode) {
      store.searchResultMode = searchResultMode;
    },
    markCurrentModeNodesInvalid: function markCurrentModeNodesInvalid(nodeIds) {
      var mode = store.searchResultMode,
          nodes = null;
      nodeIds = _.isArray(nodeIds) ? nodeIds : [nodeIds];

      if (repositoryResourceChooserDialogUtil.isRepositoryTreeMode(mode)) {
        nodes = store.repositoryTree.nodes;
      } else if (repositoryResourceChooserDialogUtil.isResourcesListMode(mode)) {
        nodes = store.resourcesList.nodes;
      }

      this._markNodesAsInvalid(nodeIds, nodes);
    },
    markTreeNodesInvalid: function markTreeNodesInvalid(ids) {
      ids = _.isArray(ids) ? ids : [ids];

      this._markNodesAsInvalid(ids, store.repositoryTree.nodes);
    },
    markListNodesInvalid: function markListNodesInvalid(ids) {
      ids = _.isArray(ids) ? ids : [ids];

      this._markNodesAsInvalid(ids, store.resourcesList.nodes);
    },
    resetTreeNodesInvalidState: function resetTreeNodesInvalidState() {
      this._resetNodesInvalidState(store.repositoryTree.nodes);
    },
    resetListNodesInvalidState: function resetListNodesInvalidState() {
      this._resetNodesInvalidState(store.resourcesList.nodes);
    },
    setPopoverErrorMessage: function setPopoverErrorMessage(errorMessage) {
      store.popover.errorMessage = errorMessage;
    },
    // private
    _markNodesAsInvalid: function _markNodesAsInvalid(ids, nodes) {
      _.each(ids, function (id) {
        this._markNodeAsInvalidById(id, nodes);
      }, this);
    },
    _markNodeAsInvalidById: function _markNodeAsInvalidById(id, nodes) {
      var nodeToInvalidate = _.find(nodes, function (node) {
        return node.id === id;
      });

      if (nodeToInvalidate) {
        nodeToInvalidate.invalid = true;
      }
    },
    _resetNodesInvalidState: function _resetNodesInvalidState(nodes) {
      _.each(nodes, function (node) {
        node.invalid = false;
      }, this);
    }
  };
}

module.exports = {
  create: getMutations
};

});