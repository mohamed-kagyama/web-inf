define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var AdHocViewRenderError = require('./AdHocViewRenderError');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
biComponentErrorFactory.adHocViewRender = function (errorObj) {
  return new AdHocViewRenderError(errorObj);
};

module.exports = biComponentErrorFactory;

});