define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ExpressionBulkUpdateService = require("../../model/service/ExpressionBulkUpdateService");

var DataSourceInfoService = require("../../model/service/DataSourceInfoService");

var MetadataService = require("../../model/service/MetadataService");

var ObjectDOMElExpressionsToStringConversionService = require("../../model/service/objectDOMElExpressionsToStringConversionService/ObjectDOMElExpressionsToStringConversionService");

var EntitiesWithExpressionUpdateService = require("../../model/service/entitiesWithExpressionUpdateService/EntitiesWithExpressionUpdateService");

var ComplexFilterWithoutStringEntitiesProvider = require("../../model/service/entitiesWithExpressionUpdateService/entitiesProvider/ComplexFilterWithoutStringEntitiesProvider");

var ComplexFilterWithoutStringExpressionUpdater = require("../../model/service/entitiesWithExpressionUpdateService/expressionUpdater/ComplexFilterWithoutStringExpressionUpdater");

var ComplexFilterWithoutStringExpressionWithContextProvider = require("../../model/service/entitiesWithExpressionUpdateService/expressionWithContextProvider/ComplexFilterWithoutStringExpressionWithContextProvider");

var complexFilterExpressionVariableMapper = require("../../model/service/entitiesWithExpressionUpdateService/expressionWithContextProvider/mapper/complexFilterExpressionVariableMapper");

var ConstantJoinExpressionEntitiesProvider = require("../../model/service/entitiesWithExpressionUpdateService/entitiesProvider/ConstantJoinExpressionEntitiesProvider");

var ConstantJoinExpressionValueUpdater = require("../../model/service/entitiesWithExpressionUpdateService/expressionUpdater/ConstantJoinExpressionValueUpdater");

var ConstantJoinExpressionWithContextProvider = require("../../model/service/entitiesWithExpressionUpdateService/expressionWithContextProvider/ConstantJoinExpressionWithContextProvider");

var constantJoinExpressionObjectFactory = require("../../model/service/entitiesWithExpressionUpdateService/factory/constantJoinExpressionObjectFactory");

var constantJoinExpressionStringFactory = require("../../model/service/entitiesWithExpressionUpdateService/factory/constantJoinExpressionStringFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createMetadataServices(context, options) {
  var metadataService = new MetadataService({
    restMetadataService: context.get('restMetadataService'),
    metadataServiceCache: context.get('metadataServiceCache'),
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver')
  }),
      metadataServiceWrappedWithLoader = new MetadataService({
    restMetadataService: context.get('restMetadataServiceWrappedWithLoader'),
    metadataServiceCache: context.get('metadataServiceCache'),
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver')
  }),
      metadataServiceWrappedWithNotification = new MetadataService({
    restMetadataService: context.get('restMetadataServiceWrappedWithNotification'),
    metadataServiceCache: context.get('metadataServiceCache'),
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver')
  }),
      metadataServiceForSelectDataSource = new MetadataService({
    restMetadataService: context.get('restMetadataServiceForSelectDataSource'),
    metadataServiceCache: context.get('metadataServiceCache'),
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver')
  }),
      metadataServiceWrappedWithNotificationForForeignKeyDiscoveryService = new MetadataService({
    restMetadataService: context.get('restMetadataServiceWrappedWithNotificationForForeignKeyDiscoveryService'),
    metadataServiceCache: context.get('metadataServiceCacheForForeignKeyDiscoveryService'),
    profileAttributeResolver: context.get('defaultSchemaAwareProfileAttributeResolver')
  });
  context.register('metadataService', metadataService);
  context.register('metadataServiceWrappedWithLoader', metadataServiceWrappedWithLoader);
  context.register('metadataServiceWrappedWithNotificationForForeignKeyDiscoveryService', metadataServiceWrappedWithNotificationForForeignKeyDiscoveryService);
  context.register('metadataServiceWrappedWithNotification', metadataServiceWrappedWithNotification);
  context.register('metadataServiceForSelectDataSource', metadataServiceForSelectDataSource);
}

function createClientServices(context, options) {
  createMetadataServices(context, options);
  var complexFilterWithoutStringExpressionWithContextProvider = new ComplexFilterWithoutStringExpressionWithContextProvider({
    complexFilterExpressionVariableMapper: complexFilterExpressionVariableMapper
  });
  context.register('entitiesWithExpressionUpdateService', new EntitiesWithExpressionUpdateService({
    validationService: context.get('validationServiceWrappedWithNotification'),
    entitiesProviders: [new ComplexFilterWithoutStringEntitiesProvider(), new ConstantJoinExpressionEntitiesProvider()],
    expressionWithContextProviders: [complexFilterWithoutStringExpressionWithContextProvider, new ConstantJoinExpressionWithContextProvider({
      constantJoinExpressionObjectFactory: constantJoinExpressionObjectFactory
    })],
    expressionUpdaters: [new ComplexFilterWithoutStringExpressionUpdater(), new ConstantJoinExpressionValueUpdater({
      constantJoinExpressionStringFactory: constantJoinExpressionStringFactory
    })]
  }));
  context.register('expressionBulkUpdateService', new ExpressionBulkUpdateService({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    validationService: context.get('validationServiceWrappedWithNotification')
  }));
  context.register('dataSourceInfoService', new DataSourceInfoService({
    metadataService: context.get('metadataServiceForSelectDataSource')
  }));
  context.register('dataSourceInfoServiceWrappedWithLoader', new DataSourceInfoService({
    metadataService: context.get('metadataServiceWrappedWithLoader')
  }));
  context.register('dataSourceInfoServiceWrappedWithNotification', new DataSourceInfoService({
    metadataService: context.get('metadataServiceWrappedWithNotification')
  }));
  context.register('objectDOMElExpressionsToStringConversionService', new ObjectDOMElExpressionsToStringConversionService({
    entityFactory: context.get('entityFactory'),
    validationService: context.get('validationService'),
    filterExpressionsSerializer: context.get('filterExpressionsSerializer'),
    complexFilterExpressionsWithContextProvider: complexFilterWithoutStringExpressionWithContextProvider
  }));
}

module.exports = function (context, options) {
  createClientServices(context, options);
};

});