define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var i18n = require("bundle!all");

var Highcharts = require("highcharts");

var AdhocHighchartsAdapter = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter");

var AdhocDataProcessor = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/adhocDataProcessor");

var highchartsDataMapper = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/highchartsDataMapper");

var FormattingDialogModel = require('./formattingDialog/model/FormattingDialogModel');

var FormattingDialogView = require('./formattingDialog/view/FormattingDialogView');

var designerBase = require('../../base/designer.base');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;
var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;
var isNotNullORUndefined = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isNotNullORUndefined;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var AdHocCrosstab = require('../crosstab.helpers');

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var ResizeObserver = require('resize-observer-polyfill');

require("runtime_dependencies/jrs-ui/src/util/utils.common");

require('jquery-ui/ui/position');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*globals alert*/

/* eslint no-console: "off", no-array-constructor: "off" */
var log = logger.register("AdhocIntelligentChart");

function renderTemplate(template, opts) {
  return _.template(template)(opts);
}

var AdhocIntelligentChart = {};
var AIC = AdhocIntelligentChart;

_.extend(AIC, {
  debug: false,
  mode: null,
  controller: 'ich',
  state: {},
  cache: [],
  chart: null,
  _chartOptionsMenuHasBeenInitialized: false,
  hasAllData: false,
  groupLevel: {
    column: 0,
    row: 0
  },
  firstRendering: true,
  $chartContainer: null,
  chartContainerSelector: '#chartContainer',
  _containerResizeObserver: null,
  _highchartsOptions: null,
  reset: function reset() {
    AIC.isDesignerInitialized = false;
  },
  setMode: function setMode(arg) {
    this.mode = arg;
  },
  getMode: function getMode() {
    return this.mode;
  },
  flush: function flush() {
    this.hasAllData = false;
    this.cache = [];
  },
  setUp: function setUp() {},
  // No-op.
  // No-op.
  isOLAP: function isOLAP() {
    return this.getMode() === designerBase.OLAP_ICHART;
  },
  isOlapMode: function isOlapMode() {
    return this.getMode() === designerBase.OLAP_ICHART;
  },
  isNonOlapMode: function isNonOlapMode() {
    return this.getMode() === designerBase.ICHART;
  },
  update: function update(state) {
    try {
      AIC.setUp();

      _.extend(this.state, state);
    } catch (error) {
      if (AIC.debug) {
        console.log('AIC.update:   caught error ' + error + ' restore state to previous');
      }

      window.adhocDesigner.undo(); // TODO: i18n required.

      dialogs.systemConfirm.show('The previous request encountered an error \'' + error + '\' restoring chart to previous state');
    }

    return this;
  },
  checkIfChartCanBeRendered: function checkIfChartCanBeRendered() {
    if (!AIC.state.queryData.metadata.canRender) {
      // if server side decided we can't render chart... well, yeah, why not...
      return;
    }

    if (AIC.state.queryData.data.length === 0) {
      AIC.state.queryData.metadata.canRender = false;
      return;
    }

    var chartType = AIC.state.chartState.chartType;
    var metadata = AIC.state.queryData.metadata;
    var measuresAmount = metadata.measures.length;
    var rowAxisInd = metadata.measureAxis === 1 ? 0 : 1;
    var measureAxisInd = metadata.measureAxis === 1 ? 1 : 0;
    var measuresAxisName = metadata.measureAxis === 0 ? 'row' : 'column';
    var fieldsAxisName = metadata.measureAxis === 1 ? 'row' : 'column';
    var amountOfFieldsOnMeasureAxis = metadata.axes[measureAxisInd].length;
    var amountOfFieldsOnNonMeasureAxis = metadata.axes[rowAxisInd].length; //console.log(AIC.state.queryData);
    //console.log("amount of fields (located in " + fieldsAxisName + "): ", amountOfFieldsOnNonMeasureAxis);
    //console.log("amount of measures (located in " + measuresAxisName + "): ", measuresAmount);
    //console.log("amount of fields on measure axe: ", amountOfFieldsOnMeasureAxis);

    var canRender = true;
    var isOlap = AIC.state.viewType === 'olap_ichart';

    if (chartType === 'dual_measure_tree_map') {
      // Requires:
      // Two Measures in the Columns.
      // One Field in the Rows.
      canRender = measuresAxisName === 'column' && measuresAmount === 2 && amountOfFieldsOnNonMeasureAxis === 1 && !isOlap; // we deny mixing measures and fields on the same axe.
      // 'amountOfFieldsOnMeasureAxis === 1' means there are only measures and no fields

      canRender = canRender && amountOfFieldsOnMeasureAxis === 1;
    } else if (chartType === 'tree_map') {
      // Requires:
      // One Measure in the Columns.
      // One or more Fields in the Rows.
      canRender = measuresAxisName === 'column' && measuresAmount === 1 && amountOfFieldsOnNonMeasureAxis >= 1 && !isOlap; // we deny mixing measures and fields on the same axe.
      // 'amountOfFieldsOnMeasureAxis === 1' means there are only measures and no fields

      canRender = canRender && amountOfFieldsOnMeasureAxis === 1;
    } else if (chartType === 'one_parent_tree_map') {
      // Requires:
      // One Measure in the Columns.
      // Two or more Fields in the Rows.
      // Builds the chart with only one parent level
      canRender = measuresAxisName === 'column' && measuresAmount === 1 && amountOfFieldsOnNonMeasureAxis >= 2 && !isOlap; // we deny mixing measures and fields on the same axe.
      // 'amountOfFieldsOnMeasureAxis === 1' means there are only measures and no fields

      canRender = canRender && amountOfFieldsOnMeasureAxis === 1;
    } else if (chartType === 'gauge') {
      // Requires:
      // At least one Measure and all fields into the Columns location
      // Nothing in Rows.
      canRender = measuresAxisName === 'column' && measuresAmount >= 1 && amountOfFieldsOnNonMeasureAxis === 0 && !isOlap;
    } else if (chartType === 'multi_level_gauge') {
      // Requires:
      // At least two Measures and all fields into the Columns location
      // Nothing in Rows.
      canRender = measuresAxisName === 'column' && measuresAmount >= 2 && amountOfFieldsOnNonMeasureAxis === 0 && !isOlap;
    } else if (chartType === 'arc_gauge') {
      // Requires:
      // At least one Measure and all fields into the Columns location
      // Nothing in Rows.
      canRender = measuresAxisName === 'column' && measuresAmount >= 1 && amountOfFieldsOnNonMeasureAxis === 0 && !isOlap;
    }

    if (!canRender) {
      AIC.state.queryData.metadata.canRender = canRender;
    }
  },
  render: function render() {
    var hasData = AIC.state.queryData.data.length > 0;
    var hasUnresolvedReferences = AIC.state.unresolvedReferences && AIC.state.unresolvedReferences.length > 0;
    var message = window.adhocDesigner.getMessage('ADH_264_XTAB_STATUS_MISSING_MEASURE_DIMENSION');

    if (hasUnresolvedReferences) {
      message = window.adhocDesigner.getMissingFieldsCanvasMessage(AIC.state);
    }

    this.$nothingToDisplayMessage.html(message);
    window.adhocDesigner.setNothingToDisplayVisibility(!hasData || hasUnresolvedReferences); // Update UI data.

    AIC.ui.update(AIC.state); // Render UI data.

    AIC.ui.render();
    var chartRendered = AIC.renderChart(hasData);
    $("[action='chart-format']").removeClass('disabled');
    AIC.isDesignerInitialized = true;
    return chartRendered;
  },
  renderChart: function renderChart(hasData) {
    this._destroyChart(); // For first rendering we do late rendering. This is because of bug 32104.


    if (AIC.firstRendering) {
      return hasData;
    }

    if (AIC.debug) {
      console.info(AIC.state);
    }

    this.checkIfChartCanBeRendered();

    if (AIC.state.queryData.metadata.canRender === false) {
      var chartType = AIC.state.chartState.chartType; // By default in the adhoc designer there will be some error message saying you need to add
      // some measure or field. But for some chart types we'd like to display a special hint to user
      // to let him understand what he has to do and what layout he need to have

      var displayMessage = '';

      if (AIC._isTimeSeries() && !highchartsDataMapper.isHeatMapTimeSeriesChart(chartType)) {
        displayMessage = window.adhocDesigner.getMessage('ADH_1214_ICHARTS_NO_TIME_SERIES_DATA');
      } else if (highchartsDataMapper.isDualOrMultiAxisChart(chartType) || highchartsDataMapper.isScatterChart(chartType) || highchartsDataMapper.isBubbleChart(chartType)) {
        displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_NO_DATA_' + chartType.toUpperCase()];
      } else if (highchartsDataMapper.isDualLevelPieChart(chartType)) {
        displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_NO_DATA_DUAL_LEVEL_PIE'];
      } else if (highchartsDataMapper.isHeatMapChart(chartType) && !window.adhocDesigner.isOlapMode()) {
        displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_NO_DATA_HEAT_MAP_NON_OLAP'];
      } else if (highchartsDataMapper.isHeatMapChart(chartType) && window.adhocDesigner.isOlapMode()) {
        displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_NO_DATA_HEAT_MAP_OLAP'];
      } else if (highchartsDataMapper.isHeatMapTimeSeriesChart(chartType)) {
        displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_NO_DATA_TIME_SERIES_HEAT_MAP'];
      } else if (highchartsDataMapper.isDualMeasureTreeMapChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_DUAL_MEASURE_TREE_MAP'];
      } else if (highchartsDataMapper.isTreeMapChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_TREE_MAP'];
      } else if (highchartsDataMapper.isOneParentTreeMapChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_ONE_PARENT_TREE_MAP'];
      } else if (highchartsDataMapper.isGaugeChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_GAUGE'];
      } else if (highchartsDataMapper.isMultiLevelGaugeChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_MULTI_LEVEL_GAUGE'];
      } else if (highchartsDataMapper.isArcGaugeChart(chartType)) {
        displayMessage = i18n['ADH_1214_ICHARTS_NO_DATA_ARC_GAUGE'];
      }

      if (displayMessage) {
        this.$nothingToDisplayMessage.text(displayMessage);
        window.adhocDesigner.setNothingToDisplayVisibility(true);
      }

      return hasData;
    }

    var clonedQueryData = JSON.parse(JSON.stringify(AIC.state.queryData));
    var clonedChartState = JSON.parse(JSON.stringify(AIC.state.chartState));
    AdhocDataProcessor.load(clonedQueryData);
    AdhocDataProcessor.messages = window.adhocDesigner.messages;

    if (AIC.isOLAP()) {
      AIC.state.olapDimensionInfo = AdhocDataProcessor.getOLAPDimensionInfo();
    }

    window.isDesignView && AIC._renderDataLevelSelector(); // Store view port size to detect if resize is required

    this.ichWidth = this.$chartContainer.width();
    this.ichHeight = this.$chartContainer.height();

    if (this.ichWidth < 50 || this.ichHeight < 50) {
      this.$nothingToDisplayMessage.text(i18n['ADH_1214_ICHARTS_NO_CONTAINER_SPACE']);
      window.adhocDesigner.setNothingToDisplayVisibility(true); // also continue to observe the container size...

      this._containerResizeObserver.observe(this.$chartContainer[0]);

      return false;
    }

    this._highchartsOptions = AdhocHighchartsAdapter.generateOptions(clonedQueryData, clonedChartState, {
      width: AIC.ichWidth,
      height: AIC.ichHeight,
      messages: window.adhocDesigner.messages
    });

    if (!AIC._checkHasData(this._highchartsOptions)) {
      //
      // http://bugzilla.jaspersoft.com/show_bug.cgi?id=29278
      //
      // 2012-10-09 thorick
      //
      // the current state:  hasData AND !highchartsOptions.hasData
      //   means that the query has returned some results
      //   but the chart level rendering does NOT have results
      //   this can happen if a Data Level selector is set at a level
      //   which does not contain any results
      //      (note:  a measure value of zero counts as a result)
      //
      this.$nothingToDisplayMessage.html(window.adhocDesigner.getMessage('ADH_1214_ICHARTS_NO_CHART_DATA'));
      window.adhocDesigner.setNothingToDisplayVisibility(true);
      return false;
    }

    if (AIC.state.isRedrawRequired !== true && AIC.chart) {
      return true;
    }

    this._changeFontSize();

    window.adhocDesigner.setNothingToDisplayVisibility(false); //console.log('highchartsOptions: ', JSON.parse(JSON.stringify(this._highchartsOptions)));

    try {
      AIC.chart = new Highcharts.Chart(this._highchartsOptions);
    } catch (e) {
      log.error(e); //console.log(e);

      this._destroyChart();

      AIC.state.canSave = false;
      window.adhocDesigner.enableRunAndSave(false);
      var _displayMessage = '';

      if (/Cannot read property '3' of undefined/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_NOT_ENOUGH_SPACE'];
      } else if (/\#12/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_12'];
      } else if (/\#13/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_13'];
      } else if (/\#14/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_14'];
      } else if (/\#15/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_15'];
      } else if (/\#16/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_16'];
      } else if (/\#17/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_17'];
      } else if (/\#18/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_18'];
      } else if (/\#19/.test(e)) {
        _displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_ERROR_TOO_MANY_VALUES'];
      } else if (/\#20/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_20'];
      } else if (/\#21/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_21'];
      } else if (/\#22/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_22'];
      } else if (/\#23/.test(e)) {
        _displayMessage = i18n['ADH_1214_ICHARTS_ERROR_23'];
      } else {
        _displayMessage = window.adhocDesigner.messages['ADH_1214_ICHARTS_ERROR_UNCAUGHT'];
      }

      this.$nothingToDisplayMessage.text(_displayMessage);
      window.adhocDesigner.setNothingToDisplayVisibility(true);
      return false;
    }

    this._containerResizeObserver.observe(this.$chartContainer[0]);

    return true;
  },
  redraw: function redraw() {// this event is called from the designer.observers file on 'layout_update' event
    // and we don't really interested in such events
  },
  _doesChartSupportPlotResize: function _doesChartSupportPlotResize() {
    return !(this.state.chartState.chartType === 'pie' || highchartsDataMapper.isGaugeBasedChart(this.state.chartState.chartType) || highchartsDataMapper.isHeatMapTimeSeriesChart(this.state.chartState.chartType));
  },
  _onContainerResizeEvent: function _onContainerResizeEvent() {
    if (!this.$chartContainer) {
      return;
    } // this is the default threshold value which can be re-assigned by chart


    var resizeThreshold = 20; // in pixels

    if (this._highchartsOptions && !_.isUndefined(this._highchartsOptions.resizeThreshold)) {
      resizeThreshold = this._highchartsOptions.resizeThreshold;
    }

    var oldWidth = this.ichWidth;
    var oldHeight = this.ichHeight;
    var newWidth = this.$chartContainer.width();
    var newHeight = this.$chartContainer.height(); //console.log('_onContainerResizeEvent(): container:', this.$chartContainer[0]);
    //console.log('_onContainerResizeEvent(): old dimensions:', oldWidth, oldHeight);
    //console.log('_onContainerResizeEvent(): new dimensions:', newWidth, newHeight);
    // don't trust nobody, check what the size had actually been changed and means something to us

    var changesInWidth = Math.abs(oldWidth - newWidth);
    var changesInHeight = Math.abs(oldHeight - newHeight);

    if (changesInWidth < resizeThreshold && changesInHeight < resizeThreshold) {
      // there is no actual resizing or no reason to react on threshold change, quiting
      //console.log('_onContainerResizeEvent(): there is no actual resizing or no reason to react on threshold change:');
      //console.log(`_onContainerResizeEvent(): ${changesInWidth} < ${resizeThreshold} && ${changesInHeight} < ${resizeThreshold}`);
      //console.log('_onContainerResizeEvent(): quitting...');
      return;
    } //console.log('_onContainerResizeEvent(): we passed the resizeThreshold, reacting...');


    if (this._onContainerResizeEventTimeout) {
      clearTimeout(this._onContainerResizeEventTimeout);
    }

    var config = {
      oldWidth: oldWidth,
      oldHeight: oldHeight,
      newWidth: newWidth,
      newHeight: newHeight
    };
    this._onContainerResizeEventTimeout = setTimeout(this._onContainerResizeEventReaction.bind(this, config), 500);
  },
  _onContainerResizeEventReaction: function _onContainerResizeEventReaction(config) {
    var oldHeight = config.oldHeight,
        newWidth = config.newWidth,
        newHeight = config.newHeight;
    this._onContainerResizeEventTimeout = null; // record the new dimension of the container in case it has been changed
    // console.log('saving new dimensions on resize handler...');

    this.ichWidth = newWidth;
    this.ichHeight = newHeight;

    if (this._doesChartSupportPlotResize() === false) {
      // chart can't be resized by HC correctly, rendering chart again...
      this.renderChart();
      return;
    }

    var fontSizeChanged = this._changeFontSize();

    if (fontSizeChanged) {
      // chart font has been changed, rendering chart again...
      this.renderChart();
      return;
    } // Switch off animation if height was changed.
    // Horizontal resize with animation causes invalid rendering of labels (see bug #33531).


    var animation = oldHeight === newHeight;
    this.chart.setSize(AIC.ichWidth, AIC.ichHeight, animation);
  },
  _destroyChart: function _destroyChart() {
    if (this._containerResizeObserver) {
      // stopping containerResizeObserver in case it's working
      if (this._onContainerResizeEventTimeout) {
        clearTimeout(this._onContainerResizeEventTimeout);
        this._onContainerResizeEventTimeout = null;
      }

      this._containerResizeObserver.unobserve(this.$chartContainer[0]);
    }

    if (this.chart) {
      if (this.chart.destroy) {
        this.chart.destroy();
      }

      this.chart = null;
    }
  },
  _changeFontSize: function _changeFontSize() {
    if (!this.state.chartState.autoScaleFonts) {
      if (typeof this._initialFontSize !== 'undefined') {
        // restore initial font size
        this.$chartContainer.css('font-size', this._initialFontSize);
      }

      return false;
    }

    var currentFontSize = parseInt(this.$chartContainer.css('font-size'));

    if (typeof this._initialFontSize === 'undefined') {
      this._initialFontSize = currentFontSize;
    }

    var scale = 1;

    if (this.ichWidth <= 100) {
      scale = 0.4;
    } else if (this.ichWidth > 100 && this.ichWidth <= 200) {
      scale = 0.5;
    } else if (this.ichWidth > 200 && this.ichWidth <= 300) {
      scale = 0.6;
    } else if (this.ichWidth > 300 && this.ichWidth <= 400) {
      scale = 0.7;
    } else if (this.ichWidth > 400 && this.ichWidth <= 500) {
      scale = 0.8;
    } else if (this.ichWidth > 500 && this.ichWidth <= 600) {
      scale = 0.9;
    }

    var newFontSize = this._initialFontSize * scale;

    if (currentFontSize === Math.round(newFontSize)) {
      return false;
    }

    this.$chartContainer.css('font-size', newFontSize);
    return true;
  },
  _isTimeSeries: function _isTimeSeries() {
    return AIC.state.chartState.chartType.indexOf('time_series') != -1;
  },
  _isDualMeasureTreeMap: function _isDualMeasureTreeMap() {
    return AIC.state.chartState.chartType.indexOf('dual_measure_tree_map') != -1;
  },
  _isTimeSeriesHeatMap: function _isTimeSeriesHeatMap() {
    return highchartsDataMapper.isHeatMapTimeSeriesChart(AIC.state.chartState.chartType);
  },
  cleanupOnSwitch: function cleanupOnSwitch() {
    this.ui.dialogs.groupSelector.hide();

    this._destroyChart();
  },
  resize: function resize() {// we are not interested in such events because we have a special observer for this.
    // search for '_onContainerResizeEvent'
  },
  // For first rendering we do late rendering. This is because of bug 32104.
  fixFirstRendering: function fixFirstRendering() {
    if (AIC.firstRendering) {
      AIC.firstRendering = false;
      AIC.renderChart();
    }
  },
  initAll: function initAll() {},
  // No-op.
  //
  //  check to see if the highcharts Object has any data
  //  It is possible to have a query that returned data
  //  but a grouping level that contains NO data
  //
  _checkHasData: function _checkHasData(highchartsOptions) {
    if (!highchartsOptions) return false;
    if (!highchartsOptions.series) return false;
    if (highchartsOptions.series.length <= 0) return false;
    var hasSeriesData = false;

    for (var i = 0; i < highchartsOptions.series.length; i++) {
      if (highchartsOptions.series[i].data != null) {
        if (highchartsOptions.series[i].data.length > 0) {
          hasSeriesData = true;
          break;
        }
      }
    }

    return hasSeriesData;
  },
  _isPivotAllowed: function _isPivotAllowed() {
    var me = AIC;
    return me.getDimensions('row').length > 0 || me.isOLAP() && me.getDimensions('column').length > 0;
  },
  _renderDataLevelSelector: function _renderDataLevelSelector() {
    var me = AIC.ui.controls.dataLevelSelector;
    me.render();

    if (AIC._isTimeSeries() || AIC._isDualMeasureTreeMap()) {
      me.hideRowsSlider();
    }
  }
});
/**
     * Service bus.
     */


