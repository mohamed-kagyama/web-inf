define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var converterUtil = require("../util/converterUtil");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function sortByNameLength(left, right) {
  return left.name.length - right.name.length;
}

function calcFieldsAddVariableNameProcessor(resource, options) {
  if (entityUtil.isField(resource.type)) {
    var calcFieldsContext = options.calcFieldsContext,
        contextKey = converterUtil.getContextKey(resource.resourceId, options);
    var variables = calcFieldsContext.availableVariables[contextKey];

    if (variables) {
      var sortedVariables = _.clone(variables).sort(sortByNameLength);

      resource.variableName = _.first(sortedVariables).name;
    }
  }

  return resource;
}

module.exports = calcFieldsAddVariableNameProcessor;

});