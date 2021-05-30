define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var domReady = require('requirejs-domready');

require("css!overrides_custom.css?kick");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  $(document.body).addClass('rendered');
});

});