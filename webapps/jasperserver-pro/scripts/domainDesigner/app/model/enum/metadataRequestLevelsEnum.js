define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataSourceTypeEnum = require("./dataSourceTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var metadataRequestLevelsEnum = {};
metadataRequestLevelsEnum[dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS] = ["schemaName", "datasourceTableName"];
metadataRequestLevelsEnum[dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS] = ["datasourceTableName"];
module.exports = metadataRequestLevelsEnum;

});