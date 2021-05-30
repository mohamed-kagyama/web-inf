define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var viewStateModelDefaultsEnum = require("../../enum/viewStateModelDefaultsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getJoinTreeState() {
  var joinTreeNodeExpansionProperty = viewStateModelDefaultsEnum.JOINS_DESIGNER.NODE_EXPANSION.property,
      joinTreeNodeExpansionValue = viewStateModelDefaultsEnum.JOINS_DESIGNER.NODE_EXPANSION.value;
  var joinTreeState = {};
  joinTreeState[joinTreeNodeExpansionProperty] = joinTreeNodeExpansionValue;
  return joinTreeState;
}

module.exports = {
  getJoinTreesViewState: function getJoinTreesViewState(joinTrees) {
    return joinTrees.reduce(function (memo, joinTree) {
      var joinTreeId = joinTree.id;
      memo[joinTreeId] = getJoinTreeState();
      return memo;
    }, {}, this);
  },
  getJoinTreeViewState: function getJoinTreeViewState() {
    return getJoinTreeState();
  }
};

});