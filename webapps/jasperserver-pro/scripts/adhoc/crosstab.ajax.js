define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var designerBase = require('../base/designer.base');

var AdHocCrosstab = require('./crosstab');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;
var removeTrailingPound = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.removeTrailingPound;
var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/* eslint no-array-constructor: "off" */
///////////////////////////////////////////////////////////////
// Ajax calls (OLAP)
///////////////////////////////////////////////////////////////

/**
 * Add an unused dimension to axis with a specific level shown
 * @param params Object representing request parameters map
 */
AdHocCrosstab.insertDimensionInAxisWithChild = function (params) {
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

  designerBase.sendRequest('cr_insertDimensionInAxisWithChild', params, window.localContext.standardCrosstabOpCallback, {
    bPost: true
  });
};

AdHocCrosstab.insertDimensionInRowAxisWithLevel = function (dimName, level, position, measurePosition) {
  AdHocCrosstab.insertDimensionInAxisWithChild({
    dim: dimName,
    axis: 'row',
    pos: position,
    child: level,
    measure_pos: measurePosition
  });
};

AdHocCrosstab.insertDimensionInColumnAxisWithLevel = function (dimName, level, position, measurePosition) {
  AdHocCrosstab.insertDimensionInAxisWithChild({
    dim: dimName,
    axis: 'column',
    pos: position,
    child: level,
    measure_pos: measurePosition
  });
};

AdHocCrosstab.insertDimensionInRowAxisWithAllLevels = function (dimName, position) {
  AdHocCrosstab.insertDimensionInAxisWithChild({
    dim: dimName,
    axis: 'row',
    pos: position
  });
};

AdHocCrosstab.insertDimensionInColumnAxisWithAllLevels = function (dimName, position) {
  AdHocCrosstab.insertDimensionInAxisWithChild({
    dim: dimName,
    axis: 'column',
    pos: position
  });
};
/**
 * move dimension to a new location
 * @param dimName name of a dimension already in an axis
 * @param axisFrom new axis
 * @param from new position
 */


AdHocCrosstab.moveDimension = function (dimName, axisFrom, axisTo, from, to) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_moveDimension', ['dim=' + encodeText(dimName), 'axisFrom=' + axisFrom, 'axisTo=' + axisTo, 'f=' + from, 't=' + to], callback, null);
};
/**
 * remove dimension
 * @param axis axis
 * @param position position
 */


AdHocCrosstab.removeDimension = function (axis, position) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_removeDimension', new Array('axis=' + axis, 'pos=' + position), callback, null);
};
/**
 * Show a row level
 * @param fieldName
 * @param position
 */


AdHocCrosstab.showRowLevel = function (dimName, level) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_showRowLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(level)), callback, null);
};
/**
 * Hide a row level
 * @param fieldName
 * @param position
 */


AdHocCrosstab.hideRowLevel = function (dimName, levelName) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    var level = window.localContext.state.getLevelObject(levelName, dimName, "row");

    if (level && level.propertyMap && level.propertyMap.lastFilteredLevel == "true") {
      dialogs.systemConfirm.show(window.adhocDesigner.getMessage("ADH_CROSSTAB_LAST_FILTERED_LEVEL"), 5000);
    }
  };

  designerBase.sendRequest('cr_hideRowLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(levelName)), callback, null);
};
/**
 * Show a column level
 * @param fieldName
 * @param position
 */


AdHocCrosstab.showColumnLevel = function (dimName, level) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_showColumnLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(level)), callback, null);
};
/**
 * Hide a column level
 * @param fieldName
 * @param position
 */


AdHocCrosstab.hideColumnLevel = function (dimName, levelName) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    var level = window.localContext.state.getLevelObject(levelName, dimName, "column");

    if (level && level.propertyMap && level.propertyMap.lastFilteredLevel == "true") {
      dialogs.systemConfirm.show(window.adhocDesigner.getMessage("ADH_CROSSTAB_LAST_FILTERED_LEVEL"), 5000);
    }
  };

  designerBase.sendRequest('cr_hideColumnLevel', new Array('f=' + encodeText(dimName), 'level=' + encodeText(levelName)), callback, null);
};

