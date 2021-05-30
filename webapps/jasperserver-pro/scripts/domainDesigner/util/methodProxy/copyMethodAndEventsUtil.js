define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var findMethodsByPrefixes = require('./findMethodsByPrefixes');

var readOnlyMethodPrefixes = require('./readOnlyMethodPrefixes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function addProxyMethod(source, target, sourceMethod, targetMethod) {
  if (target && source && _.isFunction(source[sourceMethod])) {
    target[targetMethod] = function () {
      return source[sourceMethod].apply(source, arguments);
    };
  }
}

function applyProxyMethodConfig(source, target, config) {
  _.each(config, function (configEntry) {
    if (_.isString(configEntry)) {
      addProxyMethod(source, target, configEntry, configEntry);
    } else if (_.isObject(configEntry)) {
      addProxyMethod(source, target, configEntry.source, configEntry.target);
    }
  });
}

function retriggerEvents(source, target) {
  // Here we make strong assumption that we use Backbone.Events as a source and target objects
  target.listenTo(source, 'all', function () {
    target.trigger.apply(target, arguments);
  });
}

function copyMethodsAndEvents(source, target, methods) {
  methods = methods || [];
  var target = target || {};

  if (_.isFunction(source.trigger) && _.isFunction(source.listenTo)) {
    // Using duck-type discovery for Backbone.Events
    if (!target.trigger) {
      // Add events support for facade if necessary
      _.extend(target, Backbone.Events);
    }

    retriggerEvents(source, target);
  }

  applyProxyMethodConfig(source, target, methods);
  return target;
}

function copyReadOnlyMethodsAndEvents(source, target, exclude) {
  var readOnlyMethods = findMethodsByPrefixes(source, readOnlyMethodPrefixes, exclude);
  return copyMethodsAndEvents(source, target, readOnlyMethods);
}

module.exports = {
  copyMethodsAndEvents: copyMethodsAndEvents,
  copyReadOnlyMethodsAndEvents: copyReadOnlyMethodsAndEvents
};

});