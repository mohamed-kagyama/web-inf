define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getBehaviour(options) {
  var store = options.store;
  return {
    methods: {
      onPrimaryButtonClick: function onPrimaryButtonClick(event) {
        event.stopPropagation();

        if (this.isRepositoryTab) {
          this._addFileFromRepository();
        } else {
          this._addLocalFile();
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (!this.isPrimaryButtonDisabled) {
          this._addFileFromRepository();
        }
      },
      // private methods
      _addFileFromRepository: function _addFileFromRepository() {
        var repositoryResourceChooser = store.get('repositoryResourceChooser'),
            repositoryTree = repositoryResourceChooser.repositoryTree,
            resourcesList = repositoryResourceChooser.resourcesList;

        var repositoryTreeSelectedNodes = _.cloneDeep(repositoryTree.selection),
            resourcesListSelectedNodes = _.cloneDeep(resourcesList.selection);

        var fileReference;

        if (this.isRepositoryTreeMode) {
          fileReference = this._getSelectedNodeUri(repositoryTreeSelectedNodes);
        } else if (this.isResourcesListMode) {
          fileReference = this._getSelectedNodeUri(resourcesListSelectedNodes);
        }

        this.$emit('addFromRepository', fileReference);
        this.reset();
      },
      _addLocalFile: function _addLocalFile() {
        var singleFileUpload = store.get('singleFileUpload'),
            localFile = _.cloneDeep(singleFileUpload.file);

        this.$emit('addLocalFile', localFile);
        this.reset();
      },
      _getSelectedNodeUri: function _getSelectedNodeUri(nodes) {
        return _.map(nodes, function (selected, key) {
          return key;
        })[0];
      }
    }
  };
}

module.exports = {
  create: getBehaviour
};

});