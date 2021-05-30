define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  var config = options.config,
      fnName = options.name,
      context = options.context,
      bindOptions = options.options;

  var result = _.result(config, fnName);

  var configFn, originalCallback;

  if (result) {
    if (_.isString(result)) {
      originalCallback = context[result];

      if (_.isFunction(originalCallback)) {
        if (bindOptions) {
          configFn = _.bind(originalCallback, context, bindOptions);
        } else {
          configFn = _.bind(originalCallback, context);
        }
      }
    } else if (_.isFunction(result)) {
      configFn = result;
    }
  }

  return configFn;
};

});