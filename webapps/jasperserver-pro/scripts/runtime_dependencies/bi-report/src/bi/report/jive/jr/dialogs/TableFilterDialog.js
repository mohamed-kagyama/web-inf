define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var tableFilterTemplate = require("text!./template/tableFilterDialogTemplate.htm");

var TableFilterView = require('./view/TableFilterView');

var jiveDataConverter = require('../../util/jiveDataConverter');

var adjustDialogPositionWithinViewportTrait = require("runtime_dependencies/bi-chart/src/jr/jive/highcharts/dialogs/trait/adjustDialogPositionWithinViewportTrait");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function schemaFilterToJiveFilter(schemaFilter, schemaDataType) {
  var jiveFilter = {},
      genericProperties,
      isNullCheckOperator;

  if (schemaFilter.operator) {
    jiveFilter.operator = jiveDataConverter.schemaFormatOperatorToFilterOperator(schemaFilter.operator, schemaFilter.value, schemaDataType);
    genericProperties = this.columnComponentModel.parent.config.genericProperties;
    isNullCheckOperator = schemaFilter.operator.indexOf('null') !== -1;

    if (schemaDataType === 'datetime' && !isNullCheckOperator) {
      if (_.isArray(schemaFilter.value)) {
        jiveFilter.value = [];
        jiveFilter.value[0] = jiveDataConverter.isoTimestampTojQueryUiTimestamp(schemaFilter.value[0], genericProperties);
        jiveFilter.value[1] = jiveDataConverter.isoTimestampTojQueryUiTimestamp(schemaFilter.value[1], genericProperties);
      } else {
        jiveFilter.value = jiveDataConverter.isoTimestampTojQueryUiTimestamp(schemaFilter.value, genericProperties);
      }
    } else if (schemaDataType === 'time' && !isNullCheckOperator) {
      if (_.isArray(schemaFilter.value)) {
        jiveFilter.value = [];
        jiveFilter.value[0] = jiveDataConverter.isoTimeTojQueryUiTime(schemaFilter.value[0], genericProperties);
        jiveFilter.value[1] = jiveDataConverter.isoTimeTojQueryUiTime(schemaFilter.value[1], genericProperties);
      } else {
        jiveFilter.value = jiveDataConverter.isoTimeTojQueryUiTime(schemaFilter.value, genericProperties);
      }
    } else {
      jiveFilter.value = schemaFilter.value;
    }
  }

  return jiveFilter;
}

module.exports = Dialog.extend({
  defaultTemplate: tableFilterTemplate,
  constructor: function constructor(options) {
    this.tableFilterView = new TableFilterView({
      i18n: options.i18n
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
      traits: [adjustDialogPositionWithinViewportTrait],
      additionalCssClasses: 'tableFilterDialog',
      modal: true,
      resizable: false,
      contentContainer: '.dialogContent',
      content: this.tableFilterView
    });
    this.on('button:ok', this._applyFilter);
    this.on('button:cancel', this.close);
  },
  open: function open(columnComponentModel) {
    this.columnComponentModel = columnComponentModel;
    var reportComponentObject = this.columnComponentModel.toReportComponentObject();
    this.tableFilterView.viewModel.set({
      columnLabel: reportComponentObject.label ? reportComponentObject.label : '#' + (this.columnComponentModel.get('columnIndex') + 1),
      clearFilter: reportComponentObject.filter.operator == null ? 'true' : 'false',
      filterOptions: this.columnComponentModel.parent.config.genericProperties.operators[this.columnComponentModel.get('dataType').toLowerCase()],
      dataType: this.columnComponentModel.get('dataType').toLowerCase(),
      calendarPatterns: this.columnComponentModel.parent.config.genericProperties.calendarPatterns
    });
    this.tableFilterView.model.reset().set(schemaFilterToJiveFilter.call(this, reportComponentObject.filter, reportComponentObject.dataType));
    Dialog.prototype.open.apply(this, arguments);
  },
  _applyFilter: function _applyFilter(evt) {
    var jiveFilter = this.tableFilterView.model.toJSON();

    if (jiveFilter.operator) {
      var componentObj = this.columnComponentModel.toReportComponentObject(),
          valueStart = _.isArray(jiveFilter.value) ? jiveFilter.value[0] : jiveFilter.value,
          valueEnd = _.isArray(jiveFilter.value) ? jiveFilter.value[1] : undefined;
      componentObj.filter = jiveDataConverter.operatorAndValueToSchemaFormat.call(this.columnComponentModel, jiveFilter.operator, componentObj.dataType, valueStart, valueEnd, componentObj.detailsRowFormat.pattern);
      this.columnComponentModel.updateFromReportComponentObject(componentObj);
    } else {
      this.columnComponentModel.set({
        filterValue: null,
        filterOperator: null
      }, {
        silent: true
      });
    }

    var filterAction = this.columnComponentModel.actions['change:filter'].call(this.columnComponentModel);
    this.columnComponentModel.filter(filterAction.filterData);
    this.close();
  },
  remove: function remove() {
    Dialog.prototype.remove.call(this);
    this.tableFilterView && this.tableFilterView.remove();
  }
});

});