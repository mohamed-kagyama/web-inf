define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var isValueProfileAttributeValidationRule = require("./isValueProfileAttributeValidationRule");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  validate: function validate(range) {
    var start = range.start.value,
        end = range.end.value;

    if (isValueProfileAttributeValidationRule.validate(start) && isValueProfileAttributeValidationRule.validate(end)) {
      return true;
    }
  }
};

});