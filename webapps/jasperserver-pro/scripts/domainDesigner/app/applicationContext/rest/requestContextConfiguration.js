define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var request = require("request");

var RequestWrapper = require("../../rest/request/RequestWrapper");

var requestFactory = require("../../rest/request/requestFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var requestWrapper = new RequestWrapper({
    request: request
  });
  context.register('requestWrapper', requestWrapper);
  context.register('request', requestFactory.create(requestWrapper));
};

});