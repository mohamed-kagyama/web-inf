define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DashboardBundle");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var titleByType = {};
var baseTitle = i18n['dashboard.base.dialog.properties.title'];
titleByType[dashboardComponentTypes.WEB_PAGE_VIEW] = i18n['dashboard.component.web.page.view.add.component.dialog.title'];
titleByType[dashboardComponentTypes.FREE_TEXT] = i18n['dashboard.component.text.add.component.dialog.title'];
titleByType[dashboardComponentTypes.IMAGE] = i18n['dashboard.component.image.add.component.dialog.title'];
titleByType[dashboardComponentTypes.CROSSTAB] = i18n['dashboard.component.crosstab.save.title'];
titleByType[dashboardComponentTypes.TABLE] = i18n['dashboard.component.table.save.title'];
titleByType[dashboardComponentTypes.CHART] = i18n['dashboard.component.chart.save.title'];
titleByType[dashboardComponentTypes.ICHART] = i18n['dashboard.component.ichart.save.title'];

module.exports = function (model) {
  var type;
  var title = (type = model.get('type')) in titleByType ? titleByType[type] : baseTitle;
  return title;
};

});