define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var RESOURCE_PROPERTIES_TO_OMIT = ['permissionMask', 'updateDate', 'creationDate'];

var ClientDomainSchemaService = function ClientDomainSchemaService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaService.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  serialize: function serialize() {
    var resourcePropertiesJSON = _.omit(this.clientResourcePropertiesService.serialize(), RESOURCE_PROPERTIES_TO_OMIT),
        domainJSON = this.clientDomainSchemaService.serializeWithDataAdapter();

    return _.extend(resourcePropertiesJSON, domainJSON);
  }
});

module.exports = ClientDomainSchemaService;

});