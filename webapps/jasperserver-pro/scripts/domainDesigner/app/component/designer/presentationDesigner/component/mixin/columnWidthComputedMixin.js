define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: {
    column0WidthStyle: function column0WidthStyle() {
      if (this.column0Width) {
        return {
          width: this.column0Width + '%'
        };
      }
    },
    column1WidthStyle: function column1WidthStyle() {
      if (this.column1Width) {
        return {
          width: this.column1Width + '%'
        };
      }
    }
  }
};

});