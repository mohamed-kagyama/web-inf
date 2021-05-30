define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var artificialTreeResourceEntityUtil = require("../../component/layout/sidebarView/util/artificialTreeResourceEntityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function checkIfResourceExistsInSchemaByIdAndType(id, type, collections) {
  var isResourceExists = false,
      resource = {
    id: id,
    type: type
  };

  if (artificialTreeResourceEntityUtil.isDerivedTableGroup(resource)) {
    isResourceExists = Boolean(collections.tables.find(function (table) {
      return entityUtil.isDerivedTable(table);
    }));
  } else if (artificialTreeResourceEntityUtil.isConstantGroup(resource)) {
    isResourceExists = Boolean(collections.constantGroups.size());
  } else {
    isResourceExists = Boolean(schemaModelUtil.getResourceByIdAndType(id, type, collections));
  }

  return isResourceExists;
}

module.exports = _.extend({}, schemaModelUtil, {
  checkIfResourceExistsInSchemaByIdAndType: checkIfResourceExistsInSchemaByIdAndType
});

});