define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var AdHocChart = require('./chart.ajax');

var designerBase = require('../base/designer.base');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/**
 * Helper to determine if we can save report
 */
AdHocChart.canSaveReport = function () {
  return window.localContext.state.canSave;
};

AdHocChart.canSetMask = function () {
  return window.localContext.state.dataTypes[AdHocChart.getCurrentMeasure()] != 'NaN';
};
/**
 * Event listener for chart sizer
 */


AdHocChart.draggerListener = function (evt) {
  evt.preventDefault();
  window.localContext.currentlyDragging = true;
  var moved = {
    x: evt.pointerX() - window.localContext.containerMovePosition.x,
    y: evt.pointerY() - window.localContext.containerMovePosition.y
  };
  window.localContext.containerMovePosition = {
    x: evt.pointerX(),
    y: evt.pointerY()
  };
  var objectWidth = parseInt($("chartBorder").getStyle("width"));
  var objectHeight = parseInt($("chartBorder").getStyle("height"));
  var width = Math.abs(objectWidth + moved.x);
  var height = Math.abs(objectHeight + moved.y);
  $("chartBorder").setStyle({
    width: width + "px",
    height: height + "px"
  });
};

AdHocChart.canMoveMeasureUp = function () {
  var v = false;
  if (window.selObjects[0] && window.selObjects[0].index < window.localContext.state.measureNames.length - 1) v = true;
  return v;
};

AdHocChart.canMoveMeasureDown = function () {
  var v = false;
  if (window.selObjects[0] && window.selObjects[0].index && window.selObjects[0].index > 0) v = true;
  return v;
};
/*
 * Helpers to determine chart type
 */


AdHocChart.supportsSeries = function () {
  return window.localContext.state.type != AdHocChart.PIE_CHART;
};

AdHocChart.isPie = function () {
  return window.localContext.state.type == AdHocChart.PIE_CHART;
};

AdHocChart.isBar = function () {
  return window.localContext.state.type == AdHocChart.BAR_CHART;
};

AdHocChart.isArea = function () {
  return window.localContext.state.type == AdHocChart.AREA_CHART;
};

AdHocChart.isLine = function () {
  return window.localContext.state.type == AdHocChart.LINE_CHART;
};

AdHocChart.isType = function (aType) {
  return window.localContext.state.type == aType;
};

AdHocChart.isMeasureNumeric = function (index) {
  var thisIndex = arguments.length === 0 ? AdHocChart.getCurrentMeasure() : index;
  return window.localContext.state.isNumeric[thisIndex];
};

AdHocChart.isSelectedMeasureNumeric = function () {
  return window.isMeasureNumeric();
};

AdHocChart.isDataType = function (thisType, index) {
  var thisIndex = arguments.length < 2 ? AdHocChart.getCurrentMeasure() : index;
  return window.localContext.state.dataTypes[thisIndex] == thisType;
};

AdHocChart.isMask = function (thisMask, index) {
  var thisIndex = arguments.length < 2 ? AdHocChart.getCurrentMeasure() : index;
  return window.localContext.state.masks[thisIndex] == thisMask;
};

AdHocChart.isFunctionSelected = function (functionName, measureIndex) {
  measureIndex = measureIndex ? measureIndex : AdHocChart.getCurrentMeasure();
  return window.localContext.state.summaryFunctions[measureIndex] == functionName;
};

AdHocChart.isContentPageSize = function () {
  return window.localContext.state.paperSize == AdHocChart.CONTENT_PAGE_SIZE;
};

AdHocChart.isInLegendArea = function (x, y) {
  var extraLegendPadding = 20; //get charts offset

  var chartOffset = $("chartBorder").cumulativeOffset();
  var chartScrollOffset = $("chartBorder").cumulativeScrollOffset();
  var combinedOffset = {
    left: chartOffset[0] + chartScrollOffset[0],
    top: chartOffset[1] + chartScrollOffset[1]
  };
  var legendOffset = {
    left: combinedOffset.left + window.localContext.state.legendLeft,
    top: combinedOffset.top + window.localContext.state.legendTop
  };
  return x < legendOffset.left + window.localContext.state.legendWidth + extraLegendPadding && x >= legendOffset.left - extraLegendPadding && y < legendOffset.top + window.localContext.state.legendHeight + extraLegendPadding && y >= legendOffset.top - extraLegendPadding;
};

AdHocChart.getChartWidth = function () {
  return $("chartBorder").getWidth();
};

AdHocChart.getChartHeight = function () {
  return $("chartBorder").getHeight();
};

AdHocChart.getHasMargins = function () {
  return window.localContext.state.hasMargins;
};

AdHocChart.getTitleHeight = function () {
  var titleHeight = 0;
  var title = $("titleCaption");

  if (title) {
    return title.getHeight();
  }

  return titleHeight;
};

AdHocChart.getTitleBottom = function () {
  var height = window.getTitleHeight();

  if (height === 0) {
    return height;
  } else {
    var offset = $("titleCaption").positionedOffset();
    return height + offset[1];
  }
};
/**
 * Used to determine if we can add field as a measure
 */


AdHocChart.canAddAsMeasure = function () {
  var isMultiSelect = window.selObjects.length > 1;
  return !window.localContext.state.hasMeasures && !isMultiSelect || window.localContext.state.seriesEnabled && AdHocChart.supportsSeries();
};

AdHocChart.selectedMeasureShowsSummaryOptions = function () {
  return !!window.localContext.state.measureNames[AdHocChart.getCurrentMeasure()];
};

AdHocChart.canReplaceMeasure = function () {
  if (window.selObjects.length == 1) {
    var selectedObject = designerBase.getSelectedObject();
    var isParentNode;

    if (selectedObject) {
      isParentNode = selectedObject.isParent();
    } else {
      return false;
    }

    return window.localContext.state.hasMeasures && (!window.localContext.state.seriesEnabled || !AdHocChart.supportsSeries()) && !isParentNode;
  }

  return false;
};

AdHocChart.canAddAsGroup = function (allowReplace) {
  if (window.selObjects[0]) {
    if (window.selObjects[0].parent.treeId == 'measuresTree') return false;
  }

  if (window.selObjects.length == 1) {
    var selectedObject = designerBase.getSelectedObject();
    var isParentNode;

    if (selectedObject) {
      isParentNode = selectedObject.isParent();
    } else {
      return false;
    }

    return (allowReplace || !window.localContext.state.hasGroup) && !isParentNode && !window.adhocDesigner.isPercentOfParentCalcSelected(selectedObject);
  }

  return false;
};

AdHocChart.canReplaceGroup = function () {
  if (window.selObjects[0]) {
    if (window.selObjects[0].parent.treeId == 'measuresTree') return false;
  }

  if (window.selObjects.length == 1) {
    var selectedObject = designerBase.getSelectedObject();
    var isParentNode;

    if (selectedObject) {
      isParentNode = selectedObject.isParent();
    } else {
      return false;
    }

    return window.localContext.state.hasGroup && !isParentNode && !window.adhocDesigner.isPercentOfParentCalcSelected(selectedObject);
  }

  return false;
};

module.exports = AdHocChart;

});