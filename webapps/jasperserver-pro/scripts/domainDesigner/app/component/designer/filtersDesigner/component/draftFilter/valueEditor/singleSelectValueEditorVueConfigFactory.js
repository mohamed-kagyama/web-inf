define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var rightOperandValueFormatEnum = require("../../../enum/rightOperandValueFormatEnum");

var template = require("text!./template/singleSelectValueEditorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var filtersDesignerEventBus = options.filtersDesignerEventBus,
        singleSelectLabelProvider = options.singleSelectLabelProvider,
        onShowListValuesConverter = options.onShowListValuesConverter,
        onSelectListValuesConverterConfig = options.onSelectListValuesConverterConfig;
    var defaultRightOperandValueFormatEnum = options.rightOperandValueFormatEnum || rightOperandValueFormatEnum;
    return {
      template: template,
      props: ['filter', 'operand'],
      components: {
        singleSelect: options.singleSelect
      },
      computed: {
        value: function value() {
          var value = this.filter.rightOperand.value;
          return _.first(onShowListValuesConverter.convert(value, this.filter.dataType)) || value;
        },
        formatValue: function formatValue() {
          return _.partial(singleSelectLabelProvider.getLabel, this.filter.dataType);
        }
      },
      methods: {
        onSelectionChange: function onSelectionChange(value) {
          var converter = onSelectListValuesConverterConfig[this.filter.dataType];

          var formattedValue = _.first(converter.convert(value));

          value = _.isUndefined(formattedValue) ? value : formattedValue;
          value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type](value);
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        }
      }
    };
  }
};

});