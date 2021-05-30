define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterParserStateNamesEnum = require("../../enum/filterParserStateNamesEnum");

var addFilterExpressionMixin = require("./addFilterExpressionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = _.extend({
  _addRangeFilterExpression: function _addRangeFilterExpression(value) {
    var start = this.context.currentFilterExpression.right.start,
        end = this.context.currentFilterExpression.right.end;

    if (start && !start.value) {
      start.value = value;
    }

    if (end && !end.value) {
      end.value = value;
    }

    if (this._isRangeConstructed()) {
      this._addFilterExpression();

      return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_OPERATOR_STATE, this.context);
    }

    return this.factory.create(filterParserStateNamesEnum.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE, this.context);
  },
  _isRangeConstructed: function _isRangeConstructed() {
    var start = this.context.currentFilterExpression.right.start,
        end = this.context.currentFilterExpression.right.end;
    return start && end && !_.isUndefined(start.value) && !_.isUndefined(end.value);
  }
}, addFilterExpressionMixin);

});