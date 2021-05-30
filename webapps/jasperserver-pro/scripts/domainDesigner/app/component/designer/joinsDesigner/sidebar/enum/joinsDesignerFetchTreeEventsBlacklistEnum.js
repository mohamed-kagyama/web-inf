define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var blacklistMap = {};
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_SELECT_RESOURCE] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_ALIAS] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_SET_SEARCH_KEYWORD] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN_TREE] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_EXPRESSION] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_CREATE_CONSTANT_JOIN_EXPRESSION] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_CONSTANT_JOIN_EXPRESSION] = true;
blacklistMap[applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_CONSTANT_JOIN_EXPRESSION] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE] = true;
module.exports = blacklistMap;

});