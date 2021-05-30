define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var width = function getScrollBarWidth() {
  var scrollDiv = document.createElement('div');

  _.extend(scrollDiv.style, {
    width: '100px',
    height: '100px',
    overflow: 'scroll',
    position: 'absolute',
    top: '-9999px'
  });

  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}();

module.exports = width;

});