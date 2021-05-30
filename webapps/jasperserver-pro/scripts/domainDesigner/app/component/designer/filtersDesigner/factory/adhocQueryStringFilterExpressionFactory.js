define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientExpressionsEnum = require("../../../../model/enum/clientExpressionsEnum");

var getIsNullOrOriginalExpression = require("./util/getIsNullOrOriginalExpression");

var getFunctionExpression = require("./util/getFunctionExpression");

var getStringValueOperand = require("./util/getStringValueOperand");

var getVariableOperand = require("./util/getVariableOperand");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var criteria = options.criteria,
        fieldName = options.fieldName;
    return {
      "object": getIsNullOrOriginalExpression({
        criteria: criteria,
        fieldName: fieldName,
        originalExpression: getFunctionExpression({
          functionName: clientExpressionsEnum.functions.contains.name,
          leftOperand: getVariableOperand(fieldName),
          rightOperand: getStringValueOperand(criteria)
        })
      })
    };
  }
};

});