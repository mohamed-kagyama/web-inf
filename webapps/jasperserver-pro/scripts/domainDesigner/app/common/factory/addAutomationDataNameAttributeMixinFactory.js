define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getComputed(dataNames) {
  var computed = {};

  _.each(dataNames, function (computedPropertyValue, computedPropertyName) {
    computed[computedPropertyName] = function () {
      return computedPropertyValue;
    };
  });

  return computed;
}

module.exports = {
  create: function create(options) {
    var config = options.config,
        dataNames = options.dataNames;

    if (config.mixins) {
      config.mixins.push({
        computed: getComputed(dataNames)
      });
    } else {
      config.mixins = [{
        computed: getComputed(dataNames)
      }];
    }

    return config;
  }
};

});