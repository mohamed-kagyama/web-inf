define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompareByProperty = function CompareByProperty(options) {
  _.bindAll(this, 'compare');

  this.property = options.property;
};

_.extend(CompareByProperty.prototype, {
  compare: function compare(left, right) {
    return left[this.property].localeCompare(right[this.property]);
  }
});

module.exports = CompareByProperty;

});