define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getExecutor: function getExecutor(context) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0),
          event = args[2];

      if (context[event]) {
        context[event].apply(context, args);
      }
    };
  }
};

});