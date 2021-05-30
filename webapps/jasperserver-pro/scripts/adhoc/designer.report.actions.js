define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var adhocDesigner = require('./designer');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var exists = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.exists;
var gotoDefaultLocation = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.gotoDefaultLocation;

var toolbarButtonModule = require("runtime_dependencies/jrs-ui/src/components/components.toolbarButtons.events");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var jQuery = require('jquery');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var AdhocIntelligentChart = require("./intelligentChart/adhocIntelligentChart");

var request = require("request");

var loadingDialog = require('./loading/loadingDialog');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*
     * Used to return to adhoc start page
     * @param mode
     */
adhocDesigner.goToTopicView = function (mode) {
  var location = 'flow.html?_flowId=adhocFlow&_mode=' + mode + '&launchType=' + window.localContext.state.launchType + '&alreadyEditing=true';

  if (!jrsConfigs.initAdditionalUIComponents) {
    location += '&decorate=no';
  }

  if (window.isEmbeddedDesigner) {
    location += '&' + jQuery.param({
      embeddedDesigner: true,
      embeddedName: window.embeddedName,
      saveAsUri: window.embeddedSaveAsUri,
      saveAsOverwrite: window.embeddedSaveAsOverwrite
    });
  }

  document.location.href = location;
};

adhocDesigner.cancelAdHoc = function () {
  if (exists(window.localContext.isDashboard) && window.localContext.isDashboard) {
    gotoDefaultLocation();
    return;
  }

  if (window.usingAdhocLauncher && window.usingAdhocLauncher !== '') {
    history.back();
  } else {
    this.redirectToTopicPage();
  }
};

adhocDesigner.cancelTopic = function (isAlreadyEditing) {
  if (isAlreadyEditing) {
    history.back();
  } else {
    designerBase.redirectToHomePage();
  }
};

adhocDesigner.enableCanUndoRedo = function () {
  if (exists(toolbarButtonModule)) {
    toolbarButtonModule.setButtonState($('undo'), window.localContext.state.canUndo);
    toolbarButtonModule.setButtonState($('redo'), window.localContext.state.canRedo);
    toolbarButtonModule.setButtonState($('undoAll'), window.localContext.state.canUndo);
  }
};

adhocDesigner.enableRunAndSave = function (isEnabled) {
  if (exists(toolbarButtonModule)) {
    toolbarButtonModule.setButtonState($('save'), isEnabled);
    toolbarButtonModule.setButtonState($('presentation'), isEnabled);
    toolbarButtonModule.setButtonState($('export'), isEnabled);
  }

  window.canRunAndSave = isEnabled;
};

adhocDesigner.canSaveAdhocReport = function () {
  return window.localContext.canSaveReport();
};

adhocDesigner.toggleDisplayManager = function () {
  if (adhocDesigner.isDisplayManagerVisible()) {
    jQuery('#' + adhocDesigner.DISPLAY_MANAGER_ID).addClass(layoutModule.HIDDEN_CLASS);
    adhocDesigner.setDisplayManagerVisible(false);
  } else {
    jQuery('#' + adhocDesigner.DISPLAY_MANAGER_ID).removeClass(layoutModule.HIDDEN_CLASS);
    adhocDesigner.setDisplayManagerVisible(true);
  }

  jQuery('#designer').trigger('layout_update');
  AdhocIntelligentChart.resize();
  adhocDesigner.setShowDisplayManager(adhocDesigner.isDisplayManagerVisible());
};

adhocDesigner.isDisplayManagerVisible = function () {
  return window.localContext.state.showDisplayManager;
};

adhocDesigner.setDisplayManagerVisible = function (visible) {
  window.localContext.state.showDisplayManager = visible;
};

adhocDesigner.isCrosstabCellsMerged = function () {
  return window.localContext.state.crosstab.mergeCrosstabCells;
};

adhocDesigner.exportReport = function (exportFormat) {
  var url = 'reportGenerator.html?action=displayTempReportUnit' + '&clientKey=' + encodeURIComponent(window.clientKey) + '&exportFormat=' + encodeURIComponent(exportFormat || '');
  var dfd = request({
    url: url,
    type: 'GET',
    dataType: 'json'
  }).then(function (response) {
    if (response.status === "OK") {
      window.open(response.data, '_blank');
    } else {
      dialogs.errorPopup.show(response.data.msg);
    }
  }, function () {
    dialogs.errorPopup.show("Unknown Error");
  });
  loadingDialog(dfd, {
    el: jQuery('#loading')
  });
};

adhocDesigner.enableXtabPivot = function (canPivot) {
  if (exists(toolbarButtonModule)) {
    toolbarButtonModule.setButtonState($('pivot'), canPivot);
  }
};

adhocDesigner.enableSort = function (canSort) {
  if (exists(toolbarButtonModule)) {
    toolbarButtonModule.setButtonState($('sort'), canSort);
  }
};

adhocDesigner.toggleUseDomainLabels = function () {
  var useDomainLabels = !window.localContext.state.useDomainLabels;

  var callback = function callback(state) {
    window.localContext.standardOpCallback(state);

    if (adhocDesigner.isUseDomainLabels()) {
      dialogs.systemConfirm.show(adhocDesigner.getMessage('adhoc.designer.warn.use.domain.labels'), 5000);
    }

    adhocDesigner.updateTrees();
    adhocDesigner.filtersController.setFilters(state, {
      reset: true
    });
  };

  designerBase.sendRequest('co_toggleUseDomainLabels', ['name=useDomainLabels', 'value=' + useDomainLabels], callback, null);
};

adhocDesigner.isUseDomainLabels = function () {
  return window.localContext.state.useDomainLabels;
};

module.exports = adhocDesigner;

});