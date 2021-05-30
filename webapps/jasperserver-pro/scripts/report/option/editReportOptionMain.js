define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var _ = require('underscore');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var EditOptions = require('./controls.editoptions');

var Report = require('../../reportView/report.view');

var _runtime_dependenciesJrsUiSrcControlsControlsBase = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var ControlsBase = _runtime_dependenciesJrsUiSrcControlsControlsBase.ControlsBase;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  Report.reportUnitURI = jrsConfigs.Report.reportUnitURI;

  _.extend(ControlsBase, jrsConfigs.inputControlsConstants);

  var editOptions = new EditOptions('#reportOptionsForm', jrsConfigs.Report.reportOptionsURI);
});

});