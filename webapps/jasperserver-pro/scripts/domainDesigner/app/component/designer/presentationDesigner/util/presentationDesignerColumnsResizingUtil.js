define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getCanvasOrMinWidth(options) {
  var canvasWidth = options.canvasWidth,
      minCanvasWidth = options.minCanvasWidth,
      scrollBarWidth = options.scrollBarWidth,
      isScrollBarPresent = options.isScrollBarPresent;

  if (isScrollBarPresent) {
    canvasWidth = canvasWidth - scrollBarWidth;
  }

  return canvasWidth < minCanvasWidth ? minCanvasWidth : canvasWidth;
}

function isResizerWithinBoundaries(options) {
  var offsetLeft = options.offsetLeft,
      canvasWidth = options.canvasWidth,
      minOffsetInPercent = options.minOffsetInPercent,
      maxOffsetInPercent = options.maxOffsetInPercent;
  var offsetLeftInPercent = convertOffsetLeftToPercent(offsetLeft, canvasWidth);
  return offsetLeftInPercent > minOffsetInPercent && offsetLeftInPercent < maxOffsetInPercent;
}

function getColumnsWidths(options) {
  var canvasWidth = options.canvasWidth,
      offsetLeft = options.offsetLeft;
  var column0Width = convertOffsetLeftToPercent(offsetLeft, canvasWidth),
      column1Width = 100 - column0Width;
  return {
    column0Width: column0Width,
    column1Width: column1Width
  };
}

function convertOffsetLeftToPercent(offsetLeft, width) {
  return offsetLeft * 100 / width;
}

function convertOffsetLeftToPx(offsetLeft, width) {
  return offsetLeft * width / 100;
}

module.exports = {
  getCanvasOrMinWidth: getCanvasOrMinWidth,
  isResizerWithinBoundaries: isResizerWithinBoundaries,
  getColumnsWidths: getColumnsWidths,
  convertOffsetLeftToPercent: convertOffsetLeftToPercent,
  convertOffsetLeftToPx: convertOffsetLeftToPx
};

});