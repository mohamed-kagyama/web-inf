define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: {
    isVisible: function isVisible() {
      if (this.isTextArray) {
        return Boolean(this.text.length);
      }

      return Boolean(this.text);
    },
    isTextArray: function isTextArray() {
      return _.isArray(this.text);
    }
  }
};

});