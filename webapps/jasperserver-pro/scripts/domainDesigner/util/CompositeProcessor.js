define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositeProcessor = function CompositeProcessor(processors) {
  _.bindAll(this, 'process');

  this.processors = processors ? _.isArray(processors) ? processors : [processors] : [];
};

_.extend(CompositeProcessor.prototype, {
  process: function process(item) {
    var args = Array.prototype.slice.call(arguments, 1);
    return _.reduce(this.processors, function (memo, process) {
      return process.apply(null, [memo].concat(args));
    }, item);
  }
});

module.exports = CompositeProcessor;

});