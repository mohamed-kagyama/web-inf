define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _addJoinExpression: function _addJoinExpression() {
    var joinExpression = _.cloneDeep(this.context.currentJoinExpression);

    this.context.joinExpressions.push(joinExpression);

    this._clearContext();
  },
  _clearContext: function _clearContext() {
    this.context.currentJoinExpression = {};
    delete this.context.isNot;
  }
};

});