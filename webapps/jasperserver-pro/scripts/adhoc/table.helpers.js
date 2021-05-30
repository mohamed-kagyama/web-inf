define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var jQuery = require('jquery');

var designerBase = require('../base/designer.base');

var AdHocTable = require("./table");

var _ = require("underscore");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;
var isAlmostInView = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isAlmostInView;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/*
 * Tests for add
 */
AdHocTable.canAddFieldAsColumn = function (fieldName) {
  // according to the bug #29466 duplicated fields are allowed
  return true;
};

AdHocTable.isSpacer = function (fieldName) {
  return fieldName == designerBase.SPACER_NAME;
};

AdHocTable.canAddAsColumn = function () {
  return _.all(window.selObjects, function (node) {
    if (!node.param) {
      return false;
    }

    return AdHocTable.canAddFieldAsColumn(node.param.id);
  });
};
/*
 * Tests for move
 */


AdHocTable.canMoveColumnsLeft = function () {
  return AdHocTable.getLeftMostPositionFromSelectedColumns() > 0;
};

AdHocTable.canMoveColumnsRight = function () {
  return AdHocTable.getRightMostPositionFromSelectedColumns() < AdHocTable._getTableHeaders().length - 1;
};

AdHocTable.canAddFilter = function (object, errorMessages) {
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

  if (window.adhocDesigner.isMeasureSelected(object)) {
    errorMessages && errorMessages.push(window.addFilterErrorMessageMeasureAdd);
    return false;
  }

  return true;
};
/*
 * Used to get the left position of the selected object
 */


AdHocTable.getLeftMostPositionFromSelectedColumns = function () {
  var size = window.selObjects.length;

  if (size > 0) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var left = object.index;

    for (var index = 1; index < size; index++) {
      var l = window.selObjects[index].index;

      if (l < left) {
        left = l;
      }
    }

    return parseInt(left);
  }

  return -1;
};
/*
 * Used to get the right most position of the selected column
 */


AdHocTable.getRightMostPositionFromSelectedColumns = function () {
  var size = window.selObjects.length;

  if (size > 0) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    var right = object.index;

    for (var index = 1; index < size; index++) {
      var r = window.selObjects[index].index;

      if (r > right) {
        right = r;
      }
    }

    return parseInt(right);
  }

  return -1;
};
/*
 * Column resize helper
 */


AdHocTable.getNewColumnWidth = function (element, index) {
  var $dragger = jQuery(element);
  var $headerCell = jQuery(window.localContext._getTableHeaders()[index]);
  /*
   * left of dragger - left of cell == new width of cell/column
   */

  var leftOfDragger = $dragger.offset().left;
  var leftOfCellHeader = $headerCell.offset().left;
  return Math.max(leftOfDragger - leftOfCellHeader, AdHocTable.MINIMUM_COL_WIDTH);
};
/**
 * Set width of the column
 *
 * @param index
 */


AdHocTable.setColumnWidth = function (index, width) {
  var $colGroupCol = jQuery("#canvasTableCols col").eq(index);
  $colGroupCol.width(width);
  var $headerCell = jQuery(window.localContext._getTableHeaders()[index]);
  $headerCell.css({
    minWidth: Number(width)
  });
  return $headerCell[0];
};
/*
 * Check to see if the column type is equal to the type passed
 */


AdHocTable.isSelectedColumnType = function (type) {
  return window.localContext.getSelectedColumnType() == type;
};
/*
 * Used to get the datatype for the column
 */


AdHocTable.getSelectedColumnType = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object ? object.model.numericType : window.adhocDesigner.NaN;
};
/*
 * Tests ran by AdHocTable.shouldFetchMoreRows
 */


AdHocTable.hasColumns = function () {
  var hasCols = false;
  AdHocTable.theCols = $("canvasTableCols").getElementsByTagName("col");

  if (AdHocTable.theCols) {
    hasCols = AdHocTable.theCols.length > 0;
  }

  return hasCols;
};

AdHocTable.hasGroups = function () {
  return window.localContext.state.groups.length > 0;
};
/*
 * Test to see if we are currently getting more rows
 */


AdHocTable.isFetchingRows = function () {
  return AdHocTable.fetchingRows;
};
/*
 * Test to see if we are fetching more rows
 */


AdHocTable.shouldFetchMoreRows = function () {
  return (AdHocTable.hasColumns() || AdHocTable.hasGroups()) && window.localContext.state.isShowingFullData && !window.localContext.state.endOfFile && AdHocTable.theRows.length < window.adhocDesigner.ROW_SIZE_TO_TRIGGER_SCROLLBAR;
};
/*
 * Test to fetch more rows
 */


