define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var jQuery = require('jquery');

var TopBottomFilterDialog = require('./TopBottomFilterDialog');

var Backbone = require('backbone');

var AdHocCrosstab = require('./crosstab');

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var matchMeOrUp = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchMeOrUp;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/*global confirm*/
AdHocCrosstab.showCrosstabMenu = function (evt, contextLevel) {
  window.adhocDesigner.showDynamicMenu(evt, contextLevel, null, function (context, model) {
    context = AdHocCrosstab.updateContextMenuWithSiblingLevels(context, model);
    return AdHocCrosstab.generateAvailableSummaryCalculationsMenu(context, model);
  });
};

AdHocCrosstab.addFieldToXtab = function (dragged, dropped, evt) {
  var dropSection = evt.element();

  if (!dropSection) {
    return;
  }

  var dropSectionAxis = matchMeOrUp(dropSection, window.localContext.DM_AXIS_LIST_PATTERN);

  if (!dropSectionAxis) {
    return;
  }

  var dropSectionAxisId = $(dropSectionAxis).identify();

  if (dropSectionAxisId.startsWith(window.localContext.OLAP_COLUMNS_ID)) {
    AdHocCrosstab.appendDimensionToColumnAxisWithLevel();
  } else if (dropSectionAxisId.startsWith(window.localContext.OLAP_ROWS_ID)) {
    AdHocCrosstab.appendDimensionToRowAxisWithLevel();
  }
};

AdHocCrosstab.processFieldAsColumnGroup = function (element, regex, xIndex) {
  var index = xIndex;
  var position = null;
  var elementId = element.identify();

  if (elementId.startsWith("colGroupHeaderRow_") || elementId.startsWith("colGroupHeader_")) {
    try {
      position = regex.exec(elementId)[0];
      index = parseInt(position) + 1;
    } catch (e) {//unexpected error.
    }
  }

  AdHocCrosstab.addFieldAsColumnGroup(index);
};

AdHocCrosstab.processFieldAsMeasure = function (element, regex, xIndex) {
  var index = xIndex;
  var position = null;
  var elementId = element.identify();

  if (elementId.startsWith("measureHeader_")) {
    try {
      position = regex.exec(elementId)[0];
      index = parseInt(position) + 1;
    } catch (e) {//unexpected error.
    }
  } else if (element.nodeName == "A" || element.nodeName == "LI") {
    if (element.nodeName == "A") {
      element = element.up("li.leaf");
    }

    if (element) {
      index = $(element).previousSiblings().length;
    }
  }

  window.addFieldAsMeasure(index, true);
};

AdHocCrosstab.processFieldAsRowGroup = function (element, regex, xIndex) {
  var index = xIndex;
  var position = null;
  var elementId = element.identify();

  if (elementId.startsWith("rowGroup_") || elementId.startsWith("rowGroupHeader_")) {
    try {
      position = regex.exec(elementId)[0];
      index = parseInt(position) + 1;
    } catch (e) {//unexpected error.
    }
  }

  AdHocCrosstab.addFieldAsRowGroup(index);
};

AdHocCrosstab.moveRowGroupLeft = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup - 1;
  AdHocCrosstab.moveRowGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveRowGroupRight = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup + 1;
  AdHocCrosstab.moveRowGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveColumnGroupLeft = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup - 1;
  AdHocCrosstab.moveColumnGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveColumnGroupRight = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup + 1;
  AdHocCrosstab.moveColumnGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveMeasureLeft = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  AdHocCrosstab.moveMeasure(object.level, object.index - 1);
};

AdHocCrosstab.moveMeasureRight = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  AdHocCrosstab.moveMeasure(object.level, object.index + 1);
};

AdHocCrosstab.moveRowGroupOnDrag = function () {
  window.draggingMoveOverIndex = parseInt(window.draggingMoveOverIndex);
  window.currentlyDraggingIndex = parseInt(window.currentlyDraggingIndex);

  if (window.currentlyDraggingIndex != window.draggingMoveOverIndex) {
    if (window.currentlyDraggingIndex >= 0 && window.draggingMoveOverIndex >= 0) {
      AdHocCrosstab.moveRowGroup(window.currentlyDraggingIndex, window.draggingMoveOverIndex);
    } else if (window.draggingMoveOverIndex == -1) {
      AdHocCrosstab.removeRowGroup(window.currentlyDraggingIndex);
    }
  }
};

