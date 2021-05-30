define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var booleanStringEquivalentEnum = require("../../enum/booleanStringEquivalentEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(value) {
    if (value === booleanStringEquivalentEnum.TRUE) {
      return true;
    } else if (value === booleanStringEquivalentEnum.FALSE) {
      return false;
    }
  }
};

});