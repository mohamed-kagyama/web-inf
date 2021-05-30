define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataSourceLevelEnum = require('./dataSourceLevelEnum');

var serverLevelEnum = require('./serverLevelEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var serverToDataSourceLevelEnum = {};
serverToDataSourceLevelEnum[serverLevelEnum.SCHEMA] = dataSourceLevelEnum.DATA_SOURCE_GROUP;
serverToDataSourceLevelEnum[serverLevelEnum.DATA_ISLAND] = dataSourceLevelEnum.TABLE;
serverToDataSourceLevelEnum[serverLevelEnum.TABLE] = dataSourceLevelEnum.TABLE;
module.exports = serverToDataSourceLevelEnum;

});