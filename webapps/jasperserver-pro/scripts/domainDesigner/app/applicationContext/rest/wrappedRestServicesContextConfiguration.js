define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var LoaderForMultipleRequestsController = require("../../rest/controller/LoaderForMultipleRequestsController");

var LoaderForMultipleRequestsControllerFactory = require("../../rest/factory/LoaderForMultipleRequestsControllerFactory");

var cancelableRequestFactory = require("../../rest/request/cancelableRequestFactory");

var requestWrappedWithErrorHandlerStrategyFactory = require("../../rest/request/requestWrappedWithErrorHandlerStrategyFactory");

var ShowNotificationErrorHandlerStrategy = require("../../rest/request/strategy/ShowNotificationErrorHandlerStrategy");

var DoNotHandle400ErrorsStrategy = require("../../rest/request/strategy/DoNotHandle400ErrorsStrategy");

var ProfileAttributesServiceWithEncrytedAttributeErrorHandling = require("../../rest/service/ProfileAttributesServiceWithEncrytedAttributeErrorHandling");

var encryptedProfileAttributeErrorSpecification = require("../../rest/specification/encryptedProfileAttributeErrorSpecification");

var encryptedProfileAttributeErrorSpecificationXhrWrapper = require("../../rest/specification/encryptedProfileAttributeErrorSpecificationXhrWrapper");

var endpointsEnum = require("../../../rest/enum/endpointsEnum");

var ResourcesService = require("../../../rest/service/ResourcesService");

var ProfileAttributesService = require("../../../rest/ProfileAttributesService");

var RestMetadataService = require("../../../rest/service/RestMetadataService");

var DerivedTableMetadataService = require("../../../rest/service/DerivedTableMetadataService");

var QueryExecutionService = require("../../../rest/service/QueryExecutionService");

var ValidationService = require("../../../rest/service/ValidationService");

var ContextFactory = require("../../../rest/executor/ContextFactory");

var ContextExecutor = require("../../../rest/executor/ContextExecutor");

var contextUUIDUrlProvider = require("../../../rest/executor/contextUUIDUrlProvider");

var adhocQueryExecutionUUIDUrlProvider = require("../../../rest/executor/adhocQueryExecutionUUIDUrlProvider");

var cancelRequestWithContextFunctionFactory = require("../../rest/request/cancelRequestWithContextFunctionFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createRequestsWithLoader(context, options) {
  var loaderForMultipleRequestsControllerForDialogFactory = new LoaderForMultipleRequestsControllerFactory({
    loadingDelay: options.loader.dialog.loadingDelay,
    loadingMinDuration: options.loader.dialog.loadingMinDuration,
    LoaderForMultipleRequestsController: LoaderForMultipleRequestsController
  });
  var loaderForMultipleRequestsControllerForEmbeddedFactory = new LoaderForMultipleRequestsControllerFactory({
    loadingDelay: options.loader.embedded.loadingDelay,
    loadingMinDuration: options.loader.embedded.loadingMinDuration,
    LoaderForMultipleRequestsController: LoaderForMultipleRequestsController
  });
  var requestWithLoader = cancelableRequestFactory.create({
    request: context.get('request'),
    loaderController: loaderForMultipleRequestsControllerForDialogFactory.create({
      loaderEventBus: context.get('loaderEventBus')
    })
  });
  var cancelFunc = cancelRequestWithContextFunctionFactory.create({
    request: context.get('request')
  });
  var requestWithLoaderAndCancel = cancelableRequestFactory.create({
    request: context.get('request'),
    loaderController: loaderForMultipleRequestsControllerForDialogFactory.create({
      loaderEventBus: context.get('loaderWithCancelEventBus')
    }),
    cancelFunc: cancelFunc
  });
  var loaderControllerForDerivedTable = loaderForMultipleRequestsControllerForEmbeddedFactory.create({
    loaderEventBus: context.get('derivedTableLoaderDialogEventBus')
  });
  var requestWithLoaderAndCancelForDerivedTable = cancelableRequestFactory.create({
    request: context.get('request'),
    loaderController: loaderControllerForDerivedTable,
    cancelFunc: cancelFunc
  });
  var loaderControllerForSelectDataSource = loaderForMultipleRequestsControllerForEmbeddedFactory.create({
    loaderEventBus: context.get('selectDataSourceLoaderDialogEventBus')
  });
  var requestWithLoaderAndCancelForSelectDataSource = cancelableRequestFactory.create({
    request: context.get('request'),
    loaderController: loaderControllerForSelectDataSource,
    cancelFunc: cancelFunc
  });
  context.register('requestWithLoader', requestWithLoader);
  context.register('requestWithLoaderAndCancel', requestWithLoaderAndCancel);
  context.register('requestWithLoaderAndCancelForDerivedTable', requestWithLoaderAndCancelForDerivedTable);
  context.register('requestWithLoaderAndCancelForSelectDataSource', requestWithLoaderAndCancelForSelectDataSource);
}

