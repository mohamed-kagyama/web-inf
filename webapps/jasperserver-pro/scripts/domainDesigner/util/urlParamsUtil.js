define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function addUrlParams(url, urlParams) {
  var params = urlParams ? '?' + $.param(urlParams) : '';
  return url + params;
}

module.exports = {
  addUrlParams: addUrlParams
};

});