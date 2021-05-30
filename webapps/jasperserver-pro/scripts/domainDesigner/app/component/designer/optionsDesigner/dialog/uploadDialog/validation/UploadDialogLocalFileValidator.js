define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var indexLocalFilesUtil = require("../util/indexLocalFilesUtil");

var mergeValidationErrorsUtil = require("../util/mergeValidationErrorsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadDialogLocalFileValidator = function UploadDialogLocalFileValidator(options) {
  this.initialize(options);
};

_.extend(UploadDialogLocalFileValidator.prototype, {
  initialize: function initialize(options) {
    this.validationRules = options.validationRules || [];
  },
  validate: function validate(files, uploadedFiles) {
    if (!files.length) {
      return;
    }

    files = indexLocalFilesUtil.indexFiles(files);

    var validationRulesResult = _.map(this.validationRules, function (validationRule) {
      return validationRule.validate(files, uploadedFiles);
    });

    var result = mergeValidationErrorsUtil.mergeErrors(validationRulesResult);

    if (result.invalidFiles.length) {
      return result;
    }
  }
});

module.exports = UploadDialogLocalFileValidator;

});