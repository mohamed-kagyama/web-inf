define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../../../../../../../../model/util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getBehaviour(options) {
  var store = options.store,
      resourcePropertiesChooserBehaviour = options.resourcePropertiesChooserBehaviour,
      repositoryResourceChooserStateMutations = options.repositoryResourceChooserStateMutations,
      multipleFileUploadActions = options.multipleFileUploadActions,
      multipleFileUploadStateMutations = options.multipleFileUploadStateMutations,
      localFileValidator = options.localFileValidator,
      repositoryFileValidator = options.repositoryFileValidator;
  return {
    methods: {
      onPrimaryButtonClick: function onPrimaryButtonClick(event) {
        event.stopPropagation();

        if (this.isRepositoryTab) {
          this._addFilesFromRepositoryIfValid();
        } else {
          this._addLocalFiles();
        }
      },
      addFiles: function addFiles(files) {
        var self = this,
            multipleFileUpload = store.get('multipleFileUpload'),
            uploadedFiles = multipleFileUpload.files;
        multipleFileUploadActions.loadFilesWithContent(files).then(function (files) {
          var result = self._validateFiles(files, uploadedFiles);

          if (result) {
            files = result.files;
            store.set('localFileLastErrorMessage', result.errorMessage);
            multipleFileUploadStateMutations.setPopoverErrorMessage(result.errorMessage);
          } else {
            store.set('localFileLastErrorMessage', '');
          }

          multipleFileUploadStateMutations.addFiles(files);
        });
      },
      removeFile: function removeFile(index) {
        var multipleFileUpload = store.get('multipleFileUpload'),
            files = _.cloneDeep(multipleFileUpload.files),
            localFileLastErrorMessage = store.get('localFileLastErrorMessage');

        files.splice(index, 1);
        files = this._resetLocalFilesInvalidState(files);

        var result = this._validateFiles(files, []);

        if (result) {
          files = result.files;
          store.set('localFileLastErrorMessage', result.errorMessage);

          this._showPopoverOnRemoveCurrentErrorIsDifferent(result.errorMessage, localFileLastErrorMessage);
        } else {
          store.set('localFileLastErrorMessage', '');
          multipleFileUploadStateMutations.clearPopoverErrorMessage();
        }

        multipleFileUploadStateMutations.replaceFiles(files);
      },
      closerLocalFileErrorPopover: function closerLocalFileErrorPopover() {
        multipleFileUploadStateMutations.clearPopoverErrorMessage();
      },
      closeResourceChooserErrorPopover: function closeResourceChooserErrorPopover() {
        resourcePropertiesChooserBehaviour.methods.closeErrorPopover();
      },
      // private
      _validateFiles: function _validateFiles(files, uploadedFiles) {
        var result = localFileValidator.validate(files, uploadedFiles),
            invalidFiles = [];

        if (result) {
          invalidFiles = this._markLocalFilesInvalid(result.invalidFiles);
          return {
            files: result.validFiles.concat(invalidFiles),
            errorMessage: result.errorMessage
          };
        }
      },
      _showPopoverOnRemoveCurrentErrorIsDifferent: function _showPopoverOnRemoveCurrentErrorIsDifferent(currentError, lastError) {
        if (currentError !== lastError) {
          multipleFileUploadStateMutations.setPopoverErrorMessage(currentError);
        } else {
          multipleFileUploadStateMutations.clearPopoverErrorMessage();
        }
      },
      _addFilesFromRepositoryIfValid: function _addFilesFromRepositoryIfValid() {
        var repositoryResourceChooser = store.get('repositoryResourceChooser'),
            repositoryTree = repositoryResourceChooser.repositoryTree,
            resourcesList = repositoryResourceChooser.resourcesList;

        var repositoryTreeSelectedNodes = _.cloneDeep(repositoryTree.selection),
            resourcesListSelectedNodes = _.cloneDeep(resourcesList.selection);

        var fileReferences, invalidFiles;

        if (this.isRepositoryTreeMode) {
          fileReferences = this._getSelectedNodesUri(repositoryTreeSelectedNodes);
        } else if (this.isResourcesListMode) {
          fileReferences = this._getSelectedNodesUri(resourcesListSelectedNodes);
        }

        var result = repositoryFileValidator.validate(fileReferences);

        if (result) {
          repositoryResourceChooserStateMutations.setPopoverErrorMessage(result.errorMessage);
          invalidFiles = _.map(result.invalidFiles, function (invalidFile) {
            return invalidFile.uri;
          });
          repositoryResourceChooserStateMutations.markCurrentModeNodesInvalid(invalidFiles);
        } else {
          this.$emit('addFromRepository', fileReferences);
        }
      },
      _addLocalFiles: function _addLocalFiles() {
        var multipleFileUpload = store.get('multipleFileUpload'),
            localFiles = _.cloneDeep(multipleFileUpload.files);

        this.$emit('addLocalFiles', localFiles);
      },
      _markLocalFilesInvalid: function _markLocalFilesInvalid(files) {
        return _.map(files, function (file) {
          file.isInvalid = true;
          return file;
        });
      },
      _resetLocalFilesInvalidState: function _resetLocalFilesInvalidState(files) {
        return _.map(files, function (file) {
          delete file.isInvalid;
          return file;
        });
      },
      _getSelectedNodesUri: function _getSelectedNodesUri(nodes) {
        var uris = _.map(nodes, function (selected, key) {
          return key;
        });

        return _.sortBy(uris, function (uri) {
          return resourcePropertiesUtil.parseFileNameFromUrl(uri);
        });
      }
    }
  };
}

module.exports = {
  create: getBehaviour
};

});