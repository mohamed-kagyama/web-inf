define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _workflowNameToIconCl, _adminWorkflowNameToI;

var _workflowNameEnum = require('./workflowNameEnum');

var adminWorkflowName = _workflowNameEnum.adminWorkflowName;
var workflowNameEnum = _workflowNameEnum.workflowNameEnum;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var workflowNameToIconClassEnum = (_workflowNameToIconCl = {}, _defineProperty(_workflowNameToIconCl, workflowNameEnum.ADHOC, 'workflow-icon-adhocview'), _defineProperty(_workflowNameToIconCl, workflowNameEnum.REPORT, 'workflow-icon-report'), _defineProperty(_workflowNameToIconCl, workflowNameEnum.DASHBOARD, 'workflow-icon-dashboard'), _defineProperty(_workflowNameToIconCl, workflowNameEnum.DATA_SOURCE, 'workflow-icon-datasource'), _defineProperty(_workflowNameToIconCl, workflowNameEnum.DOMAIN, 'workflow-icon-domain'), _defineProperty(_workflowNameToIconCl, workflowNameEnum.ADMIN, 'workflow-icon-admin'), _workflowNameToIconCl);
var adminWorkflowNameToIconClassEnum = (_adminWorkflowNameToI = {}, _defineProperty(_adminWorkflowNameToI, adminWorkflowName.REPOSITORY, 'workflow-icon-repository'), _defineProperty(_adminWorkflowNameToI, adminWorkflowName.ROLES, 'workflow-icon-roles'), _defineProperty(_adminWorkflowNameToI, adminWorkflowName.SERVER_SETTINGS, 'workflow-icon-serversettings'), _defineProperty(_adminWorkflowNameToI, adminWorkflowName.USERS, 'workflow-icon-users'), _adminWorkflowNameToI);
exports.workflowNameToIconClassEnum = workflowNameToIconClassEnum;
exports.adminWorkflowNameToIconClassEnum = adminWorkflowNameToIconClassEnum;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});