define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var AdHocChart = require('./chart.init');

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/* global localContext */
_.extend(AdHocChart, {
  addAsMeasure: function addAsMeasure(fieldNames, index) {
    designerBase.sendRequest('ch_insertMeasure', {
      fs: fieldNames,
      i: index
    });
  },
  addAsLastMeasure: function addAsLastMeasure(fieldNames) {
    designerBase.sendRequest('ch_insertMeasureLast', {
      fs: fieldNames
    });
  },
  replaceMeasure: function replaceMeasure(fieldName) {
    designerBase.sendRequest('ch_replaceMeasures', {
      f: fieldName
    });
  },
  moveMeasure: function moveMeasure(from, to) {
    designerBase.sendRequest('ch_moveMeasure', ['f=' + from, 't=' + to]);
  },
  moveMeasureUp: function moveMeasureUp() {
    var from = parseInt(window.selObjects[0].index);
    designerBase.sendRequest('ch_moveMeasure', ['f=' + from, 't=' + (from + 1)]);
  },
  moveMeasureDown: function moveMeasureDown() {
    var from = parseInt(window.selObjects[0].index);
    designerBase.sendRequest('ch_moveMeasure', ['f=' + from, 't=' + (from - 1)]);
  },
  switchToMeasure: function switchToMeasure(fieldName, from, to) {
    designerBase.sendRequest("ch_switchToMeasure", {
      "fs": fieldName,
      to: to
    });
  },
  setGroup: function setGroup(fieldName) {
    designerBase.sendRequest('ch_setGroup', ['g=' + encodeText(fieldName)]);
  },
  removeMeasure: function removeMeasure(index) {
    if (!index && index !== 0) index = AdHocChart.getCurrentMeasure();
    designerBase.sendRequest('ch_removeMeasure', ["i=" + index]);
  },
  removeGroup: function removeGroup() {
    designerBase.sendRequest('ch_removeGroup', []);
  },
  switchToGroup: function switchToGroup(fieldName, from) {
    designerBase.sendRequest("ch_switchToGroup", ["fs=" + encodeText(fieldName), "from=" + from]);
  },
  changeChartType: function changeChartType(type) {
    designerBase.sendRequest('ch_changeType', ['t=' + type]);
  },
  toggle3D: function toggle3D() {
    designerBase.sendRequest('ch_toggle3D', []);
  },
  toggleStack: function toggleStack() {
    designerBase.sendRequest('ch_toggleStack', []);
  },
  toggleOrientation: function toggleOrientation() {
    designerBase.sendRequest('ch_toggleChartOrientation', []);
  },
  togglePoints: function togglePoints() {
    designerBase.sendRequest('ch_togglePoints', []);
  },
  toggleLines: function toggleLines() {
    designerBase.sendRequest('ch_toggleLines', []);
  },
  toggleGradient: function toggleGradient() {
    designerBase.sendRequest('ch_toggleGradient', []);
  },
  toggleBackground: function toggleBackground() {
    designerBase.sendRequest('ch_toggleBackground', []);
  },
  toggleLegend: function toggleLegend() {
    designerBase.sendRequest('ch_toggleLegend', []);
  },
  toggleXAxisLabel: function toggleXAxisLabel() {
    designerBase.sendRequest('ch_toggleXAxisLabel', []);
  },
  toggleYAxisLabel: function toggleYAxisLabel() {
    designerBase.sendRequest('ch_toggleYAxisLabel', []);
  },
  updateLegendLabel: function updateLegendLabel(title, index) {
    if (title.blank()) title = " ";
    designerBase.sendRequest('ch_setLegendLabel', ['l=' + encodeText(title), 'i=' + index]);
  },
  setSummaryFunction: function setSummaryFunction(thisFunction, index) {
    designerBase.sendRequest('ch_setSummaryFunction', ['f=' + thisFunction, 'i=' + index]);
  },
  setSummaryFunctionAndMask: function setSummaryFunctionAndMask(thisFunction, thisMask, index) {
    designerBase.sendRequest('ch_setSummaryFunctionAndMeasureMask', ['f=' + thisFunction, 'm=' + encodeText(thisMask), 'i=' + index]);
  },
  setMask: function setMask(thisMask, index) {
    designerBase.sendRequest('ch_setMeasureMask', ['m=' + encodeText(thisMask), 'i=' + index]);
  },
  moveChart: function moveChart(x, y) {
    designerBase.sendRequest('ch_moveChart', ['x=' + x, 'y=' + y]);
  },
  resizeChart: function resizeChart(w, h) {
    var dimensions = AdHocChart.computeDimensions(w, h);
    dimensions && designerBase.sendRequest('ch_resizeChart', ['w=' + dimensions[0], 'h=' + dimensions[1]]);
  }
});
/**
 * Used to update the canvas view
 */


AdHocChart.updateViewCallback = function (state) {
  window.adhocDesigner.updateStateAndRender(state);
};
/*
 * Standard callback
 */


AdHocChart.standardOpCallback = function (state) {
  localContext.standardChartOpCallback(state);
};
/*
 * Standard chart callback
 */


AdHocChart.standardChartOpCallback = function (state) {
  window.adhocDesigner.updateStateAndRender(state);
};

module.exports = AdHocChart;

});