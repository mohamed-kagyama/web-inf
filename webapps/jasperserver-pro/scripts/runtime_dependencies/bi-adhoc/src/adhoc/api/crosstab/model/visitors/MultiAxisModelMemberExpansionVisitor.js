define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Visitor = require('./MultiAxisModelVisitor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
_.extend(MemberExpansionVisitor.prototype, Visitor);

function MemberExpansionVisitor(value, levelNumber, items, levelsState) {
  this.value = value;
  this.levelsState = levelsState.slice(levelNumber);
  this.levelNumber = 0;

  for (var i = levelNumber + 1, next = true; next && items[i + 1]; i++) {
    if (items[i + 1].level) {
      if (!items[i + 1].level.includeAll) {
        this.levelNumber = i - levelNumber;
      } else {
        next = false;
      }
    }
  }
}

MemberExpansionVisitor.prototype.preVisit = function (node, depth) {
  if (node.isExpandable) {
    if (depth > this.levelNumber) {
      node.isExpanded = this.value ? this.levelsState[depth] : false;
    } else {
      node.isExpanded = this.value;
    }
  }
};

module.exports = MemberExpansionVisitor;

});