_.extend(AIC, {
  serviceBus: {
    _listenersMap: {},
    _allEventsListeners: [],
    _incorrectEventTypeMsg: 'Service bus supports only string events. Received event is not a string.',

    /**
         * Should be used by services to fire event.
         *
         * @param event the event which is fired.
         */
    fireEvent: function fireEvent(event) {
      var serviceBus = AIC.serviceBus;

      if (typeof event !== 'string') {
        throw serviceBus._incorrectEventTypeMsg;
      }

      var listenersMap = serviceBus._listenersMap;
      var eventListeners = listenersMap[event];

      if (eventListeners) {
        _.each(eventListeners, function (listener) {
          listener(event);
        });
      }

      _.each(serviceBus._allEventsListeners, function (listener) {
        listener(event);
      });
    },

    /**
         * Registers event listener.
         *
         * @param event the event.
         * @param listener the listener.
         */
    registerListener: function registerListener(event, listener) {
      var serviceBus = AIC.serviceBus;

      if (typeof event !== 'string') {
        throw serviceBus._incorrectEventTypeMsg;
      }

      var listenersMap = serviceBus._listenersMap;
      var eventListeners = listenersMap[event];

      if (!eventListeners) {
        eventListeners = [];
        listenersMap[event] = eventListeners;
      }

      eventListeners.push(listener);
    },
    registerAllEventsListener: function registerAllEventsListener(listener) {
      AIC.serviceBus._allEventsListeners.push(listener);
    }
  }
});
/**
     * Mediator. Knows all about components on the page. Handles custom events and performs the actions.
     */


