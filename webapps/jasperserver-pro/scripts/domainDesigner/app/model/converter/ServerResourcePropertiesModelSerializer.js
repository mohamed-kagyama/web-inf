define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../util/resourcePropertiesUtil");

var subResourceTypesEnum = require("../enum/subResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BUNDLE_SERIALIZER_BY_TYPE = {};

BUNDLE_SERIALIZER_BY_TYPE[subResourceTypesEnum.FILE] = function (bundle) {
  return {
    locale: bundle.locale,
    file: {
      file: {
        label: resourcePropertiesUtil.createBundleLabelFromLabelAndLocale(bundle.label, bundle.locale),
        type: 'prop',
        content: bundle.content.base64
      }
    }
  };
};

BUNDLE_SERIALIZER_BY_TYPE[subResourceTypesEnum.FILE_REFERENCE] = function (bundle) {
  return {
    locale: bundle.locale,
    file: {
      fileReference: {
        uri: bundle.uri
      }
    }
  };
};

var SECURITY_FILE_SERIALIZER_BY_TYPE = {};

SECURITY_FILE_SERIALIZER_BY_TYPE[subResourceTypesEnum.FILE] = function (securityFile) {
  return {
    securityFile: {
      securityFile: {
        label: securityFile.label,
        type: 'xml',
        content: securityFile.content.base64
      }
    }
  };
};

SECURITY_FILE_SERIALIZER_BY_TYPE[subResourceTypesEnum.FILE_REFERENCE] = function (securityFile) {
  return {
    securityFile: {
      securityFileReference: {
        uri: securityFile.uri
      }
    }
  };
};

var ServerResourcePropertiesModelSerializer = function ServerResourcePropertiesModelSerializer(options) {};

_.extend(ServerResourcePropertiesModelSerializer.prototype, {
  serialize: function serialize(resourceProperties, useContentInsteadOfResourceReferenceForSubResources) {
    var json = resourceProperties.toJSON();

    var result = _.omit(json, 'securityFile', 'dataSources', 'bundles');

    _.extend(result, this._serializeDataSource(json));

    _.extend(result, this._serializeBundles(json, useContentInsteadOfResourceReferenceForSubResources));

    _.extend(result, this._serializeSecurityFile(json, useContentInsteadOfResourceReferenceForSubResources));

    return result;
  },
  _serializeBundles: function _serializeBundles(json, useContentInsteadOfResourceReference) {
    var result = {},
        self = this;

    if (json.bundles) {
      result = {
        bundles: json.bundles.map(function (bundle) {
          var serialize = self._getSerializer({
            map: BUNDLE_SERIALIZER_BY_TYPE,
            type: bundle.type,
            useContent: useContentInsteadOfResourceReference,
            content: bundle.content
          });

          return serialize(bundle);
        })
      };
    }

    return result;
  },
  _getSerializer: function _getSerializer(options) {
    var map = options.map,
        type = options.type,
        content = options.content,
        useContent = options.useContent;

    if (useContent && content) {
      type = subResourceTypesEnum.FILE;
    }

    return map[type];
  },
  _serializeSecurityFile: function _serializeSecurityFile(resourceProperties, useContentInsteadOfResourceReference) {
    var result = {},
        securityFile = resourceProperties.securityFile,
        self = this;

    if (securityFile) {
      var serialize = self._getSerializer({
        map: SECURITY_FILE_SERIALIZER_BY_TYPE,
        type: securityFile.type,
        useContent: useContentInsteadOfResourceReference,
        content: securityFile.content
      });

      result = serialize(securityFile);
    }

    return result;
  },
  _serializeDataSource: function _serializeDataSource(json) {
    var dataSourceUri = _.chain(json.dataSources).values().first().value();

    return {
      dataSource: {
        dataSourceReference: {
          uri: dataSourceUri
        }
      }
    };
  }
});

module.exports = ServerResourcePropertiesModelSerializer;

});