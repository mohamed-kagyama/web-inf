define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DashboardBundle");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var titleByType = {};
var baseTitle = i18n['dashboard.dashlet.dialog.properties.title'];
titleByType[dashboardComponentTypes.DASHBOARD_PROPERTIES] = i18n['dashboard.dialog.properties.title'];
titleByType[dashboardComponentTypes.INPUT_CONTROL] = i18n['dashboard.component.filter.properties.title'];

module.exports = function (model) {
  var type;
  var title = (type = model.get('type')) in titleByType ? titleByType[type] : baseTitle;
  return title;
};

});