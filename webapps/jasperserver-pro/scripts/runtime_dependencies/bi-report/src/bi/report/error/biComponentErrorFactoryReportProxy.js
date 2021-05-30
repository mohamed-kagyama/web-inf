define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var ReportStatusError = require('./ReportStatusError');

var ReportRenderError = require('./ReportRenderError');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
biComponentErrorFactory.reportStatus = function (errorObj) {
  return new ReportStatusError(errorObj);
};

biComponentErrorFactory.reportRender = function (errorObj) {
  return new ReportRenderError(errorObj);
};

module.exports = biComponentErrorFactory;

});