_.extend(AIC, {
  mediator: {
    _isListenerRegistered: false,
    eventToAction: {
      'chart:typeChanged': function chartTypeChanged() {},
      'chart:levelChanged': function chartLevelChanged() {
        // Update client state.
        AIC.state.chartState.columnsSelectedLevels = AIC.ui.controls.dataLevelSelector.getColumnSelectedLevels();
        AIC.state.chartState.rowsSelectedLevels = AIC.ui.controls.dataLevelSelector.getRowsSelectedLevels(); // Update server state.

        AIC.updateChartState();
      }
    },
    listener: function listener(event) {
      if (typeof event !== 'string') {
        throw 'Mediator supports only string events. Received event is not a string.';
      }

      var action = AIC.mediator.eventToAction[event]; // Execute the action if we have if defined for the event.

      if (action) {
        action();
      }
    },

    /**
         * Registers itself in service bus to listen events.
         */
    register: function register() {
      if (!AIC.serviceBus._isListenerRegistered) {
        AIC.serviceBus.registerAllEventsListener(AIC.mediator.listener);
        AIC.serviceBus._isListenerRegistered = true;
      }
    }
  }
});
/*
     * Initialization
     */


_.extend(AIC, {
  ui: {
    controls: {
      dataLevelSelector: {
        _container: null,
        _column: null,
        _row: null,
        init: function init() {
          var me = AIC.ui.controls.dataLevelSelector;
          me._container = $('#dataLevelSelector');
        },
        // TODO: pass the state to the render method instead of external referencing.
        render: function render() {
          // disable filters panel for dual-level pie
          if (highchartsDataMapper.isDualLevelPieChart(AIC.state.chartState.chartType)) {
            AIC.ui.controls.dataLevelSelector.hide();
            return;
          }

          var me = AIC.ui.controls.dataLevelSelector;
          AIC.ui.selectorTables.column.show().find('td.select-header').parent().siblings().remove();
          AIC.ui.selectorTables.row.show().find('td.select-header').parent().siblings().remove();

          if (AIC.isOLAP()) {
            me._renderOlapSlider();
          } else {
            me._renderNonOlapSliders();
          }

          window.adhocDesigner.resetFilterPanelState();
        },
        _renderOlapSlider: function _renderOlapSlider() {
          var me = AIC.ui.controls.dataLevelSelector;
          me._column = [];
          me._row = [];
          $.each(['row', 'column'], function (index, type) {
            if (AIC.state.olapDimensionInfo[index].length) {
              $.each(AIC.state.olapDimensionInfo[index], function (i, dimension) {
                var level = AIC.state.chartState[type + 'sSelectedLevels'][i];
                me['_' + type].push(AIC.ui.create.slider(AIC.ui.selectorTables[type], dimension.levels, dimension.dimension, {
                  max: dimension.levels.length - 1,
                  value: me._levelToLevelPosition(level, dimension),
                  stop: function stop(ev, ui) {
                    AIC.serviceBus.fireEvent('chart:levelChanged');
                  }
                }));
              });
              AIC.ui.selectorTables[type].show();
            } else {
              AIC.ui.selectorTables[type].hide();
            }
          });
        },
        _renderNonOlapSliders: function _renderNonOlapSliders() {
          var me = AIC.ui.controls.dataLevelSelector;
          me._row = me._renderNonOlapSlider(0);
          me._column = me._renderNonOlapSlider(1);
        },
        _renderNonOlapSlider: function _renderNonOlapSlider(axisIndex) {
          var me = AIC.ui.controls.dataLevelSelector;
          var levels = [];
          $.each(AIC.state.queryData.metadata.axes[axisIndex], function (i, v) {
            if (v.name != 'Measures') {
              levels.push(v.label);
            }
          });
          var selectorTable = axisIndex === 0 ? AIC.ui.selectorTables.row : AIC.ui.selectorTables.column;
          var sliderLevelCount = axisIndex === 0 ? AdhocDataProcessor.getRowSliderLevelCount() : AdhocDataProcessor.getColumnSliderLevelCount();
          var selectedLevels = axisIndex === 0 ? AIC.state.chartState.rowsSelectedLevels : AIC.state.chartState.columnsSelectedLevels;
          selectorTable.find('td.select-header').parent().siblings().remove();
          sliderLevelCount === 1 ? selectorTable.hide() : selectorTable.show();
          return AIC.ui.create.slider(selectorTable, levels, '', {
            max: sliderLevelCount - 1,
            value: me._getSliderPositionForNonOlap(selectedLevels, axisIndex),
            stop: function stop(ev, ui) {
              AIC.serviceBus.fireEvent('chart:levelChanged');
            }
          });
        },
        hide: function hide() {
          AIC.ui.selectorTables.column.hide();
          AIC.ui.selectorTables.row.hide();
        },
        hideRowsSlider: function hideRowsSlider() {
          AIC.ui.selectorTables.row.hide();
        },
        hideColumnsSlider: function hideColumnsSlider() {
          AIC.ui.selectorTables.column.hide();
        },
        _levelToLevelPosition: function _levelToLevelPosition(level, dimension) {
          for (var i = 0; i < dimension.levels.length; i++) {
            if (dimension.levels[i].levelName === level.name) {
              return i;
            }
          }

          throw 'No OLAP level info found for specified level = ' + level;
        },
        getRowsSelectedLevels: function getRowsSelectedLevels() {
          var me = AIC.ui.controls.dataLevelSelector;
          return me._getSelectedLevels(me._row, me._row, 0);
        },
        getColumnSelectedLevels: function getColumnSelectedLevels() {
          var me = AIC.ui.controls.dataLevelSelector;
          return me._getSelectedLevels(me._column, me._column, 1);
        },
        _getSelectedLevels: function _getSelectedLevels(nonOlapSlider, olapSliders, axisIndex) {
          var me = AIC.ui.controls.dataLevelSelector;

          if (AIC.isOLAP()) {
            return me._extractOlapSelectedLevels(olapSliders, axisIndex);
          } else {
            return me._extractNonOlapSelectedLevels(nonOlapSlider, axisIndex);
          }
        },
        _extractOlapSelectedLevels: function _extractOlapSelectedLevels(sliders, axisIndex) {
          var me = AIC.ui.controls.dataLevelSelector;
          var selectedLevels = [];
          $(sliders).each(function (i) {
            var selectedLevelPosition = me._extractSliderPosition($(this));

            var dimensionInfo = AIC.state.olapDimensionInfo[axisIndex][i];
            var selectedLevel = dimensionInfo.levels[selectedLevelPosition];
            selectedLevels.push({
              name: xssUtil.unescape(selectedLevel.levelName),
              label: xssUtil.unescape(selectedLevel.label),
              dimension: dimensionInfo.dimension
            });
          });
          return selectedLevels;
        },
        _extractNonOlapSelectedLevels: function _extractNonOlapSelectedLevels(dimSlider, axisIndex) {
          var me = AIC.ui.controls.dataLevelSelector;

          var sliderPos = me._extractSliderPosition(dimSlider);

          if (sliderPos === 0) {
            return [];
          } else {
            var levels = AdhocDataProcessor.getLevelsWithoutMeasures(AIC.state.queryData.metadata.axes[axisIndex]);
            return [levels[sliderPos - 1]];
          }
        },
        _getSliderPositionForNonOlap: function _getSliderPositionForNonOlap(selectedLevels, axisIndex) {
          if (selectedLevels.length === 0) {
            return 0;
          }

          var levels = AdhocDataProcessor.getLevelsWithoutMeasures(AIC.state.queryData.metadata.axes[axisIndex]); // The slider position will be level index + 1 because of grand total on the position 0.

          return AdhocDataProcessor.getLevelIndex(levels, selectedLevels[0]) + 1;
        },
        _extractSliderPosition: function _extractSliderPosition(dimSlider) {
          return dimSlider.slider('option', 'value');
        },
        dock: function dock() {
          var me = AIC.ui.controls.dataLevelSelector;

          me._container.find('div.pod-body').eq(0).appendTo($('#level-container'));

          dialogs.popup.hide(me._container[0]);
        },
        undock: function undock() {
          var me = AIC.ui.controls.dataLevelSelector;
          $('#level-container').children('div.pod-body').eq(0).appendTo(me._container.find('div.body').eq(0));
          dialogs.popup.show(me._container[0]);
        }
      }
    },
    update: function update(state) {},
    render: function render() {
      var titleCaption = $('#titleCaption');
      AIC.state.titleBarShowing ? titleCaption.show() : titleCaption.hide();
      titleCaption.text(AIC.state.title);
      window.adhocDesigner.enableXtabPivot(AIC._isPivotAllowed());
      AIC.ui.dialogs.formatDialog.setState(AIC.state.chartState); // Hide them by default. If required they will be rendered later in the flow.

      AIC.ui.controls.dataLevelSelector.hide();
    },
    create: {
      sliderTable: function sliderTable(isRowsAxis) {
        var body = $('#level-container').show().children('.pod-body').eq(0);
        var levelSelectorHtml = renderTemplate($('#levelSelectorTemplate').html(), {
          id: (isRowsAxis ? 'row' : 'column') + 'LevelSelector',
          colspan: AIC.isOLAP() ? 2 : 1,
          name: isRowsAxis ? window.layoutManagerLabels.row[AIC.mode] : window.layoutManagerLabels.column[AIC.mode]
        });
        var table = $(levelSelectorHtml).appendTo(body);
        table.on('mouseover', 'div.tickOverlay', function (evt) {
          var tick = $(this).parent();
          AIC.dataLevelTooltip.text(tick.attr('level-name'));
          AIC.dataLevelTooltip.show().position({
            of: tick,
            at: 'center top',
            my: 'center bottom',
            offset: '0 -6',
            collision: 'fit'
          });
          AIC.ui.selectorTables.column.css('display') == 'block' && AIC.ui.selectorTables.column.hide().show();
          AIC.ui.selectorTables.row.css('display') == 'block' && AIC.ui.selectorTables.row.hide().show();
        });
        table.on('mouseover', 'a.ui-slider-handle', function (evt) {
          var slider = $(this).parent();
          var tick = slider.children('div.sliderTick').eq(slider.slider('option', 'value'));
          AIC.dataLevelTooltip.text(tick.attr('level-name'));
          AIC.dataLevelTooltip.show().position({
            of: tick,
            at: 'center top',
            my: 'center bottom',
            offset: '0 -6',
            collision: 'fit'
          });
          AIC.ui.selectorTables.column.css('display') == 'block' && AIC.ui.selectorTables.column.hide().show();
          AIC.ui.selectorTables.row.css('display') == 'block' && AIC.ui.selectorTables.row.hide().show();
        });
        table.on('mouseout', 'a.ui-slider-handle, div.tickOverlay', function (evt) {
          AIC.dataLevelTooltip.hide();
          AIC.ui.selectorTables.column.css('display') == 'block' && AIC.ui.selectorTables.column.hide().show();
          AIC.ui.selectorTables.row.css('display') == 'block' && AIC.ui.selectorTables.row.hide().show();
        });
        return table;
      },
      slider: function slider(table, levels, name, options) {
        /*
             * Create <tr>. Add label in OLAP mode
             */
        var parms = {
          label: AIC.isOLAP() ? {
            name: name
          } : false,
          marginLeft: AIC.isOLAP() ? '24px' : 0
        };
        table.find('tbody').eq(0).append(renderTemplate($('#dataLevelSelectorTemplate').html(), parms));
        /*
         * Init jqueryui slider
         */

        var slider = table.find('div.jrs-slider').last();
        slider.slider({
          value: options.value,
          min: 0,
          max: options.max,
          step: 1,
          range: 'min',
          stop: options.stop,
          slide: function slide(ev, ui) {
            var tick = $(ui.handle).parent().children('div.sliderTick').eq(ui.value);
            AIC.dataLevelTooltip.text(tick.attr('level-name'));
            AIC.dataLevelTooltip.show().position({
              of: tick,
              at: 'center top',
              my: 'center bottom',
              offset: '0 -6',
              collision: 'fit'
            });
            AIC.ui.selectorTables.column.css('display') == 'block' && AIC.ui.selectorTables.column.hide().show();
            AIC.ui.selectorTables.row.css('display') == 'block' && AIC.ui.selectorTables.row.hide().show();
          }
        });
        /*
             * Add tick marks
             */

        var spacing = options.max > 0 ? 100 / options.max : 0;

        if (!AIC.isOLAP()) {
          levels.unshift('All');
          options.max++;
        }

        for (var i = 0; i < options.max + 1; i++) {
          if (levels[i]) {
            var parms = {
              label: levels[i].label || levels[i],
              width: i * spacing
            };
            parms.label == 'All' && (parms.label = 'Total');
            parms.label = xssUtil.unescape(parms.label);
            var htm = renderTemplate($('#sliderTickTemplate').html(), parms);
            slider.append(htm);
          }
        }

        return slider;
      }
    }
  },
  init: function init(mode) {
    AIC.mediator.register();
    AIC.dataLevelTooltip = $('#dataLevelTooltip');
    this.$chartContainer = $(this.chartContainerSelector);
    this.$nothingToDisplayMessage = $('#nothingToDisplayMessage span.message-text');
    var $chartMenu = $('#chartMenu');
    var $chartOptions = $('#chartOptions');
    this._containerResizeObserver = new ResizeObserver(this._onContainerResizeEvent.bind(this));
    $chartOptions.appendTo(window.adhocDesigner.ui.canvas).show();
    $chartMenu.appendTo(window.adhocDesigner.ui.canvas);
    $(renderTemplate($('#titleCaptionTemplate').html()), {}).appendTo(window.adhocDesigner.ui.canvas).show();
    this.$chartContainer.appendTo(window.adhocDesigner.ui.canvas).show();

    if (!AIC._chartOptionsMenuHasBeenInitialized) {
      $chartOptions.on('mouseenter', function () {
        $(this).addClass('over');
        $chartMenu.show().position({
          of: $chartOptions,
          at: 'left bottom',
          my: 'left top',
          offset: '0 -1'
        });
      });
      $chartMenu.on('mouseleave', function () {
        var target = $(event.relatedTarget);
        $chartOptions.removeClass('over');

        if (!target.is('ul#chartMenu')) {
          $chartMenu.hide();
        }
      });
      $chartOptions.on('mouseleave', function () {
        var target = $(event.relatedTarget);
        $chartOptions.removeClass('over');

        if (!target.is('ul#chartMenu')) {
          $chartMenu.hide();
        }
      });
      $chartMenu.on('mouseenter', 'p.wrap', function () {
        $(this).addClass('over');
      });
      $chartMenu.on('mouseleave', 'p.wrap', function () {
        $(this).removeClass('over');
      });
      $chartMenu.on('click touchend', 'li', function () {
        if ($(this).is('[action="chart-format"]')) {
          if ($(this).hasClass('disabled')) {
            return;
          }

          var formatDialog = AIC.ui.dialogs.formatDialog;
          formatDialog.setState(AIC.state.chartState);
          formatDialog.open();
          window.adhocDesigner.initEnableBrowserSelection($('#designer')[0]);
        }
      }); // TODO: refactor to self contained components.

      $('#dataLevelSelector .closeIcon').on(isIPad() ? 'touchstart' : 'click', function () {
        AIC.ui.dialogs.groupSelector.hide();
      });
      AIC.ui.dialogs = {
        groupSelector: $('#dataLevelSelector')
      };
      AIC.ui.selectorTables = {
        column: AIC.ui.create.sliderTable(false),
        row: AIC.ui.create.sliderTable(true)
      };
      AIC.ui.controls.dataLevelSelector.init();

      if (!AIC.ui.dialogs.formatDialog) {
        var formattingDialogModel = new FormattingDialogModel(AIC.state.chartState, {
          parse: true,
          updateState: _.bind(AIC.updateChartState, AIC)
        });
        AIC.ui.dialogs.formatDialog = new FormattingDialogView({
          model: formattingDialogModel
        });
      }

      AIC._chartOptionsMenuHasBeenInitialized = true;
    }

    AIC.ui.dialogs.groupSelector.hide();
    $('#level-container').show();
  },
  hide: function hide() {
    $('#chartOptions').appendTo('#highChartsRepo').hide();
    $('#chartMenu').appendTo('#highChartsRepo').hide();
    $('#titleCaption').remove();
    this.$chartContainer.appendTo('#highChartsRepo').hide();
  }
});
/*
     * Event Handling
     */


