define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function startsWith(str, prefixes) {
  return _.find(prefixes, function (prefix) {
    return str.indexOf(prefix) === 0;
  });
}

module.exports = function (source, prefixes, exclude) {
  exclude = exclude || [];
  var method,
      methods = [];

  for (method in source) {
    // Also should look in object prototype
    // so no hasOwnProperty check
    if (_.isFunction(source[method]) && startsWith(method, prefixes) && !_.contains(exclude, method)) {
      methods.push(method);
    }
  }

  return methods;
};

});