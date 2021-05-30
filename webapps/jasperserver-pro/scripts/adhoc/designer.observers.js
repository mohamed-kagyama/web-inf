define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var adhocDesigner = require('./designer');

var _ = require('underscore');

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var designerBase = require('../base/designer.base');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var AdHocCrosstab = require('./crosstab.root');

var AdHocTable = require('./table.init');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var isRightClick = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isRightClick;
var getBoxOffsets = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getBoxOffsets;

var crossTabMultiSelect = require('./crosstab.multiselect');

var jQuery = require('jquery');

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var AdhocIntelligentChart = require('./intelligentChart/adhocIntelligentChart');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AIC = AdhocIntelligentChart;

adhocDesigner.observePointerEvents = function () {
  document.observe(layoutModule.ELEMENT_CONTEXTMENU, adhocDesigner.contextMenuHandler);
  jQuery('#dataSizeSelector').change(function () {
    adhocDesigner.toggleAdhocDataSetSize(jQuery(this).val());
  }).val();
  jQuery('#changeVisualizationButton').click(function () {
    adhocDesigner.ui.visualizationChooser.show();
  });
  Event.observe(document.body, isSupportsTouch() ? 'touchend' : 'click', function (event) {
    var element = event.element();

    if (!matchAny(element, ['li.node', 'li.leaf', 'ul#' + adhocDesigner.MEASURES_TREE_DOM_ID, 'ul#' + adhocDesigner.DIMENSIONS_TREE_DOM_ID], true)) {
      this.unSelectAvailableTreeNodes();

      if (isSupportsTouch()) {
        if (window.localContext.clickid == element.identify() && event.timeStamp - window.localContext.clicktime < 700) {
          event.isEmulatedRightClick = true;
          document.fire(layoutModule.ELEMENT_CONTEXTMENU, {
            targetEvent: event,
            node: element
          });
        }

        window.localContext.clicktime = event.timeStamp;
        window.localContext.clickid = element.identify();
      }
    }

    var matched = matchAny(element, [this.CANVAS_PATTERN, layoutModule.MENU_LIST_PATTERN, this.COLUMN_OVERLAY_PATTERN, this.SUMMARY_OVERLAY_PATTERN, this.ROW_GROUP_OVERLAY_PATTERN, this.COLUMN_GROUP_OVERLAY_PATTERN, this.ROW_GROUP_OVERLAY_PATTERN, this.COLUMN_GROUP_OVERLAY_PATTERN, this.XTAB_MEASURE_HEADER_OVERLAY_PATTERN, this.XTAB_MEASURE_OVERLAY_PATTERN, this.XTAB_GROUP_HEADER_PATTERN, this.ROW_GROUP_MEMBER_PATTERN, this.COLUMN_GROUP_MEMBER_PATTERN, this.XTAB_GROUP_HEADER_OVERLAY_PATTERN, this.GROUP_OVERLAY_PATTERN, this.MENU_PATTERN, this.FILTER_OPERATOR_MENU_PATTERN, this.FILTER_ITEM_MENU_PATTERN, this.FILTER_GENERAL_MENU_PATTERN], true);

    if (!matched) {
      if (window.localContext.getMode() === designerBase.CROSSTAB) {
        crossTabMultiSelect && crossTabMultiSelect.deselectAllGroupMembers();
      }

      if (window.localContext.getMode() === designerBase.TABLE || window.localContext.getMode() === designerBase.CROSSTAB || window.localContext.getMode() === designerBase.CHART) {
        window.localContext.deselectAllSelectedOverlays();
      }
    }

    !isRightClick(event) && !event.isEmulatedRightClick && !matched && actionModel.hideMenu();
  }.bind(adhocDesigner));
}; //  http://bugzilla.jaspersoft.com/show_bug.cgi?id=29571
//
//  2012-10-23 thorick
//
//  condition check on input AdhocCrosstab.state
//  return 'false' if ANY groups have property 'isShowingSummary' === false
//
//
//  http://bugzilla.jaspersoft.com/show_bug.cgi?id=29918
//
//  2012-10-26  thorick
//
//  The value 'NULL Dimension' is set in  com.jaspersoft.ji.adhoc.CrosstabBaseViewModel.java
//
//
//
//  2012-11-05  thorick
//              There is a hole in this client side check for deleted summaries:
//              we cannot detect the following edge case:
//                  0.  delete row/column summary in crosstab
//                  1.  switch from crosstab to table
//                  2.  switch from table to chart
//
//              there is currently not enough information to know that summaries
//              were deleted in crosstab before switching to table and finally
//              switching from table to chart,
//              so there may be slider levels that have no data to render in this case.
//
//  http://bugzilla.jaspersoft.com/show_bug.cgi?id=29571
//
//  2012-10-23 thorick
//
//  condition check on input AdhocCrosstab.state
//  return 'false' if ANY groups have property 'isShowingSummary' === false
//
//
//  http://bugzilla.jaspersoft.com/show_bug.cgi?id=29918
//
//  2012-10-26  thorick
//
//  The value 'NULL Dimension' is set in  com.jaspersoft.ji.adhoc.CrosstabBaseViewModel.java
//
//
//
//  2012-11-05  thorick
//              There is a hole in this client side check for deleted summaries:
//              we cannot detect the following edge case:
//                  0.  delete row/column summary in crosstab
//                  1.  switch from crosstab to table
//                  2.  switch from table to chart
//
//              there is currently not enough information to know that summaries
//              were deleted in crosstab before switching to table and finally
//              switching from table to chart,
//              so there may be slider levels that have no data to render in this case.
//


