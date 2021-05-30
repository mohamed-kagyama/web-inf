define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var pointerDimensionsInEmEnum = require("../../enum/pointerDimensionsInEmEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var POINTER_HALF_WIDTH = pointerDimensionsInEmEnum.WIDTH / 2;
module.exports = {
  TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT: 1.636,
  TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT: 1.636 - POINTER_HALF_WIDTH
};

});