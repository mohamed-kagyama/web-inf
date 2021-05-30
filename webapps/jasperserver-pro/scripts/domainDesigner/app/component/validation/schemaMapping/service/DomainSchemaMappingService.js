define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaMappingService = function DomainSchemaMappingService(options) {
  this.initialize(options);
};

_.extend(DomainSchemaMappingService.prototype, {
  initialize: function initialize(options) {
    this.clientDomainValidationService = options.clientDomainValidationService;
    this.domainSchemaService = options.domainSchemaService;
  },
  replaceSchemas: function replaceSchemas(domainValidationSchema, schemaPairs) {
    this.domainSchemaService.reset(domainValidationSchema);
    this.domainSchemaService.mapSchemas(schemaPairs);
    return this.clientDomainValidationService.serializeToServerSchema();
  }
});

module.exports = DomainSchemaMappingService;

});