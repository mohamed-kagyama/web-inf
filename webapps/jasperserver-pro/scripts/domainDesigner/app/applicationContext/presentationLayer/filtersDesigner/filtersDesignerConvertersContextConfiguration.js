define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var listValuesConverterFactory = require("../../../util/designer/filters/converter/factory/listValuesConverterFactory");

var listOperandConverterFactory = require("../../../util/designer/filters/converter/factory/listOperandConverterFactory");

var literalOperandConverterFactory = require("../../../util/designer/filters/converter/factory/literalOperandConverterFactory");

var rangeOperandConverterFactory = require("../../../util/designer/filters/converter/factory/rangeOperandConverterFactory");

var oneOfConvertersConverterFactory = require("../../../common/util/oneOfConvertersConverterFactory");

var eachOfConvertersConverterFactory = require("../../../common/util/eachOfConvertersConverterFactory");

var genericTypesEnum = require("../../../../model/schema/enum/genericTypesEnum");

var profileAttributeConverter = require("../../../util/designer/filters/converter/valueConverter/profileAttributeConverter");

var nullToNullLabelConverter = require("../../../util/designer/filters/converter/valueConverter/nullToNullLabelConverter");

var numberToStringConverter = require("../../../util/designer/filters/converter/valueConverter/numberToStringConverter");

var identityConverter = require("../../../util/designer/filters/converter/valueConverter/identityConverter");

var nullToEmptyStringConverter = require("../../../util/designer/filters/converter/valueConverter/nullToEmptyStringConverter");

var numberToStringWithoutThousandsDelimiterConverter = require("../../../util/designer/filters/converter/valueConverter/numberToStringWithoutThousandsDelimiterConverter");

var booleanToStringConverter = require("../../../util/designer/filters/converter/valueConverter/booleanToStringConverter");

var isoDateToLocalizedDateConverter = require("../../../util/designer/filters/converter/valueConverter/isoDateToLocalizedDateConverter");

var isoTimeToLocalizedTimeConverter = require("../../../util/designer/filters/converter/valueConverter/isoTimeToLocalizedTimeConverter");

var isoTimestampToLocalizedTimestampConverter = require("../../../util/designer/filters/converter/valueConverter/isoTimestampToLocalizedTimestampConverter");

var onShowListValuesConverterConfigFactory = require("../../../component/designer/filtersDesigner/util/converter/selectedValues/onShowListValuesConverterConfigFactory");

var emptyStringToNullLabelConverter = require("../../../util/designer/filters/converter/valueConverter/emptyStringToNullLabelConverter");

var emptyStringToNullConverter = require("../../../util/designer/filters/converter/valueConverter/emptyStringToNullConverter");

var stringToNumberConverter = require("../../../util/designer/filters/converter/valueConverter/stringToNumberConverter");

var nullLabelToNullConverter = require("../../../util/designer/filters/converter/valueConverter/nullLabelToNullConverter");

var nullLabelToEmptyStringConverter = require("../../../util/designer/filters/converter/valueConverter/nullLabelToEmptyStringConverter");

var booleanStringToBooleanConverter = require("../../../util/designer/filters/converter/valueConverter/booleanStringToBooleanConverter");

var localizedDateToIsoDateConverter = require("../../../util/designer/filters/converter/valueConverter/localizedDateToIsoDateConverter");

var localizedTimeToIsoTimeConverter = require("../../../util/designer/filters/converter/valueConverter/localizedTimeToIsoTimeConverter");

var localizedTimestampToIsoTimestampConverter = require("../../../util/designer/filters/converter/valueConverter/localizedTimestampToIsoTimestampConverter");

var availableValuesLabelConverterConfigFactory = require("../../../component/designer/filtersDesigner/util/converter/availableValues/availableValuesLabelConverterConfigFactory");

var availableValuesValueConverterConfigFactory = require("../../../component/designer/filtersDesigner/util/converter/availableValues/availableValuesValueConverterConfigFactory");

var onEditDraftFilterOperandConverterConfigFactory = require("../../../component/designer/filtersDesigner/util/converter/onEditDraftFilter/onEditDraftFilterOperandConverterConfigFactory");

