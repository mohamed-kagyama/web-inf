define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $A = _prototype.$A;

var jQuery = require('jquery');

var _ = require('underscore');

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var restoreDefaultCursor = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.restoreDefaultCursor;
var isMetaHeld = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isMetaHeld;
var isShiftHeld = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isShiftHeld;
var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;
var getTextBeforeUnderscore = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getTextBeforeUnderscore;
var getTextAfterUnderscore = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getTextAfterUnderscore;
var isNotNullORUndefined = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isNotNullORUndefined;
var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;
var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;

var _runtime_dependenciesJrsUiSrcCoreCoreAjax = require("runtime_dependencies/jrs-ui/src/core/core.ajax");

var ajaxTargettedUpdate = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajaxTargettedUpdate;
var AjaxRequester = _runtime_dependenciesJrsUiSrcCoreCoreAjax.AjaxRequester;
var ajaxClobberredUpdate = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajaxClobberredUpdate;
var ajaxNonReturningUpdate = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajaxNonReturningUpdate;

var _coreCoreAjaxUtils = require("../core/core.ajax.utils");

var errorHandler = _coreCoreAjaxUtils.errorHandler;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var Builder = require('scriptaculous/src/builder');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/*global alert, confirm, stateSnapshot*/

/* eslint no-array-constructor: "off" */

/**
 * This file should only include functions that are used by both data explorer and dashboard.
 */
//////////////////////////////////////////////////////////////////////////////////////////
//global variables
//////////////////////////////////////////////////////////////////////////////////////////
var theBody;
var fieldsTable;
var savePanel;
var nullStateValue = '_null';
var multiSelect = false;
var saveOldLabel = '';
var saveOldFolder = '';
var flowExecutionKey;
var notificationButton;
var notification;
var saveAsTree;
var editor;
var windowPopUp; //////////////////////////////////////////////////////////////////////////////////////////
//Global objects
//////////////////////////////////////////////////////////////////////////////////////////

/**
 *  All actions should be pre-fixed with the controller type
 * eg ta_moveColumn
 * which will be stripped to get the final java method
 * eg moveColumn()
 **/
//////////////////////////////////////////////////////////////////////////////////////////
//Global objects
//////////////////////////////////////////////////////////////////////////////////////////

/**
 *  All actions should be pre-fixed with the controller type
 * eg ta_moveColumn
 * which will be stripped to get the final java method
 * eg moveColumn()
 **/

var controllerMap = {
  'ta': '/adhoc/table.html',
  'cr': '/adhoc/crosstab.html',
  'ch': '/adhoc/chart.html',
  'ich': '/adhoc/intelligentChart.html',
  'da': '/dashboard/dashboard.html',
  'st': '/adhoc/status.html',
  // request log
  'co': '/adhoc/table.html',
  //common - could go to any controller - ends up in superclass
  '': '/adhoc/table.html?' //default

}; //////////////////////////////////////////////////////////////////////////////////////////////
//generic state (updated in baseState.jsp)
//////////////////////////////////////////////////////////////////////////////////////////////
//key to this client's session attribute values
//////////////////////////////////////////////////////////////////////////////////////////////
//generic state (updated in baseState.jsp)
//////////////////////////////////////////////////////////////////////////////////////////////
//key to this client's session attribute values

function SelectedFormula() {
  this.reset();
}

SelectedFormula.prototype.reset = function () {
  this.formulaId = null;
  this.constant = null;
  this.isEdited = false;
  this.isSwapped = false;
  this.isChanged = false;
};

var selectedFormula = new SelectedFormula(); ///////////////////////////////////////////////
// General designer selection functions
///////////////////////////////////////////////
///////////////////////////////////////////////
// General designer selection functions
///////////////////////////////////////////////

function SelectionCategory() {
  this.area = '';

  this.reset = function () {
    this.area = '';
  };
}

