define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var Report = require("runtime_dependencies/jrs-ui/src/reportViewer/report.view.base");

var _ = require('underscore');

var $ = require('jquery');

var _runtime_dependenciesJrsUiSrcControlsControlsBase = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var ControlsBase = _runtime_dependenciesJrsUiSrcControlsControlsBase.ControlsBase;

var adhocDesigner = require('./designer.root');

var AdHocTable = require('./table.init');

var AdHocChart = require('./chart.observers');

require('../dataChooser/domain.chooser.fields');

require("runtime_dependencies/jrs-ui/src/components/components.customTooltip");

require("runtime_dependencies/jrs-ui/src/components/components.dependent.dialog");

require("runtime_dependencies/jrs-ui/src/components/components.pickers");

require("runtime_dependencies/jrs-ui/src/core/core.key.events");

require('scriptaculous/src/builder');

require('scriptaculous/src/dragdrop');

require("runtime_dependencies/jrs-ui/src/util/tools.drag");

require('../dialog/dialog.definitions');

require('./DynamicTreeSearch');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  _.extend(ControlsBase, jrsConfigs.inputControlsConstants);

  _.extend(adhocDesigner, jrsConfigs.adhocDesigner);

  _.extend(adhocDesigner, jrsConfigs.adhoc.adhocDesigner);

  adhocDesigner.messages = adhocDesigner.messages || {};

  _.extend(adhocDesigner.messages, jrsConfigs.adhoc.adhocDesignerMessages);

  _.extend(AdHocChart, jrsConfigs.adhoc.AdHocChart);

  _.extend(AdHocTable, jrsConfigs.adhoc.AdHocTable);

  Report.reportUnitURI = jrsConfigs.Report.reportUnitURI;
  adhocDesigner.run(jrsConfigs.adhoc.adhocDesignerViewModelViewType); //workraround to make jquery-ui work properly in adhoc designer because of 'jr' prefix
  //workraround to make jquery-ui work properly in adhoc designer because of 'jr' prefix

  $('body').addClass('jr');
});

});