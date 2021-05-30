define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getBehaviour(options) {
  var multipleFileUploadActions = options.multipleFileUploadActions,
      multipleFileUploadStateMutations = options.multipleFileUploadStateMutations;
  return {
    methods: {
      addFiles: function addFiles(files) {
        multipleFileUploadActions.loadFilesWithContent(files).then(function (files) {
          multipleFileUploadStateMutations.addFiles(files);
        });
      },
      replaceFiles: function replaceFiles(files) {
        multipleFileUploadActions.loadFilesWithContent(files).then(function (files) {
          multipleFileUploadStateMutations.replaceFiles(files);
        });
      },
      removeFile: function removeFile(index) {
        multipleFileUploadStateMutations.removeFile(index);
      },
      closeErrorPopover: function closeErrorPopover() {
        multipleFileUploadStateMutations.clearPopoverErrorMessage();
      }
    }
  };
}

module.exports = {
  create: getBehaviour
};

});