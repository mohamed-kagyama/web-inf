define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  Boolean: function Boolean() {
    return this._parseProfileAttribute();
  },
  Integer: function Integer() {
    return this._parseProfileAttribute();
  },
  Decimal: function Decimal() {
    return this._parseProfileAttribute();
  },
  Date: function Date() {
    return this._parseProfileAttribute();
  },
  Time: function Time() {
    return this._parseProfileAttribute();
  },
  Timestamp: function Timestamp() {
    return this._parseProfileAttribute();
  },
  'function': function _function() {
    return this._parseProfileAttribute();
  },
  string: function string() {
    return this._parseProfileAttribute();
  }
};

});