AdHocCrosstab.hideLevel = function (customCallback) {
  var dimAndLevel = window.getDimensionWithLevelFromSelection();

  if (window.selectionCategory.area === designerBase.COLUMN_GROUP_MENU_LEVEL) {
    AdHocCrosstab.hideColumnLevel(dimAndLevel.dimensionId, dimAndLevel.level);
  } else if (window.selectionCategory.area === designerBase.ROW_GROUP_MENU_LEVEL) {
    AdHocCrosstab.hideRowLevel(dimAndLevel.dimensionId, dimAndLevel.level);
  }
};

AdHocCrosstab.showLevel = function (customCallback) {
  var dimAndLevel = AdHocCrosstab.getDimensionWithLevelFromSelection();

  if (window.selectionCategory.area === designerBase.COLUMN_GROUP_MENU_LEVEL) {
    AdHocCrosstab.showColumnLevel(dimAndLevel.dimensionId, dimAndLevel.level);
  } else if (window.selectionCategory.area === designerBase.ROW_GROUP_MENU_LEVEL) {
    AdHocCrosstab.showRowLevel(dimAndLevel.dimensionId, dimAndLevel.level);
  }
};

AdHocCrosstab.moveColumnGroupDown = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup + 1;
  AdHocCrosstab.moveColumnGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveColumnGroupUp = function (customCallback) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var fromGroup = AdHocCrosstab.getSelectedDimensionIndex(object);
  var toGroup = fromGroup - 1;
  AdHocCrosstab.moveColumnGroup(fromGroup, toGroup, customCallback);
};

AdHocCrosstab.moveColumnGroupOnDrag = function () {
  window.draggingMoveOverIndex = parseInt(window.draggingMoveOverIndex);
  window.currentlyDraggingIndex = parseInt(window.currentlyDraggingIndex);

  if (window.currentlyDraggingIndex != window.draggingMoveOverIndex) {
    if (window.currentlyDraggingIndex >= 0 && window.draggingMoveOverIndex >= 0) {
      AdHocCrosstab.moveColumnGroup(window.currentlyDraggingIndex, window.draggingMoveOverIndex);
    } else if (window.draggingMoveOverIndex == -1) {
      AdHocCrosstab.removeColumnGroup(window.currentlyDraggingIndex);
    }
  }
};

AdHocCrosstab.moveMeasureOnDrag = function () {
  window.draggingMoveOverIndex = parseInt(window.draggingMoveOverIndex);
  window.currentlyDraggingIndex = parseInt(window.currentlyDraggingIndex);

  if (window.currentlyDraggingIndex != window.draggingMoveOverIndex) {
    if (window.currentlyDraggingIndex >= 0 && window.draggingMoveOverIndex >= 0) {
      AdHocCrosstab.moveMeasure(window.currentlyDraggingIndex, window.draggingMoveOverIndex);
    } else if (window.draggingMoveOverIndex == -1) {
      AdHocCrosstab.removeMeasure(window.currentlyDraggingIndex);
    }
  }
};

AdHocCrosstab.retrieveOverflowRowGroups = function () {
  var proceed = confirm(window.adhocDesigner.getMessage("overflowConfirmMessage"));

  if (proceed) {
    AdHocCrosstab.getOverflowRowGroups();
  }
};

AdHocCrosstab.retrieveOverflowColumnGroups = function () {
  var proceed = confirm(window.adhocDesigner.getMessage("overflowConfirmMessage"));

  if (proceed) {
    AdHocCrosstab.getOverflowColumnGroups();
  }
};

AdHocCrosstab.selectMeasureMask = function (mask) {
  var object = AdHocCrosstab.getSelectedMeasure();

  if (object) {
    var index = window.selObjects.first().index;
    AdHocCrosstab.setMask(mask, index);
  }
};

