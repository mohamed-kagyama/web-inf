define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypesEnum = require("../../../../../../../model/schema/enum/filterOperandTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConfig(options) {
  var config = {};
  config[filterOperandTypesEnum.LITERAL] = {};
  config[filterOperandTypesEnum.LIST] = {};
  config[filterOperandTypesEnum.RANGE] = {};
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.INTEGER] = [options.emptyStringToNullConverter, options.profileAttributeConverter, options.stringToNumberConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.DECIMAL] = [options.emptyStringToNullConverter, options.profileAttributeConverter, options.stringToNumberConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.STRING] = [options.nullLabelToNullConverter, options.profileAttributeConverter, options.identityConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.BOOLEAN] = [options.booleanStringToBooleanConverter, options.profileAttributeConverter, options.emptyStringToNullConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.DATE] = [options.emptyStringToNullConverter, options.profileAttributeConverter, options.localizedDateToIsoDateConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.TIME] = [options.emptyStringToNullConverter, options.profileAttributeConverter, options.localizedTimeToIsoTimeConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.TIMESTAMP] = [options.emptyStringToNullConverter, options.profileAttributeConverter, options.localizedTimestampToIsoTimestampConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.INTEGER] = [options.listNumberConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.DECIMAL] = [options.listNumberConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.STRING] = [options.listStringConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.BOOLEAN] = [options.listBooleanConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.INTEGER] = [options.rangeNumberConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.DECIMAL] = [options.rangeNumberConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.DATE] = [options.rangeDateConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.TIME] = [options.rangeTimeConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.TIMESTAMP] = [options.rangeTimestampConverter];
  return config;
}

module.exports = {
  create: function create(options) {
    options = options || {};
    return getConfig(options);
  }
};

});