AdHocTable.tableScrolled = function () {
  if (window.localContext.getMode() === designerBase.TABLE && window.localContext.state.isShowingFullData && !window.localContext.state.endOfFile && !AdHocTable.isFetchingRows()) {
    var scrolledToBottom = isIPad() ? window.adhocDesigner._touchController.isBottom() : isAlmostInView(AdHocTable.theRows[AdHocTable.lastRow], AdHocTable.ALMOST_IN_VIEW_OFFSET);
    scrolledToBottom && window.localContext.fetchMoreRows();
  }
};

AdHocTable.isTotalsOnly = function () {
  var table = window.localContext.state.table;
  return table.showTableTotals && !table.showTableDetails;
};

AdHocTable.selectedColumnCanAddSummary = function () {
  return !AdHocTable.isTotalsOnly() && !window.adhocDesigner.hasSpacerInSelection() && !AdHocTable.selectedColumnHasSummary();
};

AdHocTable.selectedColumnCanRemoveSummary = function () {
  return !AdHocTable.isTotalsOnly() && AdHocTable.selectedColumnHasSummary();
};
/*
 * Used to test if the column has a selected summary
 */


AdHocTable.selectedColumnHasSummary = function () {
  // In Totals Only we track summaries as Data so we don't want to remove or add them.
  if (window.selObjects.length !== 1) {
    return false;
  } else {
    var column = window.localContext.state.columns[designerBase.getSelectedObject().index];
    return column.showSummary;
  }
};

AdHocTable.selectedColumnShowsSummaryOptions = function () {
  return AdHocTable.selectedColumnHasSummary() && AdHocTable.selectedMeasureShowsSummaryOptions();
};

AdHocTable.selectedMeasureShowsSummaryOptions = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object) {
    return !!window.localContext.state.columns[object.index];
  }

  return false;
};

AdHocTable.isSelectedMeasureNumeric = function () {
  return AdHocTable.isSelectedColumnType("int") || AdHocTable.isSelectedColumnType("dec");
};

AdHocTable.isSelectedSummaryFunction = function (thisFunction) {
  var cell = actionModel.selObjects[0];
  return cell && cell.summaryFunction === thisFunction;
};

AdHocTable.isSelectedTimeSummaryFunction = function (thisFunction) {
  var cell = actionModel.selObjects[0];
  return cell && cell.summaryTimeFunction === thisFunction;
};

AdHocTable.functionSelected = function (thisFunction) {
  if (window.selObjects.length > 0) {
    var index = designerBase.getSelectedObject().index;
    window.localContext.setSummaryFunction(thisFunction, index);
  }
};

AdHocTable.timeFunctionSelected = function (thisFunction) {
  if (window.selObjects.length > 0) {
    var index = designerBase.getSelectedObject().index;
    window.localContext.setTimeSummaryFunction(thisFunction, index);
  }
};
/*
 * check to see if the selected object has be used in sorting.
 */


AdHocTable.selectedFieldUsedForSorting = function () {
  var selectedObject = designerBase.getSelectedObject();
  var fieldName = window.adhocDesigner.getNameForSelected(selectedObject);
  return AdHocTable.usedInSorting(fieldName);
};
/*
 * Test to see if the field can be used for sorting.
 */


AdHocTable.selectedFieldCouldBeUsedForSorting = function () {
  return !(window.adhocDesigner.hasSpacerInSelection() || window.adhocDesigner.hasGroupInSelection() || AdHocTable.selectedFieldUsedForSorting() || designerBase.isSelectedNodeAFolder() || window.adhocDesigner.isAggregateSelected());
};
/*
 * Test to see if the column is being used for sorting
 */


AdHocTable.selectedColumnUsedForSorting = function () {
  if (!window.localContext.state.inDesignView) {
    return false;
  }

  return window.selObjects.any(function (column) {
    return AdHocTable.usedInSorting(column.model.name);
  });
};

AdHocTable.selectedColumnCouldBeUsedForSorting = function () {
  if (!window.localContext.state.inDesignView) {
    return false;
  }

  return !AdHocTable.selectedColumnUsedForSorting() && !window.adhocDesigner.hasSpacerInSelection() && !window.adhocDesigner.isAggregateSelected();
};
/*
 * Used to test if a field is being used in sorting.
 */


