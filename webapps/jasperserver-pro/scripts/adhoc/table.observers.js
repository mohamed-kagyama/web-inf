define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _dragdropextra = require('dragdropextra');

var Draggable = _dragdropextra.Draggable;
var Draggables = _dragdropextra.Draggables;

var _prototype = require('prototype');

var $ = _prototype.$;

var _ = require("underscore");

var jQuery = require("jquery");

var AdHocTable = require("./table");

var TouchController = require("runtime_dependencies/jrs-ui/src/util/touch.controller");

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;
var getTouchedElement = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getTouchedElement;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var isRightClick = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isRightClick;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
AdHocTable.GRID_SELECTOR_MENU_CLASS = "menu vertical dropDown";
AdHocTable.ACTION_MODEL_CONTEXT_SUFFIX = '_mutton';

AdHocTable.mouseDownHandler = function () {};

AdHocTable.mouseUpHandler = function (evt) {
  if (Draggables.dragging == designerBase.COLUMN_LEVEL || Draggables.dragging == designerBase.GROUP_LEVEL || TouchController.element_scrolled) {
    //re-ordering columns / groups
    return;
  }

  var element = isSupportsTouch() ? getTouchedElement(evt) : evt.element();
  var matched = null;
  var overlayIndex = null;
  var overlayId = null;
  /*
   * Fire this if we have just finished dragging. This also sets the position where the new field will be placed
   */

  if (Draggables.dragging == 'dimensionsTree' || Draggables.dragging == 'measuresTree') {
    matched = matchAny(element, [window.adhocDesigner.COLUMN_OVERLAY_PATTERN], true);

    if (matched) {
      overlayId = element.identify();
      overlayIndex = overlayIndex ? overlayIndex : AdHocTable.digitRegex.exec(overlayId)[0];
      isSupportsTouch() || (AdHocTable.hoverColumn = overlayIndex);
      AdHocTable.deactivateVisualDropCue(evt, overlayIndex);

      if (AdHocTable.isHoverGreaterThan50Percent(evt, overlayIndex)) {
        AdHocTable.hoverColumn++;
      }
    }

    matched = matchAny(element, [window.adhocDesigner.COLUMN_SIZER_PATTERN], true);

    if (matched) {
      overlayId = element.identify();
      overlayIndex = parseInt(AdHocTable.digitRegex.exec(overlayId)[0]);
      AdHocTable.hoverColumn = overlayIndex + 1;
      AdHocTable.deactivateVisualDropCue(evt, overlayIndex);
    }
  }

  if (!isSupportsTouch() || !TouchController.element_scrolled) {
    /**
     * Column
     */
    matched = matchAny(element, [window.adhocDesigner.COLUMN_OVERLAY_PATTERN], true);

    if (matched && !isRightClick(evt)) {
      overlayId = element.identify();
      overlayIndex = AdHocTable.digitRegex.exec(overlayId)[0];

      var colHeader = window.localContext._getTableHeaders()[overlayIndex];

      var headerObj = {};
      headerObj.header = colHeader;
      headerObj.index = overlayIndex;
      headerObj.model = window.localContext.state.table.columns[overlayIndex];
      window.localContext.selectTableColumn(evt, headerObj);
    }
    /**
     * Column groups
     */


    if (element.match(window.adhocDesigner.GROUP_OVERLAY_PATTERN) && !isRightClick(evt)) {
      if (element) {
        var groupObj = {
          id: element.identify(),
          fieldName: element.readAttribute("data-fieldName"),
          mask: element.readAttribute("data-mask"),
          dataType: element.readAttribute("data-dataType"),
          index: element.readAttribute("data-index"),
          label: element.readAttribute("data-label")
        };
        window.localContext.selectGroup(evt, groupObj);
      }
    }
    /**
     * Summary
     */


    if (element.match(window.adhocDesigner.SUMMARY_OVERLAY_PATTERN) && !isRightClick(evt)) {
      overlayId = element.identify();
      window.localContext.selectGrandRowCell(evt, AdHocTable.digitRegex.exec(overlayId)[0]);
    }
  }
};

AdHocTable.mouseOutHandler = function (evt) {
  var overlayId;
  var overlayIndex;
  var element = evt.targetElement ? evt.targetElement : evt.element();
  /*
   * Column overlay hovering
   */

  var matched = matchAny(element, [window.adhocDesigner.COLUMN_OVERLAY_PATTERN], true);

  if (matched) {
    element.removeClassName("over"); //check to see if we are performing a mouse out whiles dragging a available field across the table canvas

    if (Draggables.dragging && !Draggables.activeDraggable.element.hasClassName('columnSizer')) {
      overlayId = element.identify();
      overlayIndex = parseInt(AdHocTable.digitRegex.exec(overlayId)[0]);
      AdHocTable.deactivateVisualDropCue(evt, overlayIndex);
      AdHocTable.deactivateVisualDropCue(evt, overlayIndex - 1);
    }
  }
  /*
   * Summary or column groups
   */


  matched = matchAny(element, [window.adhocDesigner.SUMMARY_OVERLAY_PATTERN, window.adhocDesigner.GROUP_OVERLAY_PATTERN], true);

  if (matched) {
    element.removeClassName("over");
  }

  if (element.match('#designer .columnSizer')) {
    document.body.style.cursor = "default";

    if (window.adhocDesigner.overlayDraggedColumn) {
      window.adhocDesigner.overlayDraggedColumn.destroy();
    }
  }
};