function createRequestsWithNotification(context, options) {
  var showNotificationErrorHandlerStrategy = new ShowNotificationErrorHandlerStrategy({
    notification: context.get('notification')
  });
  var doNotHandle400ErrorsStrategy = new DoNotHandle400ErrorsStrategy({
    delegatingErrorHandlerStrategy: showNotificationErrorHandlerStrategy
  });
  var requestWithLoaderAndCancelAndNotification = requestWrappedWithErrorHandlerStrategyFactory.create({
    request: context.get('requestWithLoaderAndCancel'),
    errorHandlerStrategy: showNotificationErrorHandlerStrategy
  });
  var requestWithLoaderAndNotification = requestWrappedWithErrorHandlerStrategyFactory.create({
    request: context.get('requestWithLoader'),
    errorHandlerStrategy: showNotificationErrorHandlerStrategy
  });
  var requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotification = requestWrappedWithErrorHandlerStrategyFactory.create({
    request: context.get('requestWithLoaderAndCancel'),
    errorHandlerStrategy: doNotHandle400ErrorsStrategy
  });
  var requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotificationForDerivedTable = requestWrappedWithErrorHandlerStrategyFactory.create({
    request: context.get('requestWithLoaderAndCancelForDerivedTable'),
    errorHandlerStrategy: doNotHandle400ErrorsStrategy
  });
  var requestDoNotHandle400ErrorsNotificationForValidationService = requestWrappedWithErrorHandlerStrategyFactory.create({
    request: context.get('request'),
    errorHandlerStrategy: doNotHandle400ErrorsStrategy
  });
  context.register('requestWithLoaderAndNotification', requestWithLoaderAndNotification);
  context.register('requestWithLoaderAndCancelAndNotification', requestWithLoaderAndCancelAndNotification);
  context.register('requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotification', requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotification);
  context.register('requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotificationForDerivedTable', requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotificationForDerivedTable);
  context.register('requestDoNotHandle400ErrorsNotificationForValidationService', requestDoNotHandle400ErrorsNotificationForValidationService);
}

function createContextExecutors(context, options) {
  context.register('adhocQueryExecutorWithCancelableRequest', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancel'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.QUERY_EXECUTIONS_SERVICE,
      request: context.get('requestWithLoaderAndCancel')
    }),
    contextUUIDUrlProvider: adhocQueryExecutionUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
  context.register('adhocQueryExecutorWithCancelableRequestAndNotification', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancelAndNotification'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.QUERY_EXECUTIONS_SERVICE,
      request: context.get('requestWithLoaderAndCancelAndNotification')
    }),
    contextUUIDUrlProvider: adhocQueryExecutionUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
  context.register('contextExecutorWithCancelableRequest', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancel'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.CONTEXTS_SERVICE,
      request: context.get('requestWithLoaderAndCancel')
    }),
    contextUUIDUrlProvider: contextUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
  context.register('contextExecutorWithCancelableRequestAndNotification', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancelAndNotification'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.CONTEXTS_SERVICE,
      request: context.get('requestWithLoaderAndCancelAndNotification')
    }),
    contextUUIDUrlProvider: contextUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
  context.register('contextExecutorForDerivedTable', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotificationForDerivedTable'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.CONTEXTS_SERVICE,
      request: context.get('requestWithLoaderAndCancelAndDoNotHandle400ErrorsNotificationForDerivedTable')
    }),
    contextUUIDUrlProvider: contextUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
  context.register('contextExecutorForSelectDataSource', new ContextExecutor({
    request: context.get('requestWithLoaderAndCancelForSelectDataSource'),
    contextFactory: new ContextFactory({
      url: endpointsEnum.CONTEXTS_SERVICE,
      request: context.get('requestWithLoaderAndCancelForSelectDataSource')
    }),
    contextUUIDUrlProvider: contextUUIDUrlProvider,
    cache: context.get('contextExecutorCache')
  }));
}

