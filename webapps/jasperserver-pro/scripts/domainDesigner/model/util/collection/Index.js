define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var Index = function Index(options) {
  options = _.defaults(options || {}, {
    type: 'number'
  });
  this.indexName = options.name;
  this.type = options.type;
  this.clear();
};

_.extend(Index.prototype, {
  addToIndex: function addToIndex(object) {
    this.values[object[this.indexName]] = object;
  },
  removeFromIndex: function removeFromIndex(indexValue) {
    if (this.type === 'number') {
      this.values[indexValue] = undefined;
    } else {
      delete this.values[indexValue];
    }
  },
  getValue: function getValue(indexValue) {
    return this.values[indexValue];
  },
  clear: function clear() {
    this.values = this.type === 'number' ? [] : {};
  }
});

module.exports = Index;

});