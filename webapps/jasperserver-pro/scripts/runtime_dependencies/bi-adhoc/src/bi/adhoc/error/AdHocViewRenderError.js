define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BiComponentError = require("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError");

var errorCodes = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes");

var messages = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BiComponentError.extend({
  constructor: function constructor(errorObj) {
    if (_.isString(errorObj)) {
      errorObj = {
        parameters: [errorObj]
      };
    }

    var code = errorCodes['AD_HOC_VIEW_RENDER_ERROR'],
        msg = messages[code];

    if (errorObj.type === 'highchartsInternalError') {
      code = errorCodes['REPORT_RENDER_HIGHCHARTS_ERROR'];
      msg = errorObj.data.error + ' ' + errorObj.data.message;
    }

    BiComponentError.prototype.constructor.call(this, code, msg, errorObj.parameters || []);
  }
});

});