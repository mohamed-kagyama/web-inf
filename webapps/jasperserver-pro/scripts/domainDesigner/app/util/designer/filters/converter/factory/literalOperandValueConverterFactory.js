define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(basicValueConverter) {
    return {
      convert: function convert(operand, options) {
        return basicValueConverter.convert(operand.value, options);
      }
    };
  }
};

});