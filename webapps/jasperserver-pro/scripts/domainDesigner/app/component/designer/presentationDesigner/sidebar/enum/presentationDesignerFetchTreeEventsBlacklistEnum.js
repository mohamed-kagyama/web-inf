define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var blacklistMap = {};
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SEARCH_KEYWORD] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_DATA_ISLAND] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_UP] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_DOWN] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_PRESENTATION_ITEMS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_SET] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_CONSTANT_DATA_ISLAND] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_FIELD] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_UP] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_DOWN] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_EXPAND_ALL_PRESENTATION_ITEMS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EXPANDED_STATE] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_COLLAPSE_ALL_PRESENTATION_ITEMS] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EXPANDED_STATE] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EDITOR_EXPANDED_STATE] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EDITOR_EXPANDED_STATE] = true;
blacklistMap[applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_ITEM_EDITOR_EXPANDED_STATE] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE] = true;
module.exports = blacklistMap;

});