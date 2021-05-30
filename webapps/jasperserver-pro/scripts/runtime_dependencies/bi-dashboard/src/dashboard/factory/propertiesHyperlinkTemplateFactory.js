define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dashletHyperlinkTemplate = require("text!../template/properties/controls/dashletHyperlinkTemplate.htm");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var templateByType = {};
templateByType[dashboardComponentTypes.DASHBOARD_PROPERTIES] = [].join('\n');
templateByType[dashboardComponentTypes.WEB_PAGE_VIEW] = [].join('\n');
templateByType[dashboardComponentTypes.REPORT] = [].join('\n');
templateByType[dashboardComponentTypes.FREE_TEXT] = [dashletHyperlinkTemplate].join('\n');
templateByType[dashboardComponentTypes.IMAGE] = [dashletHyperlinkTemplate].join('\n');
templateByType[dashboardComponentTypes.FILTER_GROUP] = [].join('\n');
templateByType[dashboardComponentTypes.INPUT_CONTROL] = [].join('\n');
templateByType[dashboardComponentTypes.ADHOC_VIEW] = [dashletHyperlinkTemplate].join('\n');
templateByType[dashboardComponentTypes.CROSSTAB] = [].join('\n');
templateByType[dashboardComponentTypes.TABLE] = [].join('\n');
templateByType[dashboardComponentTypes.CHART] = [dashletHyperlinkTemplate].join('\n');
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
  var type,
      template = (type = model.get('type')) in templateByType ? templateByType[type] : '';
  return wrapTemplate(template);
};

});