AdHocCrosstab.pivot = function () {
  designerBase.sendRequest('cr_pivot', [], window.localContext.standardCrosstabOpCallback, null);
};
/**
 * just insert the measure; if no measures dim, add it to end of column axis
 */


AdHocCrosstab.insertMeasure = function (measure, position, axis) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_insertMeasure', ["measure=" + encodeText(measure), "pos=" + position, "axis=" + axis], callback, null);
};

AdHocCrosstab.moveMeasure = function (measure, to) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_moveMeasureByName', ['measure=' + encodeText(measure), 'to=' + to], callback, null);
};

AdHocCrosstab.removeMeasure = function (index) {
  if (!Object.isNumber(index)) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    index = object.index;
  }

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_removeMeasure', new Array('i=' + index), callback, null);
};
/**
 * Sends a request to expand a level
 * @param dimensionId
 * @param level
 */


AdHocCrosstab.expandLevel = function (dimensionId, level, isRow) {
  if (!dimensionId || !level) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    dimensionId = object.dimensionId;
    level = object.level;
  }

  var params = new Array('f=' + encodeText(dimensionId), 'level=' + encodeText(level), 'isRow=' + isRow);
  designerBase.sendRequest('cr_expandLevel', params, window.localContext.standardCrosstabOpCallback, null);
};
/**
 * Sends a request to collapse a level
 * @param dimensionId
 * @param level
 */


AdHocCrosstab.collapseLevel = function (dimensionId, level, isRow) {
  if (!dimensionId || !level) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    dimensionId = object.dimensionId;
    level = object.level;
  }

  var params = new Array('f=' + encodeText(dimensionId), 'level=' + encodeText(level), 'isRow=' + isRow);
  designerBase.sendRequest('cr_collapseLevel', params, window.localContext.standardCrosstabOpCallback, null);
}; ///////////////////////////////////////////////////////////////
// Ajax calls (from xtab)
///////////////////////////////////////////////////////////////

/**
 * Sends a request to add a field as a column group
 * @param fieldName
 * @param position
 */


AdHocCrosstab.insertColumnGroup = function (fieldName, position) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  if (window.canAddAsGroup()) {
    designerBase.sendRequest('cr_insertColumnGroup', new Array('f=' + encodeText(fieldName), 'i=' + position), callback, null);
  }
};
/**
 * Sends a request to add a field as a row group
 * @param fieldName
 * @param position
 */


AdHocCrosstab.insertRowGroup = function (fieldName, position) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  if (window.canAddAsGroup()) {
    designerBase.sendRequest('cr_insertRowGroup', new Array('f=' + encodeText(fieldName), 'i=' + position), callback, null);
  }
};

AdHocCrosstab.removeColumnGroup = function (index) {
  if (!index) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    index = AdHocCrosstab.getSelectedDimensionIndex(object);
  }

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_removeColumnGroup', new Array('i=' + index), callback, null);
};

AdHocCrosstab.removeRowGroup = function (index) {
  if (!index) {
    var object = window.adhocDesigner.getSelectedColumnOrGroup();
    index = AdHocCrosstab.getSelectedDimensionIndex(object);
  }

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_removeRowGroup', new Array('i=' + index), callback, null);
};

AdHocCrosstab.moveRowGroup = function (from, to, customCallback) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    customCallback && customCallback();
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_moveRowGroup', new Array('f=' + from, 't=' + to), callback, null);
};

AdHocCrosstab.moveColumnGroup = function (from, to, customCallback) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    customCallback && customCallback();
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_moveColumnGroup', new Array('f=' + from, 't=' + to), callback, null);
};

