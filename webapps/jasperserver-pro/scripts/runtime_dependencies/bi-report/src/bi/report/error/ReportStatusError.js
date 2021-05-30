define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BiComponentError = require("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError");

var _ = require('underscore');

var reportStatuses = require('../enum/reportStatuses');

var errorCodes = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes");

var messages = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BiComponentError.extend({
  constructor: function constructor(errorObj) {
    var code, msg, parameters;

    _.extend(this, errorObj);

    if (errorObj.source === 'execution') {
      code = errorCodes[errorObj.status === reportStatuses.CANCELLED ? 'REPORT_EXECUTION_CANCELLED' : 'REPORT_EXECUTION_FAILED'];
    } else {
      code = errorCodes[errorObj.status === reportStatuses.CANCELLED ? 'REPORT_EXPORT_CANCELLED' : 'REPORT_EXPORT_FAILED'];
    }

    msg = errorObj.errorDescriptor && errorObj.errorDescriptor.message || messages[code];

    if (errorObj.errorDescriptor && errorObj.errorDescriptor.errorCode === 'webservices.error.errorExportingReportUnit' && errorObj.errorDescriptor.parameters && errorObj.errorDescriptor.parameters.length) {
      msg += ' : ' + errorObj.errorDescriptor.parameters[0];
    }

    if (errorObj.errorDescriptor && errorObj.errorDescriptor.parameters) {
      parameters = errorObj.errorDescriptor.parameters;
    }

    BiComponentError.prototype.constructor.call(this, code, msg, parameters);
  }
});

});