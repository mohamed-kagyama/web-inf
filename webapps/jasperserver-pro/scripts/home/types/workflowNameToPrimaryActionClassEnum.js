define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _workflowNameToPrimar, _adminWorkflowNameToP;

var _workflowNameEnum = require('./workflowNameEnum');

var adminWorkflowName = _workflowNameEnum.adminWorkflowName;
var workflowNameEnum = _workflowNameEnum.workflowNameEnum;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var workflowNameToPrimaryActionClassEnum = (_workflowNameToPrimar = {}, _defineProperty(_workflowNameToPrimar, workflowNameEnum.ADHOC, 'create'), _defineProperty(_workflowNameToPrimar, workflowNameEnum.REPORT, 'create'), _defineProperty(_workflowNameToPrimar, workflowNameEnum.DASHBOARD, 'create'), _defineProperty(_workflowNameToPrimar, workflowNameEnum.DATA_SOURCE, 'create'), _defineProperty(_workflowNameToPrimar, workflowNameEnum.DOMAIN, 'create'), _defineProperty(_workflowNameToPrimar, workflowNameEnum.ADMIN, 'admin'), _workflowNameToPrimar);
var adminWorkflowNameToPrimaryActionClass = (_adminWorkflowNameToP = {}, _defineProperty(_adminWorkflowNameToP, adminWorkflowName.REPOSITORY, 'manage'), _defineProperty(_adminWorkflowNameToP, adminWorkflowName.ROLES, 'manage'), _defineProperty(_adminWorkflowNameToP, adminWorkflowName.SERVER_SETTINGS, 'manage'), _defineProperty(_adminWorkflowNameToP, adminWorkflowName.USERS, 'manage'), _adminWorkflowNameToP);
exports.workflowNameToPrimaryActionClassEnum = workflowNameToPrimaryActionClassEnum;
exports.adminWorkflowNameToPrimaryActionClass = adminWorkflowNameToPrimaryActionClass;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});