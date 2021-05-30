define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var errorHandlingUtil = require("../errorHandling/errorHandlingUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (spec) {
  return {
    isSatisfiedBy: function isSatisfiedBy(xhr) {
      var errors = errorHandlingUtil.getErrors(xhr);
      return spec.isSatisfiedBy(errors);
    }
  };
};

});