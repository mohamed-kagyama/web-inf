define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReplaceWithOtherImplementationAdvice = function ReplaceWithOtherImplementationAdvice(options) {
  _.bindAll(this, 'around');

  this.action = options.action;
};

_.extend(ReplaceWithOtherImplementationAdvice.prototype, {
  around: function around(name, originalInvocation) {
    var passedArguments = Array.prototype.slice.call(arguments, 2);
    return this.action.apply(null, passedArguments);
  }
});

module.exports = ReplaceWithOtherImplementationAdvice;

});