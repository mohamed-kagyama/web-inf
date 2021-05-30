define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (predicate) {
  return function (options) {
    var tableId,
        resourceIdsInItemsPaths = _.clone(options.resourceIdsInItemsPaths);

    if (options.table || entityUtil.isTable(options.resource)) {
      tableId = options.table ? options.table.id : options.resource.id;
      resourceIdsInItemsPaths[tableId] = true;
      options = _.extend({}, options, {
        nestingLevel: options.nestingLevel + 1
      }, {
        resourceIdsInItemsPaths: resourceIdsInItemsPaths
      });
    }

    return predicate(options);
  };
};

});