define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var subResourceTypesEnum = require("../enum/subResourceTypesEnum");

var fileExtensionEnum = require("../enum/fileExtensionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BUNDLE_SUFFIX_REGEXP = new RegExp('.*(?:(?:[_])([a-z][a-z]))(?:[_]){0,1}([A-Z][A-Z]){0,1}(?:(?:[_])([^_]*)){0,1}.properties');
var FILES_SUFIX = '_files';

function getFirstKey(obj) {
  obj = obj || {};
  return _.keys(obj)[0];
}

function getFirstKeyValue(obj) {
  var key = getFirstKey(obj);
  return obj[key];
}

function getFirstKeyProperty(obj, propertyName) {
  return getFirstKeyValue(obj)[propertyName];
}

function getFirstDataSourceName(dataSources) {
  return getFirstKey(dataSources);
}

function getEmbeddedResourceUri(dataSource) {
  return getFirstKeyProperty(dataSource, 'uri');
}

function parseFileNameFromUrl(url) {
  var splittedUrl = url.split('/');
  return splittedUrl[splittedUrl.length - 1];
}

function parseBundleLabelFromFileName(fileName, locale) {
  var localeLength = locale.length > 0 ? locale.length + 1 : 0;
  var lastDotPosition = fileName.lastIndexOf('.'),
      label = fileName.substr(0, lastDotPosition);
  return label.substr(0, label.length - localeLength);
}

function parseBundleLabelFromUrl(url, locale) {
  var fileNameFromUrl = parseFileNameFromUrl(url);
  return parseBundleLabelFromFileName(fileNameFromUrl, locale);
}

function createBundleLabelFromLabelAndLocale(label, locale) {
  var bundleLabel = label;

  if (locale) {
    bundleLabel = bundleLabel + '_' + locale;
  }

  return bundleLabel + fileExtensionEnum.PROPERTIES;
}

function isSameBundleBaseBase(targetBundleName, sourceBundleName) {
  var fileExtension = fileExtensionEnum.PROPERTIES;
  var targetBundleSuffix = getBundleLocaleSuffixFromFileName(targetBundleName),
      sourceBundleSuffix = getBundleLocaleSuffixFromFileName(sourceBundleName);
  var targetBundleNameLength = targetBundleName.length - targetBundleSuffix.length - fileExtension.length,
      targetBundleBase = targetBundleName.substr(0, targetBundleNameLength);
  var sourceBundleNameLength = sourceBundleName.length - sourceBundleSuffix.length - fileExtension.length,
      sourceBundleBase = sourceBundleName.substr(0, sourceBundleNameLength);
  return targetBundleBase === sourceBundleBase;
}

function getBundleLocaleSuffixFromFileName(fileName) {
  var res = BUNDLE_SUFFIX_REGEXP.exec(fileName);

  if (res) {
    var language = '_' + res[1];
    var country = res[2] ? '_' + res[2] : '';
    var variant = res[3] ? '_' + res[3] : '';
    return language + country + variant;
  } else {
    return '';
  }
}

function getBundleLocaleNameFromFileName(fileName) {
  var locale = getBundleLocaleSuffixFromFileName(fileName);
  return locale ? locale.substr(1) : '';
}

function createSecurityFileLabelForDownload(securityFileName) {
  var endsWithXML = securityFileName.substr(securityFileName.length - fileExtensionEnum.XML.length) === fileExtensionEnum.XML;

  if (!endsWithXML) {
    securityFileName = securityFileName + fileExtensionEnum.XML;
  }

  return securityFileName;
}

function getBundleName(bundle) {
  if (bundle.type === subResourceTypesEnum.FILE_REFERENCE) {
    return parseFileNameFromUrl(bundle.uri);
  } else {
    return createBundleLabelFromLabelAndLocale(bundle.label, bundle.locale);
  }
}

function isResourceDomainSubResource(resourceUri, domainUri) {
  return resourceUri.indexOf(domainUri + FILES_SUFIX) === 0;
}

module.exports = {
  isSameBundleBaseBase: isSameBundleBaseBase,
  isResourceDomainSubResource: isResourceDomainSubResource,
  getBundleLocaleNameFromFileName: getBundleLocaleNameFromFileName,
  getBundleLocaleSuffixFromFileName: getBundleLocaleSuffixFromFileName,
  createBundleLabelFromLabelAndLocale: createBundleLabelFromLabelAndLocale,
  parseFileNameFromUrl: parseFileNameFromUrl,
  parseBundleLabelFromFileName: parseBundleLabelFromFileName,
  parseBundleLabelFromUrl: parseBundleLabelFromUrl,
  getFirstKeyValue: getFirstKeyValue,
  getFirstDataSourceName: getFirstDataSourceName,
  getEmbeddedResourceUri: getEmbeddedResourceUri,
  createSecurityFileLabelForDownload: createSecurityFileLabelForDownload,
  getBundleName: getBundleName
};

});