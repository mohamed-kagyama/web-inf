define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var domain = require('./domain.chooser.filters');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  _.extend(domain._messages, jrsConfigs.dataChooser.domain._messages);

  _.extend(window.localContext, jrsConfigs.dataChooser.localContext);

  domain.chooser.initialize();
});

});