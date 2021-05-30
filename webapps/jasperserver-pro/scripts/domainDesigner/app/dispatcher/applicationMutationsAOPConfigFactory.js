define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateActionsEnum = require("./enum/applicationStateActionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function create(options) {
  options = options || {};
  var pushHistoryFullState = options.pushHistoryFullState,
      pushHistoryViewState = options.pushHistoryViewState,
      clearHistory = options.clearHistory,
      storeChangeEventEmitter = options.storeChangeEventEmitter;

  function getPushHistoryStateAdvice(eventConfig) {
    var advice,
        changes = eventConfig.changes,
        changesModel = changes.schema || changes.resourceProperties,
        changesView = changes.viewState;

    if (!eventConfig.skipHistory) {
      if (changesModel) {
        advice = pushHistoryFullState;
      } else if (changesView) {
        advice = pushHistoryViewState;
      }
    }

    return advice;
  }

  var aopConfig = {
    '*': {
      afterReturning: [function () {
        return storeChangeEventEmitter.emitStoreChange.apply(null, arguments);
      }]
    },
    'save': {
      afterReturning: [clearHistory]
    }
  };

  _.each(applicationStateActionsEnum, function (eventConfig, action) {
    var advice = getPushHistoryStateAdvice(eventConfig);

    if (advice) {
      if (_.isUndefined(aopConfig[action])) {
        aopConfig[action] = {};
      }

      if (_.isUndefined(aopConfig[action].afterReturning)) {
        aopConfig[action].afterReturning = [];
      }

      aopConfig[action].afterReturning.push(advice);
    }
  });

  return aopConfig;
}

module.exports = {
  create: create
};

});