AdHocCrosstab.selectFunction = function (newFunction) {
  var measure = AdHocCrosstab.getSelectedMeasure(),
      selected = window.selObjects.first();

  if (measure) {
    var type = window.adhocDesigner.getSuperType(measure.type);
    var newType = AdHocCrosstab.getMeasureTypeByFunction(newFunction);

    if (type !== newType) {
      AdHocCrosstab.setSummaryFunctionAndMask(newFunction, window.defaultMasks[newType], selected.index);
    } else {
      AdHocCrosstab.setSummaryFunction(newFunction, selected.index);
    }
  }
};

AdHocCrosstab.selectTimeFunction = function (newFunction) {
  var measure = AdHocCrosstab.getSelectedMeasure(),
      selected = window.selObjects.first();

  if (measure) {
    var type = window.adhocDesigner.getSuperType(measure.type);
    var newType = AdHocCrosstab.getMeasureTypeByFunction(newFunction);
    AdHocCrosstab.setSummaryTimeFunction(newFunction, selected.index);
  }
};

AdHocCrosstab.selectedMeasureShowsSummaryOptions = function () {
  return !!AdHocCrosstab.getSelectedMeasure();
};

AdHocCrosstab.selectedMeasureShowsNumericSummaryOptions = function () {
  return window.localContext.selectedMeasureShowsSummaryOptions() && window.localContext.isSelectedMeasureNumeric();
};

AdHocCrosstab.setCatForColumnGroup = function (catName) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object && AdHocCrosstab.isColumnGroupSelected(object)) {
    AdHocCrosstab.setCategoryForColumnGroup(catName, object.groupIndex);
  }
};

AdHocCrosstab.setCatForRowGroup = function (catName) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object && AdHocCrosstab.isRowGroupSelected(object)) {
    AdHocCrosstab.setCategoryForRowGroup(catName, object.groupIndex);
  }
}; ///////////////////////////////////////////////////////////////
// Action model functions
///////////////////////////////////////////////////////////////


AdHocCrosstab.appendDimensionWithLevel = function (level, pos, axis) {
  var meta = level ? level : window.localContext.getAvailableFieldsNodeBySelection();
  meta.axis = axis;

  if (AdHocCrosstab.showAddHierarchyConfirm(meta.hierarchyName, meta.dimensionId, function () {
    jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItem', meta);
  })) {
    return;
  }

  if (!level) {
    jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItem', meta);
  } else {
    window.localContext.lmHandlersMap.addItems(meta, pos, axis);
  }
};

AdHocCrosstab.appendDimensionToRowAxisWithLevel = function (node, level, pos) {
  AdHocCrosstab.appendDimensionWithLevel(level, pos, "row");
};

AdHocCrosstab.appendDimensionToColumnAxisWithLevel = function (node, level, pos) {
  AdHocCrosstab.appendDimensionWithLevel(level, pos, "column");
};

AdHocCrosstab.appendMeasureToRow = function (name) {
  var meta = name ? window.localContext.getAvailableFieldsNodesBySelection(name) : window.localContext.getAvailableFieldsNodesBySelection();
  jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItems', {
    axis: 'row',
    levels: meta,
    index: meta[0].index
  });
};

AdHocCrosstab.appendMeasureToColumn = function (name) {
  var meta = name ? window.localContext.getAvailableFieldsNodesBySelection(name) : window.localContext.getAvailableFieldsNodesBySelection();
  jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:addItems', {
    axis: 'column',
    levels: meta,
    index: meta[0].index
  });
};

AdHocCrosstab.removeLevelFromRow = function () {
  var meta = window.localContext.getSelectedObject();
  jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:removeItem', {
    axis: 'row',
    index: meta.index,
    item: {
      level: meta.level,
      dimensionId: meta.dimensionId,
      isMeasure: meta.isMeasure
    }
  });
};

