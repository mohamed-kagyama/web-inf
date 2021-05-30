define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var logging = require("runtime_dependencies/jrs-ui/src/administer/administer.logging");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var LogCollectorsController = require('./LogCollectorsController');

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var Administer = require("runtime_dependencies/jrs-ui/src/administer/administer.base");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  // initialize left admin menu
  logging.initialize(); // hack, dirty hack...
  // hack, dirty hack...

  Administer.urlContext = jrsConfigs.urlContext;
  new LogCollectorsController({
    container: jrsConfigs.logCollectors.initParams.container
  });
  layoutModule.resizeOnClient('serverSettingsMenu', jrsConfigs.logCollectors.initParams.container.replace('#', ''));
});

});