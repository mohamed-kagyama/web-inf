define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var dataTypesForAvailableValuesCheck = require("./list/dataTypesForAvailableValuesCheck");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isSwitchingToSingleSelect(options) {
  var currentFilter = options.currentFilter,
      newFilterOptions = options.newFilterOptions,
      isLiteral = filterOperandTypeUtil.isLiteral(newFilterOptions.rightOperandType);
  var isRawValueEditor = !_.isUndefined(newFilterOptions.isRawValueEditor) ? newFilterOptions.isRawValueEditor : currentFilter.isRawValueEditor;
  return isLiteral && !isRawValueEditor;
}

function isSwitchingToMultiSelect(options) {
  var newFilterOptions = options.newFilterOptions;
  return filterOperandTypeUtil.isList(newFilterOptions.rightOperandType);
}

var ShouldCheckAvailableValuesLoadingForDraftFilterSpecification = function ShouldCheckAvailableValuesLoadingForDraftFilterSpecification(options) {
  this.initialize(options);
};

_.extend(ShouldCheckAvailableValuesLoadingForDraftFilterSpecification.prototype, {
  initialize: function initialize(options) {
    this.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification = options.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var currentFilter = options.currentFilter,
        dataType = currentFilter.dataType;
    var supportedDataType = _.indexOf(dataTypesForAvailableValuesCheck, dataType) >= 0;
    var switchingToEditorWithAvailableValues = supportedDataType && (isSwitchingToSingleSelect(options) || isSwitchingToMultiSelect(options));
    return switchingToEditorWithAvailableValues || this.isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification.isSatisfiedBy(options);
  }
});

module.exports = ShouldCheckAvailableValuesLoadingForDraftFilterSpecification;

});