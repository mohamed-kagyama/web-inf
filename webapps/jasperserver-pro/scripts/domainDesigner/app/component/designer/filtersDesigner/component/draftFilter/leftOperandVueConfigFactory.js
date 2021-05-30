define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/leftOperandTemplate.htm");

var operand = require('./operand');

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
        operand: operand,
        fieldValueEditor: options.fieldValueEditor
      },
      computed: {},
      methods: {}
    };
  }
};

});