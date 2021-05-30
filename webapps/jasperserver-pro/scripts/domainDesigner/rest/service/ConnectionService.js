define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var endpointsEnum = require("../enum/endpointsEnum");

var mimeTypesEnum = require("../enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ConnectionService = function ConnectionService(options) {
  this.initialize(options);
};

_.extend(ConnectionService.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.request = options.request;
  },
  testConnection: function testConnection(dataSourceUri) {
    return this.request({
      type: 'POST',
      headers: {
        'Accept': mimeTypesEnum.RESOURCE_LOOKUP
      },
      processData: false,
      contentType: mimeTypesEnum.RESOURCE_LOOKUP,
      dataType: 'json',
      data: JSON.stringify({
        uri: dataSourceUri
      }),
      url: endpointsEnum.CONTEXTS_SERVICE
    });
  }
});

module.exports = ConnectionService;

});