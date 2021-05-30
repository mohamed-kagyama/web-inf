define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var _runtime_dependenciesJrsUiSrcControlsControlsBase = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var ControlsBase = _runtime_dependenciesJrsUiSrcControlsControlsBase.ControlsBase;

var jQuery = require('jquery');

var _runtime_dependenciesJrsUiSrcControlsControlsBase2 = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var ControlDialog = _runtime_dependenciesJrsUiSrcControlsControlsBase2.ControlDialog;

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var enableSelection = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.enableSelection;
var buildActionUrl = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.buildActionUrl;

var _runtime_dependenciesJrsUiSrcCoreCoreAjax = require("runtime_dependencies/jrs-ui/src/core/core.ajax");

var AjaxRequester = _runtime_dependenciesJrsUiSrcCoreCoreAjax.AjaxRequester;
var ajaxTargettedUpdate = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajaxTargettedUpdate;

var designerBase = require('../base/designer.base');

var _coreCoreAjaxUtils = require("../core/core.ajax.utils");

var baseErrorHandler = _coreCoreAjaxUtils.baseErrorHandler;

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

var Report = require("runtime_dependencies/jrs-ui/src/reportViewer/report.view.base");

require("runtime_dependencies/jrs-ui/src/reportViewer/report.view.base");

