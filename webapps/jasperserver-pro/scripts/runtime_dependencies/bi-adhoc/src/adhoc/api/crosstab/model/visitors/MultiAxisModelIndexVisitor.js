define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Visitor = require('./MultiAxisModelVisitor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
_.extend(IndexVisitor.prototype, Visitor);

function IndexVisitor() {
  this.startIndex;
  this.endIndex;
  this.counter = 0;
  this.index = 0;
  this.result = [];
  this.terminated = false;
}

IndexVisitor.prototype.preVisit = function (node) {
  if (!node.children.length) {
    if (node.index === undefined) {
      node.index = this.index;
      this.index++;
    }

    if (this.counter >= this.startIndex && this.counter < this.endIndex) {
      this.result.push(node.index);
    }

    this.counter++;
  }
};

IndexVisitor.prototype.getResult = function () {
  return this.result;
};

IndexVisitor.prototype.range = function (start, end) {
  this.startIndex = start;
  this.endIndex = end;
  this.counter = 0;
  this.result = [];
  return this;
};

module.exports = IndexVisitor;

});