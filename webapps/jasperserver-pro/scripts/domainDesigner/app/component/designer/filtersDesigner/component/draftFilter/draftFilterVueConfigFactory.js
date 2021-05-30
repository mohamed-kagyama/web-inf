define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/draftFilterTemplate.htm");

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
        optionsMenu: options.optionsMenu,
        leftOperand: options.leftOperand,
        operator: options.operator,
        rightOperand: options.rightOperand
      },
      computed: {},
      methods: {}
    };
  }
};

});