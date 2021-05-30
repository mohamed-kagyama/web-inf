define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var Administer = require("runtime_dependencies/jrs-ui/src/administer/administer.base");

var cacheSettings = require('./administer.cache');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  Administer.urlContext = jrsConfigs.urlContext;
  cacheSettings.initialize();
});

});