define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesConverterContextConfigurationFactory = require("../dependenciesTracking/factory/dependenciesConverterContextConfigurationFactory");

var FilterExpressionSerializer = require("../../util/designer/filters/serializer/FilterExpressionSerializer");

var ClientDomainSchemaFiltersService = require("../../model/service/ClientDomainSchemaFiltersService");

var oneOfConvertersConverterFactory = require("../../common/util/oneOfConvertersConverterFactory");

var VariableToStringOperandConverter = require("../../util/designer/filters/converter/operandConverter/VariableToStringOperandConverter");

var filterSerializationOperandConverterConfigFactory = require("../../util/designer/filters/converter/config/filterSerializationOperandConverterConfigFactory");

var FilterOperandConverter = require("../../util/designer/filters/converter/FilterOperandConverter");

var FilterOperatorConverter = require("../../util/designer/filters/converter/FilterOperatorConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDomainValidationDependenciesConverter(context, options) {
  var clientDomainSchemaFiltersService = new ClientDomainSchemaFiltersService({
    dataStore: context.get('domainValidationDataStore')
  });
  var filterExpressionSerializer = new FilterExpressionSerializer({
    clientDomainSchemaFiltersService: clientDomainSchemaFiltersService,
    filterOperandConverter: context.get('filterSerializationOperandConverterForDomainValidation'),
    filterOperatorConverter: new FilterOperatorConverter({})
  });
  context.register('validationDependenciesTrackingConverter', dependenciesConverterContextConfigurationFactory.create({
    dependencyItemHeight: options.dependenciesInspector.itemHeight,
    clientDomainSchemaService: context.get('clientDomainValidationSchemaService'),
    filterExpressionSerializer: filterExpressionSerializer,
    schemaPathGenerationService: context.get('clientDomainValidationSchemaPathGenerationService')
  }));
}

function createShowFilterConvertersConfigForDomainValidation(context, options) {
  var filterSerializationOperandConverterConfig = filterSerializationOperandConverterConfigFactory.create({
    profileAttributeConverter: context.get('filterSerializationOperandProfileAttributeConverter'),
    booleanToStringConverter: context.get('filterSerializationOperandBooleanToStringConverter'),
    nullToNullLabelConverter: context.get('filterSerializationOperandNullToNullLabelConverter'),
    numberToStringConverter: context.get('filterSerializationOperandNumberToStringConverter'),
    isoDateToLocalizedDateConverter: context.get('filterSerializationOperandIsoDateToLocalizedDateConverter'),
    isoTimeToLocalizedTimeConverter: context.get('filterSerializationOperandIsoTimeToLocalizedTimeConverter'),
    isoTimestampToLocalizedTimestampConverter: context.get('filterSerializationOperandIsoTimestampToLocalizedTimestampConverter'),
    identityConverter: context.get('filterSerializationOperandIdentityConverter'),
    numberRangeToStringOperandConverter: context.get('filterSerializationOperandNumberRangeToStringOperandConverter'),
    dateRangeToStringOperandConverter: context.get('filterSerializationOperandDateRangeToStringOperandConverter'),
    timeRangeToStringOperandConverter: context.get('filterSerializationOperandTimeRangeToStringOperandConverter'),
    timestampRangeToStringOperandConverter: context.get('filterSerializationOperandTimestampRangeToStringOperandConverter'),
    numberListToStringOperandConverter: context.get('filterSerializationOperandNumberListToStringOperandConverter'),
    booleanListToStringOperandConverter: context.get('filterSerializationOperandBooleanListToStringOperandConverter'),
    stringListToStringOperandConverter: context.get('filterSerializationOperandStringListToStringOperandConverter'),
    variableToStringOperandConverter: new VariableToStringOperandConverter({
      clientDomainSchemaService: context.get('clientDomainValidationSchemaService')
    })
  });
  context.register('filterSerializationOperandConverterForDomainValidation', new FilterOperandConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterOperandConverterConfig: filterSerializationOperandConverterConfig
  }));
}

module.exports = function (context, options) {
  createShowFilterConvertersConfigForDomainValidation(context, options);
  createDomainValidationDependenciesConverter(context, options);
};

});