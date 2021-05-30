define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* eslint no-console: "off" */
var DevAfterThrowingAdvice = function DevAfterThrowingAdvice(options) {
  _.bindAll(this, 'afterThrowing');

  this.devTools = options.devTools;
};

_.extend(DevAfterThrowingAdvice.prototype, {
  afterThrowing: function afterThrowing(ex, parentStack, args, action) {
    var stack = ex.stack + this._removeFirstEntryFromStack(parentStack);

    var error = {
      message: ex.toString(),
      stack: stack,
      action: action,
      arguments: args
    };
    this.devTools.setError(error);
    console.error(stack);
    return false;
  },
  _removeFirstEntryFromStack: function _removeFirstEntryFromStack(stack) {
    var firstLineLength = stack.indexOf('\n');
    return stack.substring(firstLineLength, stack.length);
  }
});

module.exports = DevAfterThrowingAdvice;

});