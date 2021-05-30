define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

var genericTypesEnum = require("../../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConfig(options) {
  var config = {};
  config[filterOperandTypesEnum.LITERAL] = {};
  config[filterOperandTypesEnum.RANGE] = {};
  config[filterOperandTypesEnum.LIST] = {};
  config[filterOperandTypesEnum.VARIABLE] = {};
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.INTEGER] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.numberToStringConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.DECIMAL] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.numberToStringConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.BOOLEAN] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.booleanToStringConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.TIME] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.isoTimeToLocalizedTimeConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.TIMESTAMP] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.isoTimestampToLocalizedTimestampConverter];
  config[filterOperandTypesEnum.LITERAL][genericTypesEnum.DATE] = [options.nullToNullLabelConverter, options.profileAttributeConverter, options.isoDateToLocalizedDateConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.INTEGER] = [options.numberListToStringOperandConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.DECIMAL] = [options.numberListToStringOperandConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.STRING] = [options.stringListToStringOperandConverter];
  config[filterOperandTypesEnum.LIST][genericTypesEnum.BOOLEAN] = [options.booleanListToStringOperandConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.INTEGER] = [options.numberRangeToStringOperandConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.DECIMAL] = [options.numberRangeToStringOperandConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.DATE] = [options.dateRangeToStringOperandConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.TIME] = [options.timeRangeToStringOperandConverter];
  config[filterOperandTypesEnum.RANGE][genericTypesEnum.TIMESTAMP] = [options.timestampRangeToStringOperandConverter];
  config[filterOperandTypesEnum.LITERAL].ANY = [options.nullToNullLabelConverter, options.identityConverter];
  config[filterOperandTypesEnum.VARIABLE].ANY = [options.variableToStringOperandConverter];
  return config;
}

module.exports = {
  create: function create(options) {
    return getConfig(options);
  }
};

});