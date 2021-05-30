define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var pathUtil = require("../../../../../util/pathUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (collections, fieldReference) {
  var joinAlias,
      constantGroup,
      field = collections.fields.byId(fieldReference.getFieldId()),
      fieldName = field.getName(),
      fieldType = fieldReference.getFieldType(),
      sourceType = fieldReference.getSourceType();

  if (entityUtil.isJoinAlias(sourceType)) {
    joinAlias = collections.joinAliases.byId(fieldReference.getSourceId());
    fieldName = pathUtil.join([joinAlias.getName(), fieldName], '\\', '.');
  }

  if (entityUtil.isCalcField(fieldType) && entityUtil.isConstantGroup(sourceType)) {
    constantGroup = collections.constantGroups.byId(fieldReference.getSourceId());
    fieldName = pathUtil.join([constantGroup.getName(), fieldName], '\\', '.');
  }

  return {
    name: fieldName,
    type: field.getType()
  };
};

});