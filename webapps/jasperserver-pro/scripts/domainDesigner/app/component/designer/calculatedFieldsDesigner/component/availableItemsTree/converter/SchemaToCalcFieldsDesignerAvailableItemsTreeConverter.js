define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var byIdReducer = require("../../../../../../common/util/byIdReducer");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SchemaToCalcFieldsDesignerAvailableItemsTreeConverter = function SchemaToCalcFieldsDesignerAvailableItemsTreeConverter(options) {
  this.initialize(options);
};

_.extend(SchemaToCalcFieldsDesignerAvailableItemsTreeConverter.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.calculatedFieldsDesignerViewStateModelService = options.calculatedFieldsDesignerViewStateModelService;
    this.converter = options.converter;
  },
  convert: function convert(options) {
    var schema = options.schema;
    var calcFieldsUsedInOtherCalcFields = this.clientDomainSchemaCalcFieldsService.getCalcFieldsUsedInOtherCalcFields();
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        variables = this.clientDomainSchemaCalcFieldsService.getCalcFieldValidationContext(context);

    var calcFieldsContext = _.extend({}, context, {
      availableVariables: this._groupVariablesBySourceIdAndFieldId(variables.allowed)
    });

    var tablesMap = schema.tables.reduce(byIdReducer, {});
    return this.converter.convert(_.extend({}, options, {
      tableReferenceToTableMap: schema.tableReferences.reduce(function (memo, tableReference) {
        memo[tableReference.id] = tablesMap[tableReference.tableId];
        return memo;
      }, {}),
      calcFieldsUsedInOtherCalcFields: calcFieldsUsedInOtherCalcFields,
      calcFieldsContext: calcFieldsContext
    }));
  },
  _groupVariablesBySourceIdAndFieldId: function _groupVariablesBySourceIdAndFieldId(variables) {
    return _.groupBy(variables, function (variable) {
      return variable.sourceId + ":" + variable.fieldId;
    });
  }
});

module.exports = SchemaToCalcFieldsDesignerAvailableItemsTreeConverter;

});