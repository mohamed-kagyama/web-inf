define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var AdHocTable = require('./table.observers');

var designerBase = require('../base/designer.base');

var _ = require('underscore');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;

var jQuery = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/*
 * Column
 */
AdHocTable.addFieldAsColumnAtPosition = function (fieldName, position) {
  if (!AdHocTable.canAddFieldAsColumn(fieldName)) {
    return;
  }

  var isNoDataBefore = window.adhocDesigner.isNoDataToDisplay();

  var callback = function callback(model) {
    AdHocTable.hoverColumn = -1;
    window.localContext.standardTableOpCallback(model);

    if (isNoDataBefore && !window.adhocDesigner.isNoDataToDisplay()) {
      window.adhocDesigner.checkMaxRowsLimit();
    }
  };

  designerBase.sendRequest('ta_insertColumn', {
    'f[]': designerBase.encodeParam(fieldName),
    i: position
  }, callback, {
    'bPost': true
  });
};

AdHocTable.moveColumn = function (fromIndex, toIndex, customCallback, single) {
  var indices = single ? fromIndex : _.pluck(window.selObjects, 'index').join(','),
      offset = toIndex - fromIndex,
      callback = function callback(state) {
    window.localContext.standardTableOpCallback(state);
    customCallback && customCallback(state);
  };

  designerBase.sendRequest('ta_moveColumn', ['indexes=' + indices, 'offset=' + offset], callback);
};

AdHocTable.switchToColumn = function (fieldName, from, to) {
  if (!fieldName && window.selObjects.length > 0) {
    fieldName = window.selObjects[0].fieldName;
    from = window.selObjects[0].index;
    to = -1;
  }

  designerBase.sendRequest('ta_switchToColumn', ['item=' + encodeText(fieldName), 'from=' + from, 'to=' + to], window.localContext.standardTableOpCallback);
};

AdHocTable.removeColumn = function (_index, extra_callback) {
  var indices = _.isNumber(_index) ? _index : _.pluck(window.selObjects, 'index').join(','),
      callback = extra_callback || window.localContext.standardTableOpCallback;
  designerBase.sendRequest('ta_removeColumn', ['indexes=' + indices], callback);
};

AdHocTable.tableColumnResize = function (newWidth, index) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_resizeColumn', ['i=' + index, 'w=' + newWidth], callback);
};
/*
* Column header
*/

/*
 * Column header
 */


AdHocTable.setColumnHeaderToNull = function (colIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setColumnHeader', ['i=' + colIndex, 'l=_null', 'w=-1'], callback);
};

AdHocTable.updateColumnHeaderRequest = function (text, index, width) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  if (text.length === 0) {
    window.localContext.removeColumnHeaderRequest();
  } else {
    designerBase.sendRequest('ta_setColumnHeader', ['i=' + index, 'l=' + encodeText(text), 'w=' + width], callback);
  }
};
/*
* Column mask
*/

/*
 * Column mask
 */


AdHocTable.setMask = function (thisMask, colIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model); // clear selection to prevent caching old objects in selection array
    // clear selection to prevent caching old objects in selection array

    designerBase.unSelectAll();
  };

  designerBase.sendRequest('ta_setColumnMask', ['m=' + encodeText(thisMask), 'i=' + colIndex], callback);
};
/**
* Used to update the canvas view
*/

/**
 * Used to update the canvas view
 */


AdHocTable.updateViewCallback = function (state) {
  window.localContext.standardOpCallback(state);
};
/*
* Group
*/

/*
 * Group
 */


AdHocTable.addFieldAsGroup = function (fieldName, index) {
  if (!fieldName) {
    index = -1;
    fieldName = window.adhocDesigner.collectFields(window.adhocDesigner.getSelectedTreeNodes(), true);
  }

  designerBase.sendRequest('ta_insertGroup', {
    'f[]': designerBase.encodeParam(fieldName),
    i: index
  }, window.localContext.standardTableOpCallback);
};

AdHocTable.moveGroup = function (from, to, customCallback) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
    customCallback && customCallback();
  };

  designerBase.sendRequest('ta_moveGroup', ['i1=' + from, 'i2=' + to], callback);
};

AdHocTable.switchToGroup = function (fieldName, from, to) {
  // If fieldName is undefined then it means we need to take info from last selected object
  if (!fieldName && window.selObjects.length > 0) {
    fieldName = jQuery(window.selObjects[0].header).attr('data-fieldname');
    from = window.selObjects[0].index;
    to = -1;
  }

  designerBase.sendRequest('ta_switchToGroup', ['item=' + encodeText(fieldName), 'from=' + from, 'to=' + to], window.localContext.standardTableOpCallback);
};

