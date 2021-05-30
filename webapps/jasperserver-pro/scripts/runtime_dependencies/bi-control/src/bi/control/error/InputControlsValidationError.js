define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BiComponentError = require("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError");

var errorCodes = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes");

var messages = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BiComponentError.extend({
  constructor: function constructor(errorObj) {
    var code = errorCodes['INPUT_CONTROLS_VALIDATION_ERROR'],
        msg = messages[code];
    BiComponentError.prototype.constructor.call(this, code, msg, errorObj);
  }
});

});