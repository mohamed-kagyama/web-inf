define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterExpressionTypes = require('../enum/filterExpressionTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _expressionRValue: function _expressionRValue() {
    return _.map(this.get('value'), function (val) {
      /*eslint-disable-next-line no-console*/
      val == null && console && console.warn('Value is undefined or null for some reason', val);
      return {
        value: encodeURIComponent(val == null ? '' : val),
        type: filterExpressionTypes.LITERAL,
        dataType: this.get('filterDataType')
      };
    }, this);
  }
};

});