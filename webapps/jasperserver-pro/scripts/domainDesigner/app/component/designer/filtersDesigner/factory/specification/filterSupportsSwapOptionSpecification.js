define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterTypeUtil = require("../../util/filterTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(filter) {
    return filterTypeUtil.isFieldToFieldFilter(filter.leftOperand.type, filter.rightOperand.type);
  }
};

});