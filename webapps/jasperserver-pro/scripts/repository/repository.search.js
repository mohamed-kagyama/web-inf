define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var __jrsConfigs__ = require("runtime_dependencies/js-sdk/src/jrs.configs");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;

var _runtime_dependenciesJrsUiSrcRepositoryRepositorySearchMain = require("runtime_dependencies/jrs-ui/src/repository/repository.search.main");

var repositorySearch = _runtime_dependenciesJrsUiSrcRepositoryRepositorySearchMain.repositorySearch;
var ResourcesUtils = _runtime_dependenciesJrsUiSrcRepositoryRepositorySearchMain.ResourcesUtils;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
function getInitOptions() {
  return window.localContext.rsInitOptions || __jrsConfigs__.repositorySearch["localContext"].rsInitOptions;
}

repositorySearch.notSupportedByIPad = ["DashboardResource", "SemanticLayerDataSource"];

function isDomainTopic(resource) {
  return resource.typeSuffix() == "DataDefinerUnit";
}

function isDashboard(resource) {
  return resource.typeSuffix() == "DashboardResource" || resource.typeSuffix() == "DashboardModelResource";
}

function isContentResource(resource) {
  return resource.typeSuffix() == "ContentResource";
}

function isSupportedOnIPad(resource) {
  return !isIPad() || !["DashboardResource", "SemanticLayerDataSource"].include(resource.typeSuffix());
}

function isAdhocReportUnit(resource) {
  return resource.typeSuffix() == "AdhocReportUnit";
}

function isAdhocDataView(resource) {
  return resource.typeSuffix() == "AdhocDataView";
}

function canBeRun(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  var canOlapUnitBeRun = true;

  if ("OlapUnit" == resource.typeSuffix() && !getInitOptions().isAnalysisFeatureEnabled) {
    canOlapUnitBeRun = false;
  }

  if (isAdhocReportUnit(resource) && getInitOptions().isAdHoReportDisabled) {
    return false;
  }

  if (isDashboard(resource) && !getInitOptions().isDashboardFeatureEnabled) {
    return false;
  }

  return resource && resource.isReadable() && canOlapUnitBeRun && repositorySearch.runActionFactory[resource.typeSuffix()] && !repositorySearch.isflowRedirectRunning;
}

function canBeGenerated(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  return resource && resource.isReadable() && isAdhocDataView(resource) && getInitOptions().isAdHoReportDisabled && !repositorySearch.isflowRedirectRunning;
}

function canBeConverted(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  return resource && resource.isReadable() && isAdhocReportUnit(resource) && getInitOptions().isAdHoReportDisabled && !repositorySearch.isflowRedirectRunning;
}

function canResourceBeEdited(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  var canOlapUnitBeEdit = true;

  if (["OlapUnit", "XMLAConnection", "SecureMondrianConnection"].include(resource.typeSuffix()) && !getInitOptions().isAnalysisFeatureEnabled) {
    canOlapUnitBeEdit = false;
  }

  var hasEditActionImpl = repositorySearch.editActionFactory[resource.typeSuffix()] || ResourcesUtils.isCustomDataSource(resource);
  var allowed = resource && resource.isEditable() && canOlapUnitBeEdit && hasEditActionImpl;

  if (!isSupportedOnIPad(resource)) {
    return false;
  } // Edit menu item is forbidden.


  if (["DashboardResource"].include(resource.typeSuffix()) || isAdhocReportUnit(resource)) {
    return false;
  } else {
    return allowed;
  }
}

function canBeRunInBackground(resource) {
  return window.canBeScheduled(resource);
}

function canBeScheduled(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  return resource && resource.isReadable() && !isAdhocReportUnit(resource) && [repositorySearch.ResourceType.REPORT_UNIT, repositorySearch.ResourceType.ADHOC_REPORT_UNIT, repositorySearch.ResourceType.DASHBOARD, repositorySearch.ResourceType.REPORT_OPTIONS].include(resource.resourceType);
}

function canBeOpened(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];

  if (!resource) {
    return false;
  }

  if (isDashboard(resource)) {
    return false;
  }

  if (isDomainTopic(resource)) {
    return false;
  }

  if (!isSupportedOnIPad(resource)) {
    return false;
  }

  if (isAdhocDataView(resource)) {
    return !!repositorySearch.openActionFactory[resource.typeSuffix()];
  }

  if (isContentResource(resource)) {
    return resource.isReadable() && repositorySearch.openActionFactory[resource.typeSuffix()];
  }

  return resource.isEditable() && repositorySearch.openActionFactory[resource.typeSuffix()];
}

function canBeOpenedInDesigner(resource) {
  resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];

  if (isDashboard(resource) && !getInitOptions().isDashboardFeatureEnabled || isAdhocReportUnit(resource)) {
    return false;
  }

  if (isAdhocReportUnit(resource) || isAdhocDataView(resource)) {
    return false; //should be opened with "open" menu item, not "open in designer"
  }

  if (isDomainTopic(resource)) {
    return false; //should be opened with "edit" menu item, not "open in designer"
  }

  return resource && resource.isEditable() && repositorySearch.openActionFactory[resource.typeSuffix()] && resource.typeSuffix() !== "ContentResource";
}

function canResourceBeCreated(type) {
  var folder = repositorySearch.model.getContextFolder();

  if ((type == "OlapClientConnection" || type == "OlapUnit") && !getInitOptions().isAnalysisFeatureEnabled) {
    return false;
  }

  return folder && !folder.isOrganization() && !folder.isRoot() && !folder.isOrganizationsRoot() && folder.isEditable();
}

window.canResourceBeCreated = canResourceBeCreated;
window.canBeOpenedInDesigner = canBeOpenedInDesigner;
window.canBeOpened = canBeOpened;
window.canBeScheduled = canBeScheduled;
window.canBeRunInBackground = canBeRunInBackground;
window.canResourceBeEdited = canResourceBeEdited;
window.canBeConverted = canBeConverted;
window.canBeGenerated = canBeGenerated;
window.canBeRun = canBeRun;
window.isContentResource = isContentResource;
module.exports = repositorySearch;

});