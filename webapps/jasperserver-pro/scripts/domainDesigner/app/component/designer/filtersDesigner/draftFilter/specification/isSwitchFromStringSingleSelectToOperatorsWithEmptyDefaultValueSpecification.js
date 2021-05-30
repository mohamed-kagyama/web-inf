define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypesEnum = require("../../../../../../model/schema/enum/genericTypesEnum");

var operatorsForAvailableValuesCheck = require("./list/operatorsForAvailableValuesCheck");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isSwitchingFromSingleSelect(options) {
  var currentFilter = options.currentFilter,
      rightOperand = currentFilter.expression.right,
      isLiteral = rightOperand && filterOperandTypeUtil.isLiteral(rightOperand.type);
  return isLiteral && !currentFilter.isRawValueEditor;
}

module.exports = {
  isSatisfiedBy: function isSatisfiedBy(options) {
    var supportedOperator = _.indexOf(operatorsForAvailableValuesCheck, options.newFilterOptions.operator) >= 0,
        dataType = options.currentFilter.dataType;
    return dataType === genericTypesEnum.STRING && isSwitchingFromSingleSelect(options) && supportedOperator;
  }
};

});