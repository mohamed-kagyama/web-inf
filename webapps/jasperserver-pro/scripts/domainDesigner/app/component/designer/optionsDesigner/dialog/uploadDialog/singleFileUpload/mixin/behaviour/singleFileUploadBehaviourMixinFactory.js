define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getBehaviour(options) {
  var singleFileUploadActions = options.singleFileUploadActions,
      singleFileUploadStateMutations = options.singleFileUploadStateMutations;
  return {
    methods: {
      selectFile: function selectFile(file) {
        singleFileUploadActions.loadFileWithContent(file).then(function (file) {
          singleFileUploadStateMutations.selectFile(file);
        });
      },
      setErrorMessage: function setErrorMessage(errorMessage) {
        singleFileUploadStateMutations.setErrorMessage(errorMessage);
      },
      clearErrorMessage: function clearErrorMessage() {
        singleFileUploadStateMutations.clearErrorMessage();
      }
    }
  };
}

module.exports = {
  create: getBehaviour
};

});