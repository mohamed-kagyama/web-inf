define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ARRAY_ELEMENT_HANDLER_NAME = 'element';
var ANY_EXPRESSION_HANDLER_NAME = 'any';

function callHandler(handler) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (_.isFunction(handler)) {
    return handler.apply(null, args);
  }
}

function walk(expression, handlers, options) {
  options = _.defaults(options || {}, {
    elementHandler: ARRAY_ELEMENT_HANDLER_NAME,
    anyHandler: ANY_EXPRESSION_HANDLER_NAME
  });

  var isArray = _.isArray(expression);

  _.each(expression, function (expression, operator) {
    var handler = handlers[isArray ? options.elementHandler : operator];
    var shouldExit = callHandler(handlers[options.anyHandler], operator, expression);

    if (!shouldExit) {
      shouldExit = callHandler(handler, expression, operator);
    }

    if (!shouldExit) {
      if (_.isArray(expression) || _.isObject(expression)) {
        walk(expression, handlers, options);
      }
    }
  });
}

module.exports = {
  walk: walk
};

});