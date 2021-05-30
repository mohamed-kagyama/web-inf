define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var aspectjs = require('./aspect/aspectjs');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = fakeAllMethods;

function fakeAllMethods(obj) {
  return aspectjs(obj, {
    '*': {
      before: function beforeMethodInterceptor() {
        return false;
      }
    }
  });
}

});