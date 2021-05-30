define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperators = require('../enum/filterOperators');

var filterDataTypes = require('../enum/filterDataTypes');

var _ = require('underscore');

var i18n = require("bundle!AdHocFiltersBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var baseFilterOperatorLabelCodes = {};
baseFilterOperatorLabelCodes[filterOperators.IN] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IN';
baseFilterOperatorLabelCodes[filterOperators.NOT_IN] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_IN';
baseFilterOperatorLabelCodes[filterOperators.BETWEEN] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_BETWEEN';
baseFilterOperatorLabelCodes[filterOperators.NOT_BETWEEN] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_BETWEEN';
baseFilterOperatorLabelCodes[filterOperators.EQUALS] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_EQUAL';
baseFilterOperatorLabelCodes[filterOperators.NOT_EQUAL] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_EQUAL';
baseFilterOperatorLabelCodes[filterOperators.CONTAINS] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_CONTAINS';
baseFilterOperatorLabelCodes[filterOperators.NOT_CONTAINS] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_CONTAINS';
baseFilterOperatorLabelCodes[filterOperators.GREATER] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_GREATER';
baseFilterOperatorLabelCodes[filterOperators.GREATER_OR_EQUAL] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IS_GREATER_OR_EQUAL';
baseFilterOperatorLabelCodes[filterOperators.LESS] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_LESS';
baseFilterOperatorLabelCodes[filterOperators.LESS_OR_EQUAL] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_LESS_OR_EQUAL';
baseFilterOperatorLabelCodes[filterOperators.BETWEEN_DATES] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_BETWEEN';
baseFilterOperatorLabelCodes[filterOperators.NOT_BETWEEN_DATES] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_BETWEEN';
baseFilterOperatorLabelCodes[filterOperators.STARTS_WITH] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_STARTS';
baseFilterOperatorLabelCodes[filterOperators.NOT_STARTS_WITH] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_STARTS';
baseFilterOperatorLabelCodes[filterOperators.ENDS_WITH] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_ENDS';
baseFilterOperatorLabelCodes[filterOperators.NOT_ENDS_WITH] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_NOT_ENDS';
var datetimeFilterOperatorLabelCodes = {};

_.extend(datetimeFilterOperatorLabelCodes, baseFilterOperatorLabelCodes);

datetimeFilterOperatorLabelCodes[filterOperators.GREATER] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IS_AFTER';
datetimeFilterOperatorLabelCodes[filterOperators.GREATER_OR_EQUAL] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IS_ON_OR_AFTER';
datetimeFilterOperatorLabelCodes[filterOperators.LESS] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IS_BEFORE';
datetimeFilterOperatorLabelCodes[filterOperators.LESS_OR_EQUAL] = 'ADH_1211_DYNAMIC_FILTER_COMPARISON_OPERATOR_IS_ON_OR_BEFORE';

module.exports = function (operatorName, dataType) {
  var labelCodes = baseFilterOperatorLabelCodes;

  if (_.include([filterDataTypes.TIME, filterDataTypes.TIMESTAMP, filterDataTypes.DATE], dataType)) {
    labelCodes = datetimeFilterOperatorLabelCodes;
  }

  if (!(operatorName in labelCodes) || !(labelCodes[operatorName] in i18n)) {
    return operatorName;
  } else {
    return i18n[labelCodes[operatorName]];
  }
};

});