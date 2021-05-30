define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  extension: {
    _adjustPositionWithinViewport: function _adjustPositionWithinViewport(position) {
      return {
        top: position.top + this._getWindowScrollTop(),
        left: position.left
      };
    },
    _position: function _position() {
      var position = Dialog.prototype._position.apply(this, arguments);

      return this._adjustPositionWithinViewport(position);
    },
    _getWindowScrollTop: function _getWindowScrollTop() {
      return $(window).scrollTop();
    }
  }
};

});