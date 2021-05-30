define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var validationEventBusesContextConfiguration = require('./validationEventBusesContextConfiguration');

var validationDialogsContextConfiguration = require('./validationDialogsContextConfiguration');

var validationDomainServicesContextConfiguration = require('./validationDomainServicesContextConfiguration');

var validationClientSpecificationsContextConfiguration = require("./validationClientSpecificationsContextConfiguration");

var validationDomainSchemaServicesContextConfiguration = require('./validationDomainSchemaServicesContextConfiguration');

var validationDependenciesConverterContextConfiguration = require("./validationDependenciesConverterContextConfiguration");

var validationSchemaMappingContextConfiguration = require('./validationSchemaMappingContextConfiguration');

var validationErrorHandlingContextConfiguration = require('./validationErrorHandlingContextConfiguration');

var validationStateContextConfiguration = require('./validationStateContextConfiguration');

var validationEntityCollectorContextConfiguration = require("./validationEntityCollectorContextConfiguration");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDomainValidation(context, options) {
  validationEventBusesContextConfiguration(context, options);
  validationDomainSchemaServicesContextConfiguration(context, options);
  validationDomainServicesContextConfiguration(context, options);
  validationClientSpecificationsContextConfiguration(context, options);
  validationDialogsContextConfiguration(context, options);
  validationDependenciesConverterContextConfiguration(context, options);
  validationEntityCollectorContextConfiguration(context, options);
  validationSchemaMappingContextConfiguration(context, options);
  validationErrorHandlingContextConfiguration(context, options);
  validationStateContextConfiguration(context, options);
}

module.exports = createDomainValidation;

});