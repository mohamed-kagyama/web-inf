define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _addFilterExpression: function _addFilterExpression() {
    var filterExpression = _.cloneDeep(this.context.currentFilterExpression);

    this.context.filterExpressions.push(filterExpression);

    this._clearContext();
  },
  _clearContext: function _clearContext() {
    this.context.currentFilterExpression = {};
    delete this.context.profileAttribute;
    delete this.context.listSize;
    delete this.context.isNot;
    delete this.context.isAnyValue;
  }
};

});