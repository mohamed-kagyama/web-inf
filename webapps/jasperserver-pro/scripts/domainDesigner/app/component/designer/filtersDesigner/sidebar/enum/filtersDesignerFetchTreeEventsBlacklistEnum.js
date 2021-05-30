define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var blacklistMap = {};
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_ADD_FILTER] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_REMOVE_FILTER] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_EDIT_DRAFT_FILTER] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_SELECT_RESOURCE] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_CANCEL_DRAFT_FILTER] = true;
blacklistMap[applicationStateEventsEnum.FILTERS_DESIGNER_SET_SEARCH_KEYWORD] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE] = true;
module.exports = blacklistMap;

});