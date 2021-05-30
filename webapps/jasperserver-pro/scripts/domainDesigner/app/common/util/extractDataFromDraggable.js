define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var draggableHelperClass = '.ui-draggable-dragging';

module.exports = function () {
  var data = [],
      el = $(draggableHelperClass);

  if (el.length) {
    data = $(draggableHelperClass).data('data') || [];
  }

  return data;
};

});