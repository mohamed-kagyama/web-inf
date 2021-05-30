define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var resourcePropertiesUtil = require("../../../../model/util/resourcePropertiesUtil");

var subResourceTypesEnum = require("../../../../model/enum/subResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var OptionsDesignerResourcePropertiesToStoreConverter = function OptionsDesignerResourcePropertiesToStoreConverter(options) {};

_.extend(OptionsDesignerResourcePropertiesToStoreConverter.prototype, {
  convert: function convert(state) {
    var domainUri = state.resourceProperties.uri;
    return {
      bundles: this._getBundles(state.resourceProperties.bundles, domainUri),
      // TODO: @gtoffoli the security file should be moved to the securityDesigner's store
      securityFile: this._getSecurityFile(state.resourceProperties.securityFile, domainUri)
    };
  },
  _getSecurityFile: function _getSecurityFile(securityFile, domainUri) {
    if (!securityFile) {
      return null;
    }

    return _.extend({}, securityFile, {
      location: this._getResourceLocation(securityFile, domainUri),
      computedLabel: this._getSecurityFileLabel(securityFile)
    });
  },
  _getSecurityFileLabel: function _getSecurityFileLabel(securityFile) {
    var label;

    if (securityFile.type === subResourceTypesEnum.FILE_REFERENCE) {
      label = resourcePropertiesUtil.parseFileNameFromUrl(securityFile.uri);
    } else if (securityFile.type === subResourceTypesEnum.FILE) {
      label = securityFile.label;
    }

    return label;
  },
  _getBundles: function _getBundles(bundles, domainUri) {
    return _.map(bundles, function (bundle) {
      return _.extend({}, bundle, {
        location: this._getResourceLocation(bundle, domainUri),
        computedLabel: this._getBundleLabel(bundle)
      });
    }, this);
  },
  _getBundleLabel: function _getBundleLabel(bundle) {
    if (bundle.type === subResourceTypesEnum.FILE_REFERENCE) {
      return resourcePropertiesUtil.parseFileNameFromUrl(bundle.uri);
    } else if (bundle.type === subResourceTypesEnum.FILE) {
      return resourcePropertiesUtil.createBundleLabelFromLabelAndLocale(bundle.label, bundle.locale);
    }
  },
  _getResourceLocation: function _getResourceLocation(resource, domainUri) {
    var location,
        isFile = resource.type === subResourceTypesEnum.FILE,
        isFileReference = resource.type === subResourceTypesEnum.FILE_REFERENCE;

    if (isFile || resourcePropertiesUtil.isResourceDomainSubResource(resource.uri, domainUri)) {
      location = i18nMessage('domain.designer.advanced.options.resource.local.file');
    } else if (isFileReference) {
      location = resource.uri;
    }

    return location;
  }
});

module.exports = OptionsDesignerResourcePropertiesToStoreConverter;

});