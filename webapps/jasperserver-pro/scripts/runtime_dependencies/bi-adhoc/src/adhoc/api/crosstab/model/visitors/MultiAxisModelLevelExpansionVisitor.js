define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Visitor = require('./MultiAxisModelVisitor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
_.extend(LevelExpansionVisitor.prototype, Visitor);

function LevelExpansionVisitor(value, levelNumber) {
  this.value = value;
  this.levelNumber = levelNumber;

  if (this.value) {
    this.preVisit = op;
    this.postVisit = noop;
  } else {
    this.preVisit = noop;
    this.postVisit = op;
  }
}

function op(node, depth) {
  if (node.isExpandable) {
    if (depth > this.levelNumber) {
      node.isExpanded = false;
    } else if (depth === this.levelNumber) {
      node.isExpanded = this.value;
    } else {
      node.isExpanded = true;
    }
  }
}

function noop() {}

module.exports = LevelExpansionVisitor;

});