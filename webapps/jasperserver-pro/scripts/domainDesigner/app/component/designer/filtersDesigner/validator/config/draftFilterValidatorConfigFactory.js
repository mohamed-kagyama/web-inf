define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

var genericTypes = require("../../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConfig(options) {
  options = options || {};
  var config = {};
  config[filterOperandTypesEnum.LITERAL] = {};
  config[filterOperandTypesEnum.RANGE] = {}; // LITERAL VALIDATION CONFIG
  // LITERAL VALIDATION CONFIG

  config[filterOperandTypesEnum.LITERAL][genericTypes.INTEGER] = options.integerLiteralValidationRule;
  config[filterOperandTypesEnum.LITERAL][genericTypes.DECIMAL] = options.decimalLiteralValidationRule;
  config[filterOperandTypesEnum.LITERAL][genericTypes.DATE] = options.dateLiteralValidationRule;
  config[filterOperandTypesEnum.LITERAL][genericTypes.TIME] = options.timeLiteralValidationRule;
  config[filterOperandTypesEnum.LITERAL][genericTypes.TIMESTAMP] = options.timestampLiteralValidationRule;
  config[filterOperandTypesEnum.LITERAL][genericTypes.BOOLEAN] = options.booleanLiteralValidationRule; // RANGE VALIDATION CONFIG
  // RANGE VALIDATION CONFIG

  config[filterOperandTypesEnum.RANGE][genericTypes.INTEGER] = options.numberRangeValidationRule;
  config[filterOperandTypesEnum.RANGE][genericTypes.DECIMAL] = options.numberRangeValidationRule;
  config[filterOperandTypesEnum.RANGE][genericTypes.DATE] = options.dateRangeValidationRule;
  config[filterOperandTypesEnum.RANGE][genericTypes.TIME] = options.timeRangeValidationRule;
  config[filterOperandTypesEnum.RANGE][genericTypes.TIMESTAMP] = options.timestampRangeValidationRule;
  return config;
}

module.exports = {
  create: getConfig
};

});