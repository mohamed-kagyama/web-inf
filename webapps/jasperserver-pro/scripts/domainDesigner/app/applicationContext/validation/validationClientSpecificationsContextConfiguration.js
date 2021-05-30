define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = require("../../model/specification/SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec");

var DefaultSchemaExistsAndNotEmptySpecification = require("../../model/specification/DefaultSchemaExistsAndNotEmptySpecification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSpecifications(context, options) {
  context.register('validationSchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec', new SchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec({
    dataStore: context.get('domainValidationDataStore'),
    resourceProperties: context.get('resourcePropertiesForDomainSchemaValidationService'),
    viewStateModel: context.get('viewStateModelForDomainSchemaValidationService'),
    profileAttributesServiceCache: context.get('profileAttributesServiceCache')
  }));
  context.register('validationDefaultSchemaExistsAndNotEmptySpecification', new DefaultSchemaExistsAndNotEmptySpecification({
    dataStore: context.get('domainValidationDataStore')
  }));
}

module.exports = function (context, options) {
  createSpecifications(context, options);
};

});