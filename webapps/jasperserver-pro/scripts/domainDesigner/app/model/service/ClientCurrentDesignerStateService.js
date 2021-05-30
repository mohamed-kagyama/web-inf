define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientCurrentDesignerStateService = function ClientCurrentDesignerStateService(options) {
  this.initialize(options);
};

_.extend(ClientCurrentDesignerStateService.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.resourceProperties = options.resourceProperties;
    this.viewStateModel = options.viewStateModel;
  },
  getDesignerState: function getDesignerState() {
    return {
      schema: this.dataStore.serialize(),
      resourceProperties: this.resourceProperties.toJSON(),
      viewState: this.viewStateModel.toJSON()
    };
  },
  doesCurrentDesignerStateContainsDataSources: function doesCurrentDesignerStateContainsDataSources() {
    var designerState = this.getDesignerState();
    return Boolean(designerState.resourceProperties.dataSources);
  },
  getDataSourceType: function getDataSourceType() {
    var dataSourceName = resourcePropertiesUtil.getFirstDataSourceName(this.resourceProperties.get('dataSources'));
    var dataSource = this.viewStateModel.getDataSource(dataSourceName);
    return dataSource && dataSource.type;
  }
});

module.exports = ClientCurrentDesignerStateService;

});