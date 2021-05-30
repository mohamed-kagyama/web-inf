define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getMutations(options) {
  var store = options.store;
  return {
    addFiles: function addFiles(files) {
      files = store.files.concat(files);
      store.files = files;
    },
    replaceFiles: function replaceFiles(files) {
      store.files = files;
    },
    removeFile: function removeFile(index) {
      store.files.splice(index, 1);
    },
    setPopoverErrorMessage: function setPopoverErrorMessage(errorMessage) {
      store.popover.errorMessage = errorMessage;
    },
    clearPopoverErrorMessage: function clearPopoverErrorMessage() {
      store.popover.errorMessage = '';
    }
  };
}

module.exports = {
  create: getMutations
};

});