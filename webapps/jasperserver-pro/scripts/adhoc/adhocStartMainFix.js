define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var FixFieldsDialog = require('./fixfields/view/FixFieldsDialogView');

var domReady = require('requirejs-domready');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function initFixFieldsDialog() {
  var fixFieldsDialog = new FixFieldsDialog();
  fixFieldsDialog.open();
}

domReady(function () {
  initFixFieldsDialog();
});

});