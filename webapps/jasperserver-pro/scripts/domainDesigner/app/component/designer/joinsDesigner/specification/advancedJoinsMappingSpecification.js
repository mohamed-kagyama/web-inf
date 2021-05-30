define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isSuppressCircularJoinOn(useMinimumPathJoins, useAllDataIslandJoins) {
  return Boolean(!useAllDataIslandJoins && useMinimumPathJoins);
}

function isIncludeAllDataIslandJoinsOn(useMinimumPathJoins, useAllDataIslandJoins) {
  return Boolean(useAllDataIslandJoins);
}

function isUseMinimumPathJoinsOn(suppressCircularJoin, includeAllDataIslandJoins) {
  return Boolean(suppressCircularJoin && !includeAllDataIslandJoins);
}

function isUseAllDAtaIslandJoinsOn(suppressCircularJoin, includeAllDataIslandJoins) {
  return Boolean(includeAllDataIslandJoins);
}

function isAlwaysIncludeTableEnabled(suppressCircularJoin, includeAllDataIslandJoins) {
  return !includeAllDataIslandJoins;
}

function isJoinWeightEnabled(suppressCircularJoin, includeAllDataIslandJoins) {
  return isUseMinimumPathJoinsOn(suppressCircularJoin, includeAllDataIslandJoins);
}

module.exports = {
  // model props
  isSuppressCircularJoinOn: isSuppressCircularJoinOn,
  isIncludeAllDataIslandJoinsOn: isIncludeAllDataIslandJoinsOn,
  // ui props
  isAlwaysIncludeTableEnabled: isAlwaysIncludeTableEnabled,
  isJoinWeightEnabled: isJoinWeightEnabled,
  isUseMinimumPathJoinsOn: isUseMinimumPathJoinsOn,
  isUseAllDAtaIslandJoinsOn: isUseAllDAtaIslandJoinsOn
};

});