var onSaveDraftFilterOperandConverterConfigFactory = require("../../../component/designer/filtersDesigner/util/converter/onSaveDraftFilter/onSaveDraftFilterOperandConverterConfigFactory");

var FiltersDesignerListValuesConverter = require("../../../component/designer/filtersDesigner/util/FiltersDesignerListValuesConverter");

var FilterOperandConverter = require("../../../util/designer/filters/converter/FilterOperandConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function registerConverters(context, options) {
  context.register('stringToNumberConverter', stringToNumberConverter);
}

function createAvailableValuesConverterConfigs(context, options) {
  context.register('availableValuesLabelConverterConfig', availableValuesLabelConverterConfigFactory.create({
    nullToNullLabelConverter: nullToNullLabelConverter,
    identityConverter: identityConverter,
    numberToStringConverter: numberToStringConverter
  }));
  context.register('availableValuesLabelConverter', new FiltersDesignerListValuesConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterListValuesConverterConfig: context.get('availableValuesLabelConverterConfig')
  }));
  context.register('availableValuesValueConverterConfig', availableValuesValueConverterConfigFactory.create({
    nullToNullLabelConverter: nullToNullLabelConverter,
    identityConverter: identityConverter,
    numberToStringConverter: numberToStringConverter
  }));
  context.register('availableValuesValueConverter', new FiltersDesignerListValuesConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterListValuesConverterConfig: context.get('availableValuesValueConverterConfig')
  }));
}

function createEditDraftFilterConvertersConfig(context, options) {
  var listNumberConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToEmptyStringConverter, numberToStringConverter]))),
      listStringConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToNullLabelConverter, identityConverter]))),
      listBooleanConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullToEmptyStringConverter, booleanToStringConverter]))),
      rangeNumberConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, numberToStringWithoutThousandsDelimiterConverter])),
      rangeDateConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoDateToLocalizedDateConverter])),
      rangeTimeConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoTimeToLocalizedTimeConverter])),
      rangeTimestampConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, isoTimestampToLocalizedTimestampConverter]));
  context.register('onEditDraftFilterOperandConverterConfig', onEditDraftFilterOperandConverterConfigFactory.create({
    profileAttributeConverter: literalOperandConverterFactory.create(profileAttributeConverter),
    nullToEmptyStringConverter: literalOperandConverterFactory.create(nullToEmptyStringConverter),
    nullToNullLabelConverter: literalOperandConverterFactory.create(nullToNullLabelConverter),
    numberToStringWithoutThousandsDelimiterConverter: literalOperandConverterFactory.create(numberToStringWithoutThousandsDelimiterConverter),
    booleanToStringConverter: literalOperandConverterFactory.create(booleanToStringConverter),
    isoDateToLocalizedDateConverter: literalOperandConverterFactory.create(isoDateToLocalizedDateConverter),
    isoTimeToLocalizedTimeConverter: literalOperandConverterFactory.create(isoTimeToLocalizedTimeConverter),
    isoTimestampToLocalizedTimestampConverter: literalOperandConverterFactory.create(isoTimestampToLocalizedTimestampConverter),
    identityConverter: literalOperandConverterFactory.create(identityConverter),
    rangeNumberConverter: rangeNumberConverter,
    rangeDateConverter: rangeDateConverter,
    rangeTimeConverter: rangeTimeConverter,
    rangeTimestampConverter: rangeTimestampConverter,
    listNumberConverter: listNumberConverter,
    listStringConverter: listStringConverter,
    listBooleanConverter: listBooleanConverter
  }));
  context.register('filtersDesignerOnEditDraftFilterRightOperandConverter', new FilterOperandConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterOperandConverterConfig: context.get('onEditDraftFilterOperandConverterConfig')
  }));
}

