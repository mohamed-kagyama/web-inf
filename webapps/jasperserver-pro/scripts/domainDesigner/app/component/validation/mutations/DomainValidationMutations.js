define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainValidationMutations = function DomainValidationMutations(options) {
  this.initialize(options);
};

_.extend(DomainValidationMutations.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.domainSchemaService = options.domainSchemaService;
    this.resourcePropertiesService = options.resourcePropertiesService;
    this.viewStateModelService = options.viewStateModelService;
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  setDesignerState: function setDesignerState(domainState) {
    this.domainSchemaService.reset(domainState.schema);
    this.resourcePropertiesService.reset(domainState.resourceProperties);
    this.viewStateModelService.setState(domainState.viewState);
  },
  replaceDataSourceMetadata: function replaceDataSourceMetadata(dataSourceMetadata) {
    this.domainSchemaService.replaceDataSourceName(dataSourceMetadata.name);
    this.resourcePropertiesService.replaceDataSource({
      uri: dataSourceMetadata.uri,
      name: dataSourceMetadata.name
    });
    this.viewStateModelService.replaceDataSource({
      name: dataSourceMetadata.name,
      type: dataSourceMetadata.type
    });
  },
  replaceDataSource: function replaceDataSource(options) {
    var dataSource = options.dataSource;
    this.domainSchemaService.replaceDataSource({
      name: dataSource.name,
      schemaPairs: options.schemaPairs,
      orphanResources: options.orphanResources
    });
    this.resourcePropertiesService.replaceDataSource(dataSource);
    this.viewStateModelService.replaceDataSource(dataSource);
  },
  addNewFields: function addNewFields(fieldGroups) {
    this.domainSchemaService.addFields(fieldGroups);
  },
  mapSchemas: function mapSchemas(schemaPairs) {
    this.domainSchemaService.mapSchemas(schemaPairs);
  }
});

module.exports = DomainValidationMutations;

});