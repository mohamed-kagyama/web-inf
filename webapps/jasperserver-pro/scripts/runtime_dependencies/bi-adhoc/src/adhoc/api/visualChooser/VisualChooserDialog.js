define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var VisualChooserView = require('./VisualChooserView');

var VisualizationTypesController = require('./VisualizationTypesController');

var i18n = require("bundle!AdHocBundle");

var Event = require("runtime_dependencies/js-sdk/src/components/utils/Event");

var TabView = require('../visualChooser/view/TabView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*
==========================================
        Where this dialog is used ?

For AdHoc designer use next file:
    visualization.selector.js

For Report viewer use next file:
    jive.interactive.highchart.js

For Dashboard case (adhoc view, reports) use next file:
    ChartJiveComponentView.js

For visualize.js:
    for adhoc:
        AdHocViewFacade.js
    for report:
        ChartJiveComponentView.js
    for dashboard:
        ChartJiveComponentView.js
*/
module.exports = Backbone.View.extend({
  events: {
    'change': 'triggerChangeValue'
  },
  initialize: function initialize(options) {
    this.isDesignView = window.isDesignView;
    this.options = _.defaults(options || {}, this.defaults);
    this.typesManager = new VisualizationTypesController();

    if (this.options.typesToExclude) {
      this.typesManager.setTypesToExclude(this.options.typesToExclude);
    }

    this.tabView = new TabView({});
    this.visualChooserView = new VisualChooserView(_.extend({}, {
      title: i18n['visualization.chooser.title'],
      okBtn: i18n['visualization.chooser.ok.button'],
      applyCancelBtn: i18n['visualization.chooser.applyAndClose.button'],
      closeBtn: i18n['visualization.chooser.cancel.button'],
      minimized: false,
      typesManager: this.typesManager
    }, this.options));
    this.dialog = new Dialog({
      el: this.visualChooserView.render().el,
      modal: false
    });
    this.listenTo(this.dialog, 'dialog:close', this._onDialogCloseEvent);
    this.listenTo(this.dialog, 'dialog:cancel', this._oncancelDialog);
    var self = this;
    this.dialog.$el.find('.jr-mButtonPrimary').on('click', function () {
      self._onClose('dialog:close');
    });
    this.dialog.$el.find('.jr-mButtonSecondary').on('click', function () {
      self._onClose('dialog:cancel');
    });
    this._isOpen = false;
    this.resize();
    this.visualChooserView.on('tabMinimizedEvent', this._onTabMinimizedEvent, this);
    this.visualChooserView.on('change:visualizationType', this._onVisualizationTypeChange, this);
  },
  render: function render() {},
  resize: function resize() {
    var self = this,
        $adhocVisualresizer = this.dialog.$el.find(".jr-mDialog-footer-sizer"),
        visualChooser = $('.jr-mVisualchooser'),
        visualChooserBody = $('.jr-mVisualchooser-body');
    var minHeight = 475,
        bodyMinWidth = 270;

    if ($adhocVisualresizer) {
      this.dialog.$el.resizable({
        handles: {
          "se": this.dialog.$(".jr-mDialog-footer-sizer")
        },
        start: function start(event, ui) {
          // 2 is added because of visualization selector dialog border
          var width = $(event.target).find('.jr-mVisualchooser-panel.jr').outerWidth() + bodyMinWidth + 2;
          self.dialog.$el.resizable({
            "minWidth": width
          });
        },
        resize: function resize(event, ui) {
          if (self.isDesignView) {
            if (visualChooserBody.width() === bodyMinWidth) {
              visualChooser.addClass('jr-mVisualchooserNarrow');
            } else {
              visualChooser.removeClass('jr-mVisualchooserNarrow');
            }
          }
        },
        stop: function stop(event, ui) {
          if (visualChooserBody.width() === bodyMinWidth && self.isDesignView) {
            $('.jr-mVisualchooser-rules.jr').first().addClass('jr-mVisualchooserNarrow');
          }
        },
        minHeight: minHeight
      });
    }
  },
  open: function open(position) {
    this.tabView.setDialogMinWidth(this.dialog.$el);
    this.dialog.open(_.extend({
      topPoint: 0.5,
      leftPoint: 0.5
    }, position));
    this._isOpen = true;
    this.trigger('open');
  },
  getDialogState: function getDialogState() {
    var chooserViewState = this.visualChooserView.getState();
    return {
      viewState: chooserViewState,
      isDialogOpen: this._isOpen,
      dialogPosition: this.dialog.getPosition()
    };
  },
  applyDialogState: function applyDialogState(dialogState) {
    if (dialogState.isDialogOpen) {
      this.open();
    }

    if (dialogState.dialogPosition && !_.isUndefined(dialogState.dialogPosition.top) && !_.isUndefined(dialogState.dialogPosition.left)) {
      this.dialog.setPosition(dialogState.dialogPosition);
    }

    if (dialogState.viewState) {
      this.visualChooserView.applyState(dialogState.viewState);
    }
  },
  close: function close() {
    this.dialog.close();
    this._isOpen = false;
    this.trigger('close');
  },
  remove: function remove() {
    this.close();
    this.stopListening(this.dialog);
    this.dialog.remove();
    this.dialog = null;
    this.visualChooserView.remove();
    this.visualChooserView = null;
  },
  _onDialogCloseEvent: function _onDialogCloseEvent() {
    this.trigger('close');
  },
  _oncancelDialog: function _oncancelDialog() {
    var prevChart = this.prevChartType,
        type = this.typesManager.getTypeByName(prevChart);
    prevChart && this.visualChooserView.trigger('change:visualizationType', {
      type: prevChart,
      legacyAdhocType: type.legacyAdhoc
    });
    this.trigger('close');
  },
  _onTabMinimizedEvent: function _onTabMinimizedEvent(isMinimized, tabSize) {
    var position = this.dialog.getPosition();

    if (isMinimized) {
      // the tab was expanded and now it's collapsed, so we need to move the dialog to the right
      position.left = position.left + tabSize;
    } else {
      // the tab was collapsed and now it's expanded, so we need to move the dialog to the left
      position.left = position.left - tabSize;
    }

    if (position.left < 0) {
      position.left = 0;
    }

    this.dialog.setPosition(position);
  },
  _onVisualizationTypeChange: function _onVisualizationTypeChange(newType) {
    this.trigger('visualizationTypeChange', newType);
  },
  setSelectedType: function setSelectedType(chartType) {
    this.visualChooserView.setSelectedType(chartType);
  },
  getSelectedType: function getSelectedType() {
    return this.visualChooserView.getState();
  },
  setDisabledTypes: function setDisabledTypes(disabledTypesList) {
    this.visualChooserView.setDisabledTypes(disabledTypesList);
  },
  _onClose: function _onClose(Name) {
    var event = new Event({
      name: Name
    });
    this.dialog.trigger(event.name, event);

    if (!event.isDefaultPrevented()) {
      this.dialog.close();
    }
  }
});

});