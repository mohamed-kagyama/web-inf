define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var mimeTypes = require("../enum/mimeTypesEnum");

var urlParamsUtil = require("../../util/urlParamsUtil");

var endpointsEnum = require("../enum/endpointsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationService = function ValidationService(options) {
  this.initialize(options);
};

_.extend(ValidationService.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.request = options.request;
  },
  validateDOMElCollection: function validateDOMElCollection(expressionContexts) {
    var data = {
      expressionContexts: expressionContexts.map(function (expressionContext) {
        return _.extend({}, expressionContext, {
          nonStrictMode: true //for compatibility with legacy domain designer

        });
      })
    };
    return this.request({
      type: 'POST',
      headers: {
        'Accept': mimeTypes.GENERIC_JSON
      },
      processData: false,
      contentType: mimeTypes.DOM_EL_COLLECTION_CONTEXT,
      dataType: 'json',
      data: JSON.stringify(data),
      url: endpointsEnum.CONTEXTS_SERVICE
    });
  },
  validateDOMEl: function validateDOMEl(options) {
    var data = _.extend({}, options, {
      nonStrictMode: true //for compatibility with legacy domain designer

    });

    return this.request({
      type: 'POST',
      headers: {
        'Accept': mimeTypes.GENERIC_JSON
      },
      processData: false,
      contentType: mimeTypes.DOM_EL_CONTEXT,
      dataType: 'json',
      data: JSON.stringify(data),
      url: endpointsEnum.CONTEXTS_SERVICE
    });
  },
  validateDomain: function validateDomain(schema, options) {
    var url = urlParamsUtil.addUrlParams(endpointsEnum.CONTEXTS_SERVICE, options.uriParams) || endpointsEnum.CONTEXTS_SERVICE;
    return this.request({
      type: 'POST',
      headers: {
        'Accept': mimeTypes.DOMAIN_RESOURCE
      },
      processData: false,
      contentType: mimeTypes.DOMAIN_RESOURCE,
      dataType: 'json',
      data: JSON.stringify(schema),
      url: url
    });
  },
  validateDomainByUri: function validateDomainByUri(uri, options) {
    var url = urlParamsUtil.addUrlParams(endpointsEnum.CONTEXTS_SERVICE, options.uriParams) || endpointsEnum.CONTEXTS_SERVICE;
    return this.request({
      type: 'POST',
      headers: {
        'Accept': mimeTypes.DOMAIN_RESOURCE
      },
      processData: false,
      contentType: mimeTypes.RESOURCE_LOOKUP,
      dataType: 'json',
      data: JSON.stringify({
        uri: uri
      }),
      url: url
    });
  }
});

module.exports = ValidationService;

});