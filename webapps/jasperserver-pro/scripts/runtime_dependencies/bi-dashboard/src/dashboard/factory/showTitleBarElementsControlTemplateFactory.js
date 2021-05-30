define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var showTitleBarElementsControlTemplate = require("text!../template/properties/controls/titleBarElements/showTitleBarElementsControlTemplate.htm");

var showMaximizeButtonControlTemplate = require("text!../template/properties/controls/titleBarElements/showMaximizeButtonControlTemplate.htm");

var showRefreshButtonControlTemplate = require("text!../template/properties/controls/titleBarElements/showRefreshButtonControlTemplate.htm");

var showExportButtonControlTemplate = require("text!../template/properties/controls/titleBarElements/showExportButtonControlTemplate.htm");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (componentType) {
  switch (componentType) {
    case dashboardComponentTypes.TABLE:
    case dashboardComponentTypes.CROSSTAB:
    case dashboardComponentTypes.REPORT:
    case dashboardComponentTypes.ADHOC_VIEW:
    case dashboardComponentTypes.CHART:
      return showTitleBarElementsControlTemplate.replace('{{controls}}', [showRefreshButtonControlTemplate, showMaximizeButtonControlTemplate, showExportButtonControlTemplate].join('\n'));

    default:
      return showTitleBarElementsControlTemplate.replace('{{controls}}', [showRefreshButtonControlTemplate, showMaximizeButtonControlTemplate].join('\n'));
  }
};

});