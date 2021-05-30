define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var workflowNameEnum;

(function (workflowNameEnum) {
  workflowNameEnum["ADHOC"] = "adhocView";
  workflowNameEnum["REPORT"] = "report";
  workflowNameEnum["DASHBOARD"] = "dashboard";
  workflowNameEnum["DOMAIN"] = "domain";
  workflowNameEnum["DATA_SOURCE"] = "dataSource";
  workflowNameEnum["ADMIN"] = "admin";
})(workflowNameEnum || (workflowNameEnum = {}));

var adminWorkflowName;

(function (adminWorkflowName) {
  adminWorkflowName["USERS"] = "users";
  adminWorkflowName["ROLES"] = "roles";
  adminWorkflowName["SERVER_SETTINGS"] = "serverSettings";
  adminWorkflowName["REPOSITORY"] = "repository";
})(adminWorkflowName || (adminWorkflowName = {}));

exports.workflowNameEnum = workflowNameEnum;
exports.adminWorkflowName = adminWorkflowName;

});