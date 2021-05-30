define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var serverSchemaResourceTypeUtil = require("../../util/serverSchemaResourceTypeUtil");

var dataSourceTypeEnum = require("../../enum/dataSourceTypeEnum");

var dataSourceLevelEnum = require("../../enum/dataSourceLevelEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getDataSourceType: function getDataSourceType(rootLevelMetadata) {
    var dataSourceType,
        firstResource = _.first(rootLevelMetadata),
        metadataResourceType = serverSchemaResourceTypeUtil.getMetadataResourceType(firstResource);

    if (metadataResourceType === dataSourceLevelEnum.DATA_SOURCE_GROUP) {
      dataSourceType = dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS;
    } else if (metadataResourceType === dataSourceLevelEnum.TABLE) {
      dataSourceType = dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS;
    }

    return dataSourceType;
  }
};

});