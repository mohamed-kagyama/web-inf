define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ClientDomainSchemaService = require("../../model/service/ClientDomainSchemaService");

var ClientDomainInitialDesignerStateService = require("../../model/service/ClientDomainInitialDesignerStateService");

var AsyncServerSchemaModelParserService = require("../../model/service/AsyncServerSchemaModelParserService");

var ParametrizedSchemaResolvingService = require("../../model/service/ParametrizedSchemaResolvingService");

var DesignerViewStateByDomainProvider = require("../../model/service/provider/DesignerViewStateByDomainProvider");

var DomainValidationMutations = require("../../component/validation/mutations/DomainValidationMutations");

var ClientDomainValidationService = require("../../component/validation/service/ClientDomainValidationService");

var ClientResourcePropertiesService = require("../../model/service/ClientResourcePropertiesService");

var DomainValidationCacheRefresher = require("../../component/validation/util/DomainValidationCacheRefresher");

var DataSourceFreshInfoService = require("../../component/validation/service/DataSourceFreshInfoService");

var DataSourceSelectionCheckService = require("../../component/validation/service/DataSourceSelectionCheckService");

var ViewStateModel = require("../../model/ViewStateModel");

var ViewStateModelService = require("../../model/service/ViewStateModelService");

var ServerResourcePropertiesModelSerializer = require("../../model/converter/ServerResourcePropertiesModelSerializer");

var ResourcePropertiesService = require("../../../model/resource/service/ResourcePropertiesService");

