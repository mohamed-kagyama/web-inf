define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var booleanStringEquivalentEnum = require("../../../../../../../util/designer/filters/enum/booleanStringEquivalentEnum");

var domainDesignerSettings = require("settings!domainSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (a, b) {
  if (a.label === domainDesignerSettings.nullLabel || b.label === booleanStringEquivalentEnum.FALSE) {
    return -1;
  } else if (b.label === domainDesignerSettings.nullLabel || a.label === booleanStringEquivalentEnum.FALSE) {
    return 1;
  } else {
    return 0;
  }
};

});