define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function filterAlreadyAddedFiles(target, source) {
  return _.filter(target, function (targetFile) {
    var fileAlreadyAdded = _.find(source, function (sourceFile) {
      return sourceFile.index === targetFile.index;
    });

    return !fileAlreadyAdded;
  });
}

module.exports = {
  mergeErrors: function mergeErrors(errors) {
    var result = _.reduce(errors, function (memo, error) {
      if (!error) {
        return memo;
      }

      var validFilesToAdd = filterAlreadyAddedFiles(error.validFiles, memo.validFiles);
      memo.validFiles = memo.validFiles.concat(validFilesToAdd);
      var invalidFilesToAdd = filterAlreadyAddedFiles(error.invalidFiles, memo.invalidFiles);
      memo.invalidFiles = memo.invalidFiles.concat(invalidFilesToAdd);
      memo.errorMessage = memo.errorMessage.concat(error.errorMessage);
      return memo;
    }, {
      invalidFiles: [],
      validFiles: [],
      errorMessage: []
    }, this);

    return _.extend({}, result, {
      validFiles: filterAlreadyAddedFiles(result.validFiles, result.invalidFiles)
    });
  }
};

});