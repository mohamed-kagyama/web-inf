define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var AdHocTable = require("./table");

var designerBase = require('../base/designer.base');

var jQuery = require("jquery");

require("./table.ajax");

require("./table.actions");

require("./table.helpers");

require("./table.observers");

require("./table.dnd");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
AdHocTable.initOverlays = function () {
  AdHocTable.columnLazyInitState = {};
  designerBase.clearOverlaySet(AdHocTable.columnResizers);
  designerBase.clearOverlaySet(AdHocTable.columnOverlays);
  designerBase.clearOverlaySet(AdHocTable.summaryOverlays);

  var hoverFunction = function hoverFunction(event) {
    // find the index of the TD element in the table
    var index = jQuery(this).index();
    if (AdHocTable.columnLazyInitState[index] === true) return;
    AdHocTable.columnLazyInitState[index] = true; // set the flag to avoid doing this next time

    AdHocTable.initOverlayById(index);
  };

  jQuery(window.adhocDesigner.overlayParent).on("mouseover", "td", hoverFunction);
  jQuery(window.adhocDesigner.overlayParent).on("mouseover", "th", hoverFunction);
};

AdHocTable.initOverlayById = function (overlayId) {
  AdHocTable.initColumnOverlay(overlayId);
  AdHocTable.initColumnResizer(overlayId);
  AdHocTable.initSummaryOverlay(overlayId);
};

AdHocTable.initRowDependentDimensions = function () {
  AdHocTable.lastRow = AdHocTable.theRows.length - 1;

  if (AdHocTable.theRows[AdHocTable.lastRow].id == "NoDataRow") {
    AdHocTable.lastRow = AdHocTable.lastRow - 1;
  }

  AdHocTable.columnHeaderRow = $("columnHeaderRow");
};

AdHocTable.initNewRows = function () {
  AdHocTable.state.endOfFile = $("endOfFileRow") || AdHocTable.existingRowCount == AdHocTable.theRows.length;
  AdHocTable.theRows = $('canvasTable').rows;
  window.status = "total rows = " + AdHocTable.theRows.length;

  if (this.shouldFetchMoreRows()) {
    setTimeout(function () {
      window.localContext.fetchMoreRows();
    }, 100);
    return;
  }

  AdHocTable.initRowDependentDimensions();
  AdHocTable.initOverlays();
  AdHocTable.existingRowCount = AdHocTable.theRows.length;
  AdHocTable.fetchingRows = false;
};

AdHocTable.initColumnResizer = function (columnIndex) {
  var miniHack = 1;
  var columnHeaders = AdHocTable.columnHeaderRow.cells; // some checks to avoid errors

  if (columnHeaders.length <= columnIndex) return;
  if (jQuery("#columnSizer_" + columnIndex).length > 0) return; // means this overlay was created already

  var tableTop = this.getTableTop();
  var tableHeight = this.getTableHeight();
  var columnHeader = columnHeaders[columnIndex];
  var tempLeft = $(columnHeader).cumulativeOffset()[0] - $("mainTableContainer").cumulativeOffset()[0] - miniHack;
  var columnLeft = tempLeft + columnHeader.offsetWidth + "px";
  var columnOverlaySizer = designerBase.createDomObject("DIV", "columnSizer");
  columnOverlaySizer.writeAttribute("id", "columnSizer_" + columnIndex);
  columnOverlaySizer.setStyle({
    'left': columnLeft,
    'top': tableTop,
    'height': tableHeight
  });
  AdHocTable.columnResizers[columnIndex] = columnOverlaySizer;
  window.adhocDesigner.overlayParent.appendChild(columnOverlaySizer);
};

AdHocTable.initColumnOverlay = function (columnIndex) {
  var columnHeaders = AdHocTable.columnHeaderRow.cells; // some checks to avoid errors

  if (columnHeaders.length <= columnIndex) return;
  if (jQuery("#columnOverlay_" + columnIndex).length > 0) return; // means this overlay was created already

  var tableTop = this.getTableTop();
  var tableHeight = this.getTableHeight();
  var columnHeader = columnHeaders[columnIndex];

  if (!$(columnHeader).hasClassName('label')) {
    return;
  }

  var columnLeft = $(columnHeader).cumulativeOffset()[0] - $("mainTableContainer").cumulativeOffset()[0] + "px";
  var columnWidth = columnHeader.offsetWidth + 2 + "px";
  var columnOverlay = designerBase.createDomObject("DIV", "overlay col");
  columnOverlay.writeAttribute("id", "columnOverlay_" + columnIndex);
  columnOverlay.setStyle({
    'left': columnLeft,
    'width': columnWidth,
    'top': tableTop,
    'height': tableHeight
  });
  AdHocTable.columnOverlays[columnIndex] = columnOverlay;
  window.adhocDesigner.overlayParent.appendChild(columnOverlay);
};

AdHocTable.initSummaryOverlay = function (columnIndex) {
  if ($("grandSummaryRow")) {
    var summaryCells = $("grandSummaryRow").cells; // some checks to avoid errors

    if (summaryCells.length <= columnIndex) return;
    var summaryCell = $(summaryCells[columnIndex]);
    var summaryCellIndex = summaryCell.cellIndex;
    if (jQuery("#grandSummaryOverlay_" + summaryCellIndex).length > 0) return; // means this overlay was created already

    var buttonTop = summaryCell.offsetTop + $("canvasTable").offsetTop;
    var buttonLeft = summaryCell.cumulativeOffset()[0] - $("mainTableContainer").cumulativeOffset()[0];
    var buttonWidth = summaryCell.offsetWidth - 2;
    var buttonHeight = summaryCell.offsetHeight;
    var summaryOverlay = designerBase.createDomObject("DIV", "overlay summary button");
    summaryOverlay.writeAttribute("id", "grandSummaryOverlay_" + summaryCellIndex);
    summaryOverlay.writeAttribute("data-summaryIndex", summaryCellIndex);
    summaryOverlay.setStyle({
      'left': buttonLeft + "px",
      'width': buttonWidth + "px",
      'top': buttonTop + "px",
      'height': buttonHeight + "px"
    });
    AdHocTable.summaryOverlays[columnIndex] = summaryOverlay;
    window.adhocDesigner.overlayParent.appendChild(summaryOverlay);
  }
};

module.exports = AdHocTable;

});