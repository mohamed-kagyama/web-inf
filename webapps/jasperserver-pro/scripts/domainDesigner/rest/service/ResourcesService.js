define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var endpoints = require("../enum/endpointsEnum");

var mimeTypes = require("../enum/mimeTypesEnum");

var urlParamsUtil = require("../../util/urlParamsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResourcesService = function ResourcesService(options) {
  options = options || {};
  this.request = options.request;
};

_.extend(ResourcesService.prototype, {
  getResource: function getResource(resourceUri, options) {
    return this._getResource(resourceUri, options);
  },
  getDomain: function getDomain(domainPath, options) {
    options = options || {};
    return this._getResource(domainPath, _.defaults(options, {
      type: mimeTypes.DOMAIN_RESOURCE
    }));
  },
  saveDomain: function saveDomain(domain, options) {
    options = options || {};
    var url = endpoints.RESOURCES_SERVICE + domain.uri,
        urlWithParams = urlParamsUtil.addUrlParams(url, options.urlParams);
    return this.request({
      url: urlWithParams,
      type: 'POST',
      dataType: 'json',
      contentType: mimeTypes.DOMAIN_RESOURCE,
      headers: {
        Accept: mimeTypes.DOMAIN_RESOURCE
      },
      data: JSON.stringify(domain)
    });
  },
  saveDomainSchemaAsJson: function saveDomainSchemaAsJson(domainSchema, options) {
    options = options || {};
    var url = endpoints.RESOURCES_SERVICE + options.uri,
        urlWithParams = urlParamsUtil.addUrlParams(url, options.urlParams);
    return this.request({
      url: urlWithParams,
      type: 'POST',
      dataType: 'json',
      contentType: mimeTypes.DOMAIN_SCHEMA_RESOURCE_JSON,
      headers: {
        Accept: mimeTypes.REPOSITORY_FILE
      },
      data: JSON.stringify(domainSchema)
    });
  },
  saveFileResourceViaDirectStreaming: function saveFileResourceViaDirectStreaming(fileResourceContent, options) {
    options = options || {};
    var url = endpoints.RESOURCES_SERVICE + options.uri,
        urlWithParams = urlParamsUtil.addUrlParams(url, options.urlParams),
        mimeType = options.fileType,
        accept = options.accept,
        description = options.description,
        name = options.name,
        dataType = options.dataType || 'json';
    return this.request({
      url: urlWithParams,
      type: 'POST',
      dataType: dataType,
      contentType: mimeType,
      headers: {
        Accept: accept,
        'Content-Description': description,
        'Content-Disposition': 'attachment; filename=' + name
      },
      data: fileResourceContent
    });
  },
  deleteResource: function deleteResource(resourceUrl) {
    return this.request({
      url: endpoints.RESOURCES_SERVICE + resourceUrl,
      type: 'DELETE'
    });
  },
  updateDomain: function updateDomain(model) {
    var url = endpoints.RESOURCES_SERVICE + model.uri;
    return this.request({
      url: url,
      type: 'PUT',
      dataType: 'json',
      contentType: mimeTypes.DOMAIN_RESOURCE,
      headers: {
        Accept: mimeTypes.GENERIC_JSON
      },
      data: JSON.stringify(model)
    });
  },
  search: function search(queryParams) {
    return this.request({
      url: endpoints.RESOURCES_SEARCH_SERVICE,
      type: 'GET',
      headers: {
        Accept: mimeTypes.GENERIC_JSON
      },
      data: queryParams,
      traditional: true
    }).then(function (response, status, xhr) {
      return {
        data: response ? response.resourceLookup : [],
        total: xhr.getResponseHeader('Total-Count')
      };
    });
  },
  _getResource: function _getResource(resourceUri, options) {
    options = options || {};
    var url = endpoints.RESOURCES_SERVICE + resourceUri,
        type = options.type || mimeTypes.GENERIC_JSON,
        dataType = options.dataType,
        urlWithParams = urlParamsUtil.addUrlParams(url, options.urlParams);
    var requestParams = {
      url: urlWithParams,
      type: 'GET',
      headers: {
        Accept: type
      }
    };

    if (dataType) {
      requestParams.dataType = dataType;
    }

    return this.request(requestParams);
  }
});

module.exports = ResourcesService;

});