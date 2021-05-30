define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var _ = require('underscore');

var _runtime_dependenciesJrsUiSrcCoreCoreAjax = require("runtime_dependencies/jrs-ui/src/core/core.ajax");

var ajax = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajax;

var designerBase = require('../base/designer.base');

var toolbarButtonModule = require("runtime_dependencies/jrs-ui/src/components/components.toolbarButtons.events");

var AdHocCrosstab = require('./crosstab.root');

var AdHocChart = require('./chart.observers');

var AdHocTable = require('./table.init');

var adhocSort = require('./designer.sort');

var adhocReentrance = require('./designer.reentrant');

var classUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

var adhocControls = require('../controls/controls.adhoc');

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;
var centerElement = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.centerElement;
var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;
var getBufferWidth = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getBufferWidth;

var TouchController = require("runtime_dependencies/jrs-ui/src/util/touch.controller");

var jQuery = require('jquery');

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var VisualizationChooser = require('./VisualizationChooser');

var AIC = require('./intelligentChart/adhocIntelligentChart');

require("runtime_dependencies/js-sdk/src/jrs.configs");

require('prototype');

require('jquery');

require("runtime_dependencies/jrs-ui/src/util/touch.controller");

require("runtime_dependencies/jrs-ui/src/core/core.layout");

require("runtime_dependencies/jrs-ui/src/util/utils.common");

require('./intelligentChart/adhocIntelligentChart');

require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

require('./designer.calculatedFields');

require('./layout.manager');

require('./filter/FiltersController');

require('./filter/OlapFiltersController');

require('./filter/FilterService');

require('dragdropextra');

require("runtime_dependencies/jrs-ui/src/org/org.rootObjectModifier");

require('../controls/controls.adhoc');

require('./crosstab.multiselect');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
JRS.vars.current_flow = 'adhoc';
var adhocSessionButton;
var adhocSessionDialog; //TODO: remove while moving to full AMD env

window.theBody = document.body;
window.requestLogEnabled = false;
window.TIMEOUT_INTERVAL = window.serverTimeoutInterval * 1000; //since intervals are in milli-secs we need to multiply by 1000
//since intervals are in milli-secs we need to multiply by 1000