AdHocCrosstab.removeLevelFromColumn = function () {
  var meta = window.localContext.getSelectedObject();
  jQuery('#' + window.adhocDesigner.DISPLAY_MANAGER_ID).trigger('lm:removeItem', {
    axis: 'column',
    index: meta.index,
    item: {
      level: meta.level,
      dimensionId: meta.dimensionId,
      isMeasure: meta.isMeasure
    }
  });
};

AdHocCrosstab.selectedGroupCanShowSummary = function () {
  var group = AdHocCrosstab.getSelectedGroup(window.adhocDesigner.getSelectedColumnOrGroup()),
      parentGroup = AdHocCrosstab.getGroupParent(group);

  if (!parentGroup) {
    return !AdHocCrosstab.selectedGroupHasSummary();
  } else {
    return parentGroup.expanded === true && !AdHocCrosstab.selectedGroupHasSummary();
  }
};

AdHocCrosstab.selectedColumnGroupCanHideSummary = function () {
  var canHideSummary = AdHocCrosstab.canHideSummariesForColumnGroup(),
      group = AdHocCrosstab.getSelectedGroup(window.adhocDesigner.getSelectedColumnOrGroup()),
      parentGroup = AdHocCrosstab.getGroupParent(group);

  if (canHideSummary) {
    if (!parentGroup) {
      return AdHocCrosstab.selectedGroupHasSummary();
    } else {
      return parentGroup.expanded === true && AdHocCrosstab.selectedGroupHasSummary();
    }
  }

  return false;
};

AdHocCrosstab.selectedRowGroupCanHideSummary = function () {
  var canHideSummary = AdHocCrosstab.canHideSummariesForRowGroup();

  if (canHideSummary) {
    return AdHocCrosstab.selectedGroupHasSummary();
  }

  return false;
};

AdHocCrosstab.getGroupParent = function (group) {
  var parentIndex = -1,
      parent;
  window.localContext.state.columnGroups.detect(function (el, i) {
    if (el.name === group.name) {
      parentIndex = i - 1;
      return parentIndex;
    }
  });

  if (parentIndex >= 0) {
    parent = window.localContext.state.columnGroups[parentIndex];
  }

  return parent;
};

AdHocCrosstab.selectedGroupHasSummary = function () {
  var group = AdHocCrosstab.getSelectedGroup(window.adhocDesigner.getSelectedColumnOrGroup());

  if (group) {
    return group.isShowingSummary === true;
  }

  return false;
};

AdHocCrosstab.selectedRowGroupIsCollapsible = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object && object.expandable;
};

AdHocCrosstab.selectedColumnGroupIsCollapsible = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  return object && object.expandable;
};

AdHocCrosstab.topBottomNFilteringClicked = function (type) {
  var selection = window.selObjects[0],
      currentTopBottomNFilter = AdHocCrosstab.getTopBottomFilter(),
      isSameColumnSelected = currentTopBottomNFilter && selection.path === currentTopBottomNFilter.path,
      options = {
    type: type,
    limit: isSameColumnSelected ? currentTopBottomNFilter.limit : 5,
    aggregateUnranked: isSameColumnSelected ? currentTopBottomNFilter.aggregateUnranked : true,
    applyAcrossGroups: isSameColumnSelected ? currentTopBottomNFilter.applyAcrossGroups : false
  };

  if (type !== 'none') {
    new TopBottomFilterDialog({
      model: new Backbone.Model(options),
      ok: function ok(options) {
        AdHocCrosstab.applyTopBottomNFiltering({
          //backend understand "asc" or "desc" instead of "bottom" and "top"
          type: type === "top" ? "desc" : "asc",
          limit: options.limit,
          aggregateUnranked: options.aggregateUnranked,
          applyAcrossGroups: options.applyAcrossGroups
        });
      }
    }).open();
  } else if (isSameColumnSelected && type !== currentTopBottomNFilter.type) {
    AdHocCrosstab.applyTopBottomNFiltering({
      type: type,
      limit: 0,
      aggregateUnranked: false,
      applyAcrossGroups: false
    });
  }
};

module.exports = AdHocCrosstab;

});