define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionFormatEnum = require("../enum/expressionFormatEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function formatOperatorWithTwoOperands(options) {
  var leftOperand = options.leftOperand,
      rightOperand = options.rightOperand,
      operator = options.operator;
  var template = expressionFormatEnum[operator];
  return template({
    leftOperand: leftOperand,
    rightOperand: rightOperand
  });
}

module.exports = {
  formatOperatorWithTwoOperands: formatOperatorWithTwoOperands
};

});