define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var rightOperandValueFormatEnum = require("../../../enum/rightOperandValueFormatEnum");

var InputErrorMessage = require("../../../../../../common/component/inputErrorMessage/InputErrorMessage");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

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
      props: ['filter', 'operand'],
      mixins: mixins,
      components: {
        errorMessage: InputErrorMessage
      },
      computed: _.extend({
        startErrorMessage: function startErrorMessage() {
          return this.filter.errors.right && this.filter.errors.right.startErrorMessage;
        },
        endErrorMessage: function endErrorMessage() {
          return this.filter.errors.right && this.filter.errors.right.endErrorMessage;
        },
        isDisabled: function isDisabled() {
          return !this.filter.leftOperand.fieldId;
        }
      }, i18nComputed),
      methods: {
        onInputRangeStart: function onInputRangeStart(event) {
          var value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type]({
            start: event.target.value,
            end: this.operand.end.value
          });
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        },
        onInputRangeEnd: function onInputRangeEnd(event) {
          var value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type]({
            start: this.operand.start.value,
            end: event.target.value
          });
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        }
      }
    };
  }
};

});