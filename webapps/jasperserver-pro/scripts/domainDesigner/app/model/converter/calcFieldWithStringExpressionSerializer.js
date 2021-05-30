define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  serialize: function serialize(calcField) {
    return {
      element: {
        name: calcField.name,
        type: calcField.type,
        expression: {
          string: calcField.expression.string
        }
      }
    };
  }
};

});