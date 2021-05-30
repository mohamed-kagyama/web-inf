define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

var dashboardSettings = require("runtime_dependencies/bi-dashboard/src/dashboard/dashboardSettings");

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var expirationManager = require('../session/expirationManager');

var DashboardDesigner = require("runtime_dependencies/bi-dashboard/src/dashboard/DashboardDesigner");

var domReady = require('requirejs-domready');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
dashboardSettings.CONTEXT_PATH = config.contextPath;
expirationManager({
  timeoutWarningDelay: dashboardSettings.TIMEOUT_WARNING_DELAY
});
webHelpModule.setCurrentContext('dashboard');
domReady(function () {
  new DashboardDesigner({
    el: '#display',
    contextPath: config.contextPath
  });
});

});