define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/operandTemplate.htm");

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

var Vue = require('vue');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  template: template,
  props: ['operand'],
  components: {},
  computed: {
    isVariable: function isVariable() {
      return this.operand.type === filterOperandTypesEnum.VARIABLE;
    }
  },
  methods: {}
});

});