define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isVariableEscaped: function isVariableEscaped(variable) {
    return Boolean(variable.match(/^\".+\"$/));
  },
  unEscapeVariable: function unEscapeVariable(variable) {
    return variable.slice(1, variable.length - 1);
  },
  escapeVariable: function escapeVariable(variable) {
    return '"' + variable + '"';
  }
};

});