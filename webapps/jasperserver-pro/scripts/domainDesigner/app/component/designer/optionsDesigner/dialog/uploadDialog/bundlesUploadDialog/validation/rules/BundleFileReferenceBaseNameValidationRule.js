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

var BundleFileReferenceBaseNameValidationRule = function BundleFileReferenceBaseNameValidationRule(options) {
  this.initialize(options);
};

_.extend(BundleFileReferenceBaseNameValidationRule.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'validate');

    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  validate: function validate(fileReferences) {
    var sourceFileName = this._getFileReferenceSourceFileName(fileReferences);

    var result = _.reduce(fileReferences, function (memo, fileReference) {
      var fileName = resourcePropertiesUtil.parseFileNameFromUrl(fileReference.uri);

      if (resourcePropertiesUtil.isSameBundleBaseBase(fileName, sourceFileName)) {
        memo.validFiles.push(fileReference);
      } else {
        memo.invalidFiles.push(fileReference);
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
  _getFileReferenceSourceFileName: function _getFileReferenceSourceFileName(fileReferences) {
    var bundles = this.clientResourcePropertiesService.getBundles();

    if (bundles[0]) {
      return this._getBundleName(bundles[0]);
    } else {
      return resourcePropertiesUtil.parseFileNameFromUrl(fileReferences[0].uri);
    }
  },
  _getBundleName: function _getBundleName(bundle) {
    return resourcePropertiesUtil.getBundleName(bundle);
  }
});

module.exports = BundleFileReferenceBaseNameValidationRule;

});