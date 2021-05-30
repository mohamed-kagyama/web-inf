define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var adhocSettings = require("settings!adhocSettings");

var DatachooserDialog = require('./datachooser/view/DatachooserDialogView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  var resourcesTypes = [];
  startApp(resourcesTypes.concat(adhocSettings.commonTypes).concat(adhocSettings.olapTypes));
});

function startApp(resourcesTypes) {
  var datachooserDialog = new DatachooserDialog({
    resourcesTypes: resourcesTypes
  });

  if (window.location.href.indexOf('embeddedDesigner=true') < 0) {
    datachooserDialog.listenTo(datachooserDialog, 'close', function () {
      if (typeof alreadyEditing !== 'undefined' && document.referrer.indexOf('login.html') === -1) {
        window.history.back();
      } else {
        document.location = 'flow.html?_flowId=homeFlow';
      }
    });
  }

  datachooserDialog.open();
}

});