define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/filterExpressionTemplate.htm");

var leftOperand = require('./leftOperand');

var operator = require('./operator');

var rightOperand = require('./rightOperand');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['filter'],
      components: {
        leftOperand: leftOperand,
        operator: operator,
        rightOperand: rightOperand,
        cellActions: options.cellActions
      },
      methods: {}
    };
  }
};

});