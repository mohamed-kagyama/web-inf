define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Colors = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getColorLabel = function getColorLabel(color) {
  if (color === Colors.TRANSPARENT) {
    return color.slice(0, 6).toUpperCase();
  }

  return color.toUpperCase();
};

module.exports = getColorLabel;

});