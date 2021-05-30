define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _dragdropextra = require('dragdropextra');

var Draggables = _dragdropextra.Draggables;
var Draggable = _dragdropextra.Draggable;

var _prototype = require('prototype');

var $ = _prototype.$;
var $$ = _prototype.$$;

var AdHocChart = require('./chart.actions');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var isIPad = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIPad;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var isRightClick = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isRightClick;
var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

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
AdHocChart.mouseDownHandler = function (evt) {
  var element = evt.element();
  var matched = null;

  if (isIPad()) {
    matched = matchAny(element, ["div#chartBorder"], true);
    matched && $("dragger").removeClassName("hidden");
    evt.preventDefault();
  }

  if (element.identify() == "dragger") {
    this.containerMovePosition = {
      x: evt.pointerX(),
      y: evt.pointerY()
    };
    Event.observe(document.body, isSupportsTouch() ? 'touchmove' : 'mousemove', this.draggerListener);
  }

  matched = matchAny(element, [window.adhocDesigner.LEGEND_OVERLAY_PATTERN], true);

  if (matched && !isRightClick(evt)) {
    var selectedObject = null;

    if (matched.hasClassName("legend")) {
      var legendName = matched.readAttribute("data-legendName");

      if (legendName !== "data-legendName") {
        selectedObject = {
          id: matched.identify(),
          legendName: legendName,
          index: matched.readAttribute("data-index"),
          defaultName: matched.readAttribute("data-defaultName"),
          userName: matched.readAttribute("data-userName")
        };
        window.selectionCategory.area = designerBase.LEGEND_MENU_LEVEL;

        if (window.localContext.draggableLegend) {
          window.localContext.draggableLegend.destroy();
        }

        designerBase.unSelectAll();
        AdHocChart.deselectAllSelectedOverlays();
        designerBase.addToSelected(selectedObject);
        buttonManager.select(matched);
      }
    }

    isIPad() && $("dragger").addClassName("hidden");
  }

  isIPad() && evt.preventDefault();
};

AdHocChart.mouseUpHandler = function (evt) {
  var element = evt.element();
  var matched = null;
  var overlayIndex = null;

  if (this.currentlyDragging) {
    //since i know that there is only one mouse move event, stop observing all
    Event.stopObserving(document.body, isSupportsTouch() ? 'touchmove' : 'mousemove', this.draggerListener);
    this.resizeChart();
    this.currentlyDragging = false;
  } else {
    var dragger = $("dragger");

    if (isIPad() && dragger) {
      !matchAny(element, ["div#chartBorder"], true) && dragger.addClassName("hidden");
    }
  }

  matched = matchAny(element, [window.adhocDesigner.LEGEND_OVERLAY_PATTERN], true);

  if (matched) {
    if (Draggables.dragging == designerBase.AVAILABLE_FIELDS_AREA) {
      overlayIndex = matched.readAttribute("data-index");
      AdHocChart.hoverLegendIndex = parseInt(overlayIndex);
    } else {
      AdHocChart.deselectAllSelectedOverlays();
      $(matched).addClassName("selected");
    }

    var it = window.it;

    if (isIPad()) {
      if (it.clickid == element.identify()) {
        if (evt.timeStamp - it.clicktime < 700) document.fire(layoutModule.ELEMENT_CONTEXTMENU, {
          targetEvent: evt,
          node: element
        });
      }

      it.clicktime = evt.timeStamp;
      it.clickid = element.identify();
    }
  } else {
    if (isIPad()) AdHocChart.deselectAllSelectedOverlays();
  }
};

AdHocChart.mouseOverHandler = function (evt) {
  var element = evt.element();
  var matched = null;
  matched = matchAny(element, ["div#chartBorder"], true);

  if (matched) {
    var sizer = $("dragger");
    sizer.removeClassName("hidden");
  }

  matched = matchAny(element, [AdHocChart.CHART_DRAGGER_PATTERN, window.adhocDesigner.LEGEND_OVERLAY_PATTERN], true);

  if (matched) {
    if (AdHocChart.draggableChart) {
      AdHocChart.draggableChart.destroy();
    }

    if (matched.match(window.adhocDesigner.LEGEND_OVERLAY_PATTERN)) {
      var index = $(matched).readAttribute("data-index");

      if (window.localContext.currentlyDraggingLegend) {
        window.localContext.currentLegendIndex = index;
      }

      if (window.localContext.state.inDesignView) {
        window.localContext.draggableLegend = new Draggable(matched.identify(), {
          ghosting: true,
          onStart: function onStart(obj, evt) {
            Draggables.dragging = designerBase.CHART_LEGEND_AREA;
            window.localContext.currentlyDraggingLegend = true;
            window.localContext.currentLegendIndex = $(obj.element).readAttribute("data-index");
            $(obj.element).update($(obj.element).readAttribute("data-defaultname"));
            $(obj.element).setStyle({
              color: "#000",
              'white-space': "nowrap"
            }); //destroy draggable chart

            if (AdHocChart.draggableChart) {
              AdHocChart.draggableChart.destroy();
            }
          },
          onEnd: function onEnd(obj, evt) {
            var measureIndex = null;
            measureIndex = $(obj.element).readAttribute("data-index");
            $(obj.element).update();
            window.localContext.currentlyDraggingLegend = false;

            if (!window.localContext.dragginInLegendArea) {
              AdHocChart.removeMeasure(measureIndex);
            } else {
              if (!isNaN(measureIndex) && !isNaN(window.localContext.currentLegendIndex) && measureIndex != null && window.localContext.currentLegendIndex != null) {
                AdHocChart.moveMeasure(measureIndex, window.localContext.currentLegendIndex);
              }
            }

            window.localContext.currentLegendIndex = null;
            window.localContext.dragginInLegendArea = false;
          },
          onDrag: function onDrag(obj, evt) {
            var points = Event.pointer(evt);

            if (AdHocChart.isInLegendArea(points.x, points.y)) {
              window.localContext.dragginInLegendArea = true;
              var legends = $$('#chartBorder .overlay');
              legends.each(function (element, index) {
                if (element !== obj.element) {
                  var left = Element.cumulativeOffset(element)[0];
                  var right = +element.style.width.replace("px", "") + left;

                  if (left <= points.x && points.x <= right) {
                    window.localContext.currentLegendIndex = element.readAttribute("data-index");
                    buttonManager.over(element);
                  } else {
                    buttonManager.out(element);
                  }
                }
              });
              $(obj.element).removeClassName("outside");
            } else {
              window.localContext.dragginInLegendArea = false;
              $(obj.element).addClassName("outside");
            }
          }
        });
      }
    }
  }
};

