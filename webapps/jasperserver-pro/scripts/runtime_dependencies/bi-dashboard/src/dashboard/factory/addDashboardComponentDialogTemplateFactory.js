define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var addWebPageViewDialogContentTemplate = require("text!../template/addWebPageViewDialogContentTemplate.htm");

var addTextDialogContentTemplate = require("text!../template/addTextDialogContentTemplate.htm");

var addImageDialogContentTemplate = require("text!../template/addImageDialogContentTemplate.htm");

var addAdHocViewDialogContentTemplate = require("text!../template/addAdHocViewDialogContentTemplate.htm");

var basePropertiesDialogTemplate = require("text!../template/properties/basePropertiesDialogTemplate.htm");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var templateByType = {};
templateByType[dashboardComponentTypes.WEB_PAGE_VIEW] = addWebPageViewDialogContentTemplate;
templateByType[dashboardComponentTypes.FREE_TEXT] = addTextDialogContentTemplate;
templateByType[dashboardComponentTypes.IMAGE] = addImageDialogContentTemplate;
templateByType[dashboardComponentTypes.ADHOC_VIEW] = addAdHocViewDialogContentTemplate;
templateByType[dashboardComponentTypes.TABLE] = addAdHocViewDialogContentTemplate;
templateByType[dashboardComponentTypes.CHART] = addAdHocViewDialogContentTemplate;
templateByType[dashboardComponentTypes.CROSSTAB] = addAdHocViewDialogContentTemplate;

module.exports = function (model) {
  var type;
  var template = (type = model.get('type')) in templateByType ? templateByType[type] : basePropertiesDialogTemplate;
  return template;
};

});