define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../model/schema/util/entityUtil");

var defaultSchemaNameEnum = require("../../model/enum/defaultSchemaNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = showDefaultSchemaPredicate;

function showDefaultSchemaPredicate(resource) {
  var isDataSourceGroup = entityUtil.isDataSourceGroup(resource),
      isDefaultSchema = resource.name === defaultSchemaNameEnum.DEFAULT_SCHEMA;

  if (isDataSourceGroup && isDefaultSchema) {
    return resource.children.size() > 0;
  }

  return true;
}

});