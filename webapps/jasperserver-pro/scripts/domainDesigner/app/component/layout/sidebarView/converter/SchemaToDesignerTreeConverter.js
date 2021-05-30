define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var byIdReducer = require("../../../../common/util/byIdReducer");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SchemaToDesignerTreeConverter = function SchemaToDesignerTreeConverter(options) {
  this.initialize(options);
};

_.extend(SchemaToDesignerTreeConverter.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.converter = options.converter;
  },
  convert: function convert(options) {
    var schema = options.schema;
    var calcFieldsUsedInOtherCalcFields = this.clientDomainSchemaCalcFieldsService.getCalcFieldsUsedInOtherCalcFields();
    var tablesMap = schema.tables.reduce(byIdReducer, {});
    return this.converter.convert(_.extend({}, options, {
      calcFieldsUsedInOtherCalcFields: calcFieldsUsedInOtherCalcFields,
      tableReferenceToTableMap: schema.tableReferences.reduce(function (memo, tableReference) {
        memo[tableReference.id] = tablesMap[tableReference.tableId];
        return memo;
      }, {})
    }));
  }
});

module.exports = SchemaToDesignerTreeConverter;

});