function createRestServices(context, options) {
  var restMetadataServiceWrappedWithLoader = new RestMetadataService({
    contextExecutor: context.get('contextExecutorWithCancelableRequest')
  }),
      restMetadataServiceWrappedWithNotification = new RestMetadataService({
    contextExecutor: context.get('contextExecutorWithCancelableRequestAndNotification')
  }),
      restMetadataServiceForSelectDataSource = new RestMetadataService({
    contextExecutor: context.get('contextExecutorForSelectDataSource')
  }),
      restMetadataServiceWrappedWithNotificationForForeignKeyDiscoveryService = new RestMetadataService({
    contextExecutor: context.get('contextExecutorWithCancelableRequestAndNotification')
  }),
      derivedTableMetadataService = new DerivedTableMetadataService({
    contextExecutor: context.get('contextExecutorForDerivedTable')
  }),
      queryExecutionServiceWrappedWithLoader = new QueryExecutionService({
    contextExecutor: context.get('adhocQueryExecutorWithCancelableRequest')
  }),
      queryExecutionServiceWrappedWithNotification = new QueryExecutionService({
    contextExecutor: context.get('adhocQueryExecutorWithCancelableRequestAndNotification')
  }),
      validationServiceWrappedWithLoader = new ValidationService({
    request: context.get('requestWithLoaderAndCancel')
  }),
      validationServiceWrappedWithNotification = new ValidationService({
    request: context.get('requestWithLoaderAndCancelAndNotification')
  }),
      validationServiceWrappedWithDoNotHandle400ErrorsNotification = new ValidationService({
    request: context.get('requestDoNotHandle400ErrorsNotificationForValidationService')
  }),
      resourcesServiceWrappedWithLoader = new ResourcesService({
    request: context.get('requestWithLoaderAndCancel')
  }),
      resourcesServiceWrappedWithNotification = new ResourcesService({
    request: context.get('requestWithLoaderAndCancelAndNotification')
  }),
      resourcesServiceForSelectDataSource = new ResourcesService({
    request: context.get('requestWithLoaderAndCancelForSelectDataSource')
  }),
      profileAttributesServiceWrappedWithLoader = new ProfileAttributesService({
    cache: context.get('profileAttributesServiceCache'),
    request: context.get('requestWithLoaderAndCancel')
  }),
      profileAttributesServiceWrappedWithNotification = new ProfileAttributesService({
    cache: context.get('profileAttributesServiceCache'),
    request: context.get('requestWithLoaderAndCancelAndNotification')
  }),
      profileAttributesServiceWithEncrytedAttributeErrorHandling = new ProfileAttributesServiceWithEncrytedAttributeErrorHandling({
    profileAttributesService: profileAttributesServiceWrappedWithLoader
  });
  context.register('restMetadataServiceWrappedWithLoader', restMetadataServiceWrappedWithLoader);
  context.register('restMetadataServiceWrappedWithNotificationForForeignKeyDiscoveryService', restMetadataServiceWrappedWithNotificationForForeignKeyDiscoveryService);
  context.register('restMetadataServiceWrappedWithNotification', restMetadataServiceWrappedWithNotification);
  context.register('restMetadataServiceForSelectDataSource', restMetadataServiceForSelectDataSource);
  context.register('derivedTableMetadataServiceWrappedWithDoNotHandle400ErrorsNotification', derivedTableMetadataService);
  context.register('queryExecutionServiceWrappedWithLoader', queryExecutionServiceWrappedWithLoader);
  context.register('queryExecutionServiceWrappedWithNotification', queryExecutionServiceWrappedWithNotification);
  context.register('validationServiceWrappedWithLoader', validationServiceWrappedWithLoader);
  context.register('validationServiceWrappedWithNotification', validationServiceWrappedWithNotification);
  context.register('validationServiceWrappedWithDoNotHandle400ErrorsNotification', validationServiceWrappedWithDoNotHandle400ErrorsNotification);
  context.register('resourcesServiceWrappedWithLoader', resourcesServiceWrappedWithLoader);
  context.register('resourcesServiceWrappedWithNotification', resourcesServiceWrappedWithNotification);
  context.register('resourcesServiceForSelectDataSource', resourcesServiceForSelectDataSource);
  context.register('profileAttributesServiceWrappedWithLoader', profileAttributesServiceWrappedWithLoader);
  context.register('profileAttributesServiceWrappedWithNotification', profileAttributesServiceWrappedWithNotification);
  context.register('profileAttributesServiceWithEncrytedAttributeErrorHandling', profileAttributesServiceWithEncrytedAttributeErrorHandling);
}

function createSpecifications(context, options) {
  context.register('encryptedProfileAttributeErrorSpecification', encryptedProfileAttributeErrorSpecification);
  context.register('encryptedProfileAttributeErrorSpecificationXhrWrapped', encryptedProfileAttributeErrorSpecificationXhrWrapper(encryptedProfileAttributeErrorSpecification));
}

function setupBackboneAjax(context, options) {
  //We use native backbone.ajax only for save dialog where we should show loaded without cancel
  //This should be removed once we will drop legacy SaveDialog from bi-repository
  Backbone.ajax = context.get('requestWithLoader');
}

module.exports = function (context, options) {
  createRequestsWithLoader(context, options);
  createRequestsWithNotification(context, options);
  createContextExecutors(context, options);
  createRestServices(context, options);
  createSpecifications(context, options);
  setupBackboneAjax(context, options);
};

});