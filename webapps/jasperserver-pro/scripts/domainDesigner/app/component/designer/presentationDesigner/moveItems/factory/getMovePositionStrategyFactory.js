define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var moveBottomPositionStrategy = require("../strategy/moveBottomPositionStrategy");

var moveTopPositionStrategy = require("../strategy/moveTopPositionStrategy");

var moveUpPositionStrategy = require("../strategy/moveUpPositionStrategy");

var moveDownPositionStrategy = require("../strategy/moveDownPositionStrategy");

var moveEnum = require("../enum/movePresentationItemsPositionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var actionToStrategyMap = {};
actionToStrategyMap[moveEnum.MOVE_TOP] = moveTopPositionStrategy;
actionToStrategyMap[moveEnum.MOVE_UP] = moveUpPositionStrategy;
actionToStrategyMap[moveEnum.MOVE_DOWN] = moveDownPositionStrategy;
actionToStrategyMap[moveEnum.MOVE_BOTTOM] = moveBottomPositionStrategy;

function getStrategy(action) {
  return actionToStrategyMap[action];
}

module.exports = {
  getStrategy: getStrategy
};

});