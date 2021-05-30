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
        dateAndTimePickerOptions: function dateAndTimePickerOptions() {
          return dateAndTimePickerOptionsFactory.create({
            dataType: this.filter.dataType,
            onSelect: _.bind(this.onSelect, this)
          });
        }
      },
      directives: {
        dateAndTimePicker: options.dateAndTimePicker
      },
      methods: {
        onSelect: function onSelect(value) {
          value = defaultRightOperandValueFormatEnum[this.filter.rightOperand.type](value);
          filtersDesignerEventBus.trigger('draftFilter:changeValue', value);
        }
      }
    };
  }
};

});