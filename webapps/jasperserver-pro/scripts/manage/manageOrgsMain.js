define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var _ = require('underscore');

var orgModule = require('../org/org.mng.actions');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var i18n = require("bundle!AttributesBundle");

var i18n2 = require("bundle!CommonBundle");

var TenantsTreeView = require("runtime_dependencies/jrs-ui/src/tenantImportExport/view/TenantsTreeView");

var attributesTypesEnum = require("runtime_dependencies/jrs-ui/src/attributes/enum/attributesTypesEnum");

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var attributesViewOptionsFactory = require("runtime_dependencies/jrs-ui/src/attributes/factory/attributesViewOptionsFactory");

var scrollEventTrait = require("runtime_dependencies/jrs-ui/src/attributes/trait/attributesViewScrollEventTrait");

var AttributesViewFacade = require("runtime_dependencies/jrs-ui/src/attributes/AttributesViewFacade");

require('../org/org.mng.components');

require("runtime_dependencies/jrs-ui/src/util/utils.common");

require("css!manageTenants.css");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  if (typeof orgModule.messages === 'undefined') {
    orgModule.messages = {};
  }

  if (typeof orgModule.Configuration === 'undefined') {
    orgModule.Configuration = {};
  }

  _.extend(window.localContext, jrsConfigs.orgManagement.localContext);

  _.extend(orgModule.messages, jrsConfigs.orgManagement.orgModule.messages);

  _.extend(orgModule.Configuration, jrsConfigs.orgManagement.orgModule.Configuration);

  orgModule.orgManager.initialize({
    _: _,
    i18n: i18n,
    i18n2: i18n2,
    attributesViewOptionsFactory: attributesViewOptionsFactory,
    AttributesViewFacade: AttributesViewFacade,
    scrollEventTrait: scrollEventTrait,
    attributesTypesEnum: attributesTypesEnum,
    ConfirmationDialog: ConfirmationDialog,
    TenantsTreeView: TenantsTreeView
  });
});

});