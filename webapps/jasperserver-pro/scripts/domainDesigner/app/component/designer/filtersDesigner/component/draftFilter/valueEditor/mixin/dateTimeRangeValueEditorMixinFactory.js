define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var rightOperandValueFormatEnum = require("../../../../enum/rightOperandValueFormatEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var filtersDesignerEventBus = options.filtersDesignerEventBus,
        dateAndTimePickerOptionsFactory = options.dateAndTimePickerOptionsFactory,
        defaultRightOperandValueFormatEnum = options.defaultRightOperandValueFormatEnum || rightOperandValueFormatEnum;
    return {
      computed: {
        rangeStartDateAndTimePickerOptions: function rangeStartDateAndTimePickerOptions() {
          return dateAndTimePickerOptionsFactory.create({
            dataType: this.filter.dataType,
            onSelect: _.bind(this.onStartDateSelect, this)
          });
        },
        rangeEndDateAndTimePickerOptions: function rangeEndDateAndTimePickerOptions() {
          return dateAndTimePickerOptionsFactory.create({
            dataType: this.filter.dataType,
            onSelect: _.bind(this.onEndDateSelect, this)
          });
        }
      },
      directives: {
        dateAndTimePicker: options.dateAndTimePicker
      },
      methods: {
        onStartDateSelect: function onStartDateSelect(value) {
          value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type]({
            start: value,
            end: this.operand.end.value
          });
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        },
        onEndDateSelect: function onEndDateSelect(value) {
          value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type]({
            start: this.operand.start.value,
            end: value
          });
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        }
      }
    };
  }
};

});