var selectionCategory = new SelectionCategory();
window.selectionCategory = selectionCategory;
window.selObjects = [];
var timeoutValue = null;
var TIMEOUT_INTERVAL = null;
window.TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;
var delayBeforeSessionTimeoutWarning;
var MILL_PER_MIN = 60000;
var MIN_WARN_BEFORE_TIMEOUT = 2;
var ADHOC_SESSION_TIMEOUT_MESSAGE = null;
window.ADHOC_EXIT_MESSAGE = null;
var DASHBOARD_SESSION_TIMEOUT_MESSAGE = null;
window.DASHBOARD_SESSION_TIMEOUT_MESSAGE = DASHBOARD_SESSION_TIMEOUT_MESSAGE;
var DASHBOARD_EXIT_MESSAGE = null;
window.DASHBOARD_EXIT_MESSAGE = DASHBOARD_EXIT_MESSAGE;
var designerBase = {
  //////////////////////////////////////////////////////////////////////////////////////////
  //Global constants
  //////////////////////////////////////////////////////////////////////////////////////////
  AVAILABLE_FIELDS_AREA: 'af',
  DASHBOARD_SPECIAL_CONTENT_TREE_AREA: 'dsc',
  DASHBOARD_REPO_TREE_AREA: 'drp',
  CROSSTAB_SELECT_AREA: 'cr',
  TABLE_SELECT_AREA: 'tb',
  CHART_SELECT_AREA: 'ch',
  TITLE_SELECT_AREA: 'co',
  CHART_LEGEND_AREA: 'clg',
  REPORT_MENU_LEVEL: 'reportLevel',
  FIELD_MENU_LEVEL: 'fieldLevel',
  FIELDSET_MENU_LEVEL: 'fieldSetLevel',
  COLUMN_LEVEL: 'columnLevel',
  GROUP_LEVEL: 'groupLevel',
  CHART_LEVEL: 'chartLevel',
  SUMMARY_LEVEL: 'summaryLevel',
  COLUMN_GROUP_MENU_LEVEL: 'columnGroupLevel',
  ROW_GROUP_MENU_LEVEL: 'rowGroupLevel',
  MEASURE_MENU_LEVEL: 'measureLevel',
  LEGEND_MENU_LEVEL: 'legendItemLevel',
  MEMBER_GROUP_MENU_LEVEL: 'memberGroupCell',
  GRID_SELECTOR_MENU: '.selector.mutton',
  DASHBOARD_SPECIAL_CONTENT_TREE_LEVEL: 'dashboardSpecialContentTreeLeafLevel',
  DASHBOARD_REPO_TREE_LEVEL: 'dashboardRepoTreeLeafLevel',
  DASHBOARD_CONTENT_FRAME_MENU_LEVEL: 'dashboardContentFrameLevel',
  DASHBOARD_TEXT_FRAME_MENU_LEVEL: 'dashboardTextFrameLevel',
  DASHBOARD_CLICKABLE_FRAME_MENU_LEVEL: 'dashboardClickableFrameLevel',
  DASHBOARD_CONTROL_FRAME_MENU_LEVEL: 'dashboardControlFrameLevel',
  SPACER_NAME: '_spacer',
  ARTIFICIAL_NAME: '_artificial',
  DEFAULT_THEME_ID: 'default',
  TABLE: 'table',
  CHART: 'chart',
  ICHART: 'ichart',
  OLAP_ICHART: 'olap_ichart',
  CROSSTAB: 'crosstab',
  OLAP_CROSSTAB: 'olap_crosstab',
  DASHBOARD: 'dashboard',
  DASHBOARD_RUNTIME: 'dashboardRuntime',
  SAVE_AS_TREE_DOM_ID: 'saveAsFoldersTree',
  UNDEFINED_STRING: 'undefined',
  CLOBBER: 'clobber',
  LABEL_MAX_LEN: 94,
  DESC_MAX_LEN: 249,
  DRAGGABLE_GHOST_HEIGHT: '20px',
  DRAGGABLE_GHOST_WIDTH: '150px',
  /////////////////////////////////////////////////
  // init code for all modes inc. dashboard
  /////////////////////////////////////////////////

  /**
   * Init-all items
   */
  superInitAll: function superInitAll() {
    theBody = document.body;
    window.localContext.initAll();

    if (window.localContext.getMode() !== designerBase.DASHBOARD) {
      window.adhocDesigner && window.adhocDesigner.initExplorerObjectListeners();
    }

    restoreDefaultCursor();
  },

  /**
   * Update flow key
   */
  updateFlowKey: function updateFlowKey() {
    // look for flow key somewhere and update, so it can be used by ajax
    var flowDiv = $('flowId');

    if (flowDiv) {
      flowExecutionKey = flowDiv.getAttribute('value');
    }
  },
  setState: function setState() {
    var stateSnapshotScript = $('stateSnapshotScript');

    if (stateSnapshotScript != null) {
      /*eslint-disable-next-line no-eval*/
      window.eval(stateSnapshotScript.text);
      /*eslint-disable-next-line no-eval*/

      window.state = eval('(' + stateSnapshot + ')');
      stateSnapshotScript.parentNode.removeChild(stateSnapshotScript);
    }
  },
  getCanRunAndSave: function getCanRunAndSave() {
    return window.canRunAndSave;
  },
  getControllerPrefix: function getControllerPrefix() {
    return window.localContext.controller ? window.localContext.controller : 'co';
  },

  /**
   * Handle the save request.
   */
  handleSave: function handleSave() {
    if (window.saveLabel) {
      designerBase.save(window.saveFolder, window.saveLabel, window.saveDesc, true);
    } else {
      designerBase.launchSaveDialog();
    }
  },

  /**
   * Handle the save as request.
   */
  handleSaveAs: function handleSaveAs() {
    designerBase.launchSaveDialog();
  },
  handleSaveAndGenerate: function handleSaveAndGenerate() {
    if (window.saveLabel) {
      designerBase.checkSave(window.saveFolder, window.saveLabel, window.saveDesc, false, {
        reportName: window.saveLabel + ' ' + window.defaultReportSuffix
      }).then(function () {
        designerBase.launchSaveDialog({
          forDataView: false,
          forReport: true,
          reportGenerators: window.localContext.state.reportGenerators
        });
      });
    } else {
      designerBase.launchSaveDialog({
        forDataView: true,
        forReport: true,
        reportGenerators: window.localContext.state.reportGenerators
      });
    }
  },
  getSelectedObject: function getSelectedObject(index) {
    if (index && !isNaN(index) && index < window.selObjects.length) {
      return window.selObjects[index];
    }

    return window.selObjects[0];
  },
  getSelectedObjects: function getSelectedObjects() {
    return window.selObjects;
  },
  getLastSelectedObject: function getLastSelectedObject() {
    return window.selObjects[window.selObjects.length - 1];
  },
  isSelectedNodeAFolder: function isSelectedNodeAFolder() {
    if (window.selObjects.length != 1) {
      return true;
    }

    if (selectionCategory.area === designerBase.AVAILABLE_FIELDS_AREA) {
      var node = this.getSelectedObject();
      return node ? node.isParent() : false;
    } else {
      return false;
    }
  },

  /**
   * Deselect all selected items
   */
  unSelectAll: function unSelectAll() {
    window.selObjects.clear();
  },
  addToSelected: function addToSelected(obj) {
    var found = this.isInSelection(obj);

    if (!found) {
      window.selObjects.push(obj);
    }
  },

  /**
   * This determines if the user is requesting multiselect on the same area
   * as the existing selections
   * @param e
   * @param area
   */
  shouldClearSelections: function shouldClearSelections(e, area) {
    var ctrl = isMetaHeld(e);
    var shift = isShiftHeld(e);
    area = selectionCategory.area == area;
    return !(area && (ctrl || shift));
  },

  /**
   * Deselect specific item
   * @param obj
   */
  unSelectGiven: function unSelectGiven(obj) {
    window.selObjects = window.selObjects.without(obj);
  },

  /**
   * Check if item is selected
   * @param obj
   */
  isInSelection: function isInSelection(obj) {
    for (var i = 0; i < window.selObjects.length; i++) {
      if (selectionCategory.area === this.COLUMN_LEVEL) {
        if (obj.header && window.selObjects[i].header && obj.header.getAttribute('data-fieldName') == window.selObjects[i].header.getAttribute('data-fieldName')) {
          return window.selObjects[i].index == obj.index;
        }
      } else if (selectionCategory.area === this.GROUP_LEVEL) {
        if (obj.fieldName === window.selObjects[i].fieldName) {
          return true;
        }
      } else if (selectionCategory.area === this.ROW_GROUP_MENU_LEVEL || selectionCategory.area === this.COLUMN_GROUP_MENU_LEVEL || selectionCategory.area === this.LEGEND_MENU_LEVEL || selectionCategory.area === this.MEASURE_MENU_LEVEL) {
        if (obj.id === window.selObjects[i].id) {
          return true;
        }
      } else {
        if (obj == window.selObjects[i]) {
          return true;
        }
      }
    }

    return false;
  },
  isObjectInSelection: function isObjectInSelection(obj, comparison) {
    for (var i = 0; i < window.selObjects.length; i++) {
      if (comparison) {
        if (obj[comparison] == window.selObjects[i][comparison]) {
          return true;
        }
      } else {
        if (obj == window.selObjects[i]) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Helper method used to reset /clear all existing overlays in a set
   * @param overlaySet
   */
  clearOverlaySet: function clearOverlaySet(overlaySet) {
    if (overlaySet) {
      _.each(overlaySet, function (overlay) {
        var id = $(overlay).identify();

        if ($(id)) {
          $(id).remove();
        }
      });

      overlaySet = {};
    }
  },

  /**
   * Helper method to deselect any overlay type
   * @param overlaySet
   * @param cssClass
   */
  deselectOverlaySet: function deselectOverlaySet(overlaySet, cssClass) {
    _.each(overlaySet, function (overlay) {
      $(overlay).removeClassName(cssClass);
    });
  },
  enableSelection: function enableSelection() {
    if (window.localContext.getMode() !== designerBase.DASHBOARD) {
      window.adhocDesigner && window.adhocDesigner.initEnableBrowserSelection($('designer'));
    }
  },
  disableSelection: function disableSelection() {
    if (window.localContext.getMode() !== designerBase.DASHBOARD) {
      window.adhocDesigner && window.adhocDesigner.initPreventBrowserSelection($('designer'));
    }
  },
  getLastSavedReportFolder: function getLastSavedReportFolder() {
    var folderUri = null;

    if (window.localStorage) {
      folderUri = window.localStorage.getItem('lastSavedReportFolder');
    }

    return folderUri;
  },
  setLastSavedReportFolder: function setLastSavedReportFolder(value) {
    if (window.localStorage) {
      try {
        window.localStorage.setItem('lastSavedReportFolder', value);
      } catch (e) {
        // TODO: use our logger

        /*eslint-disable-next-line no-console*/
        window.console && console.log(e);
      }
    }
  },
  createAdhocSaveDialog: function createAdhocSaveDialog() {
    var designer = this;
    savePanel = new JRS.SaveAsDialog({
      templateMatcher: '#saveDataViewAndReport',
      inputMatchers: {
        dataViewName: '.dataViewName',
        dataViewDescription: '.dataViewDescription',
        reportName: '.reportName',
        reportDescription: '.reportDescription'
      },
      organizationId: window.organizationId,
      publicFolderUri: window.publicFolderUri,
      prepareState: function prepareState(placeToSave) {
        if (savePanel.generatorSelect && savePanel.generatorSelect.state === 'TEMPLATE') {
          placeToSave.params.reportTemplate = savePanel.generatorSelect.val();
        }
      },
      validator: function validator(placeToSave) {
        var messageVariantForFolder = null;
        var valid = true;

        if (placeToSave.params.forDataView) {
          valid = valid && designer.validateSaveNamePresent(placeToSave.dataViewName, 'dataView') && designer.validateDescription(placeToSave.dataViewDescription, 'dataView');
          valid = valid && designer.validateSaveFolder(placeToSave, 'dataView');
        }

        if (placeToSave.params.forReport) {
          valid = valid && designer.validateSaveNamePresent(placeToSave.reportName, 'report') && designer.validateDescription(placeToSave.reportDescription, 'report');

          if (placeToSave.reportName == placeToSave.dataViewName && (placeToSave.params.forDataView || placeToSave.folder == window.saveFolder)) {
            alert(window.designerMessages.datasourceOverwrite);
            valid = false;
          }

          valid = valid && designer.validateSaveReportFolder(placeToSave, 'report');
        }

        if (savePanel.generatorSelect && savePanel.generatorSelect.state === 'TEMPLATE') {
          valid = valid && designer.validateTemplate(placeToSave, 'templateNotSelected');
        }

        return valid;
      },
      saveHandler: function saveHandler(placeToSave) {
        var dataViewOverwriteOk = !placeToSave.params.forDataView || window.saveLabel === placeToSave.dataViewName && window.saveFolder === placeToSave.folder;
        var addOns = {
          dataViewOverwriteOk: dataViewOverwriteOk
        };

        if (placeToSave.params.forReport) {
          addOns.reportName = placeToSave.reportName;
          addOns.reportDescription = placeToSave.reportDescription;
          addOns.dataViewFolder = placeToSave.folder;
          addOns.reportFolder = placeToSave.reportFolder;
          designerBase.setLastSavedReportFolder(placeToSave.reportFolder);

          if (savePanel.generatorSelect) {
            var generatorValue = savePanel.generatorSelect.val();

            if (savePanel.generatorSelect.state === 'TEMPLATE') {
              addOns.reportTemplate = generatorValue;
              designer.generatorConfig({
                template: generatorValue
              });
            }

            if (savePanel.generatorSelect.state === 'GENERATOR') {
              addOns.reportGenerator = {
                id: generatorValue
              };
              designer.generatorConfig({
                generator: generatorValue
              });
            }
          }
        } //save DataView
        //save DataView


        var saveDeferred;

        if (placeToSave.params.forDataView) {
          saveDeferred = designer.saveAdHoc(placeToSave.folder, placeToSave.dataViewName, placeToSave.dataViewDescription, false, addOns);
        } else {
          saveDeferred = designer.saveAdHoc(null, null, null, false, addOns);
        }

        if (placeToSave.params.forDataView) {
          return saveDeferred.then(function () {
            window.saveLabel = placeToSave.dataViewName;
            window.saveDesc = placeToSave.dataViewDescription;
            window.saveFolder = placeToSave.folder;
          });
        } else {
          return saveDeferred;
        }
      }
    });
    savePanel.generatorSelect = new JRS.generatorSelect({
      id: 'adHocGeneratorSelect',
      parent: savePanel.dialogElement.get(0),
      reportGenerators: window.localContext.state.reportGenerators
    });
  },
  createDashboardSaveDialog: function createDashboardSaveDialog() {
    var designer = this;
    savePanel = new JRS.SaveAsDialog({
      templateMatcher: '#saveAs',
      foldersTreeMatcher: '#saveAsFoldersTree',
      okButtonMatcher: '#saveAsBtnSave',
      cancelButtonMatcher: '#saveAsBtnCancel',
      inputMatchers: {
        resourceName: '#saveAsInputName',
        resourceDescription: '#saveAsInputDescription'
      },
      organizationId: window.organizationId,
      publicFolderUri: window.publicFolderUri,
      validator: function validator(placeToSave) {
        var valid = designer.validateSaveNamePresent(placeToSave.resourceName, 'dashboard') && designer.validateDescription(placeToSave.resourceDescription, 'dashboard') && designer.validateSaveFolder(placeToSave, 'dashboard');
        return valid;
      },
      saveHandler: function saveHandler(placeToSave) {
        var overwriteOk = window.saveLabel === placeToSave.resourceName && window.saveFolder === placeToSave.folder; //save dashboard
        //save dashboard

        return designer.save(placeToSave.folder, placeToSave.resourceName, placeToSave.resourceDescription, overwriteOk).then(function () {
          window.saveLabel = placeToSave.resourceName;
          window.saveDesc = placeToSave.resourceDescription;
          window.saveFolder = placeToSave.folder;
        });
      }
    });
  },
  _showAdhocSavePanel: function _showAdhocSavePanel(params) {
    var designer = this,
        dataViewName = window.saveLabel || window.defaultSaveName,
        placeToSave = {
      dataViewName: dataViewName,
      dataViewDescription: window.saveDesc,
      reportName: dataViewName + ' ' + window.defaultReportSuffix,
      reportTemplate: params.reportTemplate,
      reportGenerators: params.reportGenerators,
      reportDescription: '',
      params: params
    };

    if (params.forDataView) {
      if (_.isEmpty(window.saveFolder)) {
        placeToSave.folder = "/";
      } else {
        // decode any html entities inside saveFolder
        // jQuery.html escapes a string in case user types some
        // xss prone code
        placeToSave.folder = jQuery("<textarea></textarea>").html(window.saveFolder).text(); // make folder path compatible with repository resource id format
        // (only alpha-numeric, anything else is replaced with underscores)

        placeToSave.folder = placeToSave.folder.replace(/[^\w+\d+\/]/g, '_');
      }
    }

    if (params.forReport) {
      var dataViewSaveFolder = placeToSave.folder || window.saveFolder || "/";
      placeToSave.reportFolder = designerBase.getLastSavedReportFolder() || dataViewSaveFolder;
    }

    savePanel.open(placeToSave).then(function () {
      window.adhocDesigner !== undefined && window.adhocDesigner.initPreventBrowserSelection(savePanel.foldersTree[0]);
      var lastValue = designer.generatorConfig();

      if (lastValue) {
        if (lastValue.template) {
          savePanel.generatorSelect.val(lastValue.template, 'TEMPLATE');
        } else if (lastValue.generator) {
          savePanel.generatorSelect.val(lastValue.generator, 'GENERATOR');
        }
      }

      if (params.forDataView) {
        savePanel.dialogElement.find('.dataViewName').focus().select();
      } else if (params.forReport) {
        savePanel.dialogElement.find('.reportName').focus().select();
      }
    });
  },
  launchSaveAdhocDialog: function launchSaveAdhocDialog(params) {
    var designer = this;

    if (params === undefined) {
      params = {
        forDataView: true,
        forReport: false
      };
    }

    if (!savePanel) {
      this.createAdhocSaveDialog();
    }

    function updateVisibility(saveAsDialog, params) {
      if (params.forDataView) {
        saveAsDialog.dialogElement.addClass('forDataView'); //needed for folders tree placement
        //needed for folders tree placement

        saveAsDialog.dialogElement.find('.forDataView').removeClass('hidden');
      } else {
        saveAsDialog.dialogElement.removeClass('forDataView');
        saveAsDialog.dialogElement.find('.forDataView').addClass('hidden');
      }

      if (params.forReport) {
        saveAsDialog.dialogElement.addClass('forReport');
        saveAsDialog.dialogElement.find('.forReport').removeClass('hidden');
      } else {
        saveAsDialog.dialogElement.removeClass('forReport');
        saveAsDialog.dialogElement.find('.forReport').addClass('hidden');
      }

      if (params.forDataView && !params.forReport) {
        saveAsDialog.dialogElement.find('.forDataViewOnly').removeClass('hidden');
        savePanel.generatorSelect.hide();
      } else {
        saveAsDialog.dialogElement.find('.forDataViewOnly').addClass('hidden');
        savePanel.generatorSelect.show();
      }

      if (window.localContext.state.reportGenerators.length === 0) {
        saveAsDialog.dialogElement.addClass(layoutModule.NO_GENERATORS_CLASS);
      }
    }

    updateVisibility(savePanel, params);

    if (window.adhocDesigner.filtersController.hasNotAppliedFilters()) {
      window.adhocDesigner.showSaveConfirmationDialog(function () {
        designerBase._showAdhocSavePanel(params);
      });
    } else {
      designerBase._showAdhocSavePanel(params);
    }
  },
  launchSaveDashboardDialog: function launchSaveDashboardDialog() {
    if (!savePanel) {
      this.createDashboardSaveDialog();
    }

    var placeToSave = {
      resourceName: window.saveLabel || window.defaultSaveName,
      resourceDescription: window.saveDesc,
      folder: window.saveFolder && window.saveFolder.length > 0 ? window.saveFolder : '/'
    };
    savePanel.open(placeToSave).then(function () {
      savePanel.dialogElement.find('#saveAsInputName').focus().select();
    });
  },
  launchSaveDialog: function launchSaveDialog(params) {
    if (window.localContext.getMode() == designerBase.DASHBOARD) {
      this.launchSaveDashboardDialog();
    } else {
      this.launchSaveAdhocDialog(params);
    }

    designerBase.enableSelection();
  },
  launchDependenciesDialog: function launchDependenciesDialog(checkSaveModel, saveParams) {
    var deferred = jQuery.Deferred();
    dialogs.dependentResources.show(checkSaveModel.dependentResources, {
      dependenciesBtnSave: function dependenciesBtnSave() {
        deferred.resolve();
      },
      dependenciesBtnSaveAs: function dependenciesBtnSaveAs() {
        deferred.reject();
        var forReport = saveParams.addOns != null && saveParams.addOns.reportName != null;
        designerBase.launchSaveDialog({
          forDataView: true,
          forReport: forReport
        });
      },
      dependenciesBtnCancel: function dependenciesBtnCancel() {
        deferred.reject();
      }
    }, {
      canSave: true,
      okOnly: checkSaveModel.result == 'FORBID' || checkSaveModel.result == 'WARN',
      topMessage: checkSaveModel.topMessage,
      bottomMessage: checkSaveModel.bottomMessage
    }); //        designerBase.enableSelection();
    //        designerBase.enableSelection();

    return deferred;
  },
  selectSaveDirectory: function selectSaveDirectory() {
    saveAsTree.openAndSelectNode(window.saveFolder);
  },
  okSaveDialog: function okSaveDialog() {
    saveOldLabel = '';
    saveOldFolder = '';
    designerBase.hideSaveDialog();

    this._saveConfirmMessage();
  },
  validateSaveNamePresent: function validateSaveNamePresent(saveLabel, messageVariant) {
    if (!saveLabel || saveLabel.blank()) {
      alert(window.designerMessages.emptyName[messageVariant]);
      return false;
    }

    if (saveLabel.length > this.LABEL_MAX_LEN) {
      alert(window.designerMessages.saveLabelError[messageVariant].replace('{0}', this.LABEL_MAX_LEN));
      return false;
    }

    return true;
  },
  validateDescription: function validateDescription(saveDesc, messageVariant) {
    if (!saveDesc || saveDesc.blank()) {
      return true;
    }

    if (saveDesc.length > this.DESC_MAX_LEN) {
      alert(window.designerMessages.saveDescriptionError[messageVariant].replace('{0}', this.DESC_MAX_LEN));
      return false;
    }

    return true;
  },
  validateSaveFolder: function validateSaveFolder(placeToSave, messageVariant) {
    if (placeToSave.folder == null) {
      alert(window.designerMessages.nonSelectedFolder[messageVariant]);
      return false;
    }

    if (!placeToSave.isFolderWritable) {
      var msq = window.designerMessages.selectedFolderIsNotWritable[messageVariant];
      alert(msq.replace('{0}', placeToSave.folder));
      return false;
    }

    return true;
  },
  validateSaveReportFolder: function validateSaveReportFolder(placeToSave, messageVariant) {
    if (placeToSave.reportFolder == null) {
      alert(window.designerMessages.nonSelectedFolder[messageVariant]);
      return false;
    }

    if (!placeToSave.isReportFolderWritable) {
      var msq = window.designerMessages.selectedFolderIsNotWritable[messageVariant];
      alert(msq.replace('{0}', placeToSave.folder));
      return false;
    }

    return true;
  },
  validateTemplate: function validateTemplate(placeToSave, messageVariant) {
    if (_.isEmpty(placeToSave.params.reportTemplate)) {
      alert(window.designerMessages[messageVariant]);
      return false;
    }

    return true;
  },
  launchJSOverwriteConfirm: function launchJSOverwriteConfirm(msg) {
    if (confirm(msg)) {
      this.overwriteConfirmed();
    } else {
      window.saveLabel = null;
    }
  },
  overwriteConfirmed: function overwriteConfirmed() {
    this.save(window.saveFolder, window.saveLabel, window.saveDesc, true);
  },

  /**
   * Used to update the session warning message
   * @param event
   */
  updateSessionWarning: function updateSessionWarning(event) {
    // set delayBeforeSessionTimeoutWarning to TIMEOUT_INTERVAL-MILL_PER_MIN*MIN_WARN_BEFORE_TIMEOUT
    // if TIMEOUT_INTERVAL > MIN_WARN_BEFORE_TIMEOUT min. O/w set delayBeforeSessionTimeoutWarning to 0.5 min.
    if (TIMEOUT_INTERVAL > 0 && !delayBeforeSessionTimeoutWarning) {
      var diff = TIMEOUT_INTERVAL - MILL_PER_MIN * MIN_WARN_BEFORE_TIMEOUT; //1 min is the smallest TIMEOUT_INTERVAL setup on the server
      //1 min is the smallest TIMEOUT_INTERVAL setup on the server

      delayBeforeSessionTimeoutWarning = diff > 0 ? diff : MILL_PER_MIN / 2;
    } //update of session timeout
    //update of session timeout


    if (delayBeforeSessionTimeoutWarning) {
      window.clearTimeout(timeoutValue);
      timeoutValue = window.setTimeout(function () {
        return designerBase.showExpirationDialog();
      }, delayBeforeSessionTimeoutWarning);
    }
  },

  /**
   * Session notification
   */
  showExpirationDialog: function showExpirationDialog() {
    var keepAlive = false;

    if (window.localContext.getMode() !== this.DASHBOARD) {
      keepAlive = confirm(ADHOC_SESSION_TIMEOUT_MESSAGE + getSessionExpireTime());
    } else {
      keepAlive = confirm(DASHBOARD_SESSION_TIMEOUT_MESSAGE + getSessionExpireTime());
    } //send keep alive request.
    //send keep alive request.


    if (keepAlive) {
      if (window.localContext.getMode() !== designerBase.DASHBOARD) {
        window.adhocDesigner.tryToKeepServerAlive();
      } else {
        window.localContext.tryToKeepServerAlive();
      }
    }
  },
  initAdhocSpecificDesignerBaseVar: function initAdhocSpecificDesignerBaseVar() {
    //TIMEOUT_INTERVAL is in milli-secs
    TIMEOUT_INTERVAL = window.serverTimeoutInterval * 1000;
    ADHOC_SESSION_TIMEOUT_MESSAGE = window.adHocSessionExpireCode;
    window.ADHOC_EXIT_MESSAGE = window.adHocExitConfirmation;
  },

  /**
   * Method to determine what to do when a person leaves ad hoc.
   */
  confirmAndLeave: function confirmAndLeave() {
    if (window.localContext.getMode() === designerBase.DASHBOARD) {
      return confirm(DASHBOARD_EXIT_MESSAGE);
    } else {
      if (window.localContext.state.canUndo && window.localContext.state.isWritable) {
        return confirm(window.ADHOC_EXIT_MESSAGE);
      }
    }

    return true;
  },

  /**
   * This method using same key and value format as JRS.GeneratorPropertiesDialog
   *
   * @param value
   * @returns {*}
   */
  generatorConfig: function generatorConfig(value) {
    var myStorage = window.localStorage;

    if (myStorage && myStorage.getItem('reportGenerator')) {
      var config = JSON.parse(myStorage.reportGenerator);

      if (value) {
        var defaultConfig = config.sourceURI ? {
          sourceURI: config.sourceURI
        } : {};
        config = jQuery.extend({}, defaultConfig, value);
        myStorage.setItem('reportGenerator', JSON.stringify(config));
      } else {
        return config;
      }
    }

    return null;
  },
  ////////////////////////////////////////////////////////
  // ajax infra
  ////////////////////////////////////////////////////////
  //we should fold this one into the infrastructure below?
  sendAjaxActionRequest: function sendAjaxActionRequest(otherParams, postFillAction, postData) {
    var thisURL = this.getFilterDialogFlowURL(otherParams, postData);
    ajaxTargettedUpdate(thisURL, {
      fillLocation: 'ajaxbuffer',
      callback: postFillAction,
      errorHandler: errorHandler,
      postData: postData
    });
  },
  sendSelectiveAjaxActionRequest: function sendSelectiveAjaxActionRequest(otherParams, postFillAction, postData) {
    var thisURL = this.getFilterDialogFlowURL(otherParams, postData);
    ajaxTargettedUpdate(thisURL, {
      fillLocation: 'ajaxbuffer',
      callback: postFillAction,
      errorHandler: errorHandler,
      postData: postData,
      mode: AjaxRequester.prototype.CUMULATIVE_UPDATE
    });
  },
  getFilterDialogFlowURL: function getFilterDialogFlowURL(otherParams, postData) {
    var thisURL = window.urlContext + '/flow.html?_flowId=adhocAjaxFilterDialogFlow';

    if (otherParams != null) {
      for (var i = 0; i < otherParams.length; i++) {
        thisURL += '&' + otherParams[i];
      }
    } //add clientKey
    //add clientKey


    thisURL = thisURL + '&clientKey=' + window.clientKey;
    return thisURL;
  },
  ////////////////////////////////////////////////////////
  // ajax requests
  ////////////////////////////////////////////////////////
  sendRequestToAjaxBuffer: function sendRequestToAjaxBuffer(action, otherParams, postFillAction) {
    this.sendRequest(action, otherParams, postFillAction, {
      'target': 'ajaxbuffer',
      mode: AjaxRequester.prototype.TARGETTED_REPLACE_UPDATE
    });
  },

  /**
   * URI encode single param or params array.
   * If param is null or undefined, then replace it with empty string
   *
   * @param {(string|string[])} param
   * @returns {(string|string[])}
   */
  encodeParam: function encodeParam(param) {
    return _.isArray(param) ? _.map(param, encodeURIComponent) : encodeURIComponent(param != null ? param : '');
  },

  /**
   * Make an ajx request
   * @param {Object} action
   * @param {Object} otherParams
   * @param {Object} postFillAction
   * @param {Object} options : Array containing the following:
   *                 options["target"] container to place response in - defaults to "mainTableContainer"
   *                 options["bPost"]
   *                 options["sourceContainer"]
   *                 options["mode"] - cumulative, selective etc (optional)
   */
  sendRequest: function sendRequest(action, otherParams, postFillAction, options, customErrorHandler) {
    var bPost = options && options.bPost;
    var target = options && options.target; //TODO: designer.base.js is common for adhoc and dashboard so need to
    // move out adhoc specific code out here
    //TODO: designer.base.js is common for adhoc and dashboard so need to
    // move out adhoc specific code out here

    target = target || (isSupportsTouch() ? $('mainTableContainer').down().identify() : 'mainTableContainer');
    var mode = options && options.mode || AjaxRequester.prototype.EVAL_JSON;
    var container = options && options.container;
    var hideLoader = options && options.hideLoader;
    var actionPrefix = getTextBeforeUnderscore(action);
    var javaAction = getTextAfterUnderscore(action);
    var thisURL = window.urlContext + controllerMap[actionPrefix];
    /*
    if (window.localContext.getMode() !== this.DASHBOARD && !action.include(window.localContext.FETCH_MORE_ROWS)) {
    ajax.cancelRequestsBefore = (new Date()).getTime();
    }
    */

    /*
    if (window.localContext.getMode() !== this.DASHBOARD && !action.include(window.localContext.FETCH_MORE_ROWS)) {
        ajax.cancelRequestsBefore = (new Date()).getTime();
    }
    */

    var params = 'action=' + javaAction;

    if (!_.isEmpty(otherParams)) {
      if (_.isArray(otherParams)) {
        params += '&' + _.compact(otherParams).join('&');
      } else if (_.isObject(otherParams)) {
        var cleanedParams = _.reduce(otherParams, function (params, val, key) {
          if (isNotNullORUndefined(val)) {
            params[key] = val;
          }

          return params;
        }, {});

        params += '&' + jQuery.param(cleanedParams);
      }
    } //finally session map key
    //finally session map key


    params += '&clientKey=' + window.clientKey;

    if (!bPost) {
      thisURL += '?' + params;
      params = null;
    } //TODO move adhoc-related code out from here
    //TODO move adhoc-related code out from here


    if (window.localContext.getMode() !== this.DASHBOARD && postFillAction == null) {
      postFillAction = window.adhocDesigner.updateStateAndRender;
    }

    var internalErrorHandler = function internalErrorHandler(ajaxAgent) {
      var result = errorHandler(ajaxAgent);
      result && customErrorHandler && customErrorHandler(ajaxAgent);
      return result;
    };

    if (isIPad() && action != 'ta_fetchMoreRows') {
      designerBase.updateMainOverlay('');
    }

    if (typeof window.adhocDesigner !== 'undefined') {
      actionModel && actionModel.hideMenu();
      window.adhocDesigner && window.adhocDesigner.unSelectAvailableTreeNodes();
    }

    var delayedFn = function (updateURL, ajaxResponseTarget, postResponseCallback, params) {
      return function () {
        var callbackWrapper = function callbackWrapper() {
          clearTimeout(window.cancelQueryTimer);
          window.cancelQueryTimer = null;
          designerBase.updateMainOverlay('hidden');

          if (postResponseCallback) {
            if (typeof postResponseCallback == 'string') {
              /*eslint-disable-next-line no-eval*/
              eval(postResponseCallback);
            } else {
              postResponseCallback.apply(null, arguments);
            }
          }
        };

        if (target == designerBase.CLOBBER) {
          return ajaxClobberredUpdate(updateURL, {
            callback: callbackWrapper,
            errorHandler: internalErrorHandler,
            postData: params
          });
        } else {
          return ajaxTargettedUpdate(updateURL, {
            fillLocation: ajaxResponseTarget,
            fromLocation: container,
            callback: callbackWrapper,
            errorHandler: internalErrorHandler,
            postData: params,
            mode: mode,
            hideLoader: hideLoader
          });
        }
      };
    }(thisURL, target, postFillAction, params);

    setTimeout(delayedFn, 0);
  },
  sendNonReturningRequest: function sendNonReturningRequest(action, otherParams, postFillAction, target) {
    var actionPrefix = getTextBeforeUnderscore(action);
    var javaAction = getTextAfterUnderscore(action);
    var thisURL = window.urlContext + controllerMap[actionPrefix] + '?action=' + javaAction;

    if (otherParams) {
      for (var i = 0; i < otherParams.length; i++) {
        thisURL += '&' + otherParams[i];
      }
    } //finally client key
    //finally client key


    thisURL += '&clientKey=' + window.clientKey;
    ajaxNonReturningUpdate(thisURL, {
      callback: postFillAction,
      errorHandler: errorHandler
    });
  },

  /**
   * Navigate to home page
   */
  redirectToHomePage: function redirectToHomePage() {
    document.location = 'flow.html?_flowId=homeFlow';
  },
  ////////////////////////////////////////////////////////
  // sever updates
  ////////////////////////////////////////////////////////
  save: function save(folder, name, desc, overwriteOK, addOns) {
    if (window.localContext.getMode() === designerBase.DASHBOARD) {
      return window.localContext.saveDashboard(folder, name, desc, overwriteOK);
    } else {
      return designerBase.saveAdHocWithNotAppliedFiltersCheck(folder, name, desc, overwriteOK, addOns);
    }
  },
  saveAdHocWithNotAppliedFiltersCheck: function saveAdHocWithNotAppliedFiltersCheck(folder, name, desc, overwriteOK, addOns) {
    if (window.adhocDesigner.filtersController.hasNotAppliedFilters()) {
      window.adhocDesigner.showSaveConfirmationDialog(_.bind(function () {
        return this.saveAdHoc(folder, name, desc, overwriteOK, addOns);
      }, this));
    } else {
      return this.saveAdHoc(folder, name, desc, overwriteOK, addOns);
    }
  },
  saveAdHoc: function saveAdHoc(folder, name, desc, overwriteOK, addOns) {
    return this.checkSave(folder, name, desc, overwriteOK, addOns).then(function () {
      return designerBase.doSave(folder, name, desc, overwriteOK, addOns);
    });
  },
  createOverwriteHanlder: function createOverwriteHanlder(deferred, doSaveArguments) {
    var designer = this;
    return function saveErrorHandler(ajaxAgent) {
      var fileExistsMessage = ajaxAgent.getResponseHeader('fileExistsException');

      if (!fileExistsMessage) {
        deferred.reject(ajaxAgent); //unhandled error
        // no fileExistsMessage, nothing to confirm. Just quit.
        //unhandled error
        // no fileExistsMessage, nothing to confirm. Just quit.

        return;
      }

      fileExistsMessage = decodeURIComponent(fileExistsMessage);

      if (confirm(fileExistsMessage.replace(/@@/g, ' '))) {
        designer.doSave.apply(designer, doSaveArguments).then(function () {
          deferred.resolve();
        }, function (err) {
          deferred.reject(err);
        });
      } else {
        deferred.reject();
      }
    };
  },
  doSave: function doSave(folder, name, desc, overwriteOK, addOns) {
    var deferred = jQuery.Deferred();
    window.adhocDesigner && jQuery('#designer').trigger('report_name_update', [name]);

    var callback = function (state) {
      window.localContext.standardOpCallback && window.localContext.standardOpCallback(state);

      this._saveConfirmMessage();

      deferred.resolve();
    }.bind(designerBase);

    var saveErrorHandler = designerBase.createOverwriteHanlder(deferred, [folder, name, desc, true, addOns]);
    var requestParams = new Array('allOverwrite=' + overwriteOK);

    if (name != null) {
      requestParams.push('aruLabel=' + encodeText(name));
      requestParams.push('aruDesc=' + encodeText(desc));
      requestParams.push('aruFolder=' + encodeText(folder));
    }

    if (addOns !== undefined) {
      requestParams.push('aruOverwrite=' + addOns.dataViewOverwriteOk);

      if (addOns.reportName !== undefined) {
        requestParams.push('reportLabel=' + encodeText(addOns.reportName));
        requestParams.push('reportDesc=' + encodeText(addOns.reportDescription));
        requestParams.push('reportFolder=' + encodeText(addOns.reportFolder));
        addOns.reportTemplate && requestParams.push('reportTemplate=' + encodeText(addOns.reportTemplate));

        if (addOns.reportGenerator) {
          var generatorJson = Object.toJSON(addOns.reportGenerator);
          requestParams.push('reportGenerator=' + encodeText(generatorJson));
        }
      }
    }

    this.sendRequest(designerBase.getControllerPrefix() + '_save', requestParams, callback, null, saveErrorHandler);
    return deferred;
  },
  //check if there are dependent reports
  checkSave: function checkSave(folder, name, desc, overwriteOK, addOns) {
    var designer = this;
    var deferred = jQuery.Deferred();

    var callback = function (state) {
      if (!state.topMessage) {
        deferred.resolve();
      } else {
        designer.launchDependenciesDialog(state, {
          folder: folder,
          name: name,
          desc: desc,
          overwrite: overwriteOK,
          addOns: addOns
        }).then(function () {
          deferred.resolve();
        }, function () {
          deferred.reject();
        });
      }
    }.bind(designerBase);

    var params = new Array('aruFolder=' + encodeText(folder), 'aruLabel=' + encodeText(name));

    if (addOns && addOns.reportName) {
      params.push('reportFolder=' + encodeText(addOns.reportFolder));
      params.push('reportLabel=' + encodeText(addOns.reportName));
    }

    this.sendRequest('co_checkSave', params, callback, null);
    return deferred;
  },
  _saveConfirmMessage: function _saveConfirmMessage() {
    dialogs.systemConfirm.show(window.saveConfirmation, 5000);
  },
  ///////////////////////////////////////////////////////////////
  // DOM builders
  ///////////////////////////////////////////////////////////////

  /**
   * Create HTML dom object
   * @param htmlTag
   * @param cssClass
   */
  createDomObject: function createDomObject(htmlTag, cssClass) {
    if (htmlTag) {
      return Builder.node(htmlTag, {
        className: cssClass
      });
    } else {
      throw 'Please provide a valid tag';
    }
  },
  getContentDimensions: function getContentDimensions(components) {
    var components = $A(components);
    var dimensions = components.collect(function (frame) {
      var dims = frame.getDimensions();
      var offset = frame.positionedOffset();
      return {
        width: dims.width + offset[0],
        height: dims.height + offset[1]
      };
    });
    var width = dimensions.collect(function (dimension) {
      return dimension.width;
    }).max();
    var height = dimensions.collect(function (dimension) {
      return dimension.height;
    }).max();
    return {
      width: width,
      height: height
    };
  },

  /*
   * TODO: check and possibly remove function related to dashboards.
   */
  updateIFrameScrolls: function updateIFrameScrolls() {},

  /*
  $A($$(layoutModule.SWIPE_SCROLL_PATTERN)).each(function(scrollElement) {
    var id = scrollElement.identify();
     if(id.startsWith("iframeScroll_")) {
        var iframe = scrollElement.down();
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
         var timer;
        var contentLoaded = function(e) {
            timer && clearInterval(timer);
             var reportContainer = iframeDoc.getElementById("reportContainer");
            if(reportContainer && reportContainer.clientWidth > 0 && reportContainer.clientHeight > 0) {
                iframe.setStyle({
                    width: reportContainer.clientWidth + "px",
                    height: reportContainer.clientHeight + "px"
                });
                 var scroll = layoutModule.scrolls.get(id);
                scroll && scroll.refresh();
                setTimeout(function() {
                    scroll && scroll.scrollTo(0, 1, 0, false);
                }, 1000);
            }
        };
        timer = setInterval(contentLoaded, 2000);
        iframeDoc.addEventListener('DOMContentLoaded', contentLoaded, false);
    }
  });
  */
  updateMainOverlay: function updateMainOverlay(className) {
    var el = document.getElementById('mainTableContainerOverlay');
    el && (el.className = className);
  }
}; //returns true for errors/special cases
//returns true for errors/special cases

/**
 * Get current time.
 */

/**
 * Get current time.
 */

function getSessionExpireTime() {
  return function () {
    var minutes;
    var d = new Date();
    var hour = d.getHours() % 12; //non-24 hour format
    //non-24 hour format

    if (hour === 0) {
      hour = 12;
    }

    var min = d.getMinutes() + (delayBeforeSessionTimeoutWarning < MILL_PER_MIN ? 1 : MIN_WARN_BEFORE_TIMEOUT);

    if (min < 10 || min > 59) {
      minutes = '0' + min % 60;
    } else {
      minutes = min;
    }

    return ' ' + hour + ':' + minutes;
  }();
}

window.designerBase = designerBase;
module.exports = designerBase;

});