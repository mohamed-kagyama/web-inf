define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var adhocDesigner = require('./designer');

var designerBase = require('../base/designer.base');

var adhocControls = require('../controls/controls.adhoc');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;

var jQuery = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* eslint no-array-constructor: "off"*/
adhocDesigner.ajaxActionPrefix = {
  table: 'co',
  crosstab: 'cr',
  olap_crosstab: 'cr',
  chart: 'ch',
  ichart: 'ich',
  olap_ichart: 'ich'
};

adhocDesigner.getControllerPrefix = function () {
  return adhocDesigner.ajaxActionPrefix[window.localContext.getMode()];
};

adhocDesigner.loadState = function (initCallback) {
  designerBase.sendRequest(adhocDesigner.getControllerPrefix() + '_loadState', [], function (state) {
    window.localContext.setMode(state.viewType);
    adhocControls.initialize(state);
    adhocDesigner.updateStateAndRender(state);
    adhocDesigner.initFieldsPanel(true);

    if (window.isDesignView) {
      adhocDesigner.dimensionsTree.showTree(adhocDesigner._AVAILABLE_TREE_DEPTH);
      adhocDesigner.measuresTree.showTree(adhocDesigner._AVAILABLE_TREE_DEPTH);
    }

    adhocDesigner.filtersController.setFilters(state, {
      reset: true
    });
  });
};

adhocDesigner.updateTrees = function () {
  if (!window.isDesignView) {
    return;
  }

  designerBase.sendRequest(adhocDesigner.getControllerPrefix() + '_updateAvailableTree', [], function () {
    adhocDesigner.dimensionsTree.showTree(adhocDesigner._AVAILABLE_TREE_DEPTH);
    adhocDesigner.measuresTree.showTree(adhocDesigner._AVAILABLE_TREE_DEPTH);
  });
};

adhocDesigner.undo = function () {
  if (window.localContext.state.modeOnUndo && !window.localContext.state.modeOnUndo.blank() && window.localContext.state.modeOnUndo != window.localContext.getMode()) {
    window.localContext.hide && window.localContext.hide();
    adhocDesigner.switchMode(window.localContext.state.modeOnUndo, 'undo');
  } else {
    designerBase.sendRequest('co_undo', [], adhocDesigner.undoAndRedoCallback);
  }
};

adhocDesigner.undoAll = function () {
  if (window.localContext.state.undoModeNames.length > 0 && window.localContext.state.undoModeNames[0] !== window.localContext.getMode()) {
    window.localContext.hide && window.localContext.hide();
    adhocDesigner.switchMode(window.localContext.state.undoModeNames[0], 'undoAll');
  } else {
    designerBase.sendRequest('co_undoAll', [], adhocDesigner.undoAndRedoCallback);
  }
};

adhocDesigner.redo = function () {
  if (window.localContext.state.modeOnRedo && !window.localContext.state.modeOnRedo.blank() && window.localContext.state.modeOnRedo != window.localContext.getMode()) {
    window.localContext.hide && window.localContext.hide();
    adhocDesigner.switchMode(window.localContext.state.modeOnRedo, 'redo');
  } else {
    designerBase.sendRequest('co_redo', [], adhocDesigner.undoAndRedoCallback);
  }
};

adhocDesigner.switchMode = function (requestedMode, undoOrRedo, chartType) {
  var params = ['_mode=' + requestedMode];

  if (undoOrRedo) {
    params.push('undoOrRedo=' + undoOrRedo);
  }

  if (chartType) {
    params.push('chartType=' + chartType);
  }

  var switchModeCallback = function switchModeCallback(state) {
    var newMode = state.viewType;
    undoOrRedo && adhocDesigner.selectDisplayModeTab(newMode);
    adhocDesigner.initComponents(newMode);
    adhocDesigner.undoAndRedoCallback(state);
  };

  if (window.localContext.cleanupOnSwitch) {
    window.localContext.cleanupOnSwitch();
  }

  designerBase.sendRequest(adhocDesigner.getControllerPrefix() + '_switchMode', params, switchModeCallback);
};

adhocDesigner.selectDisplayModeTab = function (mode) {
  jQuery('#displayMode > li').each(function () {
    if (jQuery(this).attr('id').startsWith(mode)) {
      jQuery(this).addClass('selected');
    } else {
      jQuery(this).removeClass('selected');
    }
  });
}; //////////////////////////////////////////////////////////
//Report attributes and options
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//Report attributes and options
//////////////////////////////////////////////////////////


