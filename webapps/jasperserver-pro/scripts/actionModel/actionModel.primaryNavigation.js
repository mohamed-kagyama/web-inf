define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var primaryNavModule = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation");

var DashboardReportNavigation = require("runtime_dependencies/bi-dashboard/src/dashboard/DashboardReportNavigation");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = primaryNavModule;

_.extend(primaryNavModule, {
  bodyIds: _.extend({}, primaryNavModule.bodyIds, {
    'dashboard': DashboardReportNavigation.confirmAndLeave
  })
});

});