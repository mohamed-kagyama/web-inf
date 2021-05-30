define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var domainDesignerSettings = require("settings!domainSettings");

var domainSourceTreeItemsTemplate = require("text!../template/domainSourceTreeItemsTemplate.htm");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var resourcesToSelect = [repositoryResourceTypes.CUSTOM_DATA_SOURCE].concat(domainDesignerSettings.supportedDataSources);
module.exports = {
  title: i18nMessage('domain.designer.dataSourceChooserDialog.title'),
  treeItemsTemplate: domainSourceTreeItemsTemplate,
  resourcesTypeToSelect: resourcesToSelect,
  resourcesTypeToLoad: domainDesignerSettings.supportedDataSources,
  resourcesTypeToSelectTree: resourcesToSelect
};

});