adhocDesigner.switchModeEventCheck = function (state) {
  if (state.columnGroups) {
    if (state.columnGroups.length > 0) {
      for (var i = 0; i < state.columnGroups.length; i++) {
        if (state.columnGroups[i].dimensionName !== 'NULL Dimension') {
          if (state.columnGroups[i].isShowingSummary === false) return false;
        }
      }
    }
  }

  if (state.rowGroups) {
    if (state.rowGroups.length > 0) {
      for (var i = 0; i < state.rowGroups.length; i++) {
        if (state.rowGroups[i].dimensionName !== 'NULL Dimension') {
          if (state.rowGroups[i].isShowingSummary === false) return false;
        }
      }
    }
  }

  return true;
};

adhocDesigner.observeKeyEvents = function keys() {
  document.stopObserving('key:save').observe('key:save', function (event) {
    //hide menu if showing
    actionModel.hideMenu();

    if (window.localContext.canSaveReport()) {
      designerBase.handleSave();
    }

    Event.stop(event.memo.targetEvent);
  }.bind(this));
  document.stopObserving('key:undo').observe('key:undo', function (event) {
    //hide menu if showing
    actionModel.hideMenu(); //nasty hack for now. Will come back to it.. Promise
    //nasty hack for now. Will come back to it.. Promise

    if (window.localContext.state.canUndo && !buttonManager.isDisabled($('undo'))) {
      this.undo();
    }

    Event.stop(event.memo.targetEvent);
  }.bind(this));
  document.stopObserving('key:redo').observe('key:redo', function (event) {
    //hide menu if showing
    actionModel.hideMenu(); //nasty hack for now. Will come back to it.. Promise
    //nasty hack for now. Will come back to it.. Promise

    if (window.localContext.state.canRedo && !buttonManager.isDisabled($('redo'))) {
      this.redo();
    }

    Event.stop(event.memo.targetEvent);
  }.bind(this));
  document.stopObserving('key:escape').observe('key:escape', function () {
    //hide menu if showing
    actionModel.hideMenu();
    var functions = Object.values(this.dialogESCFunctions);
    functions.each(function (dialogId) {
      var dialog = $(dialogId);

      if (dialog) {
        dialogs.popup.hide(dialog);
      }
    }.bind(this)); //if in chart the stopObserving for drag listener is not invoked, this is our only hope :-)
    //if in chart the stopObserving for drag listener is not invoked, this is our only hope :-)

    if (window.localContext.getMode() == designerBase.CHART) {
      if (window.localContext.currentlyDragging) {
        Event.stopObserving(document.body, 'mousemove');
        window.localContext.resizeChart();
        window.localContext.currentlyDragging = false;
      }
    }
  }.bind(this));
};

