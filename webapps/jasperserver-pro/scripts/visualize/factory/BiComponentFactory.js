define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Report = require("runtime_dependencies/bi-report/src/bi/report/Report");

var Dashboard = require("runtime_dependencies/bi-dashboard/src/bi/dashboard/Dashboard");

var ResourcesSearch = require("runtime_dependencies/bi-repository/src/bi/repository/ResourcesSearch");

var InputControls = require("runtime_dependencies/bi-control/src/bi/control/InputControls");

var AdHocView = require("runtime_dependencies/bi-adhoc/src/bi/adhoc/AdHocView");

var biComponentUtil = require("runtime_dependencies/js-sdk/src/common/bi/component/util/biComponentUtil");

var dashboardSettings = require("runtime_dependencies/bi-dashboard/src/dashboard/dashboardSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function BiComponentsFactory(properties) {
  var instanceData = biComponentUtil.cloneDeep(properties);
  this.report = createBiComponentFunction(instanceData, Report);
  this.dashboard = createBiComponentFunction(instanceData, Dashboard);
  this.adhocView = createBiComponentFunction(instanceData, AdHocView);
  this.inputControls = createBiComponentFunction(instanceData, InputControls);
  this.resourcesSearch = createBiComponentFunction(instanceData, ResourcesSearch);

  _.extend(this.report, Report);

  _.extend(this.dashboard, Dashboard);

  _.extend(this.adhocView, AdHocView);

  _.extend(this.inputControls, InputControls);

  _.extend(this.resourcesSearch, ResourcesSearch);
}

function createBiComponentFunction(instanceData, constructor) {
  return function (settings) {
    var originalComponentInstance = new constructor(),
        properties = _.extend({
      runImmediately: true
    }, instanceData, settings),
        events = properties.events;

    delete properties.events;
    originalComponentInstance.properties(biComponentUtil.bindContextToArgument(originalComponentInstance, clean(properties)));

    if (events) {
      originalComponentInstance.events(biComponentUtil.bindContextToArgument(originalComponentInstance, events));
    } // proxy original component instance here
    // proxy original component instance here


    var res = _.reduce(originalComponentInstance, function (memo, element, key) {
      var value = element;

      if (_.isFunction(value)) {
        // it's a function. Let's proxy it
        value = function value() {
          // prepare arguments. If there is some functions, then bind originalComponentInstance as context to them
          var argumentsArray = biComponentUtil.bindContextToArgument(originalComponentInstance, Array.prototype.slice.call(arguments, 0)); // apply the original function with prepared arguments
          // apply the original function with prepared arguments

          var result = element.apply(this, argumentsArray); // bind context to function execution result (mainly for case if result is a Deferred)
          // bind context to function execution result (mainly for case if result is a Deferred)

          return biComponentUtil.bindContextToArgument(originalComponentInstance, result);
        };
      }

      memo[key] = value;
      return memo;
    }, {});

    dashboardSettings.VISUALIZE_MODE = properties._showInputControls ? false : true;
    properties.runImmediately && res.run(properties.success, properties.error, properties.always);
    return res;
  };
}

function clean(properties) {
  var props = _.clone(properties);

  delete props.success;
  delete props.error;
  delete props.always;
  delete props.runImmediately;
  delete props._showInputControls;
  return props;
}

module.exports = BiComponentsFactory;

});