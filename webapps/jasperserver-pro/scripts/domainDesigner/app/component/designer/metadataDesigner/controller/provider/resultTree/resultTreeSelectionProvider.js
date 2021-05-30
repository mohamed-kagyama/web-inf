define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var metadataDesignerUtil = require("../../../util/metadataDesignerUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  get: function get(state) {
    return metadataDesignerUtil.getResultTreeSelection(state);
  }
};

});