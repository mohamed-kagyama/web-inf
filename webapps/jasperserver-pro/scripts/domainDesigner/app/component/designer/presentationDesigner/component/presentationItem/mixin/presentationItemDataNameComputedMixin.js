define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var propertyNameToDataNameAttributeEnum = require("../enum/propertyNameToDataNameAttributeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: {
    dataName: function dataName() {
      return propertyNameToDataNameAttributeEnum[this.propertyName];
    }
  }
};

});