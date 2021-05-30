define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getMutations(options) {
  var store = options.store;
  return {
    selectFile: function selectFile(file) {
      store.file = file;
    },
    setErrorMessage: function setErrorMessage(errorMessage) {
      store.errorMessage = errorMessage;
    },
    clearErrorMessage: function clearErrorMessage() {
      store.errorMessage = '';
    }
  };
}

module.exports = {
  create: getMutations
};

});