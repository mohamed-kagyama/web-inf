define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var placementsEnum = require('./placementsEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var placementToOppositePlacementByWidthMap = {};
placementToOppositePlacementByWidthMap[placementsEnum.LEFT] = placementsEnum.RIGHT;
placementToOppositePlacementByWidthMap[placementsEnum.RIGHT] = placementsEnum.LEFT;
placementToOppositePlacementByWidthMap[placementsEnum.TOP] = placementsEnum.TOP;
placementToOppositePlacementByWidthMap[placementsEnum.BOTTOM] = placementsEnum.BOTTOM;
placementToOppositePlacementByWidthMap[placementsEnum.BOTTOM_LEFT] = placementsEnum.BOTTOM_RIGHT;
placementToOppositePlacementByWidthMap[placementsEnum.TOP_LEFT] = placementsEnum.TOP_RIGHT;
placementToOppositePlacementByWidthMap[placementsEnum.BOTTOM_RIGHT] = placementsEnum.BOTTOM_LEFT;
placementToOppositePlacementByWidthMap[placementsEnum.TOP_RIGHT] = placementsEnum.TOP_LEFT;
module.exports = placementToOppositePlacementByWidthMap;

});