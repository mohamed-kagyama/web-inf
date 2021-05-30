define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var designerBase = require('../base/designer.base');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
var AdHocChart = {
  CHART_ID: "chart",
  CHART_IMAGE_ID: "chart-image",
  BAR_CHART: "1_bar",
  PIE_CHART: "2_pie",
  LINE_CHART: "3_line",
  AREA_CHART: "4_area",
  SCATTER_CHART: "5_scatter",
  TIME_SERIES_CHART: "6_timeSeries",
  CHART_CANVAS_PATTERN: "table#canvasTable tbody td#chart",
  DRAGGABLE_PAPER_SIZE: "content",
  CONTENT_PAGE_SIZE: "content",
  CHART_DRAGGER_PATTERN: "div#dragger.sizer",
  MAX_DRAGGABLE_LEGEND_DELTA: 25,
  MIN_CHART_WIDTH: 50,
  MIN_CHART_HEIGHT: 50,
  ZOOM_FACTOR: 15,
  getMode: function getMode() {
    return designerBase.CHART;
  },
  reset: function reset() {
    /* Put here mode specific parameters reset */
  },
  render: function render() {
    window.adhocDesigner.ui.canvas.html(this.chartTemplate(this.state));
    window.adhocDesigner.setNothingToDisplayVisibility(false);
    return true;
  },
  initAll: function initAll() {
    this.currentlyDragging = false;
    this.currentlyDraggingLegend = false;
    this.dragginInLegendArea = false;
    this.containerMovePosition = {
      x: 0,
      y: 0
    };
    this.draggableLegend = null;
    this.currentLegendIndex = null;
    this.documentEventSet = null;
    this.hoverLegendIndex = null;
    this.groupTarget = null;
    this.legendOverlays = [];
    this.draggableChart = null;
    window.adhocDesigner.overlayParent = $("chartBorder");
    window.adhocDesigner.enableXtabPivot(false);

    if ($("chartBorder")) {
      designerBase.clearOverlaySet(AdHocChart.legendOverlays);

      if (window.localContext.state.displayLegend && window.localContext.state.legendItems) {
        window.localContext.state.legendItems.each(function (legend, index) {
          var legendOverlay = designerBase.createDomObject("DIV", "overlay legend button");
          legendOverlay.setStyle({
            'left': legend.left + 'px',
            'top': legend.top + 'px',
            'width': legend.width + "px",
            'height': legend.height + "px"
          });
          var legendName = window.localContext.state.measureNames[index];
          legendOverlay.writeAttribute("id", "legendOverlay_" + index);
          legendOverlay.writeAttribute("data-legendName", legendName);
          legendOverlay.writeAttribute("data-defaultName", legend.defaultName);
          legendOverlay.writeAttribute("data-userName", legend.userName);
          legendOverlay.writeAttribute("data-index", index);
          AdHocChart.legendOverlays.push(legendOverlay);
          window.adhocDesigner.overlayParent.appendChild(legendOverlay);
        }.bind(this));
      }
    }

    document.getElementById('dragger').style.height = 50 + 'px';
    document.getElementById('dragger').style.width = 50 + 'px';
  }
};
module.exports = AdHocChart;

});