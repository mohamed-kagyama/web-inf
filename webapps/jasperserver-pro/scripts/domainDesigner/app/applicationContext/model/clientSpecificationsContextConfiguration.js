define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = require("../../model/specification/SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec");

var advancedJoinsMappingSpecification = require("../../component/designer/joinsDesigner/specification/advancedJoinsMappingSpecification");

var schemaResourcesNamesAreEqualSpecification = require("../../model/specification/schemaResourcesNamesAreEqualSpecification");

var NotEmptyFieldsSpecification = require("../../model/specification/NotEmptyFieldsSpecification");

var NotEmptyTablesSpecification = require("../../model/specification/NotEmptyTablesSpecification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSpecifications(context, options) {
  context.register('notEmptyFieldsSpecification', new NotEmptyFieldsSpecification({
    dataStore: context.get('schemaDataStore')
  }));
  context.register('notEmptyTablesSpecification', new NotEmptyTablesSpecification({
    dataStore: context.get('schemaDataStore')
  }));
  context.register('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec', new SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec({
    dataStore: context.get('schemaDataStore'),
    resourceProperties: context.get('resourcePropertiesReadOnlyFacade'),
    profileAttributesServiceCache: context.get('profileAttributesServiceCache'),
    viewStateModel: context.get('viewStateModelReadOnlyFacade')
  }));
  context.register('advancedJoinsMappingSpecification', advancedJoinsMappingSpecification);
  context.register('schemaResourcesNamesAreEqualSpecification', schemaResourcesNamesAreEqualSpecification);
}

module.exports = createSpecifications;

});