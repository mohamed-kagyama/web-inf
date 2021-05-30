define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SortErrorsBySpecifications = function SortErrorsBySpecifications(options) {
  this.specifications = options.specifications;
};

_.extend(SortErrorsBySpecifications.prototype, {
  sort: function sort(errors) {
    var self = this;
    return errors.sort(function (error1, error2) {
      var firstErrorIsSatisfied = self._isSatisfiedBy(error1),
          secondErrorIsSatisfied = self._isSatisfiedBy(error2);

      if (firstErrorIsSatisfied && secondErrorIsSatisfied || !firstErrorIsSatisfied && !secondErrorIsSatisfied) {
        return 0;
      } else if (firstErrorIsSatisfied) {
        return -1;
      } else if (secondErrorIsSatisfied) {
        return 1;
      }
    });
  },
  _isSatisfiedBy: function _isSatisfiedBy(error) {
    return _.some(this.specifications, function (spec) {
      return spec.isSatisfiedBy(error);
    });
  }
});

module.exports = SortErrorsBySpecifications;

});