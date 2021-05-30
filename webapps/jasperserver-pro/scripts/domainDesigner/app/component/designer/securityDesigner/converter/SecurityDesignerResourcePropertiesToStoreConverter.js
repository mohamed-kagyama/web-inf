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

// The security designer keeps an internal state, and does not need a
// shared store for now. That's why the convert method is empty.
var SecurityDesignerResourcePropertiesToStoreConverter = function SecurityDesignerResourcePropertiesToStoreConverter(options) {};

_.extend(SecurityDesignerResourcePropertiesToStoreConverter.prototype, {
  convert: function convert(state) {// var domainUri = state.resourceProperties.uri;
    // return {
    //     securityFile: this._getSecurityFile(state.resourceProperties.securityFile, domainUri)
    // };
  } // _getSecurityFile: function (securityFile, domainUri) {
  //     if (!securityFile) {
  //         return null;
  //     }
  //     return _.extend({}, securityFile, {
  //         location: this._getResourceLocation(securityFile, domainUri),
  //         computedLabel: this._getSecurityFileLabel(securityFile)
  //     });
  // },
  // _getSecurityFileLabel: function (securityFile) {
  //     var label;
  //     if (securityFile.type === subResourceTypesEnum.FILE_REFERENCE) {
  //         label = resourcePropertiesUtil.parseFileNameFromUrl(securityFile.uri);
  //     } else if (securityFile.type === subResourceTypesEnum.FILE) {
  //         label = securityFile.label;
  //     }
  //     return label;
  // },
  // _getResourceLocation: function (resource, domainUri) {
  //     var location,
  //         isFile = resource.type === subResourceTypesEnum.FILE,
  //         isFileReference = resource.type === subResourceTypesEnum.FILE_REFERENCE;
  //     if (isFile || resourcePropertiesUtil.isResourceDomainSubResource(resource.uri, domainUri)) {
  //         location = i18nMessage('domain.designer.advanced.options.resource.local.file');
  //     } else if (isFileReference) {
  //         location = resource.uri;
  //     }
  //     return location;
  // }

});

module.exports = SecurityDesignerResourcePropertiesToStoreConverter;

});