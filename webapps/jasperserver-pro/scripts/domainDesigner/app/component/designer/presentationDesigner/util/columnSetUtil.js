define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var columnSetEnum = require("../enum/columnSetEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isDefault(columnSet) {
  return columnSet === columnSetEnum.DEFAULT;
}

function isIdentification(columnSet) {
  return columnSet === columnSetEnum.IDENTIFICATION;
}

function isBundleKeys(columnSet) {
  return columnSet === columnSetEnum.BUNDLE_KEYS;
}

function isData(columnSet) {
  return columnSet === columnSetEnum.DATA;
}

module.exports = {
  isDefault: isDefault,
  isIdentification: isIdentification,
  isBundleKeys: isBundleKeys,
  isData: isData
};

});