AdHocCrosstab.toggleExpandCollapseForColumn = function (nodePath, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_toggleExpandCollapseForColumn', new Array('nodePath=' + encodeText(nodePath), 'i=' + index), callback, null);
};

AdHocCrosstab.toggleExpandCollapseForRow = function (nodePath, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_toggleExpandCollapseForRow', new Array('nodePath=' + encodeText(nodePath), 'i=' + index), callback, null);
};

AdHocCrosstab.switchToRowGroup = function (ind) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var index = _.isNumber(ind) ? ind : object.groupIndex;
  designerBase.sendRequest('cr_switchToRowGroup', new Array('i=' + index), window.localContext.standardCrosstabOpCallback, null);
};

AdHocCrosstab.switchToColumnGroup = function (ind) {
  var object = window.adhocDesigner.getSelectedColumnOrGroup(); // TODO: adapt/normalize data from tree and from custom generated event

  var index = _.isNumber(ind) ? ind : object.groupIndex;
  designerBase.sendRequest('cr_switchToColumnGroup', new Array('i=' + index), window.localContext.standardCrosstabOpCallback, null);
};

AdHocCrosstab.deleteRowGroupSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var index = AdHocCrosstab.getSelectedDimensionIndex(object);

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setIncludeAllOnRows', new Array('pos=' + index, 'value=false'), callback, null);
};

AdHocCrosstab.addRowGroupSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var index = AdHocCrosstab.getSelectedDimensionIndex(object);

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setIncludeAllOnRows', new Array('pos=' + index, 'value=true'), callback, null);
};

AdHocCrosstab.deleteColumnGroupSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var index = AdHocCrosstab.getSelectedDimensionIndex(object);

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setIncludeAllOnColumns', new Array('pos=' + index, 'value=false'), callback, null);
};

AdHocCrosstab.addColumnGroupSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();
  var index = AdHocCrosstab.getSelectedDimensionIndex(object);

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setIncludeAllOnColumns', new Array('pos=' + index, 'value=true'), callback, null);
};
/**
 * @deprecated
 * @param measureIndex
 */


AdHocCrosstab.sortControlClicked = function (measureIndex) {
  //this condition prevents sending multiple requests at once
  if (AdHocCrosstab.requestsInProgress < 1) {
    AdHocCrosstab.requestsInProgress++;

    var callback = function callback(state) {
      AdHocCrosstab.requestsInProgress--;
      window.localContext.standardCrosstabOpCallback(state);
      designerBase.unSelectAll();
    };

    designerBase.sendRequest('cr_sortControlClicked', new Array('i=' + measureIndex), callback, null);
  }
};

AdHocCrosstab.sortingChosen = function (type, action) {
  var meta = designerBase.getSelectedObject();
  meta.type = type;

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_' + action, ['axis=' + meta.axis, 'dimension=' + encodeText(meta.dimensionId || ''), 'level=' + encodeText(meta.level || ''), 'path=' + encodeText(meta.path || ''), 'sortType=' + type], callback, null);
};

AdHocCrosstab.applyTopBottomNFiltering = function (options) {
  var meta = designerBase.getSelectedObject();

  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
    designerBase.unSelectAll();
  };

  designerBase.sendRequest('cr_groupSortControlClicked', ['level=' + encodeText(meta.level || ''), 'path=' + encodeText(meta.path || ''), 'sortType=' + options.type, 'limit=' + options.limit, 'otherBucket=' + options.aggregateUnranked, 'limitAllLevels=' + options.applyAcrossGroups], callback, null);
};
/**
 * Used to update the canvas view
 */


AdHocCrosstab.updateViewCallback = function (state) {
  window.localContext.standardCrosstabOpCallback(state);
};

AdHocCrosstab.setCategoryForRowGroup = function (catName, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setRowGroupCategorizer', new Array('cat=' + encodeText(catName), 'i=' + index), callback, null);
};

