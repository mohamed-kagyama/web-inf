define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var Backbone = require('backbone');

var columnResizeMarkerTemplate = require("text!./template/columnResizeMarkerTemplate.htm");

require("jquery-ui/ui/widgets/draggable");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Narcis Marcu
 * @version: $Id$
 */
module.exports = Backbone.View.extend({
  el: columnResizeMarkerTemplate,
  constructor: function constructor(options) {
    options = options || {};
    this.$parentElement = options.parentElement ? $(options.parentElement) : $("body");
    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    var self = this;
    Backbone.View.prototype.initialize.apply(this, arguments);
    this.$el.draggable({
      axis: "x",
      start: function start(evt, ui) {
        self.trigger("marker:dragStart", evt, ui);
      },
      drag: function drag(evt, ui) {
        self.trigger("marker:drag", evt, ui);
      },
      stop: function stop(evt, ui) {
        self.trigger("marker:dragStop", evt, ui);
      }
    });
    this.render();
  },
  render: function render() {
    this.$parentElement.append(this.$el);
  },
  css: function css(options) {
    this.$el.css(options);
    return this;
  },
  setPosition: function setPosition(options) {
    this.$el.position(options);
    return this;
  },
  show: function show() {
    this.$el.show();
    return this;
  },
  hide: function hide() {
    this.$el.hide();
    return this;
  }
});

});