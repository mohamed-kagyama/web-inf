define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var placementsEnum = require('../enum/placementsEnum');

var placementToOppositePlacementByHeightEnum = require('../enum/placementToOppositePlacementByHeightEnum');

var placementToOppositePlacementByWidthEnum = require('../enum/placementToOppositePlacementByWidthEnum');

var domUtil = require("runtime_dependencies/js-sdk/src/common/util/domUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getElRect($element) {
  var el = $element[0];
  var isBody = el.tagName === 'BODY';
  var elRect = el.getBoundingClientRect();
  var isSvg = window.SVGElement && el instanceof window.SVGElement;
  var elOffset = isBody ? {
    top: 0,
    left: 0
  } : isSvg ? null : $element.offset();
  var scroll = {
    scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
  };
  var outerDims = isBody ? {
    width: $(window).width(),
    height: $(window).height()
  } : null;
  return _.extend({}, elRect, scroll, outerDims, elOffset);
}

function normalizeElRectRelativelyToParentRect(elRect, parentRect) {
  var top = elRect.top - parentRect.top,
      left = elRect.left - parentRect.left;
  return _.extend({}, elRect, {
    top: top,
    left: left
  });
}

function getPosition(options) {
  var placement = options.placement;
  var $parentEl = $(options.parentEl),
      $sourceEl = $(options.sourceEl),
      $targetEl = $(options.targetEl),
      sourceMargins = domUtil.getMargins($sourceEl),
      sourcePaddings = domUtil.getPaddings($sourceEl),
      parentRect = getElRect($parentEl),
      targetRect = normalizeElRectRelativelyToParentRect(getElRect($targetEl), parentRect),
      sourceRect = normalizeElRectRelativelyToParentRect(getElRect($sourceEl), parentRect),
      targetSourceTopDifference = targetRect.top - sourceRect.top,
      targetSourceLeftDifference = targetRect.left - sourceRect.left;
  var placementFunction = placementToPlacementFnEnum[placement];
  var position = placementFunction.call(null, {
    targetRect: targetRect,
    sourceRect: sourceRect,
    sourceMargins: sourceMargins,
    sourcePaddings: sourcePaddings,
    targetSourceTopDifference: targetSourceTopDifference,
    targetSourceLeftDifference: targetSourceLeftDifference
  });
  return {
    top: position.top,
    left: position.left,
    sourceRect: sourceRect,
    parentRect: parentRect,
    targetRect: targetRect
  };
}

function getPlacementWithPosition(options) {
  var placement = options.placement,
      initialPosition = getPosition(options),
      position = _.extend(roundPosition(initialPosition), {
    placement: placement
  });

  var adjustedPlacement = isElementOutOfParentHeight(initialPosition) ? adjustPlacementByHeight(placement) : position.placement;
  position = getPosition(_.extend(options, {
    placement: adjustedPlacement
  }));
  adjustedPlacement = isElementOutOfParentWidth(position) ? adjustPlacementByWidth(adjustedPlacement) : adjustedPlacement || position.placement;
  position = getPosition(_.extend(options, {
    placement: adjustedPlacement
  }));
  return {
    top: position.top,
    left: position.left,
    placement: adjustedPlacement
  };
}

function adjustPlacementByHeight(placement) {
  return placementToOppositePlacementByHeightEnum[placement];
}

function adjustPlacementByWidth(placement) {
  return placementToOppositePlacementByWidthEnum[placement];
}

function isElementOutOfParentHeight(options) {
  var parentRect = options.parentRect,
      top = options.top,
      sourceRect = options.sourceRect;
  return parentRect.height < top + sourceRect.height || top - sourceRect.height < 0;
}

function isElementOutOfParentWidth(options) {
  var parentRect = options.parentRect,
      left = options.left;
  return left < parentRect.left || left > parentRect.width;
}

function roundPosition(position) {
  return {
    top: Math.floor(position.top),
    left: Math.floor(position.left)
  };
}

function centerSourceHorizontally(options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect,
      sourceMargins = options.sourceMargins;
  return targetRect.left - sourceMargins.left + targetRect.width / 2 - sourceRect.width / 2;
}

function centerSourceVertically(options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect,
      sourceMargins = options.sourceMargins;
  return targetRect.top - sourceMargins.top + targetRect.height / 2 - sourceRect.height / 2;
}

function placeSourceUnderTarget(options) {
  var targetRect = options.targetRect,
      sourceMargins = options.sourceMargins;
  return targetRect.top + targetRect.height - sourceMargins.top;
}

var placementToPlacementFnEnum = {};

placementToPlacementFnEnum[placementsEnum.TOP] = function (options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect;
  return {
    top: targetRect.top - sourceRect.height,
    left: centerSourceHorizontally(options)
  };
};

placementToPlacementFnEnum[placementsEnum.BOTTOM] = function (options) {
  return {
    top: placeSourceUnderTarget(options),
    left: centerSourceHorizontally(options)
  };
};

placementToPlacementFnEnum[placementsEnum.LEFT] = function (options) {
  var sourceRect = options.sourceRect,
      targetRect = options.targetRect,
      sourceMargins = options.sourceMargins;
  return {
    top: centerSourceVertically(options),
    left: targetRect.left - sourceRect.width - sourceMargins.left
  };
};

placementToPlacementFnEnum[placementsEnum.RIGHT] = function (options) {
  var targetRect = options.targetRect,
      sourceMargins = options.sourceMargins;
  return {
    top: centerSourceVertically(options),
    left: targetRect.left + targetRect.width - sourceMargins.left
  };
};

placementToPlacementFnEnum[placementsEnum.RIGHT_TOP] = function (options) {
  var targetRect = options.targetRect,
      sourceMargins = options.sourceMargins;
  return {
    top: targetRect.top,
    left: targetRect.left + targetRect.width - sourceMargins.left
  };
};

placementToPlacementFnEnum[placementsEnum.TOP_LEFT] = function (options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect,
      sourceMargins = options.sourceMargins;
  return {
    top: targetRect.top - sourceRect.height - sourceMargins.top,
    left: targetRect.left - sourceMargins.left
  };
};

placementToPlacementFnEnum[placementsEnum.TOP_RIGHT] = function (options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect,
      sourceMargins = options.sourceMargins;
  return {
    top: targetRect.top - sourceRect.height - sourceMargins.top,
    left: targetRect.left + targetRect.width - sourceMargins.left - sourceRect.width
  };
};

placementToPlacementFnEnum[placementsEnum.BOTTOM_LEFT] = function (options) {
  var targetRect = options.targetRect,
      sourceMargins = options.sourceMargins;
  return {
    top: placeSourceUnderTarget(options),
    left: targetRect.left - sourceMargins.left
  };
};

placementToPlacementFnEnum[placementsEnum.BOTTOM_RIGHT] = function (options) {
  var targetRect = options.targetRect,
      sourceRect = options.sourceRect,
      sourceMargins = options.sourceMargins;
  return {
    top: placeSourceUnderTarget(options),
    left: targetRect.left + targetRect.width - sourceRect.width - sourceMargins.left
  };
};

module.exports = {
  getPlacementWithPosition: getPlacementWithPosition
};

});