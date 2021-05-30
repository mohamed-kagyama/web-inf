define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $$ = _prototype.$$;

var _ = require('underscore');

var AdHocChart = require('./chart.helpers');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;

var designerBase = require('../base/designer.base');

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/* global defaultMasks */

/**
 * Used to show chart menu
 * @param evt
 * @param menuLevel
 */
AdHocChart.showChartMenu = function (evt, menuLevel) {
  if (isIPad()) {
    window.adhocDesigner.showDynamicMenu(evt, menuLevel, {
      menuLeft: evt.changedTouches[0].clientX,
      menuTop: evt.changedTouches[0].clientY - 100
    });
  } else {
    window.adhocDesigner.showDynamicMenu(evt, menuLevel, {
      menuLeft: evt.clientX,
      menuTop: evt.clientY - 100
    });
  }
};
/**
 * Used to get the current measure
 */


AdHocChart.getCurrentMeasure = function () {
  if (window.localContext.state.numberOfMeasures == 1 || AdHocChart.isPie()) {
    return 0; //the only one!
  } //since we can select only one measure at a time, get the first object in selObject


  var selectedObject = designerBase.getSelectedObject();
  var index = selectedObject.index;

  if (!isNaN(index)) {
    return parseInt(index);
  } //negative represents nothing to act on


  return -1;
};
/**
 * Used to add fields as a measure
 */


AdHocChart.addFieldAsMeasure = function (includeSubSets, pos) {
  var fieldList = "";

  if (!_.isNumber(pos)) {
    pos = AdHocChart.hoverLegendIndex;
  }

  if (window.selObjects.length > 0) {
    var selectedNodes = window.adhocDesigner.getSelectedTreeNodes();
    fieldList = window.adhocDesigner.collectFields(selectedNodes, includeSubSets);

    if (AdHocChart.supportsSeries()) {
      if (_.isNumber(pos) && pos > -1) {
        AdHocChart.addAsMeasure(fieldList, pos);
      } else {
        AdHocChart.addAsLastMeasure(fieldList);
      }
    } else {
      AdHocChart.replaceMeasure(fieldList); // should be just one name
    }
  }
};

AdHocChart.addFieldAsGroup = function () {
  var selectedObject = designerBase.getSelectedObject();

  if (selectedObject) {
    var fieldName = window.adhocDesigner.getNameForSelected(selectedObject);
    AdHocChart.setGroup(fieldName);
  }
};

AdHocChart.functionSelected = function (thisFunction, measureIndex) {
  if (!measureIndex) {
    measureIndex = AdHocChart.getCurrentMeasure();
  }

  var newMeasureType = AdHocChart.getUpdatedMeasureType(thisFunction);

  if (newMeasureType) {
    AdHocChart.setSummaryFunctionAndMask(thisFunction, defaultMasks[newMeasureType], measureIndex);
  } else {
    AdHocChart.setSummaryFunction(thisFunction, measureIndex);
  }
};

AdHocChart.getUpdatedMeasureType = function (thisFunction) {
  var newType = window.localContext.getMeasureType(thisFunction);
  if (newType != window.localContext.state.dataTypes[AdHocChart.getCurrentMeasure()]) return newType;
  return null; //no change
};

AdHocChart.getMeasureType = function (thisFunction) {
  if (thisFunction == "Count" || thisFunction == "DistinctCount") return "int"; //otherwise use field type

  return window.localContext.state.dataTypes[AdHocChart.getCurrentMeasure()];
};

AdHocChart.maskSelected = function (thisMask, measureIndex) {
  if (!measureIndex) {
    measureIndex = AdHocChart.getCurrentMeasure();
  }

  AdHocChart.setMask(thisMask, measureIndex);
};

AdHocChart.deselectAllSelectedOverlays = function () {
  var legendOverlays = $$(window.adhocDesigner.LEGEND_OVERLAY_PATTERN);
  legendOverlays.each(function (legend) {
    if ($(legend)) {
      buttonManager.unSelect($(legend));

      if (isIPad()) {
        $(legend).removeClassName(layoutModule.HOVERED_CLASS);
        $(legend).removeClassName(layoutModule.PRESSED_CLASS);
      }
    }
  });
};

AdHocChart.getNewChartPositionAndMove = function () {
  var chartContainer = $("chartBorder");
  var left = null;
  var top = null;
  var offset = null;
  var scrollOffset = null;
  var adjust = false;

  if (chartContainer) {
    offset = chartContainer.positionedOffset();
    scrollOffset = chartContainer.cumulativeScrollOffset();

    if (AdHocChart.isContentPageSize()) {
      left = offset[0] + scrollOffset[0];
      top = offset[1] + scrollOffset[1]; //check to make sure we are not out of bounds

      if (left < 0) {
        left = 0;
      }

      if (top < AdHocChart.getTitleBottom()) {
        top = AdHocChart.getTitleBottom();
      }
    } else {
      //get right and bottom
      var right = offset[0] + AdHocChart.getChartWidth();
      var bottom = offset[1] + AdHocChart.getChartHeight();

      if (right > window.localContext.state.availableChartWidth) {
        left = window.localContext.state.availableChartWidth - AdHocChart.getChartWidth();
        left += scrollOffset[0];
        adjust = true;
      } else {
        left = offset[0] + scrollOffset[0];
      }

      if (bottom > window.localContext.state.availableChartHeight) {
        top = window.localContext.state.availableChartHeight - AdHocChart.getChartHeight();
        top += scrollOffset[1];
        adjust = true;
      } else {
        if (offset[1] < 0) {
          top = AdHocChart.getTitleBottom();
        } else {
          top = offset[1] + scrollOffset[1];
        }
      } //check to make sure we are not out of bounds


      if (left < 0) {
        left = 0;
      }

      if (top < AdHocChart.getTitleBottom()) {
        top = AdHocChart.getTitleBottom();
      }

      if (adjust) {
        //use animate to move
        moveTo(window.chartContainer, left, top, null);
      }
    }

    AdHocChart.moveChart(left, top);
  }
};

AdHocChart.computeDimensions = function (w, h) {
  var chartWidth = null;
  var chartHeight = null;
  var chartContainer = $("chartBorder");
  var dimensions = null;

  if (chartContainer) {
    chartWidth = isNaN(w) ? parseInt(chartContainer.getStyle("width")) : w;
    chartHeight = isNaN(h) ? parseInt(chartContainer.getStyle("height")) : h;

    if (!AdHocChart.isContentPageSize()) {
      if (chartWidth > AdHocChart.state.availableChartWidth - AdHocChart.state.chartX) {
        chartWidth = AdHocChart.state.availableChartWidth - AdHocChart.state.chartX;
      }

      if (chartHeight > AdHocChart.state.availableChartHeight - AdHocChart.state.chartY) {
        chartHeight = AdHocChart.state.availableChartHeight - AdHocChart.state.chartY;
      }
    }

    chartWidth = chartWidth < AdHocChart.MIN_CHART_WIDTH ? AdHocChart.MIN_CHART_WIDTH : chartWidth;
    chartHeight = chartHeight < AdHocChart.MIN_CHART_HEIGHT ? AdHocChart.MIN_CHART_HEIGHT : chartHeight;
    dimensions = [chartWidth, chartHeight];
  }

  return dimensions;
};

module.exports = AdHocChart;

});