_.extend(AIC, {
  mouseUpHandler: function mouseUpHandler(evt) {},
  mouseDownHandler: function mouseDownHandler(evt) {},
  mouseOverHandler: function mouseOverHandler(evt) {},
  mouseOutHandler: function mouseOutHandler(evt) {},
  mouseClickHandler: function mouseClickHandler(evt) {},
  treeMenuHandler: function treeMenuHandler(event) {
    var node = event.memo.node;
    var contextName;

    if (node.treeId === 'dimensionsTree') {
      contextName = node.isParent() ? window.adhocDesigner.DIMENSION_TREE_DIMENSION_CONTEXT : window.adhocDesigner.DIMENSION_TREE_LEVEL_CONTEXT;
    } else if (node.treeId === 'measuresTree') {
      contextName = node.isParent() ? window.adhocDesigner.MEASURE_TREE_GROUP_CONTEXT : window.adhocDesigner.MEASURE_TREE_CONTEXT;
    }

    window.adhocDesigner.showDynamicMenu(event.memo.targetEvent, contextName, null);
  },
  lmHandlersMap: {
    // Common methods for both axes
    addItems: function addItems(nodes, pos, axis) {
      var dims = _.uniq(_.map(nodes, function (n) {
        var dimNodes = n.param ? n.param.extra.dimensionId : n.extra && n.extra.dimensionId;
        return n.dimensionId ? n.dimensionId : dimNodes;
      }));

      var child = _.map(nodes, function (n) {
        var childNodes = n.extra ? n.extra.id : n.param && n.param.extra.id;
        return childNodes ? childNodes : n.id;
      }),
          isMeasureExtra = nodes[0].extra && 'isMeasure' in nodes[0].extra ? nodes[0].extra.isMeasure : null,
          isMeasureParamExtra = nodes[0].param && 'isMeasure' in nodes[0].param.extra ? nodes[0].param.extra.isMeasure : null,
          isMeasure = 'isMeasure' in nodes[0] ? nodes[0].isMeasure : isMeasureExtra ? isMeasureExtra : isMeasureParamExtra,
          isOlap = window.localContext.isOlapMode();

      AIC.insertDimensionInAxisWithChild({
        dim: isMeasure ? dims.slice(0, 1) : dims,
        axis: axis,
        pos: pos,
        child: isOlap || isMeasure ? child : null,
        hierarchyName: nodes[0].hierarchyName
      });
    },
    measureReorder: function measureReorder(measure, to) {
      AIC.moveMeasure(measure, to);
    },
    column: {
      addItem: function addItem(dim, pos, level, levelPos, isMeasure, uri, hierarchyName) {
        AIC.insertDimensionInAxisWithChild({
          dim: dim,
          axis: 'column',
          pos: pos,
          child: window.localContext.isOlapMode() || isMeasure ? level : null,
          measure_pos: levelPos,
          isMeasure: isMeasure,
          uri: uri,
          hierarchyName: hierarchyName
        });
      },
      removeItem: function removeItem(item, index) {
        if (item.isMeasure) {
          AIC.removeMeasure(index);
        } else {
          AIC.hideColumnLevel(item.dimensionId, item.level);
        }
      },
      moveItem: function moveItem(dim, from, to) {
        AIC.moveDimension(dim, 'column', 'column', from, to);
      },
      switchItem: function switchItem(dim, from, to) {
        AIC.moveDimension(dim, 'row', 'column', from, to);
      },
      contextMenu: function contextMenu(event, options) {
        AIC.selectFromDisplayManager(options.targetEvent, options.extra, designerBase.COLUMN_GROUP_MENU_LEVEL);
        actionModel.setSelected([options.extra]);
        AIC.showMenu(options.targetEvent, 'displayManagerColumn');
      }
    },
    row: {
      addItem: function addItem(dim, pos, level, levelPos, isMeasure, uri, hierarchyName) {
        AIC.insertDimensionInAxisWithChild({
          dim: dim,
          axis: 'row',
          pos: pos,
          child: window.localContext.isOlapMode() || isMeasure ? level : null,
          measure_pos: levelPos,
          isMeasure: isMeasure,
          uri: uri,
          hierarchyName: hierarchyName
        });
      },
      removeItem: function removeItem(item, index) {
        if (item.isMeasure) {
          AIC.removeMeasure(index);
        } else {
          AIC.hideRowLevel(item.dimensionId, item.level);
        }
      },
      moveItem: function moveItem(dim, from, to) {
        AIC.moveDimension(dim, 'row', 'row', from, to);
      },
      switchItem: function switchItem(dim, from, to) {
        AIC.moveDimension(dim, 'column', 'row', from, to);
      },
      contextMenu: function contextMenu(event, options) {
        AIC.selectFromDisplayManager(options.targetEvent, options.extra, designerBase.ROW_GROUP_MENU_LEVEL);
        actionModel.setSelected([options.extra]);
        AIC.showMenu(options.targetEvent, 'displayManagerRow');
      }
    }
  }
});
/*
     * Ajax Controller
     */


