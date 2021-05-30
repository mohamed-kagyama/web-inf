define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ColorSetControl = exports.ColorSetControl = function ColorSetControl(props) {
  var control = '';

  if (typeof props.isControl === 'undefined') {
    control = 'control';
  }

  return React.createElement("div", {
    className: "".concat(control, " jr-mControl jr-mControlColorset jr")
  }, props.children);
};

});