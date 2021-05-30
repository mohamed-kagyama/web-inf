define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var RequestWrapper = function RequestWrapper(options) {
  this._request = options.request;
};

_.extend(RequestWrapper.prototype, {
  request: function request() {
    return this._request.apply(null, arguments);
  }
});

module.exports = RequestWrapper;

});