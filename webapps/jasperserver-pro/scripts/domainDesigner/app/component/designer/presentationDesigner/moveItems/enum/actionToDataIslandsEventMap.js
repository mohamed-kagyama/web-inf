define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var moveEnum = require("./movePresentationItemsPositionEnum");

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var actionToDataIslandsEventMap = {};
actionToDataIslandsEventMap[moveEnum.MOVE_TOP] = applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS;
actionToDataIslandsEventMap[moveEnum.MOVE_UP] = applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_UP;
actionToDataIslandsEventMap[moveEnum.MOVE_DOWN] = applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_DOWN;
actionToDataIslandsEventMap[moveEnum.MOVE_BOTTOM] = applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS;
module.exports = actionToDataIslandsEventMap;

});