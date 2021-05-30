define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositeComparator = function CompositeComparator(options) {
  _.bindAll(this, 'compare');

  this.comparators = options.comparators || [];
};

_.extend(CompositeComparator.prototype, {
  compare: function compare(left, right) {
    var result = 0;

    _.find(this.comparators, function (compare) {
      result = compare(left, right);
      return result !== 0;
    });

    return result;
  }
});

module.exports = CompositeComparator;

});