define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dashboardPropertiesDialogTemplate = require("text!../template/properties/dashboardPropertiesDialogTemplate.htm");

var filterPropertiesDialogTemplate = require("text!../template/properties/filterPropertiesDialogTemplate.htm");

var autoRefreshControlTemplate = require("text!../template/properties/controls/autoRefreshControlTemplate.htm");

var showTitleBarElementsControlTemplateFactory = require('../factory/showTitleBarElementsControlTemplateFactory');

var showVisualizeSelectorIconControlTemplate = require("text!../template/properties/controls/showVisualizeSelectorIconControlTemplate.htm");

var addressControlTemplate = require("text!../template/properties/controls/addressControlTemplate.htm");

var webRepoAddressControlTemplate = require("text!../template/properties/controls/webRepoAddressControlTemplate.htm");

var scrollBarsControlTemplate = require("text!../template/properties/controls/scrollBarsControlTemplate.htm");

var bordersControlTemplate = require("text!../template/properties/controls/bordersControlTemplate.htm");

var sourceDataControlTemplate = require("text!../template/properties/controls/sourceDataControlTemplate.htm");

var sourceReportControlTemplate = require("text!../template/properties/controls/sourceReportControlTemplate.htm");

var sourceAdHocViewControlTemplate = require("text!../template/properties/controls/sourceAdHocViewControlTemplate.htm");

var scaleToFitControlTemplate = require("text!../template/properties/controls/scaleToFitControlTemplate.htm");

var filtersPerRowControlTemplate = require("text!../template/properties/controls/filter/filtersPerRowControlTemplate.htm");

var filterButtonsPositionControlTemplate = require("text!../template/properties/controls/filter/filterButtonsPositionControlTemplate.htm");

var applyResetButtonControlTemplate = require("text!../template/properties/controls/applyResetButtonControlTemplate.htm");

var textInputControlTemplate = require("text!../template/properties/controls/text/textInputControlTemplate.htm");

var basePropetiesDialogTemplate = require("text!../template/properties/basePropertiesDialogTemplate.htm");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var templateByType = {};
templateByType[dashboardComponentTypes.DASHBOARD_PROPERTIES] = [dashboardPropertiesDialogTemplate, autoRefreshControlTemplate].join('\n');
templateByType[dashboardComponentTypes.WEB_PAGE_VIEW] = [basePropetiesDialogTemplate, addressControlTemplate, showTitleBarElementsControlTemplateFactory(dashboardComponentTypes.WEB_PAGE_VIEW), scrollBarsControlTemplate, autoRefreshControlTemplate].join('\n');
templateByType[dashboardComponentTypes.REPORT] = [basePropetiesDialogTemplate, sourceReportControlTemplate, showTitleBarElementsControlTemplateFactory(dashboardComponentTypes.REPORT), showVisualizeSelectorIconControlTemplate, scaleToFitControlTemplate, autoRefreshControlTemplate].join('\n');
templateByType[dashboardComponentTypes.FREE_TEXT] = [basePropetiesDialogTemplate, textInputControlTemplate].join('\n');
templateByType[dashboardComponentTypes.IMAGE] = [basePropetiesDialogTemplate, webRepoAddressControlTemplate, showTitleBarElementsControlTemplateFactory(dashboardComponentTypes.IMAGE), bordersControlTemplate, scaleToFitControlTemplate].join('\n');
templateByType[dashboardComponentTypes.FILTER_GROUP] = [basePropetiesDialogTemplate, filtersPerRowControlTemplate, applyResetButtonControlTemplate, filterButtonsPositionControlTemplate].join('\n');
templateByType[dashboardComponentTypes.INPUT_CONTROL] = filterPropertiesDialogTemplate;
templateByType[dashboardComponentTypes.ADHOC_VIEW] = [basePropetiesDialogTemplate, sourceAdHocViewControlTemplate, showTitleBarElementsControlTemplateFactory(dashboardComponentTypes.ADHOC_VIEW), showVisualizeSelectorIconControlTemplate, scaleToFitControlTemplate, autoRefreshControlTemplate].join('\n');
templateByType[dashboardComponentTypes.CROSSTAB] = [basePropetiesDialogTemplate, sourceDataControlTemplate, showTitleBarElementsControlTemplateFactory(dashboardComponentTypes.CROSSTAB), showVisualizeSelectorIconControlTemplate, scaleToFitControlTemplate, autoRefreshControlTemplate].join('\n');
templateByType[dashboardComponentTypes.TABLE] = templateByType[dashboardComponentTypes.CROSSTAB];
templateByType[dashboardComponentTypes.CHART] = templateByType[dashboardComponentTypes.CROSSTAB];
/**
 * @description wraps template into div
 * @access private
 * @memberof factory:propertiesTemplateFactory
 */

/**
 * @description wraps template into div
 * @access private
 * @memberof factory:propertiesTemplateFactory
 */

function wrapTemplate(template) {
  return '<div>' + template + '</div>';
}

module.exports = function (model) {
  var type;
  var template = (type = model.get('type')) in templateByType ? templateByType[type] : basePropetiesDialogTemplate;
  return wrapTemplate(template);
};

});