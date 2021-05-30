define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SimpleCache = function SimpleCache() {
  this.cache = {};
};

_.extend(SimpleCache.prototype, {
  add: function add(key, value) {
    this.cache[key] = value;
  },
  get: function get(key) {
    return this.cache[key];
  },
  reset: function reset(key) {
    if (key) {
      delete this.cache[key];
    } else {
      this.cache = {};
    }
  }
});

module.exports = SimpleCache;

});