define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var applicationStateEventsEnum = require("../../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var blacklistMap = {};
blacklistMap[applicationStateEventsEnum.METADATA_DESIGNER_SELECT_RESOURCE] = true;
blacklistMap[applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SELECTION] = true;
blacklistMap[applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SELECTION] = true;
blacklistMap[applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SEARCH_KEYWORD] = true;
blacklistMap[applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SEARCH_KEYWORD] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW] = true;
blacklistMap[applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE] = true;
module.exports = blacklistMap;

});