define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var calculatedFieldDesignerOperatorsEnum = require('./enum/calculatedFieldDesignerOperatorsEnum');

var template = require("text!./template/calculatedFieldsDesignerOperatorsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  template: template,
  props: ['disableButtons'],
  data: function data() {
    return {
      operators: calculatedFieldDesignerOperatorsEnum
    };
  },
  methods: {
    selectOperator: function selectOperator(operator) {
      this.$emit('selectOperator', operator);
    },
    getComputedValueByName: function getComputedValueByName(name) {
      return this[name];
    }
  }
};

});