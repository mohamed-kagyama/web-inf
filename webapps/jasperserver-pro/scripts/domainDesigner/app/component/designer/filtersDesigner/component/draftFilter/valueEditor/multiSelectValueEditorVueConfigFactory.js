define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var rightOperandValueFormatEnum = require("../../../enum/rightOperandValueFormatEnum");

var InputErrorMessage = require("../../../../../../common/component/inputErrorMessage/InputErrorMessage");

var template = require("text!./template/multiSelectValueEditorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var filtersDesignerEventBus = options.filtersDesignerEventBus,
        multiSelect = options.multiSelect,
        onShowListValuesConverter = options.onShowListValuesConverter,
        onSelectListValuesConverterConfig = options.onSelectListValuesConverterConfig,
        onSelectListValuesSortFnConfig = options.onSelectListValuesSortFnConfig;
    var defaultRightOperandValueFormatEnum = options.rightOperandValueFormatEnum || rightOperandValueFormatEnum;
    return {
      template: template,
      props: ['filter', 'operand'],
      components: {
        multiSelect: multiSelect,
        errorMessage: InputErrorMessage
      },
      computed: {
        options: function options() {
          var items = this.filter.rightOperand.items,
              sortFn = onSelectListValuesSortFnConfig[this.filter.dataType];
          return {
            isTrueAll: this.filter.rightOperand.isAll,
            value: onShowListValuesConverter.convert(items, this.filter.dataType) || items,
            selectedListOptions: {
              sortFunc: sortFn
            }
          };
        },
        errorMessage: function errorMessage() {
          return this.filter.errors.right && this.filter.errors.right.errorMessage;
        }
      },
      methods: {
        onSelectionChange: function onSelectionChange(values, options) {
          var converter = onSelectListValuesConverterConfig[this.filter.dataType];
          values = converter.convert(values);
          var operandValue = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type](values, options);
          filtersDesignerEventBus.trigger('draftFilter:changeValue', operandValue);
        }
      }
    };
  }
};

});