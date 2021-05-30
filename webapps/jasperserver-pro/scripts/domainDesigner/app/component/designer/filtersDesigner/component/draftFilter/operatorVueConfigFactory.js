define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/operatorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['filter'],
      components: {},
      computed: {
        availableOperators: function availableOperators() {
          return options.availableOperatorOptionsConverter.convert(this.filter);
        },
        formattedOperator: function formattedOperator() {
          return options.valueConverter.convert({
            operator: this.filter.operator,
            rightOperand: this.filter.rightOperand.type
          });
        },
        isDisabled: function isDisabled() {
          return !this.filter.leftOperand.fieldId && !this.filter.rightOperand.fieldId;
        }
      },
      methods: {
        isOperatorSelected: function isOperatorSelected(operator) {
          return this.formattedOperator === operator.value;
        },
        onChange: function onChange(formattedOperator) {
          var value = options.valueConverter.parse(formattedOperator);
          options.filtersDesignerEventBus.trigger('draftFilter:operator:change', {
            operator: value.operator,
            rightOperandType: value.rightOperand
          });
        }
      }
    };
  }
};

});