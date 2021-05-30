define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AllErrorsSatisfyAtLeastOneSpecSpecification = function AllErrorsSatisfyAtLeastOneSpecSpecification(options) {
  this.initialize(options);
};

_.extend(AllErrorsSatisfyAtLeastOneSpecSpecification.prototype, {
  initialize: function initialize(options) {
    this.specs = options.specs;
  },
  isSatisfiedBy: function isSatisfiedBy(errors) {
    errors = _.isArray(errors) ? errors : [errors];
    var self = this;
    return _.every(errors, function (error) {
      return _.some(self.specs, function (spec) {
        return spec.isSatisfiedBy(error);
      });
    });
  }
});

module.exports = AllErrorsSatisfyAtLeastOneSpecSpecification;

});