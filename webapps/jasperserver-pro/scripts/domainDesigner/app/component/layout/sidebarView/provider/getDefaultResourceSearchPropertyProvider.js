define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (resource, options) {
  var table = {};

  if (resource.tableReferenceId) {
    table = options.tableReferenceToTableMap[resource.tableReferenceId] || {};
  }

  return _.reduce([resource.name, table.name, resource.sourceName], function (memo, searchProperty) {
    if (searchProperty) {
      memo.push(searchProperty.toLowerCase());
    }

    return memo;
  }, []);
};

});