AdHocCrosstab.setCategoryForColumnGroup = function (catName, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setColumnGroupCategorizer', new Array('cat=' + encodeText(catName), 'i=' + index), callback, null);
};

AdHocCrosstab.setMask = function (thisMask, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setDataMask', new Array('m=' + encodeText(thisMask), 'i=' + index), callback, null);
};

AdHocCrosstab.setSummaryFunction = function (thisFunction, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setSummaryFunction', new Array('f=' + encodeText(thisFunction), 'i=' + index), callback, null);
};

AdHocCrosstab.setSummaryTimeFunction = function (thisFunction, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setSummaryTimeFunction', new Array('f=' + encodeText(thisFunction), 'i=' + index), callback, null);
};

AdHocCrosstab.setSummaryFunctionAndMask = function (thisFunction, thisMask, index) {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setSummaryFunctionAndDataMask', new Array('f=' + encodeText(thisFunction), 'm=' + encodeText(thisMask), 'i=' + index), callback, null);
};

AdHocCrosstab.getOverflowRowGroups = function () {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_showInUnsafeRowMode', [], callback, null);
};

AdHocCrosstab.getOverflowColumnGroups = function () {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_showInUnsafeColumnMode', [], callback, null);
};

AdHocCrosstab.getDrillUrl = function () {
  var baseURL = removeTrailingPound(document.location.href); //in case href added #

  var params = baseURL.toQueryParams();
  params = _.pick(params, "realm", "_flowExecutionKey", "_eventId");

  _.extend(params, {
    "_flowId": "adhocFlow",
    "reportType": "table",
    "usePreparedState": "true",
    //ensure new client session
    "clientKey": Math.floor(Math.random() * 9999999999999)
  });

  return "flow.html?" + jQuery.param(params);
};
/**
 * Used to create the JSON object for drill through
 * @param rowGroupPath
 * @param colGroupPath
 */


AdHocCrosstab.createJSONDrillThrough = function (rowGroupPath, colGroupPath) {
  return encodeURIComponent(JSON.stringify({
    type: "path_expression",
    pathList: [rowGroupPath, colGroupPath]
  }));
};

AdHocCrosstab.drill = function (rowGroupPathIndex, colGroupPathIndex) {
  if (AdHocCrosstab.allowDrill === false) {
    return;
  }

  AdHocCrosstab.allowDrill = false;
  if (isIPad()) JRS.vars.win = window.open();

  var callback = function callback(json) {
    AdHocCrosstab.allowDrill = true;

    if (json.success) {
      var windowPopper = function windowPopper() {
        if (isIPad()) {
          JRS.vars.win.location = AdHocCrosstab.getDrillUrl();
        } else {
          var specs = "width=1000,left=200,top=100,height=" + Math.round(jQuery(window).height() * 0.8) + ",resizable=yes";
          window.name = "";
          window.runPopup = window.open(AdHocCrosstab.getDrillUrl(), "drillTable", specs);
          window.runPopup && window.runPopup.focus();
        }
      };

      setTimeout(windowPopper, 0);
    }
  };

  var drillErrorHandler = function drillErrorHandler() {
    AdHocCrosstab.allowDrill = true;
  };

  var jsonObject = AdHocCrosstab.createJSONDrillThrough(window.localContext.state.rowNodeList[rowGroupPathIndex], window.localContext.state.columnNodeList[colGroupPathIndex]);

  if (!isIPad() || !JRS.vars.element_scrolled) {
    var extraParams = ["drillThroughAdhocFilter=" + jsonObject];
    window.isEmbeddedDesigner && extraParams.push("embeddedDesigner=true");
    designerBase.sendRequest('cr_prepareDrillTableState', extraParams, callback, {
      bPost: true
    }, drillErrorHandler);
  }

  return false;
};

AdHocCrosstab.getDrillOlapUrl = function (tempARUName) {
  return 'flow.html?_flowId=viewAdhocReportFlow&clientKey=' + window.clientKey + "&reportUnit=" + tempARUName + "&noReturn=true";
};

