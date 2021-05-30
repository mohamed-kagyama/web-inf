define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var rangeConverter = _.template('{{ print(start.value) }} ' + i18nMessage('domain.designer.filters.expression.operand.and') + ' {{ print(end.value) }}');

var RangeToStringOperandConverter = function RangeToStringOperandConverter(options) {
  this.initialize(options);
};

_.extend(RangeToStringOperandConverter.prototype, {
  initialize: function initialize(options) {
    this.converter = options.converter;
  },
  convert: function convert(operand) {
    operand = this.converter.convert(operand);
    return rangeConverter(operand);
  }
});

module.exports = RangeToStringOperandConverter;

});