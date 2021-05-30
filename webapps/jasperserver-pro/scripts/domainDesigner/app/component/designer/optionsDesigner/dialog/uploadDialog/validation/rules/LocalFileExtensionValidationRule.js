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
var FILE_EXTENSION_SEPARATOR = '.';

var LocalFileExtensionValidationRule = function LocalFileExtensionValidationRule(options) {
  this.initialize(options);
};

_.extend(LocalFileExtensionValidationRule.prototype, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.errorMessage = options.errorMessage;
  },
  validate: function validate(files) {
    var expectedFileExtension = this.store.accept;

    var result = _.reduce(files, function (memo, file) {
      var fileName = file.name,
          fileExtension = FILE_EXTENSION_SEPARATOR + fileName.split(FILE_EXTENSION_SEPARATOR).pop();

      var extensionIsMatching = this._matchExtension(fileExtension, expectedFileExtension);

      if (extensionIsMatching) {
        memo.validFiles.push(file);
      } else {
        memo.invalidFiles.push(file);
      }

      return memo;
    }, {
      invalidFiles: [],
      validFiles: [],
      errorMessage: i18nMessage(this.errorMessage, expectedFileExtension)
    }, this);

    if (result.invalidFiles.length) {
      return result;
    }
  },
  _matchExtension: function _matchExtension(fileExtension, allowedExtension) {
    return String(allowedExtension).indexOf(fileExtension.toLowerCase()) >= 0;
  }
});

module.exports = LocalFileExtensionValidationRule;

});