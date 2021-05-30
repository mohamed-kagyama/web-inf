define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InputControl = exports.InputControl = function InputControl(props) {
  return React.createElement("div", {
    className: "control"
  }, React.createElement("label", null, props.label, ":", React.createElement("input", {
    type: "text",
    className: props["class"],
    value: props.value,
    onChange: props.onChange
  })));
};

});