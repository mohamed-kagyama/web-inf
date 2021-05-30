define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function checkForDuplicatesInFilesToUpload(options) {
  var filesToUpload = options.filesToUpload,
      currentFileToUpload = options.currentFileToUpload,
      currentFileToUploadIndex = options.currentFileToUploadIndex;
  return _.find(filesToUpload, function (fileToUpload, fileToUploadIndex) {
    if (currentFileToUploadIndex > fileToUploadIndex) {
      return fileToUpload.name === currentFileToUpload.name;
    }
  });
}

module.exports = {
  validate: function validate(files, uploadedFiles) {
    var result = _.reduce(files, function (memo, file, index) {
      var fileName = file.name;

      var duplicate = _.find(uploadedFiles, function (uploadedFile) {
        return uploadedFile.name === fileName;
      });

      if (!duplicate) {
        duplicate = checkForDuplicatesInFilesToUpload({
          filesToUpload: files,
          currentFileToUpload: file,
          currentFileToUploadIndex: index
        });
      }

      if (duplicate) {
        memo.invalidFiles.push(file);
      } else {
        memo.validFiles.push(file);
      }

      return memo;
    }, {
      invalidFiles: [],
      validFiles: [],
      errorMessage: i18nMessage('domain.designer.advanced.options.uploadDialog.duplicateFileName')
    }, this);

    if (result.invalidFiles.length) {
      return result;
    }
  }
};

});