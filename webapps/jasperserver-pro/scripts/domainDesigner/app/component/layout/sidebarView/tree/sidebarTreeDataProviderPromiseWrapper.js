define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (dataProvider) {
  return function (options) {
    var dfd = new $.Deferred(),
        result = dataProvider(options);

    if (result) {
      return dfd.resolve({
        data: result.items,
        total: result.total
      });
    } else {
      return dfd.resolve();
    }
  };
};

});