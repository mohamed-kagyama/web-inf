define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandFactory = require("../factory/filterOperandFactory");

var filterObjectByOperatorFactory = require("../factory/filterObjectByOperatorFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(filter) {
    var isAll = filter.right.isAll,
        leftOperand = filterOperandFactory.create(filter.left),
        rightOperand = filterOperandFactory.create(filter.right);
    return filterObjectByOperatorFactory.create(filter.operator, {
      leftOperand: leftOperand,
      rightOperand: rightOperand,
      isAll: isAll
    });
  }
};

});