define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function create(options) {
  var store = options.store,
      repositoryResourceChooserStateActions = options.repositoryResourceChooserStateActions,
      repositoryResourceChooserStateMutations = options.repositoryResourceChooserStateMutations;
  return {
    methods: {
      open: function open(selection) {
        var self = this;
        selection = selection || {};
        return this.fetch({
          clearSelection: true,
          resetSearchKeyword: true
        }).then(function () {
          repositoryResourceChooserStateMutations.setResourcesListState({
            selection: selection.listSelection || {}
          });
        }).then(function () {
          self.$nextTick(function () {
            repositoryResourceChooserStateMutations.setResourcesListState({
              scrollPos: self._getSelectedItemScrollPos()
            });
          });
        });
      },
      confirmSelection: function confirmSelection() {
        var self = this,
            selection = repositoryResourceChooserStateActions.getCurrentModeSelection(),
            selectedNodeId = _.first(selection);

        if (selectedNodeId && this.isConfirmationActive) {
          self.$emit('confirm', selectedNodeId);
        }
      },
      rejectSelection: function rejectSelection() {
        this.$emit('reject');
      },
      // private methods
      _getSelectedItemScrollPos: function _getSelectedItemScrollPos() {
        var repositoryResourceChooser = store.get('repositoryResourceChooser'),
            itemHeight = repositoryResourceChooser.resourcesList.itemHeight,
            resourcesListNodes = repositoryResourceChooser.resourcesList.nodes,
            resourcesListSelection = repositoryResourceChooser.resourcesList.selection;
        var itemIndex = 0;

        _.find(resourcesListNodes, function (node, index) {
          if (resourcesListSelection[node.id]) {
            itemIndex = index;
            return node;
          }
        });

        return itemHeight * itemIndex;
      }
    }
  };
}

module.exports = {
  create: create
};

});