AdHocTable.mouseOverHandler = function (evt) {
  var element = evt.targetElement ? evt.targetElement : evt.element();
  var draggingCaresAboutGroups = Draggables.dragging == designerBase.GROUP_LEVEL;
  AdHocTable.updateColumnWhileDrag(evt, element, function (overlayIndex, hoverGreaterThan50Percent) {
    AdHocTable.deactivateVisualDropCue(evt, hoverGreaterThan50Percent ? overlayIndex - 1 : overlayIndex);
    AdHocTable.activateVisualDropCue(evt, hoverGreaterThan50Percent ? overlayIndex : overlayIndex - 1);
  });

  if (Draggables.dragging != designerBase.AVAILABLE_FIELDS_AREA && !AdHocTable.draggingColumnSizer) {
    var matched = matchAny(element, [window.adhocDesigner.SUMMARY_OVERLAY_PATTERN, window.adhocDesigner.GROUP_OVERLAY_PATTERN, 'th.label'], true);

    if (matched) {
      //Bug fix 25106 & 25198.
      var jo = jQuery(matched);
      var ci = jo.attr('data-index');

      if (jo.get(0).tagName.toLowerCase() == 'th' && ci) {
        jQuery('#columnOverlay_' + ci).addClass('over');
      } else {
        matched.addClassName("over");
      }
    }

    if (draggingCaresAboutGroups) {
      AdHocTable.draggingMoveOverGroupIndex = element.match(window.adhocDesigner.GROUP_OVERLAY_PATTERN) ? element.getAttribute('data-index') : -1;
    }

    AdHocTable.resizeColumnWhenSizerDrag(element);
  }
};

AdHocTable.mouseClickHandler = function (evt) {};

AdHocTable.contextMenuHandler = function (evt) {
  var overlayIndex;
  var element = evt.element();
  var id = element.identify();

  if (matchAny(element, [window.adhocDesigner.COLUMN_OVERLAY_PATTERN], true)) {
    overlayIndex = AdHocTable.digitRegex.exec(id)[0];

    var colHeader = window.localContext._getTableHeaders()[overlayIndex];

    var headerObj = {};
    headerObj.header = colHeader;
    headerObj.index = overlayIndex;
    headerObj.model = window.localContext.state.table.columns[overlayIndex];

    if (!designerBase.isInSelection(headerObj)) {
      window.localContext.selectTableColumn(evt, headerObj);
    } // We should refresh selected column metadata from state for right context menu generation


    var selColumnNames = _.chain(window.selObjects).pluck('model').pluck('name').value();

    actionModel.setSelected(_.filter(window.localContext.state.columns, function (col) {
      return _.contains(selColumnNames, col.name);
    }));

    if (colHeader.readAttribute('data-fieldname') !== designerBase.ARTIFICIAL_NAME) {
      window.adhocDesigner.showDynamicMenu(evt, designerBase.COLUMN_LEVEL, null, AdHocTable.generateAvailableSummaryCalculationsMenu);
    }
  }

  if (element.match(window.adhocDesigner.SUMMARY_OVERLAY_PATTERN)) {
    overlayIndex = AdHocTable.digitRegex.exec(id)[0];
    var summaryCells = $("grandSummaryRow").cells;
    var summaryCell = summaryCells[overlayIndex];

    if (!designerBase.isInSelection(summaryCell)) {
      window.localContext.selectGrandRowCell(evt, overlayIndex);
    }

    actionModel.setSelected(_.map(window.selObjects, function (h) {
      return h.model;
    }));
    window.adhocDesigner.showDynamicMenu(evt, designerBase.SUMMARY_LEVEL, null, AdHocTable.generateAvailableSummaryCalculationsMenu);
  }

  if (element.match(window.adhocDesigner.GROUP_OVERLAY_PATTERN)) {
    if (element) {
      var index = element.readAttribute("data-index");
      var groupObj = {
        id: id,
        fieldName: element.readAttribute("data-fieldName"),
        mask: element.readAttribute("data-mask"),
        dataType: element.readAttribute("data-dataType"),
        index: index,
        label: element.readAttribute("data-label"),
        model: window.localContext.state.table.groups[index]
      };

      if (!designerBase.isInSelection(groupObj)) {
        window.localContext.selectGroup(evt, groupObj);
      }

      actionModel.setSelected(_.map(window.selObjects, function (h) {
        return h.model;
      }));
      window.adhocDesigner.showDynamicMenu(evt, designerBase.GROUP_LEVEL);
    }
  }
};

