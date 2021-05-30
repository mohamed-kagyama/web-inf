define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  /**
       * Additionally trim input
       * @param value
       * @returns {string}
       */
  valueConverter: function valueConverter(value) {
    var normalizedValue = $.trim(value);
    return this._basicValueConverter(normalizedValue);
  }
};

});