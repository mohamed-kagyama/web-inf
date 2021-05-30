define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var Resizer = function Resizer(el, options) {
  this.initialize(el, options);
};

_.extend(Resizer.prototype, {
  initialize: function initialize(el, options) {
    _.bindAll(this, '_onResize', '_onResizeStart', '_onResizeStop');

    this.el = el;
    this.options = options;
    this.document = options.document || document;
    this.clientX = 0;
    this.clientY = 0;

    this._initResizer();
  },
  _initResizer: function _initResizer() {
    this.el.addEventListener('mousedown', this._onResizeStart);
  },
  _onResize: function _onResize(event) {
    event.preventDefault();
    var config = this.options.config;

    var position = this._calculateNewPosition(event);

    config.resize && config.resize(position);
  },
  _calculateNewPosition: function _calculateNewPosition(event) {
    var clientX = event.clientX,
        clientY = event.clientY;

    var options = this._getResizerPosition();

    if (this.clientX) {
      options.offsetLeft += clientX - this.clientX;
    }

    if (this.clientY) {
      options.offsetTop += clientY - this.clientY;
    }

    this.clientX = clientX;
    this.clientY = clientY;
    return options;
  },
  _onResizeStart: function _onResizeStart() {
    var config = this.options.config;

    var position = this._getResizerPosition();

    config.start && config.start(position);
    this.document.addEventListener('mouseup', this._onResizeStop);
    this.document.addEventListener('mousemove', this._onResize);
  },
  _onResizeStop: function _onResizeStop() {
    var config = this.options.config;

    var position = this._getResizerPosition();

    config.stop && config.stop(position);
    this.document.removeEventListener('mouseup', this._onResizeStop);
    this.document.removeEventListener('mousemove', this._onResize);
    this.clientX = 0;
    this.clientY = 0;
  },
  _getResizerPosition: function _getResizerPosition() {
    var offsetLeft = this.el.offsetLeft,
        offsetTop = this.el.offsetTop;
    return {
      offsetTop: offsetTop,
      offsetLeft: offsetLeft
    };
  },
  remove: function remove() {
    this.el.removeEventListener('mousedown', this._onResizeStart);
    this.document.removeEventListener('mousemove', this._onResize);
    this.document.removeEventListener('mouseup', this._onResizeStop);
    this.clientX = 0;
    this.clientY = 0;
  }
});

module.exports = Resizer;

});