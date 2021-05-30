define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var methods = options.methods || [],
        actions = options.actions || [];
    return methods.reduce(function (memo, methodName) {
      if (actions.length > 0) {
        memo[methodName] = {
          around: actions
        };
      }

      return memo;
    }, {});
  }
};

});