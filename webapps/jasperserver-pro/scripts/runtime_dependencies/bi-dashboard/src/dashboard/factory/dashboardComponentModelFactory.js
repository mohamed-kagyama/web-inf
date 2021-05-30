define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DashletModel = require('../model/component/DashletModel');

var InputControlDashboardComponentModel = require('../model/component/InputControlDashboardComponentModel');

var PropertiesDashboardComponentModel = require('../model/component/PropertiesDashboardComponentModel');

var ReportDashletModel = require('../model/component/ReportDashletModel');

var AdhocViewDashletModel = require('../model/component/AdhocViewDashletModel');

var WebPageDashletModel = require('../model/component/WebPageDashletModel');

var TextDashletModel = require('../model/component/TextDashletModel');

var ImageDashletModel = require('../model/component/ImageDashletModel');

var FilterGroupDashletModel = require('../model/component/FilterGroupDashletModel');

var ValueDashboardComponentModel = require('../model/component/ValueDashboardComponentModel');

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var typeToConstructorMap = {};
typeToConstructorMap[dashboardComponentTypes.WEB_PAGE_VIEW] = WebPageDashletModel;
typeToConstructorMap[dashboardComponentTypes.FREE_TEXT] = TextDashletModel;
typeToConstructorMap[dashboardComponentTypes.IMAGE] = ImageDashletModel;
typeToConstructorMap[dashboardComponentTypes.FILTER_GROUP] = FilterGroupDashletModel;
typeToConstructorMap[dashboardComponentTypes.CHART] = AdhocViewDashletModel;
typeToConstructorMap[dashboardComponentTypes.CROSSTAB] = AdhocViewDashletModel;
typeToConstructorMap[dashboardComponentTypes.TABLE] = AdhocViewDashletModel;
typeToConstructorMap[dashboardComponentTypes.INPUT_CONTROL] = InputControlDashboardComponentModel;
typeToConstructorMap[dashboardComponentTypes.VALUE] = ValueDashboardComponentModel;
typeToConstructorMap[dashboardComponentTypes.DASHBOARD_PROPERTIES] = PropertiesDashboardComponentModel;
typeToConstructorMap[dashboardComponentTypes.REPORT] = ReportDashletModel;
typeToConstructorMap[dashboardComponentTypes.ADHOC_VIEW] = AdhocViewDashletModel;
/**
* @memberof factory:dashboardComponentModelFactory
* @description creates component object in top of give object which can be not full or have another properties
* @access private
* @param {object} componentObj - object to be converted into true componentObj
* @param {DashboardResourceModel} dashboardResource
* @returns {componentObj}
*/

var createComponentObj = function createComponentObj(componentObj, dashboardResource) {
  return {
    type: componentObj.id && componentObj.resourceType !== dashboardComponentTypes.INPUT_CONTROL ? componentObj.id : componentObj.type && componentObj.resourceType !== dashboardComponentTypes.INPUT_CONTROL ? componentObj.type : componentObj.resourceType,
    label: componentObj.label,
    resourceId: dashboardResource ? componentObj.id : undefined,
    resource: dashboardResource ? componentObj.uri : undefined
  };
};

var factoryFunction = function factoryFunction(componentObj, additionalOptions, options) {
  var componentObj = options && options.createComponentObj ? createComponentObj(componentObj, additionalOptions.resource) : componentObj;
  var constructor = componentObj.type in typeToConstructorMap ? typeToConstructorMap[componentObj.type] : DashletModel;
  return new constructor(componentObj, additionalOptions);
}; // hack to make Backbone.Collection#set method find idAttribute when factory function is used as model constructor


factoryFunction.prototype.idAttribute = DashletModel.prototype.idAttribute;
module.exports = factoryFunction;

});