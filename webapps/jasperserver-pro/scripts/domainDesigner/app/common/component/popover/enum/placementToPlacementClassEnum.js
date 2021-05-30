define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var placementsEnum = require("../../enum/placementsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var placementToPlacementClassEnum = {};
placementToPlacementClassEnum[placementsEnum.LEFT] = 'jr-mMessageLeft';
placementToPlacementClassEnum[placementsEnum.RIGHT] = 'jr-mMessageRight';
placementToPlacementClassEnum[placementsEnum.RIGHT_TOP] = 'jr-mMessageRight';
placementToPlacementClassEnum[placementsEnum.TOP_RIGHT] = 'jr-mMessageTopRight';
placementToPlacementClassEnum[placementsEnum.TOP_LEFT] = 'jr-mMessageTopLeft';
placementToPlacementClassEnum[placementsEnum.BOTTOM_LEFT] = 'jr-mMessageBottomLeft';
placementToPlacementClassEnum[placementsEnum.BOTTOM_RIGHT] = 'jr-mMessageBottomRight';
module.exports = placementToPlacementClassEnum;

});