_.extend(AIC, {
  insertDimensionInAxisWithChild: function insertDimensionInAxisWithChild(params) {
    if (params) {
      if (params.dim) {
        params.dim = designerBase.encodeParam(params.dim);
      }

      if (params.child) {
        params.child = designerBase.encodeParam(params.child);
      }

      if (params.hierarchyName) {
        params.hierarchyName = designerBase.encodeParam(params.hierarchyName);
      }

      if (params.uri) {
        params.uri = designerBase.encodeParam(params.uri);
      }
    }

    AIC.flush();
    designerBase.sendRequest('ich_insertDimensionInAxisWithChild', params, AIC.standardOpCallback, {
      bPost: true
    });
  },
  removeMeasure: function removeMeasure(index) {
    designerBase.sendRequest('ich_removeMeasure', new Array('i=' + index), AIC.standardOpCallback, null);
  },
  moveDimension: function moveDimension(dimName, axisFrom, axisTo, from, to) {
    designerBase.sendRequest('ich_moveDimension', {
      dim: encodeURIComponent(dimName),
      axisFrom: axisFrom,
      axisTo: axisTo,
      f: from,
      t: to
    }, AIC.standardOpCallback, null);
  },
  hideRowLevel: function hideRowLevel(dimName, levelName) {
    designerBase.sendRequest('ich_hideRowLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(levelName)), AIC.standardOpCallback, null);
  },
  hideColumnLevel: function hideColumnLevel(dimName, levelName) {
    var callback = function callback(state) {
      AIC.standardOpCallback(state);
      var level = AIC.getLevelObject(levelName, dimName, 'column');

      if (level && level.propertyMap && level.propertyMap.lastFilteredLevel == 'true') {
        dialogs.systemConfirm.show(window.adhocDesigner.getMessage('ADH_CROSSTAB_LAST_FILTERED_LEVEL'), 5000);
      }
    };

    designerBase.sendRequest('ich_hideColumnLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(levelName)), callback, null);
  },
  expandAllLevels: function expandAllLevels() {
    if (AIC.debug) {
      console.log('AIC.expandAllLevels:  sending expandAll query, this may take some time');
    }

    AIC.cache = [];
    AIC.hasAllData = true;
    designerBase.sendRequest('ich_expandAllLevels', null, AIC.standardOpCallback, null);
  },
  switchToColumnGroup: function switchToColumnGroup(ind) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup(); // TODO: adapt/normalize data from tree and from custom generated event

    var index = _.isNumber(ind) ? ind : object.groupIndex;
    designerBase.sendRequest('ich_switchToColumnGroup', new Array('i=' + index), AIC.standardOpCallback, null);
  },
  switchToRowGroup: function switchToRowGroup(ind) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var index = _.isNumber(ind) ? ind : object.groupIndex;
    designerBase.sendRequest('ich_switchToRowGroup', new Array('i=' + index), AIC.standardOpCallback, null);
  },
  moveRowGroup: function moveRowGroup(from, to, customCallback) {
    var callback = function callback(state) {
      AIC.standardOpCallback(state);
      customCallback && customCallback();
    };

    designerBase.sendRequest('ich_moveRowGroup', new Array('f=' + from, 't=' + to), callback, null);
  },
  moveColumnGroup: function moveColumnGroup(from, to, customCallback) {
    var callback = function callback(state) {
      AIC.standardOpCallback(state);
      customCallback && customCallback();
    };

    designerBase.sendRequest('ich_moveColumnGroup', new Array('f=' + from, 't=' + to), callback, null);
  },
  moveMeasure: function moveMeasure(measure, to) {
    designerBase.sendRequest('ich_moveMeasureByName', ['measure=' + encodeText(measure), 'to=' + to], AIC.standardOpCallback, null);
  },
  updateChartState: function updateChartState(chartState) {
    // TODO replace substitution when server functionality will be extended
    $.extend(AIC.state.chartState, chartState);

    var callback = function callback(response) {
      if (response) {
        AIC.standardOpCallback(response);
      } else {
        throw 'No response received on save chart state request';
      }
    };

    designerBase.sendRequest('ich_updateChartState', ['chartState=' + encodeURIComponent(Object.toJSON(AIC.state.chartState))], callback, null);
  },
  setCategoryForRowGroup: function setCategoryForRowGroup(catName, index) {
    var callback = function callback(state) {
      AIC.standardOpCallback(state);
    };

    designerBase.sendRequest('ich_setRowGroupCategorizer', new Array('cat=' + encodeText(catName), 'i=' + index), callback, null);
  },
  setCategoryForColumnGroup: function setCategoryForColumnGroup(catName, index) {
    var callback = function callback(state) {
      AIC.standardOpCallback(state);
    };

    designerBase.sendRequest('ich_setColumnGroupCategorizer', new Array('cat=' + encodeText(catName), 'i=' + index), callback, null);
  },
  setSummaryFunction: function setSummaryFunction(thisFunction, index) {
    designerBase.sendRequest('ich_setSummaryFunction', new Array('f=' + encodeText(thisFunction), 'i=' + index), AIC.standardOpCallback, null);
  },
  setSummaryFunctionAndMask: function setSummaryFunctionAndMask(thisFunction, thisMask, index) {
    designerBase.sendRequest('cr_setSummaryFunctionAndDataMask', new Array('f=' + encodeText(thisFunction), 'm=' + encodeText(thisMask), 'i=' + index), AIC.standardOpCallback, null);
  },
  setSummaryTimeFunction: function setSummaryTimeFunction(thisFunction, index) {
    designerBase.sendRequest('ich_setSummaryTimeFunction', new Array('f=' + encodeText(thisFunction), 'i=' + index), AIC.standardOpCallback, null);
  },
  setHideEmptyRows: function setHideEmptyRows() {
    designerBase.sendRequest('ich_setProperty', new Array('name=hideEmptyRows', 'value=true'), AIC.standardOpCallback, null);
  },
  setUnhideEmptyRows: function setUnhideEmptyRows() {
    designerBase.sendRequest('ich_setProperty', new Array('name=hideEmptyRows', 'value=false'), AIC.standardOpCallback, null);
  },

  /**
       * Used to update the canvas view
       */
  updateViewCallback: function updateViewCallback(state) {
    AIC.standardOpCallback(state);
  }
});
/*
     * Actionmodel Tests
     */


