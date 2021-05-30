define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

var errorParametersKeysEnum = require("../../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(error) {
    var orphanResource;
    var dataSourceElementName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DATA_SOURCE_ELEMENT_NAME).value;
    var schemaElementName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.SCHEMA_ELEMENT_NAME).value;
    var dbTableName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DB_TABLE_NAME).value;
    var columnElementName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DB_COLUMN_NAME).value;
    orphanResource = [{
      name: dataSourceElementName,
      type: schemaEntitiesEnum.DATA_SOURCE
    }, {
      name: schemaElementName,
      type: schemaEntitiesEnum.DATA_SOURCE_GROUP
    }, {
      name: dbTableName,
      type: schemaEntitiesEnum.TABLE
    }, {
      name: columnElementName,
      type: schemaEntitiesEnum.FIELD
    }];
    return orphanResource;
  }
};

});