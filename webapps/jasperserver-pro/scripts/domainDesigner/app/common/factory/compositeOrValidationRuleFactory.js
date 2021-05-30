define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(validationRules) {
    return {
      validate: function validate() {
        var validationResult = false,
            args = Array.prototype.slice.call(arguments, 0);
        validationRules = validationRules || [];

        _.find(validationRules, function (validationRule) {
          validationResult = validationRule.validate.apply(validationRule, args);
          return !validationResult;
        });

        return validationResult;
      }
    };
  }
};

});