require("runtime_dependencies/jrs-ui/src/controls/controls.controller");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
var adhocControls = {
  CONTROLS_LOCATION: 'filtersMainTableICCell',
  filterSaveAsCheckbox: null,
  controlsController: null,
  hideDialog: null,
  initialControlsData: null,
  lastSelection: {
    controlsData: null,
    saveAsDefault: null
  },
  initialize: function initialize(state) {
    if (window.hasVisibleInputControls !== 'true' || !$(ControlsBase.INPUT_CONTROLS_DIALOG)) {
      return;
    }

    this.controlsController = new JRS.Controls.Controller({
      reportUri: Report.reportUnitURI
    });
    var optionsContainerSelector = '#' + ControlsBase.INPUT_CONTROLS_FORM + ' .sub.header';

    if (jQuery('#' + ControlsBase.INPUT_CONTROLS_DIALOG).length > 0) {
      optionsContainerSelector = '#' + ControlsBase.INPUT_CONTROLS_DIALOG + ' .sub.header';
    }

    this.viewModel = this.controlsController.getViewModel();
    this.viewModel.reloadContainer();
    this.controlsController.fetchAndSetInputControlsState().always(function () {
      var viewModel = adhocControls.viewModel;
      adhocControls.initialControlsData = viewModel.get('selection');

      if (!viewModel.areAllControlsValid() || window.reportForceControlsOnStart === 'true') {
        adhocControls.launchDialog();
      } else {
        adhocControls.forceFiltersFromControls();
      }
    });
    this.filterSaveAsCheckbox = jQuery('#filterssaveasdefault');

    if (this.filterSaveAsCheckbox.length === 0) {
      throw Error('Can\'t find filter save as default');
    }

    adhocControls.setSaveAsDefaultCheckbox(state.isSaveParametersAsDefault);
    var dialogButtonActions = {
      'button#ok': this.applyFilters.curry(true),
      'button#cancel': this.cancel,
      'button#reset': this.reset,
      'button#apply': this.applyFilters.curry(false)
    };
    this._dialog = new ControlDialog(dialogButtonActions);
  },
  launchDialog: function launchDialog() {
    if (window.hasVisibleInputControls !== 'true') return;

    adhocControls._dialog.show();

    enableSelection(adhocControls._dialog._dom);
    adhocControls.setFocusOnFirstInputControl();
  },
  applyFilters: function applyFilters(closeDialog) {
    adhocControls.hideDialog = closeDialog;

    if (adhocControls.isSelectionChanged()) {
      adhocControls.controlsController.validate().then(function (areControlsValid) {
        if (areControlsValid) {
          adhocControls.forceFiltersFromControls();
          closeDialog && adhocControls.closeDialog();
        }
      });
    } else if (adhocControls.viewModel.areAllControlsValid()) {
      closeDialog && adhocControls.closeDialog();
    }
  },
  reset: function reset() {
    adhocControls.controlsController.resetControlsToSelection(adhocControls.initialControlsData);
    adhocControls.setSaveAsDefaultCheckbox(true);
  },
  cancel: function cancel() {
    adhocControls.closeDialog();

    if (adhocControls.isSelectionChanged()) {
      adhocControls.restoreDialogLastSelection();
    }
  },
  forceFiltersFromControls: function forceFiltersFromControls() {
    var selectedData = adhocControls.getControlsSelection();
    var extraParams;
    var saveAsDefaultChecked = adhocControls.isSaveAsDefaultCheckbox();

    if (saveAsDefaultChecked) {
      extraParams = {
        'filterssaveasdefault': 'on'
      };
    }

    adhocControls.forceFilterAction(ControlsBase.buildSelectedDataUri(selectedData, extraParams));
    adhocControls.saveDialogLastSelection(selectedData, saveAsDefaultChecked);
  },
  closeDialog: function closeDialog() {
    adhocControls._dialog.hide();
  },
  leaveAdhoc: function leaveAdhoc() {
    document.location = buildActionUrl({
      _flowId: 'homeFlow'
    });
  },
  refreshAdhocDesigner: function refreshAdhocDesigner() {
    var callback = function callback(state) {
      window.localContext.standardOpCallback(state);
      window.adhocDesigner.filtersController.setFilters(state, {
        reset: true
      });
    };

    designerBase.sendRequest('co_loadState', [], callback);
  },
  requestFilterAction: function requestFilterAction(callback, action, opts, postData) {
    var urlData = {
      _flowId: 'adhocAjaxFilterDialogFlow',
      clientKey: window.clientKey,
      decorate: 'no'
    };
    urlData[action] = 'true';
    var url = buildActionUrl(urlData);
    var options = Object.extend({
      postData: postData,
      callback: callback,
      mode: AjaxRequester.prototype.EVAL_JSON,
      errorHandler: baseErrorHandler
    }, opts);
    ajaxTargettedUpdate(url, options);
  },
  setFilters: function setFilters(callback) {
    adhocControls.requestFilterAction(callback, 'setFilters');
  },
  forceFilterAction: function forceFilterAction(postData) {
    adhocControls.requestFilterAction(function (ajax) {
      if (ajax === 'success') {
        adhocControls.refreshAdhocDesigner();
        adhocControls.hideDialog && adhocControls.closeDialog();
      }
    }, 'setFilters', null, postData);
  },
  setFocusOnFirstInputControl: function setFocusOnFirstInputControl() {
    if (typeof window.firstInputControlName != 'undefined' && window.firstInputControlName) {
      var inputOrSelect = $(window.firstInputControlName);

      if (inputOrSelect) {
        inputOrSelect.focus();
      }
    }
  },

  /**
   * Checks whether input controls data has been changed AND
   * whether saveAsDefault checkbox has been changed.
   */
  isSelectionChanged: function isSelectionChanged() {
    return JRS.Controls.ViewModel.isSelectionChanged(adhocControls.getControlsLastSelection(), adhocControls.getControlsSelection()) || adhocControls.getSaveAsDefaultCheckboxLastValue() != adhocControls.isSaveAsDefaultCheckbox();
  },
  setSaveAsDefaultCheckbox: function setSaveAsDefaultCheckbox(check) {
    check ? adhocControls.filterSaveAsCheckbox.prop('checked', true) : adhocControls.filterSaveAsCheckbox.removeAttr('checked');
  },
  isSaveAsDefaultCheckbox: function isSaveAsDefaultCheckbox() {
    return adhocControls.filterSaveAsCheckbox.is(':checked');
  },
  getControlsSelection: function getControlsSelection() {
    return adhocControls.viewModel.get('selection');
  },
  restoreDialogLastSelection: function restoreDialogLastSelection() {
    adhocControls.controlsController.resetControlsToSelection(adhocControls.lastSelection.controlsData);
    adhocControls.setSaveAsDefaultCheckbox(adhocControls.lastSelection.saveAsDefault);
  },
  saveDialogLastSelection: function saveDialogLastSelection(selectedData, saveAsDefaultChecked) {
    adhocControls.lastSelection.controlsData = selectedData;
    adhocControls.lastSelection.saveAsDefault = saveAsDefaultChecked;
  },
  getControlsLastSelection: function getControlsLastSelection() {
    return adhocControls.lastSelection.controlsData;
  },
  getSaveAsDefaultCheckboxLastValue: function getSaveAsDefaultCheckboxLastValue() {
    return adhocControls.lastSelection.saveAsDefault;
  }
};
module.exports = adhocControls;

});