AdHocTable.usedInSorting = function (fieldName) {
  if (window.localContext.state.sortFields != null) {
    var sfs = window.localContext.state.sortFields;

    for (var i = 0; i < sfs.length; i++) {
      if (sfs[i].name == fieldName) {
        return true;
      }
    }
  }

  return false;
};

AdHocTable.canAddAsGroup = function () {
  if (window.selObjects[0]) {
    if (window.selObjects[0].parent && window.selObjects[0].parent.treeId == 'measuresTree') return false;
  }

  return !(window.adhocDesigner.hasSpacerInSelection() || window.adhocDesigner.multiSelect || window.adhocDesigner.isSelectedTreeNodeAFolder() || window.adhocDesigner.isPercentOfParentCalcSelected());
};

AdHocTable.canSwitchToGroup = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object && object.ftype === "dimension";
};

AdHocTable.canMoveGroupUp = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object && object.index > 0;
};

AdHocTable.canMoveGroupDown = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var numberOfGroups = window.localContext.state.groups.length;
  return object && object.index < numberOfGroups - 1;
};

AdHocTable.isSelectedGroupType = function (type) {
  return AdHocTable.getSelectedGroupType() === type;
};

AdHocTable.getSelectedGroupType = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object ? object.dataType : window.adhocDesigner.NaN;
};

AdHocTable.canAddGroupLabelToSelected = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object) {
    var label = object.label;
    return label.blank();
  }

  return false;
};

AdHocTable.canGroupSetMask = function () {
  return AdHocTable.getSelectedGroupType() != window.adhocDesigner.NaN;
};

AdHocTable.isGroupMaskSelected = function (mask) {
  return AdHocTable.getMaskForSelectedGroup() == mask.unescapeHTML();
};

AdHocTable.isSelectedGridMode = function (mode) {
  var tableState = window.localContext.state.table;

  switch (mode) {
    case 'd':
      return tableState.showTableDetails && !tableState.showTableTotals;

    case 't':
      return !tableState.showTableDetails && tableState.showTableTotals;

    case 'dt':
      return tableState.showTableDetails && tableState.showTableTotals;

    default:
      throw 'Unknown Grid Selector Mode: ' + mode;
  }
};

AdHocTable.isShowDistinctRowValues = function () {
  var tableState = window.localContext.state.table;
  return tableState.showDistinctRowValues;
};

AdHocTable.isHideDistinctRowValues = function () {
  var tableState = window.localContext.state.table;
  return !tableState.showDistinctRowValues;
};

AdHocTable.getMaskForSelectedGroup = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object && object.mask;
};

AdHocTable.canColumnSetMask = function () {
  return window.localContext.getSelectedColumnType() != window.adhocDesigner.NaN;
};
/**
 * Test to see if the selected mask is equal to the mask passed
 * @param mask
 */


AdHocTable.isColumnMaskSelected = function (mask) {
  return AdHocTable.getMaskForSelectedColumn() === mask.unescapeHTML();
};
/*
 * Used to get the current mask for the selected column
 */


AdHocTable.getMaskForSelectedColumn = function () {
  return window.adhocDesigner.getSelectedColumnOrGroup().header.getAttribute("data-mask");
};
/*
 * Used to test if we can edit a column header
 */


AdHocTable.canEditColumnHeaderForSelected = function () {
  return !AdHocTable.selectedHasNoColumnHeader() && !window.adhocDesigner.hasSpacerInSelection();
};
/*
 * Used to test if we can add a column header
 */


AdHocTable.canAddColumnHeaderToSelected = function () {
  return AdHocTable.selectedHasNoColumnHeader() && !window.adhocDesigner.hasSpacerInSelection();
};
/*
 * Used to test if the current column has no header
 */


AdHocTable.selectedHasNoColumnHeader = function () {
  var headerObj = window.adhocDesigner.getSelectedColumnOrGroup();
  return headerObj.header.hasClassName("deletedHeader");
};

AdHocTable.getTableTop = function () {
  var canvasTableEl = jQuery('#canvasTable');
  var captionHeight = canvasTableEl.find('.caption').height();
  return canvasTableEl.position().top + captionHeight + "px";
};

AdHocTable.getTableHeight = function () {
  var canvasTableEl = jQuery('#canvasTable');
  var tbodys = canvasTableEl.find("tbody");
  return tbodys.first().height() + tbodys.last().height() + 2 + "px";
}; //exposing to window to fix JRS-20066


window.AdHocTable = AdHocTable;
module.exports = AdHocTable;

});