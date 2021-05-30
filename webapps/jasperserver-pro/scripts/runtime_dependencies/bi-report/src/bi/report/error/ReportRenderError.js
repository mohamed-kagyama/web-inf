define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BiComponentError = require("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError");

var _ = require('underscore');

var errorCodes = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes");

var messages = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BiComponentError.extend({
  constructor: function constructor(errorObj) {
    var code = errorCodes['REPORT_RENDER_ERROR'],
        msg = messages[code];

    _.extend(this, errorObj);

    if (errorObj.type === 'wrongContainerSize') {
      code = errorCodes['WRONG_CONTAINER_SIZE_ERROR'];
      msg = errorObj.data.error + ' ' + errorObj.data.message;
    }

    if (errorObj.type === 'highchartsInternalError') {
      code = errorCodes['REPORT_RENDER_HIGHCHARTS_ERROR'];
      msg = errorObj.data.error + ' ' + errorObj.data.message;
    }

    BiComponentError.prototype.constructor.call(this, code, msg);
  }
});

});