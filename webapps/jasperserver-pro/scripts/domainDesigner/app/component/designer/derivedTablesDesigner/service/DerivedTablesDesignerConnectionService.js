define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerConnectionService = function DerivedTablesDesignerConnectionService(options) {
  this.initialize(options);
};

_.extend(DerivedTablesDesignerConnectionService.prototype, {
  initialize: function initialize(options) {
    this.derivedTableMetadataService = options.derivedTableMetadataService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  executeQuery: function executeQuery(dataSourceId, query) {
    var dataSource = this.clientDomainSchemaService.getDataSourceById(dataSourceId);
    var dataSourceName = this.clientResourcePropertiesService.getDataSourceUri(dataSource.name);
    return this.derivedTableMetadataService.getDerivedTableMetadata(dataSourceName, query).then(function (result) {
      return _.map(result.elements, function (item) {
        return _.extend({}, item.element, {
          entityType: schemaEntitiesEnum.FIELD
        });
      });
    });
  }
});

module.exports = DerivedTablesDesignerConnectionService;

});