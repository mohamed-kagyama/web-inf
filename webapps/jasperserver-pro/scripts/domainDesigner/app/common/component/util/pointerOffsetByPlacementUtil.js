define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var placementsEnum = require('../enum/placementsEnum');

var emToPxUtil = require('./emToPxUtil');

var pointerDimensionsInEmEnum = require('../enum/pointerDimensionsInEmEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var offsetByPlacementEnum = {};
offsetByPlacementEnum[placementsEnum.TOP] = {
  top: -1,
  left: 0
};
offsetByPlacementEnum[placementsEnum.TOP_LEFT] = {
  top: -1,
  left: 0
};
offsetByPlacementEnum[placementsEnum.TOP_RIGHT] = {
  top: -1,
  left: 0
};
offsetByPlacementEnum[placementsEnum.BOTTOM] = {
  top: 1,
  left: 0
};
offsetByPlacementEnum[placementsEnum.LEFT] = {
  top: 0,
  left: -1
};
offsetByPlacementEnum[placementsEnum.RIGHT] = {
  top: 0,
  left: 1
};
offsetByPlacementEnum[placementsEnum.RIGHT_TOP] = {
  top: 0,
  left: 1
};
offsetByPlacementEnum[placementsEnum.BOTTOM_LEFT] = {
  top: 1,
  left: 0
};
offsetByPlacementEnum[placementsEnum.BOTTOM_RIGHT] = {
  top: 1,
  left: 0
};
module.exports = {
  getPointerOffset: function getPointerOffset(placement) {
    var POINTER_SIZE = emToPxUtil.convertEmToPx(pointerDimensionsInEmEnum.HEIGHT);
    var offset = offsetByPlacementEnum[placement];

    if (offset) {
      return {
        top: offset.top * POINTER_SIZE,
        left: offset.left * POINTER_SIZE
      };
    }
  }
};

});