adhocDesigner.observeCustomEvents = function custom() {
  jQuery('body').on({
    'layout_update': function layout_update(evt, data) {
      var cc = jQuery('#adhocCanvasContainer');
      var hd = cc.prev();
      var off = parseInt(cc.css('margin-top')) || 0;
      var hh = hd.height() - 100;
      var top = hh - off;
      cc.css('top', top + 'px');

      if (data && data.elem && data.elem.id == 'filters') {
        if (window.localContext.getMode().indexOf('ichart') >= 0) {
          if (data.type == 'panel-maximize') {
            AIC.ui.controls.dataLevelSelector.dock();
          } else {
            AIC.ui.controls.dataLevelSelector.undock();
          }
        }
      }

      if (window.localContext.getMode().indexOf('ichart') >= 0 && AIC.chart) {
        AIC.redraw();
      }
    },
    'report_name_update': function report_name_update(e, n) {
      adhocDesigner.ui.header_title.html(xssUtil.hardEscape(n));
    }
  });
  jQuery('body').on({
    'actionmodel-mouseout': function actionmodelMouseout() {
      jQuery('#tableOptions').removeClass('over').css('z-index', 9);
    }
  });
  jQuery(window).resize(function () {
    // code copied on purpose - higher performance
    var cc = jQuery('#adhocCanvasContainer');

    if (cc.length) {
      var hd = cc.prev();
      var off = parseInt(cc.css('margin-top')) || 0;
      var hh = hd.height() - 100;
      var top = hh - off;
      cc.css('top', top + 'px');
    }
  });
};

adhocDesigner.observeTableContainerEvents = function () {
  $('mainTableContainer').observe(isSupportsTouch() ? 'touchstart' : 'mousedown', function (e) {
    window.localContext.mouseDownHandler(e);
  });
  $('mainTableContainer').observe(isSupportsTouch() ? 'touchend' : 'mouseup', function (e) {
    window.localContext.mouseUpHandler(e); //adhocDesigner.deSelectAllPressedNavMuttons();
    //adhocDesigner.deSelectAllPressedNavMuttons();

    adhocDesigner.adhocTitleEdit.call(this, e);
  }.bind(this));
  $('mainTableContainer').observe('mouseover', function (e) {
    window.localContext.mouseOverHandler(e);
  });
  $('mainTableContainer').observe('mouseout', function (e) {
    window.localContext.mouseOutHandler(e);
  });
  $('mainTableContainer').observe('click', function (e) {
    window.localContext.mouseClickHandler(e);
  });
  Event.observe($('mainTableContainer'), isSupportsTouch() ? 'touchmove' : 'scroll', function () {
    if (window.localContext.getMode() === designerBase.TABLE) {
      window.localContext.tableScrolled();
    }

    actionModel.hideMenu();
  });
};

adhocDesigner.observeTreeEvents = function (tree, otherTree) {
  tree.observe('leaf:dblclick', function (event) {
    if (this.isCrosstabMode) {
      var xt = window.localContext.getMode() == designerBase.ICHART || window.localContext.getMode() == designerBase.OLAP_ICHART ? window.AdhocIntelligentChart : AdHocCrosstab;

      if (tree.dragClasses == 'dimension') {
        if (xt.canAddLevelAsRowGroup()) {
          xt.appendDimensionToRowAxisWithLevel();
        } else if (xt.canAddLevelAsColumnGroup()) {
          xt.appendDimensionToColumnAxisWithLevel();
        }
      } else {
        if (xt.canAddLevelAsColumnGroup()) {
          xt.appendMeasureToColumn();
        } else if (xt.canAddLevelAsRowGroup()) {
          xt.appendMeasureToRow();
        }
      }
    } else {
      var evt = event.memo.targetEvent;
      this.addFieldToCanvas(evt);
    }
  }.bind(this));
  tree.observe('leaf:selected', function (event) {
    var node = event.memo.node;
    var evt = event.memo.targetEvent;

    otherTree._deselectAllNodes();

    this.selectFromAvailableFields(evt, node);
  }.bind(this));
  tree.observe('node:selected', function (event) {
    var node = event.memo.node;
    var evt = event.memo.targetEvent;

    otherTree._deselectAllNodes();

    this.selectFromAvailableFields(evt, node);
  }.bind(this));
  tree.observe('leaf:unselected', function (event) {
    var node = event.memo.node;
    this.isCrosstabMode && this.removeSelectedObject(node);
    this.selectFromAvailableFields(event.memo.targetEvent, node);
  }.bind(this));
  tree.observe('node:unselected', function (event) {
    var node = event.memo.node;
    this.isCrosstabMode && this.removeSelectedObject(node);
    this.selectFromAvailableFields(event.memo.targetEvent, node);
  }.bind(this));
  tree.observe('items:unselected', function () {
    designerBase.unSelectAll();
  }.bind(this));
  tree.observe('node:dblclick', function (event) {
    //update cookie info.
    this._availableTreeLastOpened = event.memo.node.param.uri;
    window.localStorage && localStorage.setItem(this._cookieName, this._availableTreeLastOpened);
  }.bind(this));
  tree.observe('node:click', function (event) {
    //update cookie info.
    this._availableTreeLastOpened = event.memo.node.param.uri;
    window.localStorage && localStorage.setItem(this._cookieName, this._availableTreeLastOpened);
  }.bind(this));
  tree.observe('tree:loaded', function () {
    tree.openAndSelectNode(this._availableTreeLastOpened);
  }.bind(this));
  tree.observe('node:mouseup', function (event) {
    window.localContext.treeMenuHandler(event);
  });
  tree.observe('leaf:mouseup', function (event) {
    window.localContext.treeMenuHandler(event);
  });
  /*
  * Key events
  */

  /*
       * Key events
       */

  tree.observe('key:contextMenu', function (event) {
    var node = event.memo.node;
    var nodePosition = getBoxOffsets(node, true);
    adhocDesigner.showDynamicMenu(event, designerBase.FIELD_MENU_LEVEL, {
      menuLeft: nodePosition[0] + 100,
      menuTop: nodePosition[1] + 20
    }); //TODO: use constants for offsets
    //TODO: use constants for offsets

    Event.stop(event);
  });
};