var ResourceProperties = require("../../../model/resource/model/ResourceProperties");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDomainServices(context, options) {
  context.register('clientDomainSchemaServiceForDomainSchemaValidationService', new ClientDomainSchemaService({
    domainSchemaService: context.get('domainValidationSchemaService'),
    constantDataIslandNameGenerator: context.get('constantDataIslandNameGenerator'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer'),
    dataStore: context.get('domainValidationDataStore')
  }));
  var resourceProperties = new ResourceProperties();
  var resourcePropertiesService = new ResourcePropertiesService({
    resourceProperties: resourceProperties
  });
  var viewStateModel = new ViewStateModel({}, {
    currentTab: options.defaultTab,
    currentDesigner: options.defaultDesigner,
    runtime: {
      presentationDesigner: {
        cellsWidth: options.presentationDesigner.cellsWidth
      }
    }
  });
  var serverResourcePropertiesModelSerializer = new ServerResourcePropertiesModelSerializer();
  var clientResourcePropertiesService = new ClientResourcePropertiesService({
    resourceProperties: resourceProperties,
    serverResourcePropertiesModelSerializer: serverResourcePropertiesModelSerializer,
    resourcePropertiesService: resourcePropertiesService
  });
  var viewStateModelService = new ViewStateModelService({
    viewStateModel: viewStateModel,
    dataStore: context.get('domainValidationDataStore'),
    designerViewStateMetadataDesignerFirstDataSourceSelectionProvider: context.get('designerViewStateMetadataDesignerFirstDataSourceSelectionProvider'),
    designerViewStateFiltersPositionsProvider: context.get('designerViewStateFiltersPositionsProvider'),
    designerViewStateJoinTreesStateProvider: context.get('designerViewStateJoinTreesStateProvider'),
    designerViewStateJoinsStateProvider: context.get('designerViewStateJoinsStateProvider')
  });
  context.register('designerViewStateByDomainProvider', new DesignerViewStateByDomainProvider({
    designerViewStateMetadataDesignerFirstDataSourceSelectionProvider: context.get('designerViewStateMetadataDesignerFirstDataSourceSelectionProvider'),
    designerViewStateFiltersPositionsProvider: context.get('designerViewStateFiltersPositionsProvider'),
    designerViewStateJoinTreesStateProvider: context.get('designerViewStateJoinTreesStateProvider'),
    designerViewStateJoinsStateProvider: context.get('designerViewStateJoinsStateProvider'),
    viewStateDefaultsProvider: new ViewStateModel()
  }));
  var clientDomainValidationService = new ClientDomainValidationService({
    schemaResourcesNamesAreEqualSpecification: context.get('schemaResourcesNamesAreEqualSpecification'),
    dataStore: context.get('domainValidationDataStore'),
    clientDomainSchemaService: context.get('clientDomainSchemaServiceForDomainSchemaValidationService'),
    clientResourcePropertiesService: clientResourcePropertiesService,
    viewStateModel: viewStateModel,
    designerViewStateByDomainProvider: context.get('designerViewStateByDomainProvider')
  });
  var domainValidationMutations = new DomainValidationMutations({
    dataStore: context.get('domainValidationDataStore'),
    domainSchemaService: context.get('domainValidationSchemaService'),
    resourcePropertiesService: resourcePropertiesService,
    viewStateModelService: viewStateModelService,
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  });
  context.register('resourcePropertiesForDomainSchemaValidationService', resourceProperties);
  context.register('clientResourcePropertiesServiceForDomainSchemaValidationService', clientResourcePropertiesService);
  context.register('viewStateModelForDomainSchemaValidationService', viewStateModel);
  context.register('viewStateModelServiceForDomainSchemaValidationService', viewStateModelService);
  context.register('domainValidationMutations', domainValidationMutations);
  context.register('clientDomainValidationService', clientDomainValidationService);
  context.register('parametrizedSchemaResolvingService', new ParametrizedSchemaResolvingService({
    profileAttributesService: context.get('profileAttributesServiceWithEncrytedAttributeErrorHandling')
  }));
  context.register('asyncServerSchemaModelParserService', new AsyncServerSchemaModelParserService({
    serverSchemaModelParser: context.get('serverSchemaModelParser')
  }));
  context.register('clientDomainInitialDesignerStateService', new ClientDomainInitialDesignerStateService({
    dataSourceInfoService: context.get('dataSourceInfoServiceWrappedWithLoader'),
    schemaModelConverter: context.get('schemaModelConverter'),
    serverResourcePropertiesModelParser: context.get('serverResourcePropertiesModelParser'),
    entitiesWithExpressionUpdateService: context.get('entitiesWithExpressionUpdateService'),
    parametrizedSchemaResolvingService: context.get('parametrizedSchemaResolvingService'),
    resourcesService: context.get('resourcesServiceWrappedWithLoader'),
    asyncServerSchemaModelParserService: context.get('asyncServerSchemaModelParserService'),
    designerViewStateByDomainProvider: context.get('designerViewStateByDomainProvider'),
    encryptedProfileAttributeErrorSpecification: context.get("encryptedProfileAttributeErrorSpecificationXhrWrapped")
  }));
  context.register('domainValidationCacheRefresher', new DomainValidationCacheRefresher({
    dataStore: context.get('domainValidationDataStore'),
    restServicesCompositeCacheCleaner: context.get('restServicesCompositeCacheCleaner'),
    parametrizedSchemaResolvingService: context.get('parametrizedSchemaResolvingService')
  }));
  context.register('dataSourceFreshInfoService', new DataSourceFreshInfoService({
    encryptedProfileAttributeErrorSpecification: context.get("encryptedProfileAttributeErrorSpecificationXhrWrapped"),
    domainValidationCacheRefresher: context.get('domainValidationCacheRefresher'),
    dataSourceInfoService: context.get('dataSourceInfoServiceWrappedWithNotification'),
    metadataService: context.get('metadataServiceWrappedWithNotification')
  }));
  context.register('dataSourceSelectionCheckService', new DataSourceSelectionCheckService({
    resourceService: context.get('resourcesServiceForSelectDataSource'),
    dataSourceInfoService: context.get('dataSourceInfoService')
  }));
}

module.exports = function (context, options) {
  createDomainServices(context, options);
};

});