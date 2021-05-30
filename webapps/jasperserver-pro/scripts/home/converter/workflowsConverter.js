define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _typesWorkflowNameToIconClassEnum = require('../types/workflowNameToIconClassEnum');

var workflowNameToIconClassEnum = _typesWorkflowNameToIconClassEnum.workflowNameToIconClassEnum;

var _typesWorkflowNameToPrimaryActionClassEnum = require('../types/workflowNameToPrimaryActionClassEnum');

var workflowNameToPrimaryActionClassEnum = _typesWorkflowNameToPrimaryActionClassEnum.workflowNameToPrimaryActionClassEnum;

var i18n = require("bundle!HomeBundle");

var workflowCategoryEnum = require('../types/workflowCategoryEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getPropsForVisualizationsOrDataWorkflows(workflow) {
  var links = workflow._links;
  var create = links.create;
  var primaryActionLabel = create && create.title ? create.title : '';
  var webflowResource = links.resources && links.resources[0];
  var secondaryActionLabel = webflowResource && webflowResource.title ? webflowResource.title : '';
  return {
    name: workflow.name,
    title: workflow.label,
    description: workflow.description,
    iconClass: workflowNameToIconClassEnum[workflow.name],
    iconAriaLabel: '',
    primaryActionClass: workflowNameToPrimaryActionClassEnum[workflow.name],
    primaryActionHasIcon: true,
    isSecondaryActionDisabled: true,
    primaryActionUrl: create ? create.href : undefined,
    secondaryActionUrl: webflowResource && webflowResource.href,
    primaryActionLabel: primaryActionLabel,
    secondaryActionLabel: secondaryActionLabel,
    primaryActionAriaLabel: "".concat(primaryActionLabel, " ").concat(workflow.label),
    secondaryActionAriaLabel: "".concat(secondaryActionLabel, " ").concat(workflow.label)
  };
}

function getPropsForHomeAdminWorkflows(workflow) {
  return {
    name: workflow.name,
    title: workflow.label,
    description: workflow.description,
    iconClass: workflowNameToIconClassEnum[workflow.name],
    iconAriaLabel: '',
    primaryActionClass: workflowNameToPrimaryActionClassEnum[workflow.name],
    primaryActionHasIcon: true,
    secondaryActionLabel: '',
    secondaryActionAriaLabel: '',
    isSecondaryActionDisabled: true,
    primaryActionUrl: workflow.controls.href,
    primaryActionLabel: workflow.controls.label,
    primaryActionAriaLabel: "".concat(workflow.controls.label, " ").concat(workflow.label)
  };
}

var workflowsConverter = function workflowsConverter(workflows) {
  var visualizations = workflows.filter(function (hwf) {
    return hwf.category === workflowCategoryEnum.VISUALIZATIONS;
  }).map(getPropsForVisualizationsOrDataWorkflows);
  var data = workflows.filter(function (hwf) {
    return hwf.category === workflowCategoryEnum.DATA;
  }).map(getPropsForVisualizationsOrDataWorkflows);
  var admin = workflows.filter(function (hwf) {
    return hwf.category === workflowCategoryEnum.ADMIN;
  }).map(getPropsForHomeAdminWorkflows);
  var result = [];

  if (visualizations.length > 0) {
    result.push({
      title: i18n['category.visualizations'],
      categoryClass: 'workflowsVisualizations',
      items: visualizations
    });
  }

  if (data.length > 0) {
    result.push({
      title: i18n['category.data'],
      categoryClass: 'workflowsData',
      items: data
    });
  }

  if (admin.length > 0) {
    result.push({
      title: i18n['category.admin'],
      categoryClass: 'workflowsAdmin',
      items: admin
    });
  }

  return result;
};

exports.workflowsConverter = workflowsConverter;

});