define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterExpressionTypes = require('../enum/filterExpressionTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _expressionRValue: function _expressionRValue() {
    var value = this.get('value');
    return {
      value: encodeURIComponent(value),
      dataType: this.get('filterDataType'),
      type: filterExpressionTypes.LITERAL
    };
  }
};

});