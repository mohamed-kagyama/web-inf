define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DropRecoverableErrorsFilter = function DropRecoverableErrorsFilter(options) {
  this.specsForRecoverableErrors = options.specsForRecoverableErrors;
};

_.extend(DropRecoverableErrorsFilter.prototype, {
  filter: function filter(errors) {
    return _.filter(errors, function (error) {
      return !_.some(this.specsForRecoverableErrors, function (spec) {
        return spec.isSatisfiedBy(error);
      });
    }, this);
  }
});

module.exports = DropRecoverableErrorsFilter;

});