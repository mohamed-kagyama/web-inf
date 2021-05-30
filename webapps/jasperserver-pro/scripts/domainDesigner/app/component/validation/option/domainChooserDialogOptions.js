define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var i18n = require("bundle!DomainDesignerBundle");

var domainSourceTreeItemsTemplate = require("text!../template/domainSourceTreeItemsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  title: i18n['domain.designer.domainChooserDialog.title'],
  treeItemsTemplate: domainSourceTreeItemsTemplate,
  resourcesTypeToSelect: [repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE],
  resourcesTypeToSelectTree: [repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE]
};

});