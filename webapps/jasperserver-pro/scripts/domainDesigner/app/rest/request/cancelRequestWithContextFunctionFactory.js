define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var request = options.request;
    return function (options) {
      options = options || {};
      var contextUUIDUrl = options.contextUUIDUrl;

      if (contextUUIDUrl) {
        request({
          type: 'DELETE',
          url: contextUUIDUrl
        });
      }
    };
  }
};

});