adhocDesigner.observeDisplayManagerEvents = function () {
  // Unbind all existing events
  var layoutManager = jQuery('#' + adhocDesigner.DISPLAY_MANAGER_ID);
  layoutManager.unbind('lm:addItem');
  layoutManager.unbind('lm:addItems');
  layoutManager.unbind('lm:removeItem');
  layoutManager.unbind('lm:moveItem');
  layoutManager.unbind('lm:measureReorder');
  layoutManager.unbind('lm:switchItem');
  layoutManager.unbind('lm:contextMenu'); // Bind Layout Manager events
  // Bind Layout Manager events

  layoutManager.bind('lm:addItem', function (event, options) {
    // Merge with defaults
    options = _.extend({
      index: -1,
      levelIndex: -1
    }, options);
    window.localContext.lmHandlersMap[options.axis].addItem(options.dimensionId, options.index, options.level, options.levelIndex, options.isMeasure, options.uri, options.hierarchyName);
  });
  layoutManager.bind('lm:removeItem', function (event, options) {
    window.localContext.lmHandlersMap[options.axis].removeItem(options.item, options.index);
  });
  layoutManager.bind('lm:addItems', function (event, options) {
    window.localContext.lmHandlersMap.addItems(options.levels, options.index, options.axis);
  });
  layoutManager.bind('lm:moveItem', function (event, options) {
    window.localContext.lmHandlersMap[options.axis].moveItem(options.item, options.from, options.to);
  });
  layoutManager.bind('lm:switchItem', function (event, options) {
    window.localContext.lmHandlersMap[options.axis].switchItem(options.item, options.from, options.to);
  });
  layoutManager.bind('lm:measureReorder', function (event, options) {
    window.localContext.lmHandlersMap.measureReorder(options.measure, options.to);
  });
  layoutManager.bind('lm:contextMenu', function (event, options) {
    window.localContext.lmHandlersMap[options.extra.axis].contextMenu(event, options);
  });
};

adhocDesigner.observeCrossDocumentMessages = function () {
  if (window.addEventListener) {
    removeEventListener('message', adhocDesigner.crossDocumentListener);
    addEventListener('message', adhocDesigner.crossDocumentListener, false);
  } else {
    window.detachEvent('onmessage', adhocDesigner.crossDocumentListener);
    window.attachEvent('onmessage', adhocDesigner.crossDocumentListener);
  }
};

adhocDesigner.observeCloseDesignerEvent = function () {
  jQuery('#closeDesigenr').on('mouseup', adhocDesigner.handleCancel);
};

window.addEventListener && window.addEventListener('orientationchange', function (e) {
  adhocDesigner.hideOnePanel();
});
module.exports = adhocDesigner;

});