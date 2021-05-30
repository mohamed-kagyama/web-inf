define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require("../enum/expressionsEnum");

var expressionWalker = require('./expressionWalker');

var expressionVariableEscapingUtil = require('./expressionVariableEscapingUtil');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function collectVariables(expression) {
  var variables = [],
      isVariable = false;
  var handlers = {
    variable: function variable() {
      isVariable = true;
    },
    name: function name(value) {
      if (isVariable) {
        if (expressionVariableEscapingUtil.isVariableEscaped(value)) {
          value = expressionVariableEscapingUtil.unEscapeVariable(value);
        }

        variables.push(value);
        isVariable = false;
      }
    }
  };
  expressionWalker.walk(expression, handlers);
  return _.uniq(variables);
}

function updateVariableName(expression, variableNameUpdater) {
  var handlers = {
    variable: function variable(expression) {
      var key = expressionsEnum.operators.name.name;
      var updatedName = variableNameUpdater(expression[key]);

      if (!_.isUndefined(updatedName)) {
        expression[key] = updatedName;
      }
    }
  };
  expressionWalker.walk(expression, handlers);
  return expression;
}

module.exports = {
  collect: collectVariables,
  updateVariableName: updateVariableName
};

});