define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pointerOffsetByPlacementUtil = require("../../util/pointerOffsetByPlacementUtil");

var pointerDimensionsInEmEnum = require("../../enum/pointerDimensionsInEmEnum");

var tooltipPointerOffsetEnum = require("../enum/tooltipPointerOffsetEnum");

var emToPxUtil = require("../../util/emToPxUtil");

var placementsEnum = require("../../enum/placementsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT = tooltipPointerOffsetEnum.TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT;
var POINTER_HALF_WIDTH = pointerDimensionsInEmEnum.WIDTH / 2;
var POINTER_WIDTH = pointerDimensionsInEmEnum.WIDTH;
var TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT = tooltipPointerOffsetEnum.TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT;
var placementToPointerOffsetMap = {};
placementToPointerOffsetMap[placementsEnum.TOP_RIGHT] = TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT;
placementToPointerOffsetMap[placementsEnum.BOTTOM_RIGHT] = TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT;
placementToPointerOffsetMap[placementsEnum.TOP_LEFT] = TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT;
placementToPointerOffsetMap[placementsEnum.BOTTOM_LEFT] = TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT;
var placementToAdjustmentMap = {};

placementToAdjustmentMap[placementsEnum.BOTTOM_LEFT] = function (options) {
  var pointerOffset = emToPxUtil.convertEmToPx(TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT),
      pointerHalfWidth = emToPxUtil.convertEmToPx(POINTER_HALF_WIDTH);
  return {
    left: (pointerOffset + pointerHalfWidth) * -1 + options.target.offsetWidth / 2,
    top: options.offset.top
  };
};

placementToAdjustmentMap[placementsEnum.BOTTOM_RIGHT] = function (options) {
  var pointerOffset = emToPxUtil.convertEmToPx(TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT),
      pointerHalfWidth = emToPxUtil.convertEmToPx(POINTER_HALF_WIDTH);
  return {
    left: pointerOffset + pointerHalfWidth - options.target.offsetWidth / 2,
    top: options.offset.top
  };
};

placementToAdjustmentMap[placementsEnum.TOP_LEFT] = function (options) {
  var pointerOffset = emToPxUtil.convertEmToPx(TOP_LEFT_BOTTOM_LEFT_POINTER_OFFSET_LEFT),
      pointerHalfWidth = emToPxUtil.convertEmToPx(POINTER_HALF_WIDTH);
  return {
    left: (pointerOffset + pointerHalfWidth) * -1 + options.target.offsetWidth / 2,
    top: options.offset.top
  };
};

placementToAdjustmentMap[placementsEnum.TOP_RIGHT] = function (options) {
  var pointerOffset = emToPxUtil.convertEmToPx(TOP_RIGHT_BOTTOM_RIGHT_POINTER_OFFSET_RIGHT),
      pointerHalfWidth = emToPxUtil.convertEmToPx(POINTER_HALF_WIDTH);
  return {
    left: pointerOffset + pointerHalfWidth - options.target.offsetWidth / 2,
    top: options.offset.top
  };
};

function applyOffsetTopAdjustment(placementOffset, offset) {
  if (placementOffset.top < 0) {
    return placementOffset.top - offset.top;
  } else {
    return placementOffset.top + offset.top;
  }
}

function applyOffsetLeftAdjustment(placementOffset, offset) {
  if (placementOffset.left < 0) {
    return placementOffset.left - offset.left;
  } else {
    return placementOffset.left + offset.left;
  }
}

function getOffset(placement, options) {
  var placementOffset = pointerOffsetByPlacementUtil.getPointerOffset(placement),
      offset = options.offset,
      target = options.target,
      placementFn = placementToAdjustmentMap[placement];

  if (shouldTooltipPositionBeAdjustedRelativelyToPointer(target, placement)) {
    offset = _.extend({}, offset, placementFn(options));
  }

  return {
    top: applyOffsetTopAdjustment(placementOffset, offset),
    left: applyOffsetLeftAdjustment(placementOffset, offset)
  };
}

function shouldTooltipPositionBeAdjustedRelativelyToPointer(target, placement) {
  var pointerOffset = placementToPointerOffsetMap[placement];

  if (!pointerOffset) {
    return false;
  }

  var minimalTargetSize = emToPxUtil.convertEmToPx((pointerOffset + POINTER_WIDTH) * 2);
  return target.offsetWidth < minimalTargetSize;
}

module.exports = {
  getOffset: getOffset
};

});