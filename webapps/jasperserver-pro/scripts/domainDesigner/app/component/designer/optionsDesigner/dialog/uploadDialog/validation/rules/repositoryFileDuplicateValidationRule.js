define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../../../../../../../model/util/resourcePropertiesUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  validate: function validate(fileReferences) {
    var result = _.reduce(fileReferences, function (memo, fileReference, index) {
      var fileUri = fileReference.uri,
          fileName = resourcePropertiesUtil.parseFileNameFromUrl(fileUri);

      var duplicate = _.find(fileReferences, function (fileReferenceToUpload, fileReferenceToIndex) {
        if (index > fileReferenceToIndex) {
          return resourcePropertiesUtil.parseFileNameFromUrl(fileReferenceToUpload.uri) === fileName;
        }
      });

      if (duplicate) {
        memo.invalidFiles.push(fileReference);
      } else {
        memo.validFiles.push(fileReference);
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