AdHocTable.removeGroup = function (_index, extra_callback) {
  var index = parseInt(_index),
      object,
      callback = extra_callback || window.localContext.standardTableOpCallback;

  if (isNaN(index)) {
    index = (object = window.adhocDesigner.getSelectedColumnOrGroup()) && object.index;
  }

  designerBase.sendRequest('ta_removeGroup', ['i=' + index], callback);
};
/*
* Group label
*/

/*
 * Group label
 */


AdHocTable.updateGroupLabel = function (label, groupIndex) {
  if (!label || label.blank()) {
    window.localContext.setGroupLabelToNull(groupIndex);
    return;
  }

  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setGroupLabel', ['g=' + groupIndex, 'l=' + encodeText(label)], callback);
};

AdHocTable.setGroupLabelToNull = function (groupIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setGroupLabel', ['g=' + groupIndex, 'l=_null'], callback);
};
/*
* Group mask
*/

/*
 * Group mask
 */


AdHocTable.setGroupMask = function (thisMask, grIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setGroupMask', ['m=' + encodeText(thisMask), 'i=' + grIndex], callback);
};
/*
* Row
*/

/*
 * Row
 */


AdHocTable.fetchMoreRows = function () {
  AdHocTable.fetchingRows = true;
  designerBase.sendRequest('ta_' + AdHocTable.FETCH_MORE_ROWS, [], this.Rendering.addMoreRows.bind(this.Rendering), null);
};
/*
* Summary
*/

/*
 * Summary
 */


AdHocTable.addDefaultColumnSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object) {
    designerBase.sendRequest('ta_updateSummaryVisibility', ['visible=true', 'i=' + object.index], window.localContext.standardTableOpCallback);
  }
};

AdHocTable.removeColumnSummary = function () {
  var object = window.adhocDesigner.getSelectedColumnOrGroup();

  if (object) {
    designerBase.sendRequest('ta_updateSummaryVisibility', ['visible=false', 'i=' + object.index], window.localContext.standardTableOpCallback);
  }
};
/*
* Summary function
*/

/*
 * Summary function
 */


AdHocTable.setSummaryFunction = function (thisFunction, colIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setColumnSummaryFunction', ['f=' + encodeText(thisFunction), 'i=' + colIndex], callback);
};
/*
* Time Balance Summary function
*/

/*
 * Time Balance Summary function
 */


AdHocTable.setTimeSummaryFunction = function (thisFunction, colIndex) {
  var callback = function callback(model) {
    window.localContext.standardTableOpCallback(model);
  };

  designerBase.sendRequest('ta_setColumnTimeSummaryFunction', ['f=' + encodeText(thisFunction), 'i=' + colIndex], callback);
};

AdHocTable.toggleGridMode = function (mode) {
  designerBase.sendRequest('ta_toggleGridMode', ['mode=' + mode], window.localContext.standardTableOpCallback);
};

AdHocTable.toggleDuplicateTableRows = function (duplicate) {
  designerBase.sendRequest("ta_toggleDuplicateTableRows", ["hideDuplicateTableRows=" + duplicate], window.localContext.standardTableOpCallback);
}; //***************************************************************
// AJAX Callbacks
//***************************************************************

/*
 * Custom field callback
 */
//***************************************************************
// AJAX Callbacks
//***************************************************************

/*
 * Custom field callback
 */


AdHocTable.updateCustomFieldCallback = function () {
  window.localContext.standardTableOpCallback();

  if (window.localContext.state.inDesignView) {
    window.adhocDesigner.updateAllFieldLabels();
  }
};
/*
* pivot callback
*/

/*
 * pivot callback
 */


AdHocTable.getCallbacksForPivot = function (state) {
  window.localContext.standardOpCallback(state);
};
/*
* Standard callback
*/

/*
 * Standard callback
 */


AdHocTable.standardOpCallback = function (state) {
  if (state) {
    window.localContext.standardTableOpCallback(state, true);
  } else {
    /*eslint-disable-next-line no-console*/
    window.console && console.log('Internal server error occurred');
  }
};
/*
* Standard table callback
*/

/*
 * Standard table callback
 */


AdHocTable.standardTableOpCallback = function (state) {
  window.adhocDesigner.updateStateAndRender(state);
};

module.exports = AdHocTable;

});