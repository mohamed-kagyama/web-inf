define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domainDesignerSettings = require('./domainDesignerSettings');

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var ApplicationContext = require("./app/applicationContext/ApplicationContext");

var applicationContextConfiguration = require("./app/applicationContext/applicationContextConfiguration");

var domReady = require('requirejs-domready');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  webHelpModule.setCurrentContext('domain2');
  var applicationContext = new ApplicationContext(); // Configure application context.
  // this will instantiate all application modules
  // and register them in an application context container
  // Configure application context.
  // this will instantiate all application modules
  // and register them in an application context container

  applicationContextConfiguration.configure(applicationContext, domainDesignerSettings.get()); // Get the main application from the context and kick-off it
  // Get the main application from the context and kick-off it

  applicationContext.get('application').startup();
});

});