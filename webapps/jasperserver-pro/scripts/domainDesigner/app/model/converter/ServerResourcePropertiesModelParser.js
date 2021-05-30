define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../util/resourcePropertiesUtil");

var subResourceTypesEnum = require("../enum/subResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ServerResourcePropertiesModelParser = function ServerResourcePropertiesModelParser(options) {};

_.extend(ServerResourcePropertiesModelParser.prototype, {
  parse: function parse(domain, options) {
    options = options || {};
    var json = {
      version: domain.version,
      permissionMask: domain.permissionMask,
      creationDate: domain.creationDate,
      updateDate: domain.updateDate,
      label: domain.label,
      description: domain.description,
      uri: domain.uri
    };

    _.extend(json, this._parseDataSources(domain));

    _.extend(json, this._parseSecurityFile(domain, options));

    _.extend(json, this._parseBundles(domain, options));

    return json;
  },
  _parseBundles: function parseBundles(domain, options) {
    var result = {};

    if (domain.bundles) {
      var bundles = domain.bundles,
          bundlesContent = options.bundlesContent;
      bundles = bundles.map(function (bundle, i) {
        var file = bundle.file,
            value = resourcePropertiesUtil.getFirstKeyValue(file);
        var result = {
          locale: bundle.locale,
          label: resourcePropertiesUtil.parseBundleLabelFromUrl(value.uri, bundle.locale),
          type: subResourceTypesEnum.FILE_REFERENCE,
          uri: value.uri
        };

        if (bundlesContent && bundlesContent.length > 0 && bundlesContent[i]) {
          result.content = bundlesContent[i];
        }

        return result;
      });
      result = {
        bundles: bundles
      };
    }

    return result;
  },
  _parseSecurityFile: function parseSecurityFile(domain, options) {
    var securityFile = domain.securityFile,
        result = {};

    if (securityFile) {
      securityFile = resourcePropertiesUtil.getFirstKeyValue(securityFile);
      result = {
        securityFile: {
          type: subResourceTypesEnum.FILE_REFERENCE,
          uri: securityFile.uri,
          label: securityFile.label
        }
      };

      if (options.securityFileContent) {
        result.securityFile.content = options.securityFileContent;
      }
    }

    return result;
  },
  _parseDataSources: function parseDataSources(domain) {
    var result = {};

    if (domain.schema) {
      var dataSourceResource = _.chain(domain.schema.resources).pluck('group').compact().first().value();

      if (dataSourceResource) {
        result = {
          dataSources: {}
        };
        result.dataSources[dataSourceResource.name] = resourcePropertiesUtil.getEmbeddedResourceUri(domain.dataSource);
      }
    }

    return result;
  }
});

module.exports = ServerResourcePropertiesModelParser;

});