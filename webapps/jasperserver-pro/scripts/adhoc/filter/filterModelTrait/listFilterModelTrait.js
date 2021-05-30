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
    return {
      type: 'list',
      value: _.map(this.get('value'), function (value) {
        /*eslint-disable-next-line no-console*/
        value == null && console && console.warn('Value is undefined or null for some reason', value);
        return {
          value: encodeURIComponent(value == null ? '' : value),
          dataType: this.get('filterDataType'),
          type: filterExpressionTypes.LITERAL
        };
      }, this)
    };
  }
};

});