define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var listValuesConverterFactory = require("../../../util/designer/filters/converter/factory/listValuesConverterFactory");

var literalOperandValueConverterFactory = require("../../../util/designer/filters/converter/factory/literalOperandValueConverterFactory");

var rangeOperandConverterFactory = require("../../../util/designer/filters/converter/factory/rangeOperandConverterFactory");

var oneOfConvertersConverterFactory = require("../../../common/util/oneOfConvertersConverterFactory");

var profileAttributeConverter = require("../../../util/designer/filters/converter/valueConverter/profileAttributeConverter");

var nullToNullLabelConverter = require("../../../util/designer/filters/converter/valueConverter/nullToNullLabelConverter");

var numberToStringConverter = require("../../../util/designer/filters/converter/valueConverter/numberToStringConverter");

var identityConverter = require("../../../util/designer/filters/converter/valueConverter/identityConverter");

var booleanToStringConverter = require("../../../util/designer/filters/converter/valueConverter/booleanToStringConverter");

var isoDateToLocalizedDateConverter = require("../../../util/designer/filters/converter/valueConverter/isoDateToLocalizedDateConverter");

var isoTimeToLocalizedTimeConverter = require("../../../util/designer/filters/converter/valueConverter/isoTimeToLocalizedTimeConverter");

var isoTimestampToLocalizedTimestampConverter = require("../../../util/designer/filters/converter/valueConverter/isoTimestampToLocalizedTimestampConverter");

var ListToStringOperandConverter = require("../../../util/designer/filters/converter/operandConverter/ListToStringOperandConverter");

var RangeToStringOperandConverter = require("../../../util/designer/filters/converter/operandConverter/RangeToStringOperandConverter");

var VariableToStringOperandConverter = require("../../../util/designer/filters/converter/operandConverter/VariableToStringOperandConverter");

var VariableWithSourceToStringOperandConverter = require("../../../util/designer/filters/converter/operandConverter/VariableWithSourceToStringOperandConverter");

var filterSerializationOperandConverterConfigFactory = require("../../../util/designer/filters/converter/config/filterSerializationOperandConverterConfigFactory");

var FilterOperandConverter = require("../../../util/designer/filters/converter/FilterOperandConverter");

var FilterOperatorConverter = require("../../../util/designer/filters/converter/FilterOperatorConverter");

