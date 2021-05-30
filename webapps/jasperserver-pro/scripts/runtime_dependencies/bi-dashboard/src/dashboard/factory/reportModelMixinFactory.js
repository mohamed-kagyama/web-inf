define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var createReportModelMixin = function createReportModelMixin(reportModelExecute, dashboardReportNavigation) {
  return {
    execute: function execute() {
      var self = this;
      return reportModelExecute.apply(this, arguments).then(function (response) {
        dashboardReportNavigation.addDashboardReport(self.execution.urlRun() + '/' + response.requestId);
      });
    }
  };
};

module.exports = createReportModelMixin;

});