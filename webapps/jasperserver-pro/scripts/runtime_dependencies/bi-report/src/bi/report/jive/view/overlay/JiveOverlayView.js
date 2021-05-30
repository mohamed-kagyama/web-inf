define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var overlayTemplate = require("text!./template/overlayTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JiveOverlayView = Backbone.View.extend({
  el: overlayTemplate,
  events: {
    'click': '_overlayClicked'
  },
  initialize: function initialize(options) {
    var options = options || {};
    this.parentElement = options.parentElement ? $(options.parentElement) : $('body');
    this.rendered = false;
    Backbone.View.prototype.initialize.apply(this, arguments);
  },
  render: function render() {
    this.parentElement.append(this.$el);
    this.rendered = true;
    return this;
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
  },
  _overlayClicked: function _overlayClicked() {
    this.trigger('overlayClicked');
  }
});
module.exports = JiveOverlayView;

});