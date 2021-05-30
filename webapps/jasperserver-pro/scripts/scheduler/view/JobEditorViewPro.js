define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var JobEditorView = require("runtime_dependencies/jrs-ui/src/scheduler/view/JobEditorView");

var EditorScheduleTabView = require("runtime_dependencies/jrs-ui/src/scheduler/view/editor/ScheduleTabView");

var ParametersTabViewPro = require('./editor/ParametersTabViewPro');

var EditorOutputTabViewPro = require('./editor/OutputTabViewPro');

var EditorNotificationsTabViewPro = require('./editor/NotificationsTabViewPro');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = JobEditorView.extend({
  _initializeTabs: function _initializeTabs(options) {
    var tabParams = {
      model: this.model,
      isDashboard: options.isDashboard,
      reportUri: options.reportUri,
      parentReportURI: options.parentReportURI
    };
    this.tabs.scheduleTab = new EditorScheduleTabView(tabParams);
    this.tabs.parametersTab = new ParametersTabViewPro(tabParams);
    this.tabs.outputTab = new EditorOutputTabViewPro(tabParams);
    this.tabs.notificationsTab = new EditorNotificationsTabViewPro(tabParams);
  }
});

});