define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var i18n2 = require("bundle!CommonBundle");

var tabbedPanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait");

var adjustDialogPositionWithinViewportTrait = require("runtime_dependencies/bi-chart/src/jr/jive/highcharts/dialogs/trait/adjustDialogPositionWithinViewportTrait");

var tableFormatDialogTemplate = require("text!./template/tableFormatDialogTemplate.htm");

var tabOptionTemplate = require("text!./template/tabOptionTemplate.htm");

var TableBasicFormatView = require('./view/TableBasicFormatView');

var TableConditionCollectionView = require('./view/TableConditionCollectionView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function applyFormat(evt) {
  if (!this.conditionFormatView.validate()) {
    return;
  }

  var allActions = [];
  allActions.push.apply(allActions, this.basicFormatView.getActions());
  allActions.push.apply(allActions, this.conditionFormatView.getActions());

  if (allActions.length) {
    this.columnComponentModel.format(allActions);
  }

  this.close();
}

function close() {
  this.basicFormatView.clear();
  this.conditionFormatView.clear();
  this.close();
}

function updateColumnNavigationButtons() {
  var index = this.columnComponentModel.parent.columns.indexOf(this.columnComponentModel),
      length = this.columnComponentModel.parent.columns.length;

  if (index > 0) {
    this.$el.find('button.colprev').prop('disabled', false);
  } else {
    this.$el.find('button.colprev').prop('disabled', true);
  }

  if (index < length - 1) {
    this.$el.find('button.colnext').prop('disabled', false);
  } else {
    this.$el.find('button.colnext').prop('disabled', true);
  }
}

module.exports = Dialog.extend({
  defaultTemplate: tableFormatDialogTemplate,
  events: _.extend({
    'click button.colprev': '_goToPreviousColumn',
    'click button.colnext': '_goToNextColumn'
  }, Dialog.prototype.events),
  el: function el() {
    return this.template({
      title: this.title,
      additionalCssClasses: this.additionalCssClasses,
      i18n: this.i18n
    });
  },
  constructor: function constructor(options) {
    this.i18n = options.i18n;
    this.basicFormatView = new TableBasicFormatView({
      i18n: this.i18n
    });
    this.conditionFormatView = new TableConditionCollectionView({
      i18n: this.i18n
    });
    Dialog.prototype.constructor.call(this, {
      buttons: [{
        label: i18n2['button.cancel'],
        action: 'cancel',
        primary: false,
        "float": 'right'
      }, {
        label: i18n2['button.ok'],
        action: 'ok',
        primary: true,
        "float": 'right'
      }],
      additionalCssClasses: 'tableFormatDialog',
      modal: true,
      resizable: false,
      traits: [tabbedPanelTrait, adjustDialogPositionWithinViewportTrait],
      tabHeaderContainerSelector: '.dialogHeader > .tabContainer',
      tabContainerClass: 'jive_form_container',
      optionTemplate: tabOptionTemplate,
      tabs: [{
        label: this.i18n['net.sf.jasperreports.components.headertoolbar.title.basicformat'],
        action: 'basicFormatTab',
        content: this.basicFormatView
      }, {
        label: this.i18n['net.sf.jasperreports.components.headertoolbar.title.conditions'],
        action: 'conditionalFormatTab',
        content: this.conditionFormatView
      }]
    });
    this.on('button:ok', _.bind(applyFormat, this));
    this.on('button:cancel', _.bind(close, this));
    this.on('tab:basicFormatTab', function () {
      if (!this.conditionFormatView.validate()) {
        // hide the basic format tab
        this.tabHeaderContainer.options[0].removeSelection();
        this.$(this.$tabs.get(0)).hide(); // redisplay the conditions tab
        // redisplay the conditions tab

        this.tabHeaderContainer.options[1].addSelection();
        this.$(this.$tabs.get(1)).show();
        return;
      }

      this.conditionFormatView.trigger('tabSwitched');
    });
    this.on('tab:conditionalFormatTab', function () {
      this.basicFormatView.trigger('tabSwitched');
    });
  },
  open: function open(columnComponentModel) {
    var label = columnComponentModel.get('columnLabel') ? columnComponentModel.get('columnLabel') : '#' + (columnComponentModel.get('columnIndex') + 1);
    this.columnComponentModel = columnComponentModel;
    this.$el.find('.dialogTitle.columnLabel').text(label);
    this.basicFormatView.setColumnComponentModel(this.columnComponentModel);
    this.conditionFormatView.setColumnComponentModel(this.columnComponentModel);
    this.openTab("basicFormatTab");
    Dialog.prototype.open.apply(this, arguments);
    updateColumnNavigationButtons.call(this);
  },
  _goToPreviousColumn: function _goToPreviousColumn(evt) {
    if (!this.conditionFormatView.validate()) {
      return;
    }

    var currentIndex = this.columnComponentModel.collection.indexOf(this.columnComponentModel),
        prevColumn = this.columnComponentModel.collection.at(currentIndex - 1),
        prevColumnLabel = prevColumn.get('columnLabel') ? prevColumn.get('columnLabel') : '#' + (prevColumn.get('columnIndex') + 1);
    this.basicFormatView.setColumnComponentModel(prevColumn, true);
    this.conditionFormatView.setColumnComponentModel(prevColumn, true);
    this.$el.find('.dialogTitle.columnLabel').text(prevColumnLabel);
    this.columnComponentModel = prevColumn;
    updateColumnNavigationButtons.call(this);
  },
  _goToNextColumn: function _goToNextColumn(evt) {
    if (!this.conditionFormatView.validate()) {
      return;
    }

    var currentIndex = this.columnComponentModel.parent.columns.indexOf(this.columnComponentModel),
        nextColumn = this.columnComponentModel.parent.columns[currentIndex + 1],
        nextColumnLabel = nextColumn.get('columnLabel') ? nextColumn.get('columnLabel') : '#' + (nextColumn.get('columnIndex') + 1);
    this.basicFormatView.setColumnComponentModel(nextColumn, true);
    this.conditionFormatView.setColumnComponentModel(nextColumn, true);
    this.$el.find('.dialogTitle.columnLabel').text(nextColumnLabel);
    this.columnComponentModel = nextColumn;
    updateColumnNavigationButtons.call(this);
  },
  remove: function remove() {
    Dialog.prototype.remove.call(this);
    this.basicFormatView && this.basicFormatView.remove();
    this.conditionFormatView && this.conditionFormatView.remove();
  }
});

});