define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ADH_FUNCTION_AGGREGATE_NAME_PREFIX = 'adh.function.aggregate.name.';

function getLocalizedAggregateFunction(aggFuncName) {
  var label = i18n[ADH_FUNCTION_AGGREGATE_NAME_PREFIX + aggFuncName];
  return label || aggFuncName;
}

module.exports = {
  localizeAggregation: getLocalizedAggregateFunction,
  getLabel: function getLabel(field) {
    if (!field) {
      return null;
    }

    var fieldName = field.fieldDisplay || field.name;
    return field.defaultAggregateFunction === field.functionOrDefault ? fieldName : fieldName + ' (' + getLocalizedAggregateFunction(field['function']) + ')';
  }
};

});