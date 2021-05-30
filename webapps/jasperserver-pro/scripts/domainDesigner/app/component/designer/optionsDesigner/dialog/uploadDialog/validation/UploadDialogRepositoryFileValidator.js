define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var indexFileReferencesUtil = require("../util/indexFileReferencesUtil");

var mergeValidationErrorsUtil = require("../util/mergeValidationErrorsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadDialogRepositoryFileValidator = function UploadDialogRepositoryFileValidator(options) {
  this.initialize(options);
};

_.extend(UploadDialogRepositoryFileValidator.prototype, {
  initialize: function initialize(options) {
    this.validationRules = options.validationRules || [];
  },
  validate: function validate(fileReferences) {
    fileReferences = indexFileReferencesUtil.indexFileReferences(fileReferences);

    var validationRulesResult = _.map(this.validationRules, function (validationRule) {
      return validationRule.validate(fileReferences);
    });

    var result = mergeValidationErrorsUtil.mergeErrors(validationRulesResult);

    if (result.invalidFiles.length) {
      return result;
    }
  }
});

module.exports = UploadDialogRepositoryFileValidator;

});