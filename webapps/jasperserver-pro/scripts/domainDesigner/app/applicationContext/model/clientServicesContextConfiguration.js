define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ClientDomainService = require("../../model/service/ClientDomainService");

var ClientDomainSchemaService = require("../../model/service/ClientDomainSchemaService");

var ClientDomainSchemaCalcFieldsService = require("../../model/service/ClientDomainSchemaCalcFieldsService");

var ClientResourcePropertiesService = require("../../model/service/ClientResourcePropertiesService");

var ClientDomainSchemaFiltersService = require("../../model/service/ClientDomainSchemaFiltersService");

var ClientDomainSchemaJoinsDesignerService = require("../../model/service/ClientDomainSchemaJoinsDesignerService");

var ClientDomainSchemaMetadataService = require("../../model/service/ClientDomainSchemaMetadataService");

var ClientDomainSchemaPathGenerationService = require("../../model/service/ClientDomainSchemaPathGenerationService");

var ClientDomainSchemaAdvancedOptionsService = require("../../model/service/ClientDomainSchemaAdvancedOptionsService");

var ClientCurrentDesignerStateService = require("../../model/service/ClientCurrentDesignerStateService");

var ClientDataSourceGroupService = require("../../model/service/ClientDataSourceGroupService");

var ViewStateModelQueryService = require("../../model/service/ViewStateModelQueryService");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createClientServices(context, options) {
  context.register('clientDomainSchemaService', new ClientDomainSchemaService({
    domainSchemaService: context.get('domainSchemaService'),
    constantDataIslandNameGenerator: context.get('constantDataIslandNameGenerator'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer'),
    dataStore: context.get('schemaDataStore')
  }));
  context.register('clientDataSourceGroupService', new ClientDataSourceGroupService({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    profileAttributesServiceCache: context.get('profileAttributesServiceCache')
  }));
  context.register('clientDomainSchemaMetadataService', new ClientDomainSchemaMetadataService({
    dataStore: context.get('schemaDataStore'),
    clientDataSourceGroupService: context.get('clientDataSourceGroupService')
  }));
  context.register('clientDomainSchemaFiltersService', new ClientDomainSchemaFiltersService({
    dataStore: context.get('schemaDataStore')
  }));
  context.register('clientDomainSchemaJoinsDesignerService', new ClientDomainSchemaJoinsDesignerService({
    dataStore: context.get('schemaDataStore'),
    joinTreeNameSuffixGenerator: new SequenceGenerator()
  }));
  context.register('clientDomainSchemaCalcFieldsService', new ClientDomainSchemaCalcFieldsService({
    domainSchemaService: context.get('domainSchemaService'),
    dataStore: context.get('schemaDataStore')
  }));
  context.register('clientDomainSchemaAdvancedOptionsService', new ClientDomainSchemaAdvancedOptionsService({
    dataStore: context.get('schemaDataStore')
  }));
  var clientDomainSchemaPathGenerationService = new ClientDomainSchemaPathGenerationService({
    dataStore: context.get('schemaDataStore')
  });
  var clientResourcePropertiesService = new ClientResourcePropertiesService({
    resourcePropertiesService: context.get('resourcePropertiesService'),
    serverResourcePropertiesModelSerializer: context.get('serverResourcePropertiesModelSerializer'),
    resourceProperties: context.get('resourcePropertiesReadOnlyFacade')
  });
  context.register('clientResourcePropertiesService', clientResourcePropertiesService);
  context.register('clientDomainSchemaPathGenerationService', clientDomainSchemaPathGenerationService);
  context.register('clientDomainService', new ClientDomainService({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register('clientCurrentDesignerStateService', new ClientCurrentDesignerStateService({
    dataStore: context.get('schemaDataStore'),
    resourceProperties: context.get('resourcePropertiesReadOnlyFacade'),
    viewStateModel: context.get('viewStateModelReadOnlyFacade')
  }));
  context.register('viewStateModelQueryService', new ViewStateModelQueryService({
    viewStateModel: context.get('viewStateModelReadOnlyFacade')
  }));
}

module.exports = createClientServices;

});