window.ADHOC_SESSION_TIMEOUT_MESSAGE = window.adHocSessionExpireCode;
window.ADHOC_EXIT_MESSAGE = window.adHocExitConfirmation;
var adhocDesigner = {
  ui: {
    header_title: null,
    display_manager: null,
    canvas: null,
    dataMode: null,
    visualizationChooser: VisualizationChooser
  },
  //member variables
  _leafSelectedFired: false,
  dimensionsTree: null,
  measuresTree: null,
  _availableTreeLastOpened: null,
  _AVAILABLE_TREE_DEPTH: 10,
  _cookieName: 'lastNodeUri',
  _cookieTime: 3,
  FOLDER_TYPE: 'ItemGroupType',
  multiSelect: false,
  //Name of measures dimension and measures level
  MEASURES: 'Measures',
  //For OLAP mode
  DIMENSIONS_TREE_DOM_ID: 'dimensionsTree',
  DIMENSIONS_TREE_PROVIDER_ID: 'dimensionsTreeDataProvider',
  MEASURES_TREE_DOM_ID: 'measuresTree',
  MEASURES_TREE_PROVIDER_ID: 'measuresTreeDataProvider',
  TREE_CONTEXT_MENU_PATTERN: ['ul#dimensionsTree li.leaf .button', 'ul#dimensionsTree li.node .button', 'ul#measuresTree li.leaf .button', 'ul#measuresTree li.node .button'],
  DIMENSION_TREE_DIMENSION_CONTEXT: 'dimensionsTree_dimension',
  DIMENSION_TREE_LEVEL_CONTEXT: 'dimensionsTree_level',
  MEASURE_TREE_GROUP_CONTEXT: 'measuresTree_group',
  MEASURE_TREE_CONTEXT: 'measuresTree',
  TREE_NODE_AND_LEAF_PATTERN: ['ul#visibleFieldsTree li.leaf', 'ul#visibleFieldsTree li.node', 'ul#dimensionsTree li.leaf', 'ul#dimensionsTree li.node', 'ul#measuresTree li.node'],
  CANVAS_ID: 'canvasTable',
  CANVAS_PARENT_ID: 'mainTableContainer',
  CANVAS_PANEL_ID: 'canvas',
  OLAP_MEASURES_TREE: 'measuresTree',
  DISPLAY_MANAGER_ID: 'displayManagerPanel',
  overlayParent: null,
  overlayDraggedColumn: null,
  initialDragXposition: null,
  NaN: 'NaN',
  removeDroppables: null,
  addDroppables: null,
  DEFAULT_SUMMARY_NUM_FUNC: 'Sum',
  DEFAULT_SUMMARY_NONNUM_FUNC: 'DistinctCount',
  //patterns
  //table patterns
  COLUMN_OVERLAY_PATTERN: 'div.overlay.col',
  GROUP_OVERLAY_PATTERN: 'div.overlay.group',
  SUMMARY_OVERLAY_PATTERN: 'div.overlay.summary',
  GROUP_LABEL_SPAN_PATTERN: 'span.labelOverlay.label',
  COLUMN_SIZER_PATTERN: 'div.columnSizer',
  ROW_OVERLAY_PATTERN: 'div.rowOverlay',
  ROW_GROUP_OVERLAY_PATTERN: 'div.rowGroupOverlay',
  COLUMN_GROUP_OVERLAY_PATTERN: 'div.columnGroupOverlay',
  MEASURE_OVERLAY_PATTERN: 'div.measureOverlay',
  XTAB_GROUP_HEADER_PATTERN: 'th.label.group',
  XTAB_GROUP_OVERLAY_PATTERN: 'div.overlay.xtab.gr',
  XTAB_GROUP_HEADER_OVERLAY_PATTERN: 'div.overlay.xtab.header',
  XTAB_MEASURE_OVERLAY_PATTERN: 'div.overlay.xtab.m',
  XTAB_MEASURE_HEADER_OVERLAY_PATTERN: 'div.overlay.xtab.measure',
  ROW_GROUP_MEMBER_PATTERN: 'tbody#detailRows tr td.label.member',
  COLUMN_GROUP_MEMBER_PATTERN: 'thead#headerAxis th.label.member',
  LEGEND_OVERLAY_PATTERN: 'div.legend.overlay',
  AVAILABLE_FIELDS_PATTERN: ['ul#visibleFieldsTree', 'ul#dimensionsTree', 'ul#measuresTree'],
  CANVAS_PATTERN: 'table#canvasTable',
  MENU_PATTERN: 'div#menu',
  CANVAS_PARENT_PATTERN: 'div#mainTableContainer',
  EXPORT_FORM_PATTERN: '#exportActionForm',
  FILTER_OPERATOR_MENU_PATTERN: '#filter-container .button.operator',
  FILTER_GENERAL_MENU_PATTERN: '#filter-container #filterPanelMutton',
  FILTER_ITEM_MENU_PATTERN: '#filter-container .button.mutton',
  SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG: {
    DIALOG_ID: 'saveWithoutFiltersApplyConfirmationDialog',
    OK_BUTTON_ID: 'saveWithoutFiltersApplyConfirmationDialogOK',
    CANCEL_BUTTON_ID: 'saveWithoutFiltersApplyConfirmationDialogCancel'
  },
  DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG: {
    DIALOG_ID: 'deleteCalculatedFieldConfirmationDialog',
    OK_BUTTON_ID: 'deleteCalculatedFieldConfirmationDialogOK',
    CANCEL_BUTTON_ID: 'deleteCalculatedFieldConfirmationDialogCancel'
  },
  ///////////////////////////////////////////
  //Type conversation constants
  ///////////////////////////////////////////
  INTEGER_JAVA_TYPES: ['java.lang.Byte', 'java.lang.Integer', 'java.lang.Short', 'java.lang.Long', 'java.math.BigInteger'],
  DECIMAL_JAVA_TYPES: ['java.lang.Float', 'java.lang.Double', 'java.math.BigDecimal', 'java.lang.Number'],
  DATE_JAVA_TYPES: ['java.sql.Timestamp', 'java.sql.Time', 'java.sql.Date', 'java.util.Date'],
  BOOLEAN_JAVA_TYPES: ['java.lang.Boolean'],
  DATE_TYPE_DISPLAY: 'date',
  INTEGER_TYPE_DISPLAY: 'int',
  DECIMAL_TYPE_DISPLAY: 'dec',
  BOOLEAN_TYPE_DISPLAY: 'bool',
  NOT_A_NUMBER_TYPE_DISPLAY: 'NaN',
  //action array
  toolbarActionMap: {
    presentation: 'adhocDesigner.goToPresentationView',
    explorer: 'adhocDesigner.goToDesignView',
    execute: 'adhocDesigner.saveAndRun',
    undo: 'adhocDesigner.undo',
    redo: 'adhocDesigner.redo',
    undoAll: 'adhocDesigner.undoAll',
    pivot: 'adhocDesigner.pivot',
    sort: 'adhocDesigner.sort',
    controls: 'adhocDesigner.launchDialogMenu',
    styles: 'adhocDesigner.showAdhocThemePane',
    query: 'adhocDesigner.showViewQueryDialog'
  },
  dialogESCFunctions: {
    save: 'saveAs',
    saveDataViewAndReport: 'saveDataViewAndReport',
    sort: 'sortDialog',
    reentrant: 'selectFields',
    editLabel: 'editLabel'
  },
  contextMap: {
    table: AdHocTable,
    crosstab: AdHocCrosstab,
    olap_crosstab: AdHocCrosstab,
    chart: AdHocChart,
    ichart: window.AdhocIntelligentChart,
    olap_ichart: window.AdhocIntelligentChart
  },
  ///////////////////////////////////////////////////////////////
  // Type conversation helper functions
  ///////////////////////////////////////////////////////////////
  isIntegerType: function isIntegerType(type) {
    return adhocDesigner.INTEGER_JAVA_TYPES.indexOf(type) >= 0;
  },
  isDecimalType: function isDecimalType(type) {
    return adhocDesigner.DECIMAL_JAVA_TYPES.indexOf(type) >= 0;
  },
  isDateType: function isDateType(type) {
    return adhocDesigner.DATE_JAVA_TYPES.indexOf(type) >= 0;
  },
  isBooleanType: function isBooleanType(type) {
    return adhocDesigner.BOOLEAN_JAVA_TYPES.indexOf(type) >= 0;
  },
  getSuperType: function getSuperType(type) {
    if (adhocDesigner.isIntegerType(type)) {
      return adhocDesigner.INTEGER_TYPE_DISPLAY;
    } else if (adhocDesigner.isDecimalType(type)) {
      return adhocDesigner.DECIMAL_TYPE_DISPLAY;
    } else if (adhocDesigner.isDateType(type)) {
      return adhocDesigner.DATE_TYPE_DISPLAY;
    } else {
      return adhocDesigner.NOT_A_NUMBER_TYPE_DISPLAY;
    }
  },

  /*
       * Todo: Should be refactored inline
       */
  getSelectedColumnOrGroup: function getSelectedColumnOrGroup() {
    return window.selObjects[0];
  },
  generalDesignerCallback: function generalDesignerCallback() {
    window.localContext.initAll();
    adhocDesigner.updateTrees();
  },
  //////////////////////////////////
  // Toolbar action handlers
  //////////////////////////////////
  launchDialogMenu: function launchDialogMenu() {
    adhocControls.launchDialog();
  },
  showViewQueryDialog: function showViewQueryDialog() {
    adhocDesigner.viewQueryDialog.show();
  },
  sort: function sort() {
    adhocSort.launchDialog();
  },
  selectFields: function selectFields() {
    adhocReentrance.launchDialog();
  },
  //////////////////////////////////
  // Public designer interface
  //////////////////////////////////
  run: function run(mode) {
    // Setup Web Help
    this.initialLoadingDialog();
    webHelpModule.setCurrentContext(mode.indexOf('olap') >= 0 ? 'analysis' : 'ad_hoc'); // Init UI elements
    // Init UI elements

    this.ui.dataMode = jQuery('#dataSizeSelector');
    this.ui.canvas = isSupportsTouch() ? jQuery('#mainTableContainer > .scrollWrapper') : jQuery('#mainTableContainer');
    this.ui.header_title = jQuery('#display > ' + layoutModule.PAGE_HEADER_TITLE_PATTERN);
    /*
    * Events
    */

    /*
         * Events
         */

    this.observePointerEvents();
    this.observeKeyEvents();
    this.observeCustomEvents();
    this.observeTableContainerEvents();
    /*
    * DnD
    */

    /*
         * DnD
         */

    this.initDroppables();
    /*
    * Initialize Mode dependent Ad Hoc Designer components
    */

    /*
         * Initialize Mode dependent Ad Hoc Designer components
         */

    this.initComponents(mode);
    this.loadState();
    /*
    * UI
    */

    /*
         * UI
         */

    if (window.isEmbeddedDesigner) {
      toolbarButtonModule.initialize(_.extend(this.toolbarActionMap, {
        presentation: 'doNothing',
        'export': 'doNothing',
        save: 'adhocDesigner.handleBack',
        closeDesigner: 'adhocDesigner.handleCancel'
      }), $('adhocToolbar'));
      adhocDesigner.observeCloseDesignerEvent();
      adhocDesigner.observeCrossDocumentMessages();
    } else {
      toolbarButtonModule.initialize(this.toolbarActionMap, $('adhocToolbar'));
    }

    if (isSupportsTouch()) {
      var wrapper = this.ui.canvas.get(0);
      this._touchController = new TouchController(wrapper, wrapper.parentNode, {
        useParent: true,
        absolute: true,
        scrollbars: true
      });
    }

    this.initTitle();
    this.initFiltersPanel();
    this.initPanelsState();
    this.initDialogs();
    typeof window.orientation !== 'undefined' && window.orientation === 0 && this.hideOnePanel();
    /*
    * Error on load?
    */

    /*
         * Error on load?
         */

    $('errorPageContent') ? adhocDesigner.initEnableBrowserSelection($('designer')) : adhocDesigner.initPreventBrowserSelection($('designer'));
  },
  cancelAdhocExecution: function cancelAdhocExecution() {
    dialogs.popup.hide($(ajax.LOADING_ID));
    window.history.back();
  },
  initialLoadingDialog: function initialLoadingDialog() {
    var ajaxLoading = jQuery('#' + ajax.LOADING_ID);

    if (ajaxLoading.length > 0) {
      ajaxLoading.addClass(layoutModule.CANCELLABLE_CLASS);
      ajaxLoading.addClass(layoutModule.ADHOC_COMPONENT);
      ajaxLoading.find("#cancel").click(function () {
        adhocDesigner.cancelAdhocExecution();
      });
    }
  },
  initLocalContext: function initLocalContext(mode) {
    // Set up local context variable
    window.localContext = this.contextMap[mode];
    window.localContext.setMode(mode);
    window.localContext.init && window.localContext.init(mode);
    adhocDesigner.resetState();
    window.localContext.reset();
  },
  initComponents: function initComponents(mode) {
    // Init Crosstab mode variables
    this.isCrosstabMode = mode.indexOf('ichart') >= 0 || mode.indexOf('crosstab') >= 0;
    this.ui.canvas.empty();
    jQuery('#level-container').hide();
    this.initLocalContext(mode); // Register Report Template
    // Register Report Template

    if (mode.indexOf('ichart') < 0) adhocDesigner.registerTemplate(window.localContext, mode + 'Template'); // Init Layout Manager instance
    // Init Layout Manager instance

    this.initLayoutManager(mode); // Update Data Mode panel appearance
    // Update Data Mode panel appearance

    mode.indexOf('chart') >= 0 || mode.indexOf('olap') >= 0 ? this.ui.dataMode.hide() : this.ui.dataMode.show(); // Prepare axes labels
    // Prepare axes labels

    jQuery('#columns').children().eq(0).html(window.layoutManagerLabels.column[mode]);
    jQuery('#rows').children().eq(0).html(window.layoutManagerLabels.row[mode]);
    adhocDesigner.ui.visualizationChooser.init();
  },
  render: function render() {
    var state = window.localContext.state;
    toolbarButtonModule.setActionModel(state.actionmodel);

    if (window.localContext.getMode() != designerBase.ICHART && window.localContext.getMode() != designerBase.OLAP_ICHART) {
      var selectedType = window.localContext.getMode() === designerBase.OLAP_CROSSTAB ? designerBase.CROSSTAB : window.localContext.getMode();
      adhocDesigner.ui.canvas.empty();
      adhocDesigner.ui.visualizationChooser.setSelectedType(selectedType);
    } else {
      adhocDesigner.ui.visualizationChooser.setSelectedType(AIC.state.chartState.chartType);
    }

    adhocDesigner.updateCanvasClasses(adhocDesigner.isCrosstabMode);
    var isDataRendered = window.localContext.render();

    if (window.isDesignView) {
      //save and undo buttons are disabled in report display view
      adhocDesigner.enableCanUndoRedo();
      adhocDesigner.enableRunAndSave(window.localContext.canSaveReport());
    }

    if (isDataRendered) {
      window.editor = null;
      designerBase.initAdhocSpecificDesignerBaseVar();
      designerBase.setState();
      designerBase.updateSessionWarning();
      designerBase.updateFlowKey();

      if (window.localContext.initAll) {
        window.localContext.initAll();
      } // Fixed bug # 37348:
      // TODO: find out why should deselect items. If deselection confirmed - then the tree node should be also deselected. Fix it!
      //                designerBase.unSelectAll();

    }

    if (window.isDesignView && adhocDesigner.isDisplayManagerVisible()) {
      jQuery('#' + adhocDesigner.DISPLAY_MANAGER_ID).removeClass(layoutModule.HIDDEN_CLASS);
    }

    adhocDesigner.updateModeLabelSelection(state.viewType);
    adhocDesigner.updateDataMode(state.dataSize);
    adhocDesigner.ui.display_manager.render(state.columns ? {
      column: state.columns,
      group: state.groups
    } : state.chartItems ? {
      measures: state.chartItems,
      group: state.group
    } : {
      column: state.crosstabState.columnGroups,
      row: state.crosstabState.rowGroups
    });
    jQuery('#designer').trigger('layout_update');
    adhocDesigner.resetScroll(); //save and undo buttons are disabled in report display view
    //save and undo buttons are disabled in report display view

    if (window.isDesignView) {
      adhocDesigner.enableRunAndSave(window.localContext.canSaveReport());
    }

    adhocDesigner.enableSort(state.viewType == 'table');
    adhocDesigner.viewQueryDialog.updateContent(state.query);
    jQuery('#designer').trigger('rendering:done');
  },
  resetState: function resetState() {
    window.localContext.state = new adhocDesigner.State({});
  },
  updateState: function updateState(state) {
    window.localContext.state.update(state);
  },
  updateModeLabelSelection: function updateModeLabelSelection(mode) {
    jQuery('#dataModeSelector').val(mode);
  },
  updateDataMode: function updateDataMode(datasize) {
    jQuery('#dataSizeSelector').val(datasize);
  },
  setNothingToDisplayVisibility: function setNothingToDisplayVisibility(visible) {
    if (visible) {
      jQuery('#titleCaption').css('min-width', '400px');
      jQuery('#nothingToDisplay').removeClass(layoutModule.HIDDEN_CLASS);
      jQuery('#nothingToDisplay').css('min-width', '325px');
      centerElement($('nothingToDisplay'), {
        horz: true,
        vert: true
      });
      /*
       * TODO: put layout positioning code into layout related code. Should be handled through media CSS queries.
       */

      if (isIPad()) {
        var elem = $('nothingToDisplay');
        var theWidth = parseInt(elem.getStyle('width'));
        var theBufferedWidth = theWidth + getBufferWidth(elem, true);
        var e = jQuery('#displayManager');
        var parentWidth = e ? e.width() : elem.up(1).getWidth();
        elem.style.marginLeft = theWidth / 2 + 'px';
        elem.style.left = '0%';
        elem.style.position = 'relative';
        elem.style.minWidth = '300px';
      }
    } else {
      jQuery('#titleCaption').css('min-width', '');
      jQuery('#nothingToDisplay').addClass(layoutModule.HIDDEN_CLASS);
    }
  },
  updateCanvasClasses: function updateCanvasClasses(isCrosstabMode) {
    jQuery('#' + adhocDesigner.CANVAS_PANEL_ID)[(isCrosstabMode ? 'add' : 'remove') + 'Class']('showingSubHeader OLAP');
  },
  showSaveConfirmationDialog: function showSaveConfirmationDialog(callback) {
    var confirmDialog = jQuery('#' + adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.DIALOG_ID);
    dialogs.popupConfirm.show(confirmDialog[0], false, {
      okButtonSelector: '#' + adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.OK_BUTTON_ID,
      cancelButtonSelector: '#' + adhocDesigner.SAVE_WITHOUT_FILTERS_APPLY_CONFIRMATION_DIALOG.CANCEL_BUTTON_ID
    }).done(callback);
  },
  resetScroll: function resetScroll() {
    if (adhocDesigner._touchController) {
      adhocDesigner._touchController.reset();

      adhocDesigner._touchController.addPadding('canvasTable', {
        right: 200
      });
    }
  },
  resetFilterPanelState: function resetFilterPanelState() {
    // if user did not manually expand/collapse filter panel we will show or hide it depending on conditions
    if (!layoutModule.panelStateWasManuallyChanged('filters', window.clientKey)) {
      // Expand filter panel if there are any filters or Chart Data Level's sliders, otherwise  - collapse it.
      if (adhocDesigner.filtersController.collection.length > 0 || jQuery('#level-container .sliderTick').length > 0) {
        layoutModule.maximize($('filters'), true);
      } else {
        layoutModule.minimize($('filters'), true);
      }
    } else {
      layoutModule[layoutModule.getPanelMinimizedState('filters') === 'true' ? 'minimize' : 'maximize']($('filters'), true);
    }
  },
  applyFilterTitleColor: function applyFilterTitleColor(filterEditors) {
    _.each(filterEditors, function (editor) {
      var field = adhocDesigner.findFieldByName(editor.model.get('name'));

      if (field && field.kind) {
        editor.$('.header .filterName').addClass(field.kind.toLowerCase());
      }
    });
  },
  canShowFilterOption: function canShowFilterOption(errorMessages) {
    var canShow = true;

    for (var i = 0; i < window.selObjects.length; i++) {
      if (!window.localContext.canAddFilter(window.selObjects[i], errorMessages)) {
        canShow = false;
        break;
      }
    }

    return canShow;
  },
  getMode: function getMode() {
    return window.localContext.getMode();
  },
  isOlapMode: function isOlapMode() {
    return window.localContext.getMode().indexOf('olap') > -1;
  },
  onDataModeSelector: function onDataModeSelector(mode, chartType) {
    var currentMode = window.localContext.getMode();

    if (currentMode !== mode) {
      var extraParameters; // check if we are switching to charts...

      if ((currentMode === designerBase.CROSSTAB || currentMode === designerBase.OLAP_CROSSTAB || currentMode === designerBase.TABLE) && (mode === designerBase.ICHART || mode === designerBase.OLAP_ICHART)) {
        var state = currentMode === designerBase.CROSSTAB || currentMode === designerBase.OLAP_CROSSTAB ? AdHocCrosstab.state : AdHocTable.state;

        if (!adhocDesigner.switchModeEventCheck(state)) {
          // The server can't render the chart because a row or column group summary was deleted.
          // User should restore all summaries before switching to a chart.
          // So, cancel the 'chart' selection...
          adhocDesigner.updateModeLabelSelection(currentMode);
          dialogs.systemConfirm.show(adhocDesigner.getMessage('ADH_1214_ICHARTS_NO_SWITCHMODE_DELETED_SUMMARIES'), 5000);
          return;
        }

        extraParameters = chartType;
      }

      window.localContext.hide && window.localContext.hide();
      adhocDesigner.switchMode(mode, null, extraParameters);
    } else if (chartType && AIC.state.chartState && chartType !== AIC.state.chartState.chartType) {
      AIC.updateChartState({
        chartType: chartType
      });
    }
  }
};

adhocDesigner.State = function (state) {
  this.update(state);
  classUtil.mixin(this, window.localContext.State);
};

adhocDesigner.State.prototype.update = function (newState) {
  _.extend(this, newState);
}; //TODO: remove while moving to full AMD env
//TODO: remove while moving to full AMD env


window.adhocDesigner = adhocDesigner;
window.adhocSessionButton = adhocSessionButton;
window.adhocSessionDialog = adhocSessionDialog;
module.exports = adhocDesigner;

});