define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var viewStateModelDefaultsEnum = require("../../enum/viewStateModelDefaultsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getJoinsViewStateByJoinTrees: function getJoinsViewStateByJoinTrees(joinTrees) {
    return joinTrees.reduce(function (memo, joinTree) {
      return joinTree.joins.reduce(function (memo, join) {
        var joinId = join.id,
            joinNodeExpansionProperty = viewStateModelDefaultsEnum.JOINS_DESIGNER.NODE_EXPANSION.property,
            joinNodeExpansionValue = viewStateModelDefaultsEnum.JOINS_DESIGNER.NODE_EXPANSION.value;
        memo[joinId] = {
          originalWeight: join.weight
        };
        memo[joinId][joinNodeExpansionProperty] = joinNodeExpansionValue;
        return memo;
      }, memo);
    }, {});
  }
};

});