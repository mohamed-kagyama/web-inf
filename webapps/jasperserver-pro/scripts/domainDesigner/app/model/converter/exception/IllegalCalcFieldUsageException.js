define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IllegalCalcFieldUsageException = function IllegalCalcFieldUsageException(message) {
  this.message = message;
};

IllegalCalcFieldUsageException.prototype.toString = function () {
  return 'IllegalCalcFieldUsageException: ' + this.message;
};

module.exports = IllegalCalcFieldUsageException;

});