_.extend(AIC, {
  fieldsAtLevel: function fieldsAtLevel() {
    var fieldsAtLevel = [];
    var node = window.selObjects.first();
    var dimensionIds = AIC.isOLAP() ? [node.param.extra.dimensionId] : window.adhocDesigner.getAllLeaves(node).map(function (n) {
      return n.param.extra.dimensionId;
    });
    var levelsAtColumns = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'column') || []);
    });
    var levelsAtRows = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'row') || []);
    });
    fieldsAtLevel.push(levelsAtColumns, levelsAtRows);
    return fieldsAtLevel;
  },
  canSaveReport: function canSaveReport() {
    return AIC.state.canSave;
  },
  hideEmptyRowsEquals: function hideEmptyRowsEquals(val) {
    return AIC.state.crosstabState.hideEmptyRows === val;
  },
  canAddFilter: function canAddFilter(object, errorMessages) {
    var isMeasure, isDuplicate;

    if (window.localContext.isOlapMode()) {
      isMeasure = isNotNullORUndefined(object.isMeasure) ? object.isMeasure : object.param.extra && object.param.extra.isMeasure;
      isDuplicate = window.localContext._isAddingFilterDuplicate(object);
    } //We do not support filters for measures in OLAP-mode.


    if (isMeasure) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageMeasureAdd);
      return false;
    }

    var levelName = object.param ? object.param.extra && object.param.extra.id : object.level,
        isAllLevel = levelName && levelName.indexOf(window.localContext.ALL_LEVEL_NAME) === 0; //We do not support filters for (All) level in 1'st iteration.

    if (isAllLevel) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageAllLevelAdd);
      return false;
    } // Cannot add group of fields as filter.


    if (object.isParent && object.isParent()) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageGroupAdd);
      return false;
    }

    if (object.param && window.localContext.fromSiblingHierarchy(object.param.extra.hierarchyName, object.param.extra.dimensionId)) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageAnotherHierarchy);
      return false;
    }

    if (window.adhocDesigner.isSpacerSelected(object)) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageSpacerAdd);
      return false;
    }

    if (window.adhocDesigner.isPercentOfParentCalcSelected(object)) {
      errorMessages && errorMessages.push(window.addFilterErrorMessagePercentOfParentCalcFieldAdd);
      return false;
    }

    if (window.adhocDesigner.isConstantSelected(object)) {
      errorMessages && errorMessages.push(window.addFilterErrorMessageConstantAdd);
      return false;
    }

    if (isDuplicate) {
      errorMessages && errorMessages.push(window.addFilterErrorMessage);
      return false;
    }

    return true;
  },
  canAddSliceFilter: function canAddSliceFilter() {
    var doesSelectionContainNotSliceableObject = window.selObjects.find(function (obj) {
      return !obj.isSliceable;
    });
    return window.selObjects.first() && !doesSelectionContainNotSliceableObject;
  },
  _isAddingFilterDuplicate: function _isAddingFilterDuplicate(filterCandidate) {
    var filterCandidateName;

    if (filterCandidate.param) {
      filterCandidateName = '[' + filterCandidate.param.extra.dimensionId + '].[' + filterCandidate.param.extra.id + ']';
    } else {
      filterCandidateName = '[' + filterCandidate.dimensionId + '].[' + filterCandidate.level + ']';
    }

    return window.adhocDesigner.filtersController.hasFilterForField(filterCandidateName);
  },
  isDateType: function isDateType() {
    return AIC.isDateTimeType('date');
  },
  isTimestampType: function isTimestampType() {
    return AIC.isDateTimeType('timestamp');
  },
  isTimeType: function isTimeType() {
    return AIC.isDateTimeType('time');
  },
  isDateTimeType: function isDateTimeType(dateTimeType) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();

    if (object) {
      var isGroup = AIC.isGroupSelected(object);
      var group = AdHocCrosstab.getSelectedGroup(object);

      if (group) {
        var canReBucket = group.canReBucket === true;
        var dateDataType = group.type === dateTimeType;
        return isGroup && canReBucket && dateDataType;
      }
    }

    return false;
  },
  isGroupSelected: function isGroupSelected(selectedObject) {
    return !selectedObject.isMeasure;
  },
  isCurrentDateType: function isCurrentDateType(thisType) {
    var group = AdHocCrosstab.getSelectedGroup(window.adhocDesigner.getSelectedColumnOrGroup());

    if (group) {
      return group.categorizerName == thisType;
    }

    return false;
  },
  canMoveUpOrLeft: function canMoveUpOrLeft() {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var index = AIC.getSelectedDimensionIndex(object);
    return index > 0;
  },
  canMoveDownOrRight: function canMoveDownOrRight() {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var index = AIC.getSelectedDimensionIndex(object);
    return index < AIC.getDimensions(object.axis).length - 1;
  },
  canAddSiblingLevels: function canAddSiblingLevels() {
    //TODO: if all sibling levels already added to crosstab or
    //or no siblings present - return false
    return true;
  },
  canSwitchToRow: function canSwitchToRow() {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    return !AIC.isOLAP() || AIC.getDimensions(object.axis).length > 1;
  },
  canAddDimensionAsRowGroup: function canAddDimensionAsRowGroup(nodes) {
    var node = window.selObjects.first();

    if (!node.hasChilds()) {
      node = node.parent;
    }

    var tree = dynamicTree.trees[node.getTreeId()],
        leaves = window.adhocDesigner.getAllLeaves(node, tree),
        leavesStringArray = window.adhocDesigner.getAllLeaves(node, tree).collect(function (node) {
      return node.param.extra.id;
    });

    if (AIC.isOLAP()) {
      var filterMeasures = _.pluck(AIC.getFilteredList(), 'name'),
          duplicateMeasures = nodes && _.intersection([nodes[0].name], filterMeasures).length;

      if (AIC.getDimensions('column').length === 0 || nodes && nodes[0].isMeasure && duplicateMeasures) {
        return false;
      }

      var dimensionId = node.param.id,
          isHierarchy = node.param.extra && node.param.extra.isHierarchy,
          hierarchyName = node.param.extra && node.param.extra.isHierarchy && node.param.extra.id,
          levelsAtColumns = AIC.getLevelsFromDimension(dimensionId, 'column'),
          levelsAtRows = AIC.getLevelsFromDimension(dimensionId, 'row'),
          fromSiblingHierarchy = window.localContext.fromSiblingHierarchy(hierarchyName, dimensionId);
      return levelsAtColumns.length === 0 && (isHierarchy && fromSiblingHierarchy || levelsAtRows.length < node.getChildCount());
    } else {
      if (leaves[0].param.extra.isMeasure) {
        var measuresInColumns = AIC.getFilteredMeasureList('column');
        return measuresInColumns.length === 0;
      } else {
        var allUsedFields = _.pluck(AIC.getFilteredList(), 'name'),
            fields = AIC.fieldsAtLevel();

        if (fields[0].length > 0) {
          return _.difference(leavesStringArray, allUsedFields).length > 0 || AdHocCrosstab.isDateField(nodes[0]);
        } else {
          return fields[0].length === 0 && (fields[1].length === 0 || window.localContext.isNonOlapMode() && nodes && (nodes[0].isMeasure || AdHocCrosstab.isDateField(nodes[0])) || nodes && !_.contains(fields[1], nodes[0].name));
        }
      }
    }
  },
  canAddDimensionAsColumnGroup: function canAddDimensionAsColumnGroup(nodes) {
    var node = window.selObjects.first(),
        tree = dynamicTree.trees[node.getTreeId()],
        leaves = window.adhocDesigner.getAllLeaves(node, tree);

    if (!node.hasChilds()) {
      node = node.parent;
    }

    if (AIC.isOLAP()) {
      var filterMeasures = _.pluck(AIC.getFilteredList(), 'name'),
          duplicateMeasures = nodes && _.intersection([nodes[0].name], filterMeasures).length;

      if (nodes && nodes[0].isMeasure && duplicateMeasures) {
        return false;
      }

      var dimensionId = node.param.id,
          isHierarchy = node.param.extra && node.param.extra.isHierarchy,
          hierarchyName = node.param.extra && node.param.extra.isHierarchy && node.param.extra.id,
          levelsAtColumns = AIC.getLevelsFromDimension(dimensionId, 'column'),
          levelsAtRows = AIC.getLevelsFromDimension(dimensionId, 'row'),
          fromSiblingHierarchy = window.localContext.fromSiblingHierarchy(hierarchyName, dimensionId);
      return levelsAtRows.length === 0 && (isHierarchy && fromSiblingHierarchy || levelsAtColumns.length < node.getChildCount());
    } else {
      if (leaves[0].param.extra.isMeasure) {
        var measuresInRows = AIC.getFilteredMeasureList('row');
        return measuresInRows.length === 0;
      } else {
        var fields = AIC.fieldsAtLevel();
        return fields[1].length === 0 && (fields[0].length === 0 || window.localContext.isNonOlapMode() && nodes && (nodes[0].isMeasure || AdHocCrosstab.isDateField(nodes[0])) || nodes && !_.contains(fields[0], nodes[0].name));
      }
    }
  },
  canAddLevelAsColumnGroup: function canAddLevelAsColumnGroup() {
    var node = window.selObjects.first();
    var dimensionIds = AIC.isOLAP() ? [node.param.extra.dimensionId] : window.adhocDesigner.getAllLeaves(node).map(function (n) {
      return n.param.extra.dimensionId;
    });
    var levelsAtColumns = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'column') || []);
    });
    var levelsAtRows = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'row') || []);
    });
    return levelsAtRows.length === 0 && (levelsAtColumns.length === 0 || !AIC.isOLAP() && node && node.param.extra && (node.param.extra.isMeasure || AIC.isDateField(node.param.extra)) || !levelsAtColumns.find(function (name) {
      return _.contains(_.map(designerBase.getSelectedObjects(), function (node) {
        return node.param.extra && node.param.extra.id;
      }), name);
    }));
  },
  canAddLevelAsRowGroup: function canAddLevelAsRowGroup() {
    if (AIC.getDimensions('column').length === 0 && AIC.isOLAP()) {
      return false;
    }

    var node = window.selObjects.first();

    if (!node) {
      return false;
    }

    var dimensionIds = AIC.isOLAP() ? [node.param.extra.dimensionId] : window.adhocDesigner.getAllLeaves(node).map(function (n) {
      return n.param.extra.dimensionId;
    });
    var levelsAtColumns = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'column') || []);
    });
    var levelsAtRows = dimensionIds.inject([], function (levels, d) {
      return levels.concat(AIC.getLevelsFromDimension(d, 'row') || []);
    });

    if (!node.param.extra) {
      return false;
    }

    return levelsAtColumns.length === 0 && (levelsAtRows.length === 0 || !AIC.isOLAP() && node && node.param.extra && (node.param.extra.isMeasure || AIC.isDateField(node.param.extra)) || !levelsAtRows.find(function (name) {
      return node.param.extra && node.param.extra.id === name;
    }));
  },
  isRowGroupSelected: function isRowGroupSelected(selectedObject) {
    return selectedObject.axis === 'row' && !selectedObject.isMeasure;
  },
  isColumnGroupSelected: function isColumnGroupSelected(selectedObject) {
    return selectedObject.axis === 'column' && !selectedObject.isMeasure;
  },
  showAddHierarchyConfirm: function showAddHierarchyConfirm(hierarchyName, dimensionId, onOk) {
    if (AIC.fromSiblingHierarchy(hierarchyName, dimensionId)) {
      window.adhocDesigner.addConfirmDialog.show({
        ok: function ok() {
          if (AIC.isFiltersApplied(dimensionId)) {
            dialogs.systemConfirm.show(window.adhocDesigner.getMessage('ADH_CROSSTAB_LAST_FILTERED_LEVEL'), 5000);
            return;
          }

          onOk();
        }
      });
      return true;
    }

    return false;
  },
  isFiltersApplied: function isFiltersApplied(dimensionId, axis) {
    var levelNames = _.pluck(AIC.getLevelObjectsFromDimension(dimensionId, axis), 'levelUniqueName');

    var filterNames = _.pluck(AIC.state.existingFilters, 'name');

    return !_.isEmpty(_.intersection(levelNames, filterNames));
  },
  isDateField: function isDateField(field) {
    return field.type === 'Timestamp' || field.type === 'Date' || field.type === 'Time';
  }
});
/*
     * Actionmodel Actions
     */


