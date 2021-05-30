define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var adhocDesignerReportTypeToDashboardComponentTypeMap = {
  'olap_ichart': dashboardComponentTypes.CHART,
  'olap_crosstab': dashboardComponentTypes.CROSSTAB,
  'ichart': dashboardComponentTypes.CHART,
  'crosstab': dashboardComponentTypes.CROSSTAB,
  'table': dashboardComponentTypes.TABLE
};

module.exports = function (viewType) {
  return adhocDesignerReportTypeToDashboardComponentTypeMap[viewType];
};

});