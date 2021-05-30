define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationProfileEnum = require("../../enum/applicationProfileEnum");

var aspectjs = require("../../../util/aspect/aspectjs");

var DevPerformanceMeasurementAroundAdvice = require("../../util/devTools/DevPerformanceMeasurementAroundAdvice");

var DevAfterThrowingAdvice = require("../../util/devTools/DevAfterThrowingAdvice");

var DevRESTAroundAdvice = require("../../util/devTools/DevRESTAroundAdvice");

var DevApplicationLogger = require("../../util/devTools/DevApplicationLogger");

var ReplaceWithOtherImplementationAdvice = require("../../util/devTools/ReplaceWithOtherImplementationAdvice");

var DevTools = require("../../util/devTools/DevTools");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function wrapRequestWithDevToolsAdvice(context, options) {
  var devToolsAOPconfig = {
    'request': {
      modifyOriginal: true,
      wrapInPrototype: false,
      around: [new DevRESTAroundAdvice({
        devTools: context.get('devTools')
      }).around]
    }
  };
  var requestWrapper = context.get('requestWrapper');
  aspectjs(requestWrapper, devToolsAOPconfig);
}

function wrapSchemaModelConverter(context, options) {
  var schemaModelConverter = context.get('schemaModelConverter');
  var advice = new DevPerformanceMeasurementAroundAdvice({
    messageTemplate: 'schemaModelConverter.{{=name}} time',
    performance: options.performance
  }).around;
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'toJSON': {
      around: [advice]
    },
    'parse': {
      around: [advice]
    }
  };
  aspectjs(schemaModelConverter, aopConfig);
}

function wrapJoinsDesignerViewModelToStoreConverter(context, options) {
  var joinsDesignerViewModelToStoreConverter = context.get('joinsDesignerViewModelToStoreConverter');
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'convert': {
      around: [new DevPerformanceMeasurementAroundAdvice({
        messageTemplate: 'joinsViewModelToStoreConverter time',
        performance: options.performance
      }).around]
    }
  };
  aspectjs(joinsDesignerViewModelToStoreConverter, aopConfig);
}

function wrapJoinsDesignerSchemaToViewModelConverter(context, options) {
  var joinsDesignerSchemaToViewModelConverter = context.get('joinsDesignerSchemaToViewModelConverter');
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'convert': {
      around: [new DevPerformanceMeasurementAroundAdvice({
        messageTemplate: 'joinsToViewModelConverter time',
        performance: options.performance
      }).around]
    }
  };
  aspectjs(joinsDesignerSchemaToViewModelConverter, aopConfig);
}

function wrapApplicationDispatcher(context, options) {
  var asyncApplicationDispatcher = context.get('asyncApplicationDispatcher');
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'execute': {
      around: [new ReplaceWithOtherImplementationAdvice({
        action: context.get('syncApplicationDispatcher').execute
      }).around]
    }
  };
  aspectjs(asyncApplicationDispatcher, aopConfig);
}

function wrapStoreChangeEventEmitter(context, options) {
  var storeChangeEventEmitter = context.get('storeChangeEventEmitter');
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'emitStoreChange': {
      around: [new DevPerformanceMeasurementAroundAdvice({
        messageTemplate: '{{=args[2]}} UI time',
        performance: options.performance
      }).around]
    }
  };
  aspectjs(storeChangeEventEmitter, aopConfig);
}

function wrapDataStoreProvider(context, options) {
  var dataStoreProvider = context.get('dataStoreProvider');
  var clientDomainSchemaService = context.get('clientDomainSchemaService');

  var getCollections = _.bind(clientDomainSchemaService.getDataStore, clientDomainSchemaService);

  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'getDataStore': {
      around: [new ReplaceWithOtherImplementationAdvice({
        action: getCollections
      }).around]
    }
  };
  aspectjs(dataStoreProvider, aopConfig);
}

function wrapApplicationMutations(context, options) {
  var applicationMutations = context.get('applicationMutations');
  var log = options.devApplicationLogger.create('applicationMutations');
  var aopConfig = {
    '*': {
      modifyOriginal: true,
      before: [log],
      around: [new DevPerformanceMeasurementAroundAdvice({
        messageTemplate: '{{=name}} model time',
        performance: options.performance
      }).around],
      afterThrowing: [new DevAfterThrowingAdvice({
        devTools: context.get('devTools')
      }).afterThrowing]
    }
  };
  aspectjs(applicationMutations, aopConfig);
}

function wrapValidationStateFactory(context, options) {
  var validationStateFactory = context.get('validationStateFactory');
  var log = options.devApplicationLogger.create('validationStateFactory');
  var aopConfig = {
    '*': {
      modifyOriginal: true,
      before: [log]
    }
  };
  aspectjs(validationStateFactory, aopConfig);
}

module.exports = function (context, options) {
  if (options.profile === applicationProfileEnum.DEV) {
    options.devApplicationLogger = new DevApplicationLogger();
    context.register('devTools', new DevTools(context, options));
    wrapApplicationMutations(context, options);
    wrapDataStoreProvider(context, options);
    wrapStoreChangeEventEmitter(context, options);
    wrapApplicationDispatcher(context, options);
    wrapSchemaModelConverter(context, options);
    wrapJoinsDesignerSchemaToViewModelConverter(context, options);
    wrapJoinsDesignerViewModelToStoreConverter(context, options);
    wrapRequestWithDevToolsAdvice(context, options);
    wrapValidationStateFactory(context, options);
    context.get('devTools').start();
  }
};

});