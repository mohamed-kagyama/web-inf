define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var classUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var BasicHelper = classUtil.extend({
  constructor: function constructor(strategy) {
    this.strategy = strategy;
  },
  init: function init(container) {
    this.container = container;
  },
  start: function start(event) {},
  drag: function drag(event) {},
  stop: function stop(event) {},
  drop: function drop(event, position) {},
  deinit: function deinit() {}
});

_.extend(BasicHelper.prototype, Backbone.Events);

module.exports = BasicHelper;

});