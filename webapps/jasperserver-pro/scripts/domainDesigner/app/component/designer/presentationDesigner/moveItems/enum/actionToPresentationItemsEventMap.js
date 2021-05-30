define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var moveEnum = require("./movePresentationItemsPositionEnum");

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var actionToPresentationItemsEventMap = {};
actionToPresentationItemsEventMap[moveEnum.MOVE_TOP] = applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS;
actionToPresentationItemsEventMap[moveEnum.MOVE_UP] = applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_UP;
actionToPresentationItemsEventMap[moveEnum.MOVE_DOWN] = applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_DOWN;
actionToPresentationItemsEventMap[moveEnum.MOVE_BOTTOM] = applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS;
module.exports = actionToPresentationItemsEventMap;

});