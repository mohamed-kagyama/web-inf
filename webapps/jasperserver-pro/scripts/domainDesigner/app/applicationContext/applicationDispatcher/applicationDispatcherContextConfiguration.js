define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var aspectjs = require("../../../util/aspect/aspectjs");

var applicationStateActionsEnum = require("../../dispatcher/enum/applicationStateActionsEnum");

var HistoryPointAdvice = require("../../dispatcher/aspect/HistoryPointAdvice");

var StoreChangeEventEmitter = require("../../dispatcher/StoreChangeEventEmitter");

var DataStoreProviderAdapter = require("../../dispatcher/adapter/DataStoreProviderAdapter");

var ApplicationMutations = require("../../dispatcher/ApplicationMutations");

var applicationMutationsAOPConfigFactory = require("../../dispatcher/applicationMutationsAOPConfigFactory");

var ApplicationDispatcherEventConfigInitializer = require("../../dispatcher/ApplicationDispatcherEventConfigInitializer");

var SyncApplicationDispatcher = require("../../dispatcher/SyncApplicationDispatcher");

var AsyncApplicationDispatcher = require("../../dispatcher/AsyncApplicationDispatcher");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createStoreChangeEventEmitter(context, options) {
  context.register('dataStoreProvider', new DataStoreProviderAdapter({
    dataStore: context.get('schemaDataStore')
  }));
  var storeChangeEventEmitter = new StoreChangeEventEmitter({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    viewState: context.get('viewStateModelReadOnlyFacade'),
    resourceProperties: context.get('resourcePropertiesReadOnlyFacade'),
    dataStoreProvider: context.get('dataStoreProvider'),
    applicationStateActionsEnum: applicationStateActionsEnum
  });
  context.register('storeChangeEventEmitter', storeChangeEventEmitter);
}

function createApplicationMutationsAOPConfig(context, options) {
  createStoreChangeEventEmitter(context, options);
  var historyPointAdvice = new HistoryPointAdvice({
    historyModel: context.get('historyModel'),
    dataStore: context.get('schemaDataStore'),
    viewStateModel: context.get('viewStateModelReadOnlyFacade'),
    resourceProperties: context.get('resourcePropertiesReadOnlyFacade')
  });
  return applicationMutationsAOPConfigFactory.create({
    pushHistoryFullState: historyPointAdvice.pushState,
    pushHistoryViewState: historyPointAdvice.pushViewState,
    clearHistory: historyPointAdvice.pushStateAndClearHistory,
    storeChangeEventEmitter: context.get('storeChangeEventEmitter')
  });
}

function createApplicationDispatcher(context, options) {
  var asyncApplicationDispatcher = new AsyncApplicationDispatcher({
    applicationMutations: context.get('applicationMutations'),
    startExecutionTimeout: options.dispatcher.startExecutionTimeout
  });
  var syncApplicationDispatcher = new SyncApplicationDispatcher({
    applicationMutations: context.get('applicationMutations')
  });
  context.register('asyncApplicationDispatcher', asyncApplicationDispatcher);
  context.register('syncApplicationDispatcher', syncApplicationDispatcher); //application dispatcher which will be used by default
  //application dispatcher which will be used by default

  context.register('applicationDispatcher', asyncApplicationDispatcher);
}

function createDispatcherAndMutations(context, options) {
  var aopConfig = createApplicationMutationsAOPConfig(context, options); // Create instance of application dispatcher and immediately wrap it
  // into an aspect config.
  // Create instance of application dispatcher and immediately wrap it
  // into an aspect config.

  var applicationMutations = new ApplicationMutations({
    domainSchemaService: context.get('domainSchemaService'),
    resourcePropertiesService: context.get('resourcePropertiesService'),
    viewStateModelService: context.get('viewStateModelService')
  });
  var wrappedMutations = aspectjs(applicationMutations, aopConfig); // wrap in additional config to be able to intercept any action from validation layer
  // comment the next line to turn off dependencies validation inspector
  // wrap in additional config to be able to intercept any action from validation layer
  // comment the next line to turn off dependencies validation inspector

  wrappedMutations = aspectjs(wrappedMutations, context.get('dependenciesTrackingApplicationMutationsAOPConfig'));
  context.register('applicationMutations', wrappedMutations);
  createApplicationDispatcher(context, options);
  context.register('applicationDispatcherEventConfigInitializer', new ApplicationDispatcherEventConfigInitializer({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    applicationDispatcher: context.get('applicationDispatcher'),
    applicationStateActionsEnum: applicationStateActionsEnum
  }));
}

module.exports = createDispatcherAndMutations;

});