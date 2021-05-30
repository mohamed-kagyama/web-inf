define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

var validationStateNameEnum = require("../../../validation/state/enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SidebarController = function SidebarController(options) {
  this.initialize(options);
};

_.extend(SidebarController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.resourcePropertiesService = options.resourcePropertiesService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.clearAllDataConfirmationDialog = options.clearAllDataConfirmationDialog;
    this.sidebarEventBus = options.sidebarEventBus;
    this.validationStateFactory = options.validationStateFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.sidebarEventBus, 'replaceDataSource', this._onReplaceData);
    this.listenTo(this.sidebarEventBus, 'clearAllData', this._onClearAllData);
    this.listenTo(this.sidebarEventBus, 'createCalcField', this._onCreateCalcField);
    this.listenTo(this.sidebarEventBus, 'createDerivedTable', this._onCreateDerivedTable);
    this.listenTo(this.clearAllDataConfirmationDialog, 'button:yes', this._onClearAllDataConfirm);
  },
  _onReplaceData: function _onReplaceData() {
    this.validationStateFactory.enter(validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE, {});
  },
  _onClearAllData: function _onClearAllData() {
    var dataSourceUri = this._getDataSourceUri();

    if (dataSourceUri) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.SHOW_CLEAR_ALL_DATA_DIALOG);
    }
  },
  _onCreateCalcField: function _onCreateCalcField() {
    var context = {
      sourceType: schemaEntitiesEnum.CONSTANT_GROUP,
      sourceName: this.clientDomainSchemaCalcFieldsService.getDefaultConstantGroupName()
    };
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW, context);
  },
  _onCreateDerivedTable: function _onCreateDerivedTable() {
    var dataSource = this.clientDomainSchemaService.getFirstDataSource();
    this.applicationCrossComponentEventBus.trigger('sidebar:createDerivedTable', dataSource.id);
  },
  _onClearAllDataConfirm: function _onClearAllDataConfirm() {
    var dataSourceUri = this._getDataSourceUri();

    this.validationStateFactory.enter(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE, {
      dataSourceUri: dataSourceUri
    });
  },
  _getDataSourceUri: function _getDataSourceUri() {
    var dataSourceName = this.resourcePropertiesService.getDataSourceName();
    return this.resourcePropertiesService.getDataSourceUri(dataSourceName);
  },
  'clearAllData:showDialog': function clearAllDataShowDialog() {
    this.clearAllDataConfirmationDialog.open();
  }
});

module.exports = SidebarController;

});