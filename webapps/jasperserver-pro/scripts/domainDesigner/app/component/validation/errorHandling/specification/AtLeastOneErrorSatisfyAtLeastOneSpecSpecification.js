define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AtLeastOneErrorSatisfyAtLeastOneSpecSpecification = function AtLeastOneErrorSatisfyAtLeastOneSpecSpecification(options) {
  this.initialize(options);
};

_.extend(AtLeastOneErrorSatisfyAtLeastOneSpecSpecification.prototype, {
  initialize: function initialize(options) {
    this.specifications = options.specifications;
  },
  isSatisfiedBy: function isSatisfiedBy(errors) {
    errors = _.isArray(errors) ? errors : [errors];
    var self = this;
    return _.some(errors, function (error) {
      return _.some(self.specifications, function (specification) {
        return specification.isSatisfiedBy(error);
      });
    });
  }
});

module.exports = AtLeastOneErrorSatisfyAtLeastOneSpecSpecification;

});