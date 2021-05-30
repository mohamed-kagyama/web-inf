define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var placementsEnum = require('./placementsEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var placementToOppositePlacementByHeightMap = {};
placementToOppositePlacementByHeightMap[placementsEnum.TOP] = placementsEnum.BOTTOM;
placementToOppositePlacementByHeightMap[placementsEnum.BOTTOM] = placementsEnum.TOP;
placementToOppositePlacementByHeightMap[placementsEnum.LEFT] = placementsEnum.LEFT;
placementToOppositePlacementByHeightMap[placementsEnum.RIGHT] = placementsEnum.RIGHT;
placementToOppositePlacementByHeightMap[placementsEnum.BOTTOM_LEFT] = placementsEnum.TOP_LEFT;
placementToOppositePlacementByHeightMap[placementsEnum.TOP_LEFT] = placementsEnum.BOTTOM_LEFT;
placementToOppositePlacementByHeightMap[placementsEnum.BOTTOM_RIGHT] = placementsEnum.TOP_RIGHT;
placementToOppositePlacementByHeightMap[placementsEnum.TOP_RIGHT] = placementsEnum.BOTTOM_RIGHT;
module.exports = placementToOppositePlacementByHeightMap;

});