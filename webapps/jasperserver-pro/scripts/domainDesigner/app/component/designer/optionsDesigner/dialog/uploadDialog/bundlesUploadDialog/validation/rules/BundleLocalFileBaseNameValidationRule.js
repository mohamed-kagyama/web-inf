define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var resourcePropertiesUtil = require("../../../../../../../../model/util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var BundleLocalFileBaseNameValidationRule = function BundleLocalFileBaseNameValidationRule(options) {
  this.initialize(options);
};

_.extend(BundleLocalFileBaseNameValidationRule.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'validate');

    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  validate: function validate(files, uploadedFiles) {
    var sourceFileName = this._getLocalFilesSourceFileName(files, uploadedFiles);

    var result = _.reduce(files, function (memo, file) {
      var fileName = file.name;

      if (resourcePropertiesUtil.isSameBundleBaseBase(fileName, sourceFileName)) {
        memo.validFiles.push(file);
      } else {
        memo.invalidFiles.push(file);
      }

      return memo;
    }, {
      invalidFiles: [],
      validFiles: [],
      errorMessage: i18nMessage('domain.designer.advanced.options.bundlesUploadDialog.differentFileBaseName')
    }, this);

    if (result.invalidFiles.length) {
      return result;
    }
  },
  _getLocalFilesSourceFileName: function _getLocalFilesSourceFileName(files, uploadedFiles) {
    var bundles = this.clientResourcePropertiesService.getBundles();

    if (bundles[0]) {
      return this._getBundleName(bundles[0]);
    } else if (uploadedFiles[0]) {
      return uploadedFiles[0].name;
    } else {
      return files[0].name;
    }
  },
  _getBundleName: function _getBundleName(bundle) {
    return resourcePropertiesUtil.getBundleName(bundle);
  }
});

module.exports = BundleLocalFileBaseNameValidationRule;

});