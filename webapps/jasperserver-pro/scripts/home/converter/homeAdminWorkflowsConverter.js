define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _typesWorkflowNameToIconClassEnum = require('../types/workflowNameToIconClassEnum');

var adminWorkflowNameToIconClassEnum = _typesWorkflowNameToIconClassEnum.adminWorkflowNameToIconClassEnum;

var _typesWorkflowNameToPrimaryActionClassEnum = require('../types/workflowNameToPrimaryActionClassEnum');

var adminWorkflowNameToPrimaryActionClass = _typesWorkflowNameToPrimaryActionClassEnum.adminWorkflowNameToPrimaryActionClass;

var i18n = require("bundle!HomeBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getPropsForAdminWorkflows(workflow) {
  return {
    name: workflow.name,
    title: workflow.label,
    description: workflow.description,
    iconClass: adminWorkflowNameToIconClassEnum[workflow.name],
    iconAriaLabel: '',
    primaryActionClass: adminWorkflowNameToPrimaryActionClass[workflow.name],
    primaryActionHasIcon: false,
    secondaryActionLabel: '',
    secondaryActionAriaLabel: '',
    isSecondaryActionDisabled: true,
    primaryActionUrl: workflow.controls.href,
    primaryActionLabel: workflow.controls.label,
    primaryActionAriaLabel: "".concat(workflow.controls.label, " ").concat(workflow.label)
  };
}

;

var adminWorkflowsConverter = function adminWorkflowsConverter(workflows) {
  return {
    title: i18n['category.admin'],
    categoryClass: 'workflowsAdmin',
    items: workflows.map(getPropsForAdminWorkflows)
  };
};

exports.adminWorkflowsConverter = adminWorkflowsConverter;

});