var FilterExpressionSerializer = require("../../../util/designer/filters/serializer/FilterExpressionSerializer");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createFilterExpressionSerializationConverters(context, options) {
  var numberListToStringOperandConverter = new ListToStringOperandConverter({
    maxStringWidth: options.filtersDesigner.width.isOneOf,
    listItemsConverter: listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToNullLabelConverter, numberToStringConverter]))
  }),
      stringListToStringOperandConverter = new ListToStringOperandConverter({
    maxStringWidth: options.filtersDesigner.width.isOneOf,
    listItemsConverter: listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToNullLabelConverter, identityConverter]))
  }),
      booleanListToStringOperandConverter = new ListToStringOperandConverter({
    maxStringWidth: options.filtersDesigner.width.isOneOf,
    listItemsConverter: listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToNullLabelConverter, booleanToStringConverter]))
  }),
      numberRangeToStringOperandConverter = new RangeToStringOperandConverter({
    converter: rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, numberToStringConverter]))
  }),
      dateRangeToStringOperandConverter = new RangeToStringOperandConverter({
    converter: rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoDateToLocalizedDateConverter]))
  }),
      timeRangeToStringOperandConverter = new RangeToStringOperandConverter({
    converter: rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoTimeToLocalizedTimeConverter]))
  }),
      timestampRangeToStringOperandConverter = new RangeToStringOperandConverter({
    converter: rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoTimestampToLocalizedTimestampConverter]))
  });
  context.register('filterSerializationOperandProfileAttributeConverter', literalOperandValueConverterFactory.create(profileAttributeConverter));
  context.register('filterSerializationOperandBooleanToStringConverter', literalOperandValueConverterFactory.create(booleanToStringConverter));
  context.register('filterSerializationOperandNullToNullLabelConverter', literalOperandValueConverterFactory.create(nullToNullLabelConverter));
  context.register('filterSerializationOperandNumberToStringConverter', literalOperandValueConverterFactory.create(numberToStringConverter));
  context.register('filterSerializationOperandIsoDateToLocalizedDateConverter', literalOperandValueConverterFactory.create(isoDateToLocalizedDateConverter));
  context.register('filterSerializationOperandIsoTimeToLocalizedTimeConverter', literalOperandValueConverterFactory.create(isoTimeToLocalizedTimeConverter));
  context.register('filterSerializationOperandIsoTimestampToLocalizedTimestampConverter', literalOperandValueConverterFactory.create(isoTimestampToLocalizedTimestampConverter));
  context.register('filterSerializationOperandIdentityConverter', literalOperandValueConverterFactory.create(identityConverter));
  context.register('filterSerializationOperandNumberRangeToStringOperandConverter', numberRangeToStringOperandConverter);
  context.register('filterSerializationOperandDateRangeToStringOperandConverter', dateRangeToStringOperandConverter);
  context.register('filterSerializationOperandTimeRangeToStringOperandConverter', timeRangeToStringOperandConverter);
  context.register('filterSerializationOperandTimestampRangeToStringOperandConverter', timestampRangeToStringOperandConverter);
  context.register('filterSerializationOperandNumberListToStringOperandConverter', numberListToStringOperandConverter);
  context.register('filterSerializationOperandBooleanListToStringOperandConverter', booleanListToStringOperandConverter);
  context.register('filterSerializationOperandStringListToStringOperandConverter', stringListToStringOperandConverter);
  var genericFilterOperandConverterConfig = {
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
    stringListToStringOperandConverter: context.get('filterSerializationOperandStringListToStringOperandConverter')
  };

  var filterOperandConverterConfigWithDefaultVariableToStringConverter = _.extend({}, genericFilterOperandConverterConfig, {
    variableToStringOperandConverter: new VariableToStringOperandConverter({
      clientDomainSchemaService: context.get('clientDomainSchemaService')
    })
  });

  var filterOperandConverterConfigForFiltersDesigner = _.extend({}, genericFilterOperandConverterConfig, {
    variableToStringOperandConverter: new VariableWithSourceToStringOperandConverter({
      clientDomainSchemaService: context.get('clientDomainSchemaService')
    })
  });

  var filterSerializationOperandConverterConfigWithDefaultVariableToStringConverter = filterSerializationOperandConverterConfigFactory.create(filterOperandConverterConfigWithDefaultVariableToStringConverter);
  var filterSerializationOperandConverterConfigForFiltersDesigner = filterSerializationOperandConverterConfigFactory.create(filterOperandConverterConfigForFiltersDesigner);
  context.register('filterSerializationOperandConverterWithDefaultVariableToStringConverter', new FilterOperandConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterOperandConverterConfig: filterSerializationOperandConverterConfigWithDefaultVariableToStringConverter
  }));
  context.register('filterSerializationOperandConverterForFiltersDesigner', new FilterOperandConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterOperandConverterConfig: filterSerializationOperandConverterConfigForFiltersDesigner
  }));
}

function createFilterExpressionSerializer(context, options) {
  context.register('filterExpressionSerializer', new FilterExpressionSerializer({
    clientDomainSchemaFiltersService: context.get('clientDomainSchemaFiltersService'),
    filterOperandConverter: context.get('filterSerializationOperandConverterWithDefaultVariableToStringConverter'),
    filterOperatorConverter: new FilterOperatorConverter({})
  }));
  context.register('filterExpressionSerializerForFiltersDesigner', new FilterExpressionSerializer({
    clientDomainSchemaFiltersService: context.get('clientDomainSchemaFiltersService'),
    filterOperandConverter: context.get('filterSerializationOperandConverterForFiltersDesigner'),
    filterOperatorConverter: new FilterOperatorConverter({})
  }));
}

module.exports = function (context, options) {
  createFilterExpressionSerializationConverters(context, options);
  createFilterExpressionSerializer(context, options);
};

});