_.extend(AIC, {
  removeLevelFromColumn: function removeLevelFromColumn() {
    var meta = window.selObjects.first();
    $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:removeItem', {
      axis: 'column',
      index: meta.index,
      item: {
        level: meta.level,
        dimensionId: meta.dimensionId,
        isMeasure: meta.isMeasure
      }
    });
  },
  removeLevelFromRow: function removeLevelFromRow() {
    var meta = window.selObjects.first();
    $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:removeItem', {
      axis: 'row',
      index: meta.index,
      item: {
        level: meta.level,
        dimensionId: meta.dimensionId,
        isMeasure: meta.isMeasure
      }
    });
  },
  moveRowGroupLeft: function moveRowGroupLeft(customCallback) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var fromGroup = AIC.getSelectedDimensionIndex(object);
    var toGroup = fromGroup - 1;
    AIC.moveRowGroup(fromGroup, toGroup, customCallback);
  },
  moveRowGroupRight: function moveRowGroupRight(customCallback) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var fromGroup = AIC.getSelectedDimensionIndex(object);
    var toGroup = fromGroup + 1;
    AIC.moveRowGroup(fromGroup, toGroup, customCallback);
  },
  moveColumnGroupLeft: function moveColumnGroupLeft(customCallback) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var fromGroup = AIC.getSelectedDimensionIndex(object);
    var toGroup = fromGroup - 1;
    AIC.moveColumnGroup(fromGroup, toGroup, customCallback);
  },
  moveColumnGroupRight: function moveColumnGroupRight(customCallback) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var fromGroup = AIC.getSelectedDimensionIndex(object);
    var toGroup = fromGroup + 1;
    AIC.moveColumnGroup(fromGroup, toGroup, customCallback);
  },
  appendDimensionWithLevel: function appendDimensionWithLevel(level, pos, axis) {
    var meta = level ? level : AIC.getAvailableFieldsNodeBySelection();
    meta.axis = axis;

    if (AIC.showAddHierarchyConfirm(meta.hierarchyName, meta.dimensionId, function () {
      $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItem', meta);
    })) {
      return;
    }

    if (!level) {
      $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItem', meta);
    } else {
      window.localContext.lmHandlersMap.addItems(meta, pos, axis);
    }
  },
  appendDimensionToRowAxisWithLevel: function appendDimensionToRowAxisWithLevel(node, level, pos) {
    AIC.appendDimensionWithLevel(level, pos, 'row');
  },
  appendDimensionToColumnAxisWithLevel: function appendDimensionToColumnAxisWithLevel(node, level, pos) {
    AIC.appendDimensionWithLevel(level, pos, 'column');
  },
  appendMeasureToRow: function appendMeasureToRow(name) {
    var meta = name ? AIC.getAvailableFieldsNodesBySelection(name) : AIC.getAvailableFieldsNodesBySelection();
    $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItems', {
      axis: 'row',
      levels: meta,
      index: meta[0].index
    });
  },
  appendMeasureToColumn: function appendMeasureToColumn(name) {
    var meta = name ? AIC.getAvailableFieldsNodesBySelection(name) : AIC.getAvailableFieldsNodesBySelection();
    $('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItems', {
      axis: 'column',
      levels: meta,
      index: meta[0].index
    });
  },
  showMenu: function showMenu(evt, type) {
    var context,
        dynamicMenuUpdater = null;

    switch (type) {
      case 'displayManagerRow':
        context = 'displayManagerRow';
        dynamicMenuUpdater = AIC.generateAvailableSummaryCalculationsMenu;
        break;

      case 'displayManagerColumn':
        context = 'displayManagerColumn';
        dynamicMenuUpdater = AIC.generateAvailableSummaryCalculationsMenu;
        break;

      case 'groupMember':
        context = designerBase.MEMBER_GROUP_MENU_LEVEL;
        dynamicMenuUpdater = AIC.updateContextMenuWithSiblingLevels;
        break;

      case 'measuresDimensionRow':
        context = 'measuresDimensionInRows';
        break;

      case 'measuresDimensionColumn':
        context = 'measuresDimensionInColumns';
        break;

      case 'rowGroup':
        context = designerBase.ROW_GROUP_MENU_LEVEL;
        break;

      case 'columnGroup':
        context = designerBase.COLUMN_GROUP_MENU_LEVEL;
        break;

      case 'measureRow':
        context = 'measureRow';
        break;

      case 'measureColumn':
        context = 'measureColumn';
    }

    window.adhocDesigner.showDynamicMenu(evt, context, null, dynamicMenuUpdater);
  },
  generateAvailableSummaryCalculationsMenu: function generateAvailableSummaryCalculationsMenu(context, menuActionModel) {
    if (!actionModel.selObjects[0].isMeasure) {
      return menuActionModel;
    }

    var availableSummariesMenu = _.find(menuActionModel, function (item) {
      return item.clientTest === 'AdHocCrosstab.selectedMeasureShowsSummaryOptions';
    });

    if (availableSummariesMenu) {
      var levelModel = actionModel.selObjects[0],
          field = _.findWhere(AIC.state.measures, {
        name: levelModel.name
      });

      field && window.adhocDesigner.generateAvailableSummaryCalculationsMenu(field.fieldName, availableSummariesMenu, {
        action: AdhocIntelligentChart.selectFunction,
        // TODO: remove reference to AdHocCrosstab
        isSelectedTest: AdHocCrosstab.isSelectedSummaryFunction
      });
    }

    return menuActionModel;
  },
  setCatForColumnGroup: function setCatForColumnGroup(catName) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();

    if (object && AIC.isColumnGroupSelected(object)) {
      AIC.setCategoryForColumnGroup(catName, object.groupIndex);
    }
  },
  setCatForRowGroup: function setCatForRowGroup(catName) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();

    if (object && AIC.isRowGroupSelected(object)) {
      AIC.setCategoryForRowGroup(catName, object.groupIndex);
    }
  },
  selectFunction: function selectFunction(newFunction) {
    var object = AdHocCrosstab.getSelectedMeasure();

    if (object) {
      var index = window.selObjects.first().index;
      var type = window.adhocDesigner.getSuperType(object.type);
      var newType = AdHocCrosstab.getMeasureTypeByFunction(newFunction);

      if (type !== newType) {
        AIC.setSummaryFunctionAndMask(newFunction, window.defaultMasks[newType], index);
      } else {
        AIC.setSummaryFunction(newFunction, index);
      }
    }
  },
  selectTimeFunction: function selectTimeFunction(newFunction) {
    var object = AdHocCrosstab.getSelectedMeasure();

    if (object) {
      var index = window.selObjects.first().index;
      var type = window.adhocDesigner.getSuperType(object.type);
      var newType = AdHocCrosstab.getMeasureTypeByFunction(newFunction);
      AIC.setSummaryTimeFunction(newFunction, index);
    }
  }
});
/*
     * Helpers
     */