function createSaveDraftFilterConvertersConfig(context, options) {
  var listNumberConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([emptyStringToNullConverter, stringToNumberConverter]))),
      listStringConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullLabelToNullConverter, identityConverter]))),
      listBooleanConverter = listOperandConverterFactory.create(listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([emptyStringToNullConverter, booleanStringToBooleanConverter]))),
      rangeNumberConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, stringToNumberConverter])),
      rangeDateConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, localizedDateToIsoDateConverter])),
      rangeTimeConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, localizedTimeToIsoTimeConverter])),
      rangeTimestampConverter = rangeOperandConverterFactory.create(oneOfConvertersConverterFactory.create([profileAttributeConverter, localizedTimestampToIsoTimestampConverter]));
  context.register('onSaveDraftFilterOperandConverterConfig', onSaveDraftFilterOperandConverterConfigFactory.create({
    profileAttributeConverter: literalOperandConverterFactory.create(profileAttributeConverter),
    emptyStringToNullConverter: literalOperandConverterFactory.create(emptyStringToNullConverter),
    stringToNumberConverter: literalOperandConverterFactory.create(stringToNumberConverter),
    nullLabelToNullConverter: literalOperandConverterFactory.create(nullLabelToNullConverter),
    booleanStringToBooleanConverter: literalOperandConverterFactory.create(booleanStringToBooleanConverter),
    localizedDateToIsoDateConverter: literalOperandConverterFactory.create(localizedDateToIsoDateConverter),
    localizedTimeToIsoTimeConverter: literalOperandConverterFactory.create(localizedTimeToIsoTimeConverter),
    localizedTimestampToIsoTimestampConverter: literalOperandConverterFactory.create(localizedTimestampToIsoTimestampConverter),
    identityConverter: literalOperandConverterFactory.create(identityConverter),
    rangeNumberConverter: rangeNumberConverter,
    rangeDateConverter: rangeDateConverter,
    rangeTimeConverter: rangeTimeConverter,
    rangeTimestampConverter: rangeTimestampConverter,
    listNumberConverter: listNumberConverter,
    listStringConverter: listStringConverter,
    listBooleanConverter: listBooleanConverter
  }));
  context.register('filtersDesignerOnSaveDraftFilterRightOperandConverter', new FilterOperandConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterOperandConverterConfig: context.get('onSaveDraftFilterOperandConverterConfig')
  }));
}

function createListSelectedValuesConvertersConfig(context, options) {
  var onShowListValuesConverter = listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([emptyStringToNullLabelConverter, identityConverter]));
  var onShowListValuesConverterConfig = onShowListValuesConverterConfigFactory.create({
    onShowListValuesConverter: onShowListValuesConverter
  });
  context.register('filtersDesignerOnShowListValuesConverter', new FiltersDesignerListValuesConverter({
    oneOfConvertersConverterFactory: oneOfConvertersConverterFactory,
    filterListValuesConverterConfig: onShowListValuesConverterConfig
  }));
  var onSelectListValuesConverter = listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullLabelToEmptyStringConverter, identityConverter]));
  var onSelectNumberValuesConverter = eachOfConvertersConverterFactory.create([listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullLabelToEmptyStringConverter, identityConverter]))]);
  var onSelectBooleanValuesConverter = eachOfConvertersConverterFactory.create([listValuesConverterFactory.create(oneOfConvertersConverterFactory.create([nullLabelToEmptyStringConverter, identityConverter]))]);
  var onSelectStringValuesConverter = eachOfConvertersConverterFactory.create([listValuesConverterFactory.create(identityConverter)]);
  var onSelectListValuesConverterConfig = {};
  onSelectListValuesConverterConfig[genericTypesEnum.INTEGER] = onSelectNumberValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.DECIMAL] = onSelectNumberValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.BOOLEAN] = onSelectBooleanValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.STRING] = onSelectStringValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.DATE] = onSelectListValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.TIME] = onSelectListValuesConverter;
  onSelectListValuesConverterConfig[genericTypesEnum.TIMESTAMP] = onSelectListValuesConverter;
  context.register('onSelectListValuesConverterConfig', onSelectListValuesConverterConfig);
}

module.exports = function (context, options) {
  registerConverters(context, options);
  createAvailableValuesConverterConfigs(context, options);
  createEditDraftFilterConvertersConfig(context, options);
  createSaveDraftFilterConvertersConfig(context, options);
  createListSelectedValuesConvertersConfig(context, options);
};

});