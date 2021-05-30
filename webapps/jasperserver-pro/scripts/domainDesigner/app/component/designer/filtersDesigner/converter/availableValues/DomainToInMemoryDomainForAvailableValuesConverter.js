define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainToInMemoryDomainForAvailableValuesConverter = function DomainToInMemoryDomainForAvailableValuesConverter(options) {
  this.domainSchemaToInMemoryDomainForAvailableValuesReducer = options.domainSchemaToInMemoryDomainForAvailableValuesReducer;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  this.serverSchemaModelSerializer = options.serverSchemaModelSerializer;
};

_.extend(DomainToInMemoryDomainForAvailableValuesConverter.prototype, {
  convert: function convert(fieldReference) {
    var dataStore = this.clientDomainSchemaService.getDataStore();
    var resourcePropertiesJSON = this.clientResourcePropertiesService.serialize(),
        reducedDomainSchema = this.domainSchemaToInMemoryDomainForAvailableValuesReducer.reduce(fieldReference, dataStore),
        domainJSON = this.serverSchemaModelSerializer.domainToJson(reducedDomainSchema);
    return _.extend(_.omit(resourcePropertiesJSON, 'securityFile', 'bundles'), domainJSON);
  }
});

module.exports = DomainToInMemoryDomainForAvailableValuesConverter;

});