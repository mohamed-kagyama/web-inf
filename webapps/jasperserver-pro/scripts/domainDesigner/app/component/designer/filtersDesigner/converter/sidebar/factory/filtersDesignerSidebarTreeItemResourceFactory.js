define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getResourceProperties(item, options) {
  var properties = {},
      joinAlias = options.joinAlias,
      tableReference = options.tableReference;

  if (entityUtil.isField(item.type)) {
    if (joinAlias) {
      properties.sourceId = joinAlias.getId();
      properties.sourceType = schemaEntitiesEnum.JOIN_ALIAS;
    } else if (entityUtil.isCalcField(item.type)) {
      properties.sourceId = item.calcFieldSourceId;
      properties.sourceType = item.calcFieldSourceType;
    } else if (tableReference) {
      properties.sourceId = tableReference.getId();
      properties.sourceType = schemaEntitiesEnum.TABLE_REFERENCE;
    }
  }

  properties = _.extend({}, properties, _.pick(item, ['tableReferenceId', 'calcFieldSourceId', 'calcFieldSourceType', 'isDerivedTable', 'derivedTableId', 'derivedTableParentId']));
  return properties;
}

module.exports = {
  create: function create(item, options) {
    var resource = {
      id: item.id,
      resourceId: item.resourceId,
      type: item.type
    };
    resource = _.extend({}, resource, getResourceProperties(item, options));
    return resource;
  }
};

});