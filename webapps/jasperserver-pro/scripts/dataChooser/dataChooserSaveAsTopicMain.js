define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var domain = require('./domain.chooser.saveAsTopic');

var SaveAsTopicModel = require('../domainTopic/model/SaveAsTopicModel');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var _ = require('underscore');

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  _.extend(domain._messages, jrsConfigs.dataChooser.domain._messages);

  _.extend(window.localContext, jrsConfigs.dataChooser.localContext);

  if (jrsConfigs.dataChooser.errorMessage) {
    var errorDialog = new AlertDialog();
    errorDialog.setMessage(jrsConfigs.dataChooser.errorMessage);
    errorDialog.open();
  }

  domain.chooser.initialize({
    model: SaveAsTopicModel
  }); // for QAA reasons we add this event. For details see JRS-20703

  window.dispatchEvent(new Event('dataChooserSaveAsTopicMainReady'));
});

});