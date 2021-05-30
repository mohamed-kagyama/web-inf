define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var compositeAndValidationRuleFactory = require("../../../common/factory/compositeAndValidationRuleFactory");

var compositeOrValidationRuleFactory = require("../../../common/factory/compositeOrValidationRuleFactory");

var isRangeNotEmptyValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isRangeNotEmptyValidationRule");

var isValueInsideBoundariesValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueInsideBoundariesValidationRule");

var isValueDecimalValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueDecimalValidationRule");

var isValueIntegerValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueIntegerValidationRule");

var isValueDateValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueDateValidationRule");

var isValueTimeValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueTimeValidationRule");

var isValueTimestampValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueTimestampValidationRule");

var isValueBooleanValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueBooleanValidationRule");

var isNumberRangeCorrectValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isNumberRangeCorrectValidationRule");

var isDateRangeCorrectValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isDateRangeCorrectValidationRule");

var isTimeRangeCorrectValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isTimeRangeCorrectValidationRule");

var isTimestampRangeCorrectValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isTimestampRangeCorrectValidationRule");

var isValueCanBeEmptyValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueCanBeEmptyValidationRule");

var isValueProfileAttributeValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isValueProfileAttributeValidationRule");

var isRangeProfileAttributeValidationRule = require("../../../component/designer/filtersDesigner/validator/rules/isRangeProfileAttributeValidationRule");

var draftFilterValidatorConfigFactory = require("../../../component/designer/filtersDesigner/validator/config/draftFilterValidatorConfigFactory");

var FiltersDesignerDraftFilterValidator = require("../../../component/designer/filtersDesigner/validator/FiltersDesignerDraftFilterValidator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDraftFilterValidator(context, options) {
  var integerLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, compositeAndValidationRuleFactory.create([isValueCanBeEmptyValidationRule, isValueIntegerValidationRule, isValueInsideBoundariesValidationRule])]),
      decimalLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, compositeAndValidationRuleFactory.create([isValueCanBeEmptyValidationRule, isValueDecimalValidationRule, isValueInsideBoundariesValidationRule])]),
      dateLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, compositeAndValidationRuleFactory.create([isValueCanBeEmptyValidationRule, isValueDateValidationRule])]),
      timeLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, compositeAndValidationRuleFactory.create([isValueCanBeEmptyValidationRule, isValueTimeValidationRule])]),
      timestampLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, compositeAndValidationRuleFactory.create([isValueCanBeEmptyValidationRule, isValueTimestampValidationRule])]),
      booleanLiteralValidationRule = compositeOrValidationRuleFactory.create([isValueProfileAttributeValidationRule, isValueBooleanValidationRule]),
      numberRangeValidationRule = compositeAndValidationRuleFactory.create([isRangeNotEmptyValidationRule, compositeOrValidationRuleFactory.create([isRangeProfileAttributeValidationRule, isNumberRangeCorrectValidationRule])]),
      dateRangeValidationRule = compositeAndValidationRuleFactory.create([isRangeNotEmptyValidationRule, compositeOrValidationRuleFactory.create([isRangeProfileAttributeValidationRule, isDateRangeCorrectValidationRule])]),
      timeRangeValidationRule = compositeAndValidationRuleFactory.create([isRangeNotEmptyValidationRule, compositeOrValidationRuleFactory.create([isRangeProfileAttributeValidationRule, isTimeRangeCorrectValidationRule])]),
      timestampRangeValidationRule = compositeAndValidationRuleFactory.create([isRangeNotEmptyValidationRule, compositeOrValidationRuleFactory.create([isRangeProfileAttributeValidationRule, isTimestampRangeCorrectValidationRule])]);
  var draftFilterValidatorConfig = draftFilterValidatorConfigFactory.create({
    integerLiteralValidationRule: integerLiteralValidationRule,
    decimalLiteralValidationRule: decimalLiteralValidationRule,
    dateLiteralValidationRule: dateLiteralValidationRule,
    timeLiteralValidationRule: timeLiteralValidationRule,
    timestampLiteralValidationRule: timestampLiteralValidationRule,
    booleanLiteralValidationRule: booleanLiteralValidationRule,
    numberRangeValidationRule: numberRangeValidationRule,
    dateRangeValidationRule: dateRangeValidationRule,
    timeRangeValidationRule: timeRangeValidationRule,
    timestampRangeValidationRule: timestampRangeValidationRule
  });
  context.register('draftFilterValidatorConfig', draftFilterValidatorConfig);
  context.register('filtersDesignerDraftFilterValidator', new FiltersDesignerDraftFilterValidator({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    validatorConfig: context.get('draftFilterValidatorConfig')
  }));
}

module.exports = function (context, options) {
  createDraftFilterValidator(context, options);
};

});