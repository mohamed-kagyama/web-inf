define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filtersDesignerUtil = require("../../util/filtersDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  get: function get(state) {
    return filtersDesignerUtil.getSearchKeyword(state);
  }
};

});