AdHocChart.mouseOutHandler = function (evt) {
  var element = evt.element();
  var matched = null;
  matched = matchAny(element, ["div#chartBorder"], true);

  if (matched) {
    //show dragger
    var sizer = $("dragger");
    sizer.addClassName("hidden");
  } //destroy draggable chart


  if (AdHocChart.draggableChart) {
    AdHocChart.draggableChart.destroy();
  }
};

AdHocChart.mouseClickHandler = function (evt) {};

AdHocChart.contextMenuHandler = function (evt) {
  var element = evt.element();
  var proceed = true;
  var matched = matchAny(element, [AdHocChart.CHART_CANVAS_PATTERN, window.adhocDesigner.LEGEND_OVERLAY_PATTERN], true);

  if (matched) {
    var selectedObject = null;

    if (matched.hasClassName("legend")) {
      var legendName = matched.readAttribute("data-legendName");

      if (legendName !== "data-legendName") {
        selectedObject = {
          id: matched.identify(),
          legendName: legendName,
          index: matched.readAttribute("data-index"),
          defaultName: matched.readAttribute("data-defaultName"),
          userName: matched.readAttribute("data-userName")
        };
        window.selectionCategory.area = designerBase.LEGEND_MENU_LEVEL;
      } else {
        proceed = false;
      }
    } else {
      window.selectionCategory.area = designerBase.CHART_LEVEL;
      selectedObject = matched;
    }

    if (proceed) {
      if (window.localContext.draggableLegend) {
        window.localContext.draggableLegend.destroy();
      }

      designerBase.unSelectAll();
      AdHocChart.deselectAllSelectedOverlays();
      designerBase.addToSelected(selectedObject);
      buttonManager.select(matched);
      AdHocChart.showChartMenu(evt, window.selectionCategory.area);
    }

    Event.stop(evt);
  }
};

AdHocChart.lmHandlersMap = {
  // Common methods for both axes
  addItems: function addItems(nodes, pos, axis) {
    this[axis].addItems(nodes, pos);
  },
  group: {
    addItem: function addItem(dim, pos, field) {
      AdHocChart.setGroup(field);
    },
    addItems: AdHocChart.addFieldAsGroup,
    removeItem: function removeItem(item, index) {
      AdHocChart.removeGroup(index);
    },
    switchItem: function switchItem(i, f, t) {
      AdHocChart.switchToGroup(i, f);
    },
    contextMenu: function contextMenu(event, options) {
      var f = options.extra.name;
      var selectedObject = {
        legendName: f,
        index: 0
      };
      designerBase.unSelectAll();
      window.localContext.deselectAllSelectedOverlays();
      designerBase.addToSelected(selectedObject);
      window.selectionCategory.area = designerBase.LEGEND_MENU_LEVEL;
      actionModel.setSelected(options.extra);
      window.adhocDesigner.showDynamicMenu(options.targetEvent, 'displayManagerRow', null, null);
    }
  },
  measures: {
    addItem: function addItem(dim, pos, field) {
      AdHocChart.addFieldAsMeasure(true, pos);
    },
    addItems: function addItems(level, pos) {
      AdHocChart.addFieldAsMeasure(true, pos);
    },
    removeItem: function removeItem(item, index) {
      AdHocChart.removeMeasure(index);
    },
    moveItem: function moveItem(field, from, to) {
      AdHocChart.moveMeasure(from, to);
    },
    switchItem: function switchItem(i, f, t) {
      AdHocChart.switchToMeasure(i, f, t);
    },
    contextMenu: function contextMenu(event, options) {
      var i = options.extra.index;
      var name = options.extra.name;
      var legendItem = AdHocChart.state.legendItems[i];
      var selectedObject = {
        id: "legendOverlay_" + i,
        legendName: name,
        index: i,
        defaultName: legendItem ? legendItem.defaultName : "",
        userName: legendItem ? legendItem.userName : "",
        chartMeasureId: name
      };
      designerBase.unSelectAll();
      AdHocChart.deselectAllSelectedOverlays();
      designerBase.addToSelected(selectedObject);
      window.selectionCategory.area = designerBase.LEGEND_MENU_LEVEL;
      actionModel.setSelected(options.extra);
      window.adhocDesigner.showDynamicMenu(options.targetEvent, 'displayManagerColumn');
    }
  }
};
module.exports = AdHocChart;

});