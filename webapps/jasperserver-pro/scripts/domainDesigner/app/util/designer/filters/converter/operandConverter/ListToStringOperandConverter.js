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

var identityConverter = _.template('{{= value }}');

var isAnyValueConverter = _.template(i18nMessage('domain.designer.filters.expression.operand.isAnyValue'));

var MAX_STRING_WIDTH = 50;

var ListOperandToStringConverter = function ListOperandToStringConverter(options) {
  this.initialize(options);
};

_.extend(ListOperandToStringConverter.prototype, {
  initialize: function initialize(options) {
    this.maxStringWidth = options.maxStringWidth || MAX_STRING_WIDTH;
    this.listItemsConverter = options.listItemsConverter;
  },
  convert: function convert(operand) {
    var listConverter = operand.isAll ? isAnyValueConverter : identityConverter;

    var listString = this._formatItems(operand.items);

    return listConverter({
      value: listString
    });
  },
  _formatItems: function _formatItems(items) {
    var text = '',
        i = 0;
    items = this.listItemsConverter.convert(items);

    while (text.length < this.maxStringWidth && i < items.length) {
      if (i > 0) {
        text += ', ';
      }

      text += items[i];
      i += 1;
    }

    return text;
  }
});

module.exports = ListOperandToStringConverter;

});