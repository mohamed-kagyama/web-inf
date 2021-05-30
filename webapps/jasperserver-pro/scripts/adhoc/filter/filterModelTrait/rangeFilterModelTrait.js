define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterExpressionTypes = require('../enum/filterExpressionTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _expressionRValue: function _expressionRValue() {
    var start = this.get('value')[0],
        end = this.get('value')[1];
    /*eslint-disable-next-line no-console*/

    start == null && console && console.warn('Value is undefined or null for some reason', start);
    /*eslint-disable-next-line no-console*/

    end == null && console && console.warn('Value is undefined or null for some reason', end);
    return {
      start: encodeURIComponent(start == null ? '' : start),
      end: encodeURIComponent(end == null ? '' : end),
      dataType: this.get('filterDataType'),
      type: filterExpressionTypes.RANGE
    };
  }
};

});