AdHocCrosstab.drillOLAP = function (rowGroupPathIndex, colGroupPathIndex) {
  if (AdHocCrosstab.allowDrill === false) {
    return;
  }

  AdHocCrosstab.allowDrill = false;

  var callback = function callback(json) {
    AdHocCrosstab.allowDrill = true;

    if (json.tempARUName) {
      window.localContext.tempARUName = json.tempARUName;

      if (isIPad()) {//                    JRS.vars.win.location = window.localContext.getDrillOlapUrl(json.tempARUName);
      } else {
        var specs = "width=1000,left=200,top=100,height=" + Math.round(jQuery(window).height() * 0.8);
        window.windowPopUp = window.open("", "jr", specs);
        window.windowPopUp.location = window.localContext.getDrillOlapUrl(json.tempARUName);
      }
    } else {// do nothing. Seems like there's some error. Standard alert should pop-up
    }
  };

  var drillErrorHandler = function drillErrorHandler() {
    AdHocCrosstab.allowDrill = true;
  };

  var jsonObject = AdHocCrosstab.createJSONDrillThrough(window.localContext.state.rowNodeList[rowGroupPathIndex], window.localContext.state.columnNodeList[colGroupPathIndex]);

  if (!isIPad() || !JRS.vars.element_scrolled) {
    var extraParams = ["drillThroughAdhocFilter=" + jsonObject];
    window.isEmbeddedDesigner && extraParams.push("embeddedDesigner=true");
    designerBase.sendRequest('cr_prepareDrillTableStateOLAP', extraParams, callback, {
      bPost: true
    }, drillErrorHandler);
  }

  return false;
}; ///////////////////////////////////////////////////////////////
// Ajax calls (toolbar)
///////////////////////////////////////////////////////////////


AdHocCrosstab.getIsHideEmptyRows = function () {
  return AdHocCrosstab.state.crosstabState.hideEmptyRows;
};

AdHocCrosstab.hideEmptyRowsEquals = function (thisValue) {
  return window.localContext.getIsHideEmptyRows() === thisValue;
};

AdHocCrosstab.setHideEmptyRows = function () {
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setProperty', new Array("name=hideEmptyRows", "value=true"), callback, null);
};

AdHocCrosstab.setUnhideEmptyRows = function () {
  //alert("THORICK  adhoc.olap.crosstab.js  setUnhideEmptyRows called");
  var callback = function callback(state) {
    window.localContext.standardCrosstabOpCallback(state);
  };

  designerBase.sendRequest('cr_setProperty', new Array("name=hideEmptyRows", "value=false"), callback, null);
}; ///////////////////////////////////////////////////////////////
// Ajax callbacks
///////////////////////////////////////////////////////////////


AdHocCrosstab.standardOpCallback = function (state) {
  if (state) {
    window.localContext.standardCrosstabOpCallback(state);
  } else {
    /*eslint-disable-next-line no-console*/
    window.console && console.log("Internal server error occurred");
  }
};

AdHocCrosstab.getCallbacksForPivot = function () {
  window.localContext.standardOpCallback();
};
/**
 * Operations callbacks
 */
// update available tree also (re-entrance)


AdHocCrosstab.undoAndRedoCallback = function () {
  window.adhocDesigner.undoAndRedoCallback();
  window.localContext.standardCrosstabOpCallback();
};
/**
 * Custom field callback
 */


AdHocCrosstab.updateCustomFieldCallback = function () {
  this.standardCrosstabOpCallback();
};

AdHocCrosstab.reInitOverlayCallback = function () {};
/**
 * Standard table callback
 */


AdHocCrosstab.standardCrosstabOpCallback = function (state) {
  window.adhocDesigner.updateStateAndRender(state); //    window.adhocDesigner.unSelectAll();
};

module.exports = AdHocCrosstab;

});