_.extend(AIC, {
  getDimensions: function getDimensions(axis) {
    var xtabState = AIC.state.crosstabState;
    return axis ? xtabState[axis + 'Groups'] : _.chain(xtabState).filter(function (val, key) {
      return key.search(/Groups$/) >= 0;
    }).flatten().value();
  },
  getLevelsFromDimension: function getLevelsFromDimension(dim, axis) {
    return _.pluck(this.getLevelObjectsFromDimension(dim, axis), 'name');
  },
  getLevelObjectsFromDimension: function getLevelObjectsFromDimension(dim, axis) {
    var axisModel = this.getDimensions(axis);
    dim = _.find(axisModel, function (d) {
      return d.name === dim;
    });
    return dim ? _.chain(dim.levels).filter(function (level) {
      // return only visible levels
      return level.visible;
    }).map(function (level) {
      // retrieve all members from levels
      return !_.isEmpty(level.members) ? level.members : level;
    }).flatten().filter(function (member) {
      // filter out spacers
      return !member.isSpacer;
    }).value() : [];
  },
  getLevelObject: function getLevelObject(levelName, dimName, axisName) {
    var axisModel = this.getDimensions(axisName);

    function findByName(array, name) {
      return _.find(array, function (item) {
        return item.name == name;
      });
    }

    var dim = findByName(axisModel, dimName);

    if (!dim) {
      return null;
    }

    return findByName(dim.levels, levelName);
  },
  getFilteredList: function getFilteredList(a, p) {
    var axis = a || null,
        props = p || {};

    if (arguments.length === 1 && _.isObject(a)) {
      props = a;
      axis = null;
    } // add mandatory values to property map


    props.visible = true;
    return _.chain(AIC.getDimensions(axis)).pluck('levels').flatten().map(function (level) {
      return !_.isEmpty(level.members) ? level.members : level;
    }).flatten().filter(function (level) {
      return _.all(props, function (prop, key) {
        return level[key] === undefined || level[key] === prop;
      });
    }).value();
  },
  getFilteredMeasureList: function getFilteredMeasureList(a, p) {
    var axis = a || null,
        props = p || {};

    if (arguments.length === 1 && _.isObject(a)) {
      props = a;
      axis = null;
    }

    return AIC.getFilteredList(axis, _.extend(props, {
      measure: true,
      measuresLevel: true
    }));
  },
  fromSiblingHierarchy: function fromSiblingHierarchy(hierarchy, dimensionId, axis) {
    if (!hierarchy) {
      return false;
    }

    var levelsInAxis = this.getLevelsFromDimension(dimensionId, axis);
    return levelsInAxis.length > 0 && levelsInAxis[0].indexOf('[' + hierarchy + ']') === -1;
  },
  getHierarchy: function getHierarchy(node) {
    var extra = node.param.extra; // Return hierarchy name if this is level

    if (!node.hasChilds()) {
      return extra.hierarchyName;
    } // Reset extra to Default (first in list) hierarchy, if current node is Dimension, holding multiple hierarchies


    if (node.getFirstChild().hasChilds()) {
      extra = node.getFirstChild().param.extra;
    }

    return extra && extra.isHierarchy ? extra.id : undefined;
  },
  getAvailableFieldsNodeBySelection: function getAvailableFieldsNodeBySelection(level, dimensionId, item) {
    var meta = {};

    if (!item) {
      item = window.selObjects.first();
    }

    if (window.selectionCategory.area == designerBase.AVAILABLE_FIELDS_AREA) {
      if (item.hasChilds()) {
        meta.isMeasure = item.treeId === 'measuresTree';
        meta.dimensionId = meta.isMeasure ? item.treeId : item.param.id;
        meta.uri = window.localContext.isNonOlapMode() ? item.param.uri : undefined;
        meta.level = null;
      } else {
        meta.isMeasure = !!item.param.extra.isMeasure;
        meta.level = item.param.extra.dimensionId && item.param.id;
        meta.dimensionId = item.param.extra.dimensionId || item.param.extra.id;
      }

      meta.hierarchyName = this.getHierarchy(item);
      meta.index = -1;
    } else if (window.selectionCategory.area == designerBase.ROW_GROUP_MENU_LEVEL || window.selectionCategory.area == designerBase.COLUMN_GROUP_MENU_LEVEL) {
      if (level || dimensionId) {
        var hierarchyMatch = /.*\[(.*)\]/.exec(level),
            hierarchyName = hierarchyMatch && hierarchyMatch[1];
        meta.isMeasure = !dimensionId;
        meta.level = level;
        meta.dimensionId = meta.isMeasure ? window.adhocDesigner.MEASURES : dimensionId;
        meta.index = -1;
        meta.hierarchyName = hierarchyName;
      } else if (item.axis) {
        //Display Manager object in selection
        meta = item;
      } else {
        //xtab object in selection
        //TODO get dim and lev from crosstab
        alert('Need a way to get dimension name for clicked level from crosstab');
        return;
      }
    }

    return meta;
  },
  getAvailableFieldsNodesBySelection: function getAvailableFieldsNodesBySelection(level, dimensionId) {
    var metas = [];

    for (var i = 0; i < window.selObjects.length; i++) {
      metas.push(AIC.getAvailableFieldsNodeBySelection(level, dimensionId, window.selObjects[i]));
      metas[i].extra = metas[i];
      metas[i].dimensionId = metas[i].dimensionId;
      metas[i].id = metas[i].level;
    }

    return metas;
  },
  updateContextMenuWithSiblingLevels: function updateContextMenuWithSiblingLevels(contextName, contextActionModel) {
    if (!window.adhocDesigner.ui.display_manager) {
      return contextActionModel;
    }

    var menuToUpdate = contextActionModel.find(function (item) {
      return item.clientTest === 'AdHocCrosstab.canAddSiblingLevels';
    });

    if (!menuToUpdate) {
      return contextActionModel;
    }

    var siblingLevels = null;
    var rootNode = null;
    var action = null;
    var firstSelected = window.selObjects[0];
    var hierarchyMatch = /.*\[(.*)\]/.exec(firstSelected.level),
        hierarchyName = hierarchyMatch && hierarchyMatch[1];

    if (!window.selObjects.first().isMeasure) {
      if (AIC.isOLAP()) {
        rootNode = window.adhocDesigner.dimensionsTree.getRootNode().childs.find(function (node) {
          return node.param.extra.id === window.selObjects.first().dimensionId;
        });

        if (rootNode.childs[0].param.extra.isHierarchy) {
          rootNode = _.find(rootNode.childs, function (node) {
            return node.param.extra.id === hierarchyName;
          });
        }

        action = window.selObjects.first().axis === 'row' ? 'AdHocCrosstab.appendDimensionToRowAxisWithLevel' : 'AdHocCrosstab.appendDimensionToColumnAxisWithLevel';
      } else {
        //In nonOLAP mode there is only one level for any dimension
        window.selObjects.first().index = 0;
        return contextActionModel;
      }
    } else {
      rootNode = window.adhocDesigner.measuresTree.getRootNode();
      action = window.selObjects.first().axis === 'row' ? 'AdHocCrosstab.appendMeasureToRow' : 'AdHocCrosstab.appendMeasureToColumn';
    }

    if (window.selObjects.first().allLevels === undefined) {
      var metadata = window.selObjects.first();
      metadata.allLevels = AdHocCrosstab.state.getLevelsFromDimension(window.selObjects.first().dimensionId, metadata.axis);
      metadata.index = metadata.allLevels.indexOf(metadata.level);
    }

    if (window.selObjects.first().allLevels) {
      if (AIC.isOLAP()) {
        siblingLevels = rootNode.childs.findAll(function (node) {
          return !window.selObjects.first().allLevels.include(node.param.extra.id);
        });
      } else {
        siblingLevels = window.adhocDesigner.getAllLeaves(rootNode, window.adhocDesigner.measuresTree).findAll(function (node) {
          return !window.selObjects.first().allLevels.include(node.param.extra.id);
        });
      }
    }

    if (!siblingLevels || siblingLevels.length === 0) {
      return contextActionModel;
    }

    menuToUpdate.text = window.adhocDesigner.getMessage(window.selObjects.first().isMeasure ? 'addMeasures' : 'addLevels');
    menuToUpdate.children = siblingLevels.collect(function (node) {
      return actionModel.createMenuElement('optionAction', {
        text: node.name,
        action: action,
        actionArgs: window.selObjects.first().isMeasure ? [node.param.extra.id] : [{
          id: node.param.extra.id,
          groupId: node.param.extra.dimensionId,
          isMeasure: false
        }]
      });
    });
    return contextActionModel;
  },
  getSelectedDimensionIndex: function getSelectedDimensionIndex(selectedObject) {
    var index;

    if (selectedObject) {
      var dimensionId = selectedObject.isMeasure ? window.adhocDesigner.MEASURES : selectedObject.dimensionId;
      index = -1;

      _.find(AIC.getDimensions(selectedObject.axis), function (elem, ind) {
        if (elem.name === dimensionId) {
          index = ind;
          return true;
        }
      });
    }

    return index;
  }
});
/*
     * Select
     */


_.extend(AIC, {
  selectFromDisplayManager: function selectFromDisplayManager(event, node, area) {
    designerBase.unSelectAll();
    var isMultiSelect = window.adhocDesigner.isMultiSelect(event, area);
    window.selectionCategory.area = area;
    var isSelected = window.adhocDesigner.isAlreadySelected(node);
    window.adhocDesigner.addSelectedObject(event, node, isMultiSelect, isSelected);
    Event.stop(event);
  },
  deselectAllSelectedOverlays: function deselectAllSelectedOverlays() {}
}); ///////////////////////////////////////////////////////////////
// Ajax callbacks
///////////////////////////////////////////////////////////////


_.extend(AIC, {
  standardOpCallback: function standardOpCallback(state) {
    if (state) {
      window.adhocDesigner.updateStateAndRender(state);
    } else {
      window.console && console.log('Internal server error occurred');
    }
  }
});
/*
     * Observers.
     */


$(window).on('resizeEnd', function () {
  if (window.localContext.getMode() === designerBase.ICHART || window.localContext.getMode() === designerBase.OLAP_ICHART) {
    window.localContext.resize();
  }
});
$('#designer').bind({
  'rendering:done': function renderingDone() {
    if (window.localContext.getMode() === designerBase.ICHART || window.localContext.getMode() === designerBase.OLAP_ICHART) {
      AIC.fixFirstRendering();
    }
  }
}); //TODO: remove while moving to full AMD env

window.AdhocIntelligentChart = AdhocIntelligentChart;
window.AIC = AdhocIntelligentChart;
module.exports = AdhocIntelligentChart;

});