AdHocTable.treeMenuHandler = function (event) {
  var node = event.memo.node;
  var contextName;
  contextName = designerBase[node.isParent() || !window.adhocDesigner.isOnlyFieldsSelected() ? "FIELDSET_MENU_LEVEL" : "FIELD_MENU_LEVEL"];
  window.adhocDesigner.showDynamicMenu(event.memo.targetEvent, contextName, null);
};

AdHocTable.initKeyEvents = function () {
  function cameFromDialog(event) {
    return event.target.up(".dialog") != null;
  }

  document.stopObserving('key:right');
  document.observe('key:right', function (event) {
    if (window.localContext.getMode() == designerBase.TABLE && !cameFromDialog(event)) {
      //column
      var evt = Object.clone(event.memo.targetEvent); //IE: cloning fixed IE issue

      var object = window.adhocDesigner.getSelectedColumnOrGroup();

      if (object && designerBase.isInSelection(object) && AdHocTable.canMoveColumnsRight()) {
        AdHocTable.moveColumnRight(function () {
          AdHocTable.updateSelectedIndexes(1);
          window.localContext.selectTableColumn(evt, object);
        });
      }
    }
  });
  document.stopObserving('key:left');
  document.observe('key:left', function (event) {
    if (window.localContext.getMode() == designerBase.TABLE && !cameFromDialog(event)) {
      //column
      var evt = Object.clone(event.memo.targetEvent); //IE: cloning fixed IE issue

      var object = window.adhocDesigner.getSelectedColumnOrGroup();

      if (object && designerBase.isInSelection(object) && AdHocTable.canMoveColumnsLeft()) {
        AdHocTable.moveColumnLeft(function () {
          AdHocTable.updateSelectedIndexes(-1);
          window.localContext.selectTableColumn(evt, object);
        });
      }
    }
  });
};

AdHocTable.generateAvailableSummaryCalculationsMenu = function (context, menuActionModel) {
  var availableSummariesMenu = _.find(menuActionModel, function (item) {
    return item.clientTest === "AdHocTable.selectedColumnShowsSummaryOptions";
  });

  if (availableSummariesMenu) {
    var columnModel = actionModel.selObjects[0],
        field = _.findWhere(window.localContext.state.columns, {
      name: columnModel.name
    });

    field && window.adhocDesigner.generateAvailableSummaryCalculationsMenu(field.fieldName, availableSummariesMenu, {
      action: AdHocTable.functionSelected,
      isSelectedTest: AdHocTable.isSelectedSummaryFunction
    });
  }

  return menuActionModel;
};

AdHocTable.lmHandlersMap = {
  // Common methods for both axes
  addItems: function addItems(nodes, pos, axis) {
    this[axis].addItems(_.pluck(nodes, 'id'), pos);
  },
  group: {
    addItem: function addItem(dim, pos, field) {
      AdHocTable.addFieldAsGroup(field, pos);
    },
    addItems: function addItems(fieldName, index) {
      AdHocTable.addFieldAsGroup(fieldName, index);
    },
    removeItem: function removeItem(item, index) {
      AdHocTable.removeGroup(index);
    },
    moveItem: function moveItem(field, from, to) {
      AdHocTable.moveGroup(from, to);
    },
    switchItem: function switchItem(field, from, to) {
      AdHocTable.switchToGroup(field, from, to);
    },
    contextMenu: function contextMenu(event, options) {
      // Find group and its index by name
      var selectedItemName = options.extra.name,
          group = _.find(window.localContext.state.groups, function (g) {
        return g.name === selectedItemName;
      });

      window.localContext.selectGroup(options.targetEvent, {
        id: 'group' + group.level + 'HeaderRow0',
        // Dummy Id for backward compatibility
        fieldName: group.name,
        mask: group.mask,
        dataType: group.numericType,
        index: group.level,
        label: group.currentDisplayName
      });
      actionModel.setSelected([group]);
      window.adhocDesigner.showDynamicMenu(options.targetEvent, 'displayManagerRow', null, null);
    }
  },
  column: {
    addItem: function addItem(dim, pos, field) {
      AdHocTable.addFieldAsColumnAtPosition(field, pos);
    },
    addItems: function addItems(fieldName, position) {
      AdHocTable.addFieldAsColumnAtPosition(fieldName, position);
    },
    removeItem: function removeItem(item, index) {
      AdHocTable.removeColumn(index);
    },
    moveItem: function moveItem(field, from, to) {
      AdHocTable.moveColumn(from, to, null, true);
    },
    switchItem: function switchItem(field, from, to) {
      AdHocTable.switchToColumn(field, from, to);
    },
    contextMenu: function contextMenu(event, options) {
      var extra = options.extra;

      var o = window.localContext._getTableHeaders()[extra.index];

      window.localContext.selectTableColumn(options.targetEvent, {
        header: o,
        index: extra.index,
        ftype: extra.isMeasure ? 'measure' : 'dimension',
        model: window.localContext.state.table.columns[extra.index]
      });
      actionModel.setSelected([window.localContext.state.columns[extra.index]]);
      window.adhocDesigner.showDynamicMenu(options.targetEvent, 'displayManagerColumn', null, null);
    }
  }
};
module.exports = AdHocTable;

});