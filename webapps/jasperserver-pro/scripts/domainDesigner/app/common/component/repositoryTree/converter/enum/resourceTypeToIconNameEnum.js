define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var treeItemIconClassEnum = require("../../../../../component/enum/treeItemIconClassEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var resourceTypeToIconName = {};
var dataSourceIconClass = treeItemIconClassEnum.DATA_SOURCE;
resourceTypeToIconName[repositoryResourceTypes.FOLDER] = treeItemIconClassEnum.FOLDER;
resourceTypeToIconName[repositoryResourceTypes.JDBC_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.AWS_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.AZURE_SQL_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.JNDI_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.VIRTUAL_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.CUSTOM_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.BEAN_DATA_SOURCE] = dataSourceIconClass;
resourceTypeToIconName[repositoryResourceTypes.BUNDLE_FILE] = treeItemIconClassEnum.BUNDLE_FILE;
resourceTypeToIconName[repositoryResourceTypes.SECURITY_FILE] = treeItemIconClassEnum.SECURITY_FILE;
module.exports = resourceTypeToIconName;

});