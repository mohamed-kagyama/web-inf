define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var rightOperandValueFormatEnum = require("../../../enum/rightOperandValueFormatEnum");

var InputErrorMessage = require("../../../../../../common/component/inputErrorMessage/InputErrorMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var template = options.template,
        mixins = options.mixins || [],
        filtersDesignerEventBus = options.filtersDesignerEventBus;
    var defaultRightOperandValueFormatEnum = options.rightOperandValueFormatEnum || rightOperandValueFormatEnum;
    return {
      template: template,
      mixins: mixins,
      props: ['filter', 'operand'],
      components: {
        errorMessage: InputErrorMessage
      },
      computed: {
        errorMessage: function errorMessage() {
          return this.filter.errors.right && this.filter.errors.right.errorMessage;
        },
        isDisabled: function isDisabled() {
          return !this.filter.leftOperand.fieldId;
        }
      },
      methods: {
        onInput: function onInput(event) {
          var value = event.target.value;
          value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type](value);
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        }
      }
    };
  }
};

});