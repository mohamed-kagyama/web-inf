define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositeConcatenatingConverter = function CompositeConcatenatingConverter(options) {
  this.initialize(options);
};

_.extend(CompositeConcatenatingConverter.prototype, {
  initialize: function initialize(options) {
    this.converters = options.converters;
    this.comparator = options.comparator;
    this.postProcess = options.postProcess;
  },
  convert: function convert(options) {
    var self = this,
        result = this.converters.reduce(function (memo, converter) {
      var result = converter.convert(options);
      return memo.concat(result);
    }, []);

    if (this.comparator) {
      result.sort(this.comparator);
    }

    if (this.postProcess) {
      result = _.map(result, function (resourceJson, index) {
        return self.postProcess(resourceJson, _.extend({}, options, {
          index: index
        }));
      });
    }

    return result;
  }
});

module.exports = CompositeConcatenatingConverter;

});