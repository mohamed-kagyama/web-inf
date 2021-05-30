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
module.exports = {
  validate: function validate(files) {
    var result = _.reduce(files, function (memo, file) {
      var fileContent = file.content;

      if (fileContent) {
        memo.validFiles.push(file);
      } else {
        memo.invalidFiles.push(file);
      }

      return memo;
    }, {
      invalidFiles: [],
      validFiles: [],
      errorMessage: i18nMessage('domain.designer.advanced.options.uploadDialog.emptyFilesContent')
    });

    if (result.invalidFiles.length) {
      return result;
    }
  }
};

});