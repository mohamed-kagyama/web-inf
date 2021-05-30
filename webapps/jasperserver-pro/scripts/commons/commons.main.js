define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var primaryNavigation = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation");

var globalSearch = require("runtime_dependencies/jrs-ui/src/repository/repository.search.globalSearchBoxInit");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var $ = require('jquery');

require("runtime_dependencies/jrs-ui/src/commons/commons.minimal.main");

require("runtime_dependencies/jrs-ui/src/namespace/namespace");

require("runtime_dependencies/jrs-ui/src/core/core.accessibility");

require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

require("runtime_dependencies/jrs-ui/src/core/core.key.events");

require('../create/create.report');

require("runtime_dependencies/js-sdk/src/common/logging/logger");

require("runtime_dependencies/jrs-ui/src/resource/resource.base");

require("runtime_dependencies/jrs-ui/src/components/components.pickers");

require("runtime_dependencies/js-sdk/src/common/component/list/view/ListWithSelection");

require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  // add information about locale into body's class
  $('body').addClass('locale-' + jrsConfigs.userLocale);
  layoutModule.initialize(); // NOTE: Standard Navigation is initialized before these systems, in
  // commons.minimal.main.js, for possible automation use, and to
  // pre-empt these systems where appropriate.
  // NOTE: Standard Navigation is initialized before these systems, in
  // commons.minimal.main.js, for possible automation use, and to
  // pre-empt these systems where appropriate.

  primaryNavigation.initializeNavigation(); // global keyboard navigation setup
  // *!* FIXME: Is this being called twice?  see core.initialize.js
  // global keyboard navigation setup
  // *!* FIXME: Is this being called twice?  see core.initialize.js

  actionModel.initializeOneTimeMenuHandlers(); // menu setup
  // menu setup

  jrsConfigs.initAdditionalUIComponents && globalSearch.initialize(); //isNotNullORUndefined(window.accessibilityModule) && accessibilityModule.initialize();
  //trigger protorype's dom onload manualy
  //isNotNullORUndefined(window.accessibilityModule) && accessibilityModule.initialize();
  //trigger protorype's dom onload manualy

  document.fire('dom:loaded');
});

});