define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isLeftMouseButton(e) {
  return e.which === 1;
}

function isCtrlKeyHeld(e) {
  return e.ctrlKey || e.metaKey;
}

function isShiftKeyHeld(e) {
  return e.shiftKey;
}

function isSingleSelection(e) {
  return isLeftMouseButton(e) && !isCtrlKeyHeld(e) && !isShiftKeyHeld(e);
}

function isMultipleSelection(e) {
  return isLeftMouseButton(e) && isCtrlKeyHeld(e);
}

function isRangeSelection(e) {
  return isLeftMouseButton(e) && isShiftKeyHeld(e);
}

module.exports = {
  isSingleSelection: isSingleSelection,
  isMultipleSelection: isMultipleSelection,
  isCtrlKeyHeld: isCtrlKeyHeld,
  isShiftKeyHeld: isShiftKeyHeld,
  isLeftMouseButton: isLeftMouseButton,
  isRangeSelection: isRangeSelection
};

});