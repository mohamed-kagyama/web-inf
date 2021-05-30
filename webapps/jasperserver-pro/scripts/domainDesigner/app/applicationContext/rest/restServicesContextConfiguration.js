define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var endpointsEnum = require("../../../rest/enum/endpointsEnum");

var ResourcesService = require("../../../rest/service/ResourcesService");

var MetadataServiceCache = require("../../util/cache/MetadataServiceCache");

var ProfileAttributesService = require("../../../rest/ProfileAttributesService");

var ProfileAttributesCache = require("../../util/cache/ProfileAttributesCache");

var RestMetadataService = require("../../../rest/service/RestMetadataService");

var DerivedTableMetadataService = require("../../../rest/service/DerivedTableMetadataService");

var ValidationService = require("../../../rest/service/ValidationService");

var ConnectionService = require("../../../rest/service/ConnectionService");

var ContextFactory = require("../../../rest/executor/ContextFactory");

var ContextExecutor = require("../../../rest/executor/ContextExecutor");

var contextUUIDUrlProvider = require("../../../rest/executor/contextUUIDUrlProvider");

var SimpleCache = require("../../../util/cache/SimpleCache");

var CompositeCacheCleaner = require("../../util/cache/CompositeCacheCleaner");

var DefaultSchemaAwareProfileAttributeResolver = require("../../model/resolver/DefaultSchemaAwareProfileAttributeResolver");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createCacheForRestServices(context, options) {
  context.register('profileAttributesServiceCache', new ProfileAttributesCache());
  context.register('defaultSchemaAwareProfileAttributeResolver', new DefaultSchemaAwareProfileAttributeResolver({
    dataStore: context.get('schemaDataStore'),
    profileAttributesServiceCache: context.get('profileAttributesServiceCache')
  }));
  context.register('contextExecutorCache', new SimpleCache());
  context.register('metadataServiceCache', new MetadataServiceCache({
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver'),
    cache: new SimpleCache()
  }));
  context.register('metadataServiceCacheForForeignKeyDiscoveryService', new MetadataServiceCache({
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver'),
    cache: new SimpleCache()
  }));
  context.register('restServicesCompositeCacheCleaner', new CompositeCacheCleaner({
    caches: [context.get('metadataServiceCache'), context.get('metadataServiceCacheForForeignKeyDiscoveryService'), context.get('contextExecutorCache')]
  }));
}

function createRESTServices(context, options) {
  context.register('contextExecutor', new ContextExecutor({
    contextFactory: new ContextFactory({
      url: endpointsEnum.CONTEXTS_SERVICE,
      request: context.get('request')
    }),
    contextUUIDUrlProvider: contextUUIDUrlProvider,
    cache: context.get('contextExecutorCache'),
    request: context.get('request')
  }));
  context.register('resourcesService', new ResourcesService({
    request: context.get('request')
  }));
  context.register('validationService', new ValidationService({
    request: context.get('request')
  }));
  context.register('restMetadataService', new RestMetadataService({
    contextExecutor: context.get('contextExecutor')
  }));
  context.register('derivedTableMetadataService', new DerivedTableMetadataService({
    contextExecutor: context.get('contextExecutor')
  }));
  context.register('profileAttributesService', new ProfileAttributesService({
    cache: context.get('profileAttributesServiceCache'),
    request: context.get('request')
  }));
  context.register('connectionService', new ConnectionService({
    request: context.get('request')
  }));
}

module.exports = function (context, options) {
  createCacheForRestServices(context, options);
  createRESTServices(context, options);
};

});