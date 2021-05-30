define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SequenceGenerator = function SequenceGenerator(index) {
  this.initialIndex = _.isNumber(index) ? index : 1;
  this.reset();
};

_.extend(SequenceGenerator.prototype, {
  next: function next() {
    return this.index++;
  },
  get: function get() {
    return this.index;
  },
  reset: function reset(index) {
    this.index = _.isNumber(index) ? index : this.initialIndex;
  }
});

module.exports = SequenceGenerator;

});