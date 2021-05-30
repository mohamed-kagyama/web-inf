define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DraftStateGetActionNameAsFirstParameterAdviceAdapter = function DraftStateGetActionNameAsFirstParameterAdviceAdapter(options) {
  _.bindAll(this, 'intercept');

  this.blackList = options.blackList;
  this.whiteList = options.whiteList;
  this.draftStateAdvice = options.draftStateAdvice;
};

_.extend(DraftStateGetActionNameAsFirstParameterAdviceAdapter.prototype, {
  intercept: function intercept(name, invocation) {
    var args = Array.prototype.slice.call(arguments, 2),
        actionName = args[0];
    return this.draftStateAdvice.intercept({
      blackList: this.blackList,
      whiteList: this.whiteList,
      actionName: actionName,
      invocation: invocation,
      args: args
    });
  }
});

module.exports = DraftStateGetActionNameAsFirstParameterAdviceAdapter;

});