adhocDesigner.updateReportTitle = function (currentTitle) {
  var controllerPrefix = adhocDesigner.getControllerPrefix();

  if (currentTitle.blank()) {
    designerBase.sendRequest(controllerPrefix + '_setTitle', ['l=_null']);
  } else {
    designerBase.sendRequest(controllerPrefix + '_setTitle', ['l=' + encodeText(currentTitle)]);
  }
};

adhocDesigner.toggleTitleBar = function () {
  designerBase.sendRequest(adhocDesigner.getControllerPrefix() + '_toggleTitleBar', []);
};

adhocDesigner.setShowDisplayManager = function (show) {
  var callback = function callback(state) {} //do not need to update anything
  //window.localContext.standardOpCallback(state);
  ;

  designerBase.sendRequest('co_toggleDisplayManager', new Array('name=showDisplayManager', 'value=' + show), callback, null);
};

adhocDesigner.mergeCrosstabCells = function (merge) {
  var callback = function callback(state) {
    window.localContext.standardOpCallback(state);
  };

  designerBase.sendRequest('cr_mergeCrosstabCells', ['merge=' + merge], callback, null);
};

adhocDesigner.toggleAdhocDataSetSize = function (setting) {
  var proceed = false;
  /*if(setting.startsWith("full") && !window.localContext.state.isShowingFullData){
  proceed = true;
  }else if(setting.startsWith("sample") && window.localContext.state.isShowingFullData){
  proceed = true;
  }*/

  /*if(setting.startsWith("full") && !window.localContext.state.isShowingFullData){
          proceed = true;
      }else if(setting.startsWith("sample") && window.localContext.state.isShowingFullData){
          proceed = true;
      }*/

  var sizeOption = 'datasize=' + setting;

  if (setting.startsWith('full') && window.localContext.state.isShowingFullData !== true) {
    proceed = true;
  } else if (setting.startsWith('sample') && window.localContext.state.isShowingSampleData !== true) {
    proceed = true;
  } else if (setting.startsWith('nodata') && window.localContext.state.isShowingNoData !== true) {
    proceed = true;
  }

  if (proceed) {
    var callback = function (state) {
      adhocDesigner.updateStateAndRender(state);
      this.checkMaxRowsLimit();
    }.bind(adhocDesigner);

    designerBase.sendRequest('co_toggleAdhocDataSetSize', [sizeOption], callback);
  }
};

adhocDesigner.tryToKeepServerAlive = function () {
  var callback = function callback(state) {
    window.localContext.standardOpCallback(state);
  };

  designerBase.sendRequest('co_tryToKeepServerAlive', [], callback, null);
};

adhocDesigner.setProperty = function (thisName, thisValue, callback) {
  designerBase.sendRequest('co_setProperty', ['name=' + thisName, 'value=' + thisValue], callback);
};

adhocDesigner.changeFieldAttributeOrMeasure = function (fieldName, type) {
  designerBase.sendRequest('co_changeFieldAttributeOrMeasure', ['name=' + encodeText(fieldName), 'type=' + type]);
};

adhocDesigner.setFilter = function (filter) {
  designerBase.sendRequest('co_setFilter', ['testFilter=' + filter]);
};

adhocDesigner.setSorting = function (sortFields, extra_callback) {
  window.localContext.state.sortFields = sortFields;
  var sortJson = Object.toJSON(sortFields),
      escapedSortJson = encodeURIComponent(sortJson);

  var callback = function callback(state) {
    adhocDesigner.updateStateAndRender(state);
    extra_callback();
  };

  designerBase.sendRequest('ta_resort', ['so=' + escapedSortJson], callback);
};

adhocDesigner.pivot = function () {
  window.localContext.pivot ? window.localContext.pivot() : designerBase.sendRequest(adhocDesigner.getControllerPrefix() + '_pivot', []);
}; //////////////////////////////////////////////////////////////////////////////////
//Ajax callbacks..
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//Ajax callbacks..
//////////////////////////////////////////////////////////////////////////////////


adhocDesigner.undoAndRedoCallback = function (state) {
  adhocDesigner.updateTrees();
  adhocDesigner.updateStateAndRender(state);
  adhocDesigner.filtersController.setFilters(state, {
    reset: true
  });
};

adhocDesigner.updateStateAndRender = function (state) {
  adhocDesigner.updateState(state);
  adhocDesigner.render();
};

module.exports = adhocDesigner;

});