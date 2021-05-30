define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var originalGlobalHandler;

function init(devTools) {
  originalGlobalHandler = window.onerror;

  window.onerror = function (message, source, lineNumber, columnNumber, error) {
    var errorState = {
      message: message,
      source: source,
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      stack: error.stack
    };
    devTools.setError(errorState);
  };
}

function remove() {
  window.onerror = originalGlobalHandler;
}

module.exports = {
  init: init,
  remove: remove
};

});