define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require("underscore");

var request = require("request");

var ReportModel = require("runtime_dependencies/bi-report/src/bi/report/model/ReportModel");

var ReportExecutionModel = require("runtime_dependencies/bi-report/src/bi/report/model/ReportExecutionModel");

var createReportModelMixin = require("./factory/reportModelMixinFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DashboardReportNavigation = {
  dashboardReportsId: [],
  addDashboardReport: function addDashboardReport(id) {
    this.dashboardReportsId.push(id);
  },
  confirmAndLeave: function confirmAndLeave() {
    return function (exitCallback) {
      var promises = [];

      _.each(DashboardReportNavigation.dashboardReportsId, function (url) {
        promises.push(request({
          url: url,
          type: 'DELETE'
        }));
      });

      $.when.apply($, promises).done(function () {
        if (typeof exitCallback == 'function') {
          DashboardReportNavigation.dashboardReportsId = [];
          exitCallback();
        }
      });
    };
  }
};
var ReportModelExecute = ReportModel.prototype.execute;
var reportModelMixin = createReportModelMixin(ReportModelExecute, DashboardReportNavigation);
var reportExecModelMixin = {
  remove: function remove() {}
};

_.extend(ReportModel.prototype, reportModelMixin);

_.extend(ReportExecutionModel.prototype, reportExecModelMixin);

module.exports = DashboardReportNavigation;

});