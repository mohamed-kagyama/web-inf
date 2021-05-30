define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  SIDEBAR_RESOURCES_AND_DATA_ISLANDS: [schemaEntitiesEnum.DATA_ISLAND, schemaEntitiesEnum.JOIN_TREE, schemaEntitiesEnum.TABLE_REFERENCE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.FIELD, schemaEntitiesEnum.CALC_FIELD],
  SIDEBAR_RESOURCES_SETS_AND_ITEMS: [schemaEntitiesEnum.TABLE_REFERENCE, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.FIELD, schemaEntitiesEnum.CALC_FIELD, schemaEntitiesEnum.PRESENTATION_SET, schemaEntitiesEnum.PRESENTATION_FIELD]
};

});