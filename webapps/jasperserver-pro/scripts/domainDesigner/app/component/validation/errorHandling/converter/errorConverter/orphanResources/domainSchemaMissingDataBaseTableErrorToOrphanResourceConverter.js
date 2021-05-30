define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var defaultSchemaNameEnum = require("../../../../../../model/enum/defaultSchemaNameEnum");

var dataSourceTypeEnum = require("../../../../../../model/enum/dataSourceTypeEnum");

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

var errorParametersKeysEnum = require("../../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(error, options) {
    var orphanResource;
    var dataSourceElementName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DATA_SOURCE_ELEMENT_NAME).value;
    var schemaElementName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.SCHEMA_ELEMENT_NAME).value; //if schema is missing but data source with schemas - use default schema
    //if schema is missing but data source with schemas - use default schema

    if (_.isUndefined(schemaElementName) && options.dataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS) {
      schemaElementName = defaultSchemaNameEnum.DEFAULT_SCHEMA;
    }

    var dbTableName = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DB_TABLE_NAME).value;
    orphanResource = [{
      name: dataSourceElementName,
      type: schemaEntitiesEnum.DATA_SOURCE
    }, {
      name: schemaElementName,
      type: schemaEntitiesEnum.DATA_SOURCE_GROUP
    }, {
      name: dbTableName,
      type: schemaEntitiesEnum.TABLE
    }];
    return orphanResource;
  }
};

});