define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getActions(options) {
  var fileLoader = options.fileLoader;
  return {
    loadFileWithContent: function loadFileWithContent(file) {
      return fileLoader.loadFilesWithContent(file).then(function (files) {
        return files[0];